import {
  getAllUsersInTheRoom,
  getConnectionID,
  addRemoteUserId,
} from "../../../reducer/socketsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import phoneLogo from "../../../assets/phone.png";

const CurrentActiveUsersWindow = () => {
  const dispatch = useDispatch();
  const allUsersArr = useSelector(getAllUsersInTheRoom);
  const currUserID = useSelector(getConnectionID);
  const [
    showSendConnectionRequestDialogBox,
    setShowSendConnectionRequestDialogBox,
  ] = useState(false);
  const [remoteUserName, setRemoteUserName] = useState("");
  const [remoteUserId, setRemoteUserId] = useState(null);

  const handleConnectWithUser = (friendName) => {
    setShowSendConnectionRequestDialogBox((prev) => !prev);
    setRemoteUserName(friendName);
  };

  return (
    <div className="p-4 flex flex-col">
      <p className="font-semibold text-center p-1"> Users In the Room </p>
      {allUsersArr.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {allUsersArr.map((user) => (
            <div
              key={user.userId}
              className="flex items-center justify-between max-w-44 lg:w-44 bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={user.profilePicURL}
                alt={user.userName}
                className="w-10 h-10 rounded-full object-cover mb-2"
              />
              <p className="text-lg font-semibold">
                {user.userName} {currUserID === user.userId ? "(You)" : ""}{" "}
              </p>
              {currUserID === user.userId ? (
                ""
              ) : (
                <img
                  alt="phoneLogo"
                  className="w-8 h-8 hover:cursor-pointer"
                  onClick={() => {
                    handleConnectWithUser(user.userName);
                    setRemoteUserId(user.userId);
                  }}
                  src={phoneLogo}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          Looks Like You are The Only One Here
        </p>
      )}
      {showSendConnectionRequestDialogBox ? (
        <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-4 rounded-lg shadow-lg z-10 bg-opacity-90">
          <p className="p-2">Connect With {remoteUserName}</p>
          <div className="flex">
            <button
              onClick={() => {
                dispatch(addRemoteUserId(remoteUserId));
                setShowSendConnectionRequestDialogBox((prev) => !prev);
              }}
              className="bg-blue-500 p-2 text-white font-medium mr-6"
            >
              Connect
            </button>
            <button
              className="bg-red-500 p-2 text-white font-medium"
              onClick={() =>
                setShowSendConnectionRequestDialogBox((prev) => !prev)
              }
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CurrentActiveUsersWindow;
