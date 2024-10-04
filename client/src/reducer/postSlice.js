import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadNewPost = createAsyncThunk(
  "upload/newPost",
  async (formData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/api/post/createPost`,
      formData
    );
    return res.data.posts;
  }
);

export const fetchAllPosts = createAsyncThunk("fetch/allPost", async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_URI}/api/post/getAllPosts`
  );
  return res.data.posts;
});

export const postSlice = createSlice({
  name: "allPosts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadNewPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadNewPost.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(uploadNewPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(fetchAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const getAllPosts = (state) => state.allPosts.posts;
export const getPostUploadingState = (state) => state.allPosts.loading;
export const getPostUploadingErrorMessage = (state) => state.allPosts.error;

export default postSlice.reducer;
