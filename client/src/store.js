import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice.js";
import socketReducer from "./reducer/socketsSlice.js";
import allPostReducer from "./reducer/postSlice.js";

export default configureStore({
  reducer: {
    allPosts: allPostReducer,
    socket: socketReducer,
    user: userReducer,
  },
});
