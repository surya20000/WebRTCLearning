import { io } from "socket.io-client";
import store from "../store";
import {
  addRemoteUserRequestName,
  addUserInARoom,
  connect,
  disconnect,
  setError,
  setConnectionId,
} from "../reducer/socketsSlice";

const socket = io(import.meta.env.VITE_BACKEND_URI);

socket.on("connect", () => {
  console.log("Connected to Socket");
  console.log(`Socket ID ${socket.id}`);
  store.dispatch(connect());
  store.dispatch(setConnectionId(socket.id));
});

socket.on("disconnect", () => {
  console.log("Disconnected from Socket");
  store.dispatch(disconnect());
});

socket.on("connect_error", (error) => {
  console.error("Error connecting to Socket IO: ", error.message);
  store.dispatch(setError(error.message));
});

socket.on("userJoinedRoom", (userInfo) => {
  store.dispatch(
    addUserInARoom({
      userId: userInfo.userId,
      profilePicURL: userInfo.userProfile,
      userName: userInfo.userName,
    })
  );
});

socket.on("receivedConnectionRequest", ({ userName, offeredUserSocketId }) => {
  console.log("received req");
  console.log(`${userName} wants to connect`);
  store.dispatch(addRemoteUserRequestName({ userName, offeredUserSocketId }));
});


export default socket;
