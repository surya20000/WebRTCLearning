import { io } from "socket.io-client";
import { createSlice } from "@reduxjs/toolkit";
import store from "../store";

const socket = io(import.meta.env.VITE_BACKEND_URI);

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    connected: false,
    connectionId: null,
    error: null,
  },
  reducers: {
    connect: (state) => {
      state.connected = true;
      state.error = null;
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

export const getConnectedState = (state) => state.socket.connected;
export const getConnectionState = (state) => state.socket.connectionId;
export const getSocketConnectionError = (state) => state.socket.error;

export const { connect, disconnect, setConnectionId, setError } =
  socketSlice.actions;

export default socketSlice.reducer;

socket.on("connect", () => {
  console.log("Connected to Socket");
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
