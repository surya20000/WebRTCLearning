import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    connected: false,
    connectionId: null,
    connectWithParticularUser: null,
    error: null,
    receivedRequestFromRemoteUser: {},
    usersInTheRoom: [],
  },
  reducers: {
    addUserInARoom: (state, action) => {
      state.usersInTheRoom = [...state.usersInTheRoom, action.payload];
    },
    addRemoteUserId: (state, action) => {
      state.connectWithParticularUser = action.payload;
    },
    addRemoteUserRequestName: (state, action) => {
      //* adding the latest received request
      state.receivedRequestFromRemoteUser = action.payload;
    },
    connect: (state) => {
      state.connected = true;
      state.error = null;
    },
    removeUserNameFromRequest: (state) => {
      //* removing user name from the request panel
      state.receivedRequestFromRemoteUser = {};
    },
    disconnect: (state) => {
      state.connected = false;
      state.connectionId = null;
      state.error = null;
    },
    setConnectionId: (state, action) => {
      state.connectionId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const getAllUsersInTheRoom = (state) => state.socket.usersInTheRoom;
export const getConnectedState = (state) => state.socket.connected;
export const getConnectionID = (state) => state.socket.connectionId;
export const getReceivedRequestFromRemoteUser = (state) =>
  state.socket.receivedRequestFromRemoteUser;
export const getSocketConnectionError = (state) => state.socket.error;
export const getRemoteUserSocketID = (state) =>
  state.socket.connectWithParticularUser;

export const {
  addUserInARoom,
  addRemoteUserId,
  addRemoteUserRequestName,
  connect,
  disconnect,
  setConnectionId,
  setError,
  removeUserNameFromRequest,
} = socketSlice.actions;

export default socketSlice.reducer;
