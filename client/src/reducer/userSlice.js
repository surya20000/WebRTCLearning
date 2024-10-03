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
    return res.data.user;
  }
);

export const updateUserProfileData = createAsyncThunk(
  "user/updateProfile",
  async ({ _id, form }) => {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URI}/api/user/updateProfile/${_id}`,

      form
    );
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
    builder
      .addCase(updateUserProfileData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfileData = action.payload;
      })
      .addCase(updateUserProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const getUserProfileInfo = (state) => state.user.userProfileData;
export const getLoadingState = (state) => state.user.loading;
export const getError = (state) => state.user.error;

export default userSlice.reducer;
