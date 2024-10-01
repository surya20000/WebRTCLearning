import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLoginWithGoogle = createAsyncThunk(
  "user/Details",
  async ({ clientID, credential }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/api/user/googleLogin`,
      {
        clientID,
        credential,
      }
    );
    console.log("res", res.data);

    return res.data.user;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfileData: "",
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfileData = action.payload;
      })
      .addCase(userLoginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const getUserProfileInfo = (state) => state.user.userProfileData;
export const getLoadingState = (state) => state.user.loading;
export const getError = (state) => state.user.error;

export default userSlice.reducer;
