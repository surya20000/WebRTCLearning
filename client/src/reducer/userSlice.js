import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfileData: "",
    loading: false,
    error: "",
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setUserProfileData: (state, action) => {
      state.userProfileData = action.payload;
      state.error = "";
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    removeUserProfileData: (state) => {
      state.userProfileData = "";
      state.error = "";
    },
  },
});

export const getUserProfileInfo = (state) => state.user.userProfileData;
export const getLoadingState = (state) => state.user.loading;
export const getError = (state) => state.user.error;

export const {
  removeUserProfileData,
  startLoading,
  stopLoading,
  setUserProfileData,
} = userSlice.actions;
export default userSlice.reducer;
