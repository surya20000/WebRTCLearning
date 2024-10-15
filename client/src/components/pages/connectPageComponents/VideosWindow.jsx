import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import FailureNotification from "../../common/FailureNotification";
import { getUserProfileInfo } from "../../../reducer/userSlice";
import {
  getConnectionID,
  getRemoteUserSocketID,
  getReceivedRequestFromRemoteUser,
  removeUserNameFromRequest,
} from "../../../reducer/socketsSlice";
import socket from "../../../js/SocketConnection";
import notificationSound from "../../../assets/connectRequestNotificationSound.mp3";

const VideosWindow = () => {
  const dispatch = useDispatch();
  const [localUserStream, setLocalUserStream] = useState(null);
  const notificationAudio = new Audio(notificationSound);
  const [errorMessage, setErrorMessage] = useState(null);
  const [remoteUserStream, setRemoteUserStream] = useState(null); // For remote stream
  const remoteUserInfo = useSelector(getReceivedRequestFromRemoteUser);
  const [showFailureNotification, setShowFailureNotification] = useState(false);
  const [showCallDeclinedNotification, setShowCallDeclinedNotification] =
    useState(false);
  const [showConnectionRequestDialogBox, setShowConnectionRequestDialogBox] =
    useState(true);
  const offeredUserSocketId = useSelector(getConnectionID);
  const localVideoRef = useRef(null);
  const remoteUserSocketId = useSelector(getRemoteUserSocketID);
  const remoteVideoRef = useRef(null); // Ref for remote video
  const userSocketID = useSelector(getConnectionID);
  const userInfo = useSelector(getUserProfileInfo);
  let callerRef = useRef(null);

  const PeerConnection = (function () {
    let peerConnection;

    const createPeerConnection = () => {
      const config = {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      };
      peerConnection = new RTCPeerConnection(config);

      return peerConnection;
    };

    return {
      getInstance: () => {
        if (!peerConnection) {
          peerConnection = createPeerConnection();
        }
        return peerConnection;
      },
    };
  })();

  const createAnswer = async (from, to) => {
    setShowConnectionRequestDialogBox(false);
    const pc = PeerConnection.getInstance();
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    // console.log("local Description", pc.localDescription);

    socket.emit("offer", {
      from,
      to,
      offer: pc.localDescription,
    });
  };

  useEffect(() => {
    const pc = PeerConnection.getInstance();

    // Handle local ICE candidates and send them to the remote peer
    pc.onicecandidate = (event) => {
      // console.log("Sending ICE candidate: ", event.candidate);
      if (event.candidate) {
        socket.emit("icecandidate", {
          candidate: event.candidate,
          to: remoteUserSocketId,
        });
      }
    };

    // Listen for ICE candidates from the remote peer
    socket.on("icecandidate", async ({ candidate }) => {
      // console.log("Received ICE candidate: ", candidate);
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        console.error("Error adding received ICE candidate", err);
      }
    });
  }, [remoteUserSocketId, PeerConnection]);

  useEffect(() => {
    async function getLocalUserStream() {
      try {
        const res = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        setLocalUserStream(res);

        if (userSocketID) {
          socket.emit("userJoinedRoom", {
            userId: userSocketID,
            userName: userInfo.name,
            userProfile: userInfo.profilePicURL,
          });
        }

        // Add local stream to video element
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = res;
        }
      } catch (err) {
        console.log(err.message);
        if (err.message === "Permission denied") {
          setShowFailureNotification(true);
          setErrorMessage("Please Allow Your Audio and Video");
          return;
        }
        setShowFailureNotification(true);
        setErrorMessage(err.message);
      }
    }

    getLocalUserStream();
  }, [userInfo.name, userInfo.profilePicURL, userSocketID]);

  useEffect(() => {
    if (localUserStream) {
      const peerConnection = PeerConnection.getInstance();

      //* Add local stream to the peer connection
      localUserStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localUserStream);
      });

      //* Listen for remote streams
      peerConnection.ontrack = (event) => {
        const remoteStream = event.streams[0];
        // console.log("Remote stream received: ", remoteStream); // Add this
        setRemoteUserStream(remoteStream);

        if (remoteVideoRef.current) {
          if (remoteVideoRef.current.srcObject !== remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        }
      };

      //* Listen for ice candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("icecandidate", event.candidate);
        }
      };
    }
  }, [localUserStream, PeerConnection]);

  useEffect(() => {
    //* generating a request to the remote user
    if (remoteUserSocketId != null) {
      socket.emit("showConnectionRequestToTheRemoteUser", {
        userName: userInfo.name,
        offeredUserSocketId,
        remoteUserSocketId,
      });
    }
  }, [remoteUserSocketId, userInfo.name, offeredUserSocketId]);

  useEffect(() => {
    socket.on("offer", async ({ from, to, offer }) => {
      console.log("Received Offer: ", offer);
      const pc = PeerConnection.getInstance();

      if (
        pc.signalingState === "stable" ||
        pc.signalingState === "have-remote-offer"
      ) {
        console.log("Setting remote description for offer");
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("answer", { from, to, answer: pc.localDescription });
          callerRef.current = [from, to];
        } catch (error) {
          console.error("Failed to set remote description for offer: ", error);
        }
      } else {
        console.warn(
          "Offer received but signaling state is not stable: ",
          pc.signalingState
        );
      }
    });
  }, [PeerConnection]);

  useEffect(() => {
    socket.on("answer", async ({ from, to, answer }) => {
      console.log("Received answer: ", answer);
      const pc = PeerConnection.getInstance();

      if (pc.signalingState === "have-local-offer") {
        console.log("Setting remote description for answer");
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (error) {
          console.error("Failed to set remote description for answer: ", error);
        }
      } else {
        console.warn(
          "Answer received but signaling state is not 'have-local-offer': ",
          pc.signalingState
        );
      }
    });
  }, [PeerConnection]);

  useEffect(() => {
    if (remoteUserInfo) {
      // Play the audio when remoteUserName is not null (i.e., when the notification becomes visible)
      notificationAudio.play();
    }
  }, [remoteUserInfo, notificationAudio]);

  useEffect(() => {
    socket.on("callDeclined", () => {
      setShowCallDeclinedNotification(true);
      setTimeout(() => {
        setShowCallDeclinedNotification(false);
      }, 4000);
    });
  }, []);

  return (
    <div>
      {showFailureNotification ? (
        <FailureNotification message={errorMessage} />
      ) : (
        ""
      )}

      {remoteUserInfo &&
      Object.keys(remoteUserInfo).length > 0 &&
      showConnectionRequestDialogBox ? (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          role="alertdialog"
        >
          <div className="bg-gray-200 p-4 rounded-lg shadow-lg bg-opacity-90">
            <header className="flex justify-between mb-2">
              <h2 className="text-lg font-bold">Connection Request</h2>
            </header>
            <p className="p-2">
              <span className="font-bold">{remoteUserInfo.userName}</span> wants
              to connect with you!!
            </p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                onClick={() =>
                  createAnswer(
                    remoteUserInfo.offeredUserSocketId,
                    offeredUserSocketId
                  )
                }
              >
                Connect
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded ml-2"
                onClick={() => {
                  dispatch(removeUserNameFromRequest());
                  socket.emit(
                    "callDeclined",
                    remoteUserInfo.offeredUserSocketId
                  );
                }}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {showCallDeclinedNotification ? (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          role="alertdialog"
        >
          <div className="bg-gray-200 p-4 rounded-lg shadow-lg bg-opacity-90">
            <p className="p-2 font-bold text-red-600">Call Declined</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div>
        <div className="my-auto">
          {/* <video
            className="rounded-lg max-h-96"
            autoPlay
            muted
            playsInline
            ref={localVideoRef}
          ></video> */}
          <video
            className="rounded-lg max-h-96"
            autoPlay
            playsInline
            ref={remoteVideoRef}
            style={{ width: "100%", height: "auto" }}
          ></video>
        </div>
        {/* <div className="my-auto">
          <video
            className="rounded-lg max-h-96"
            autoPlay
            playsInline
            ref={remoteVideoRef}
            style={{ width: "100%", height: "auto" }}
          ></video>
        </div> */}
      </div>
    </div>
  );
};

export default VideosWindow;
