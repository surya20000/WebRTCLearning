import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userSlice.js";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
