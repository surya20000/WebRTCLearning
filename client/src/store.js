import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice.js";
import socketReducer from "./reducer/socketsSlice.js";
import allPostReducer from "./reducer/postSlice.js";
import commentReducer from "./reducer/commentSlice.js";

export default configureStore({
  reducer: {
    allComments: commentReducer,
    allPosts: allPostReducer,
    socket: socketReducer,
    user: userReducer,
  },
});
