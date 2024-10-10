import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//* method to upload a new Post
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

//* method to fetch all the post from the database
export const fetchAllPosts = createAsyncThunk("fetch/allPost", async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_URI}/api/post/getAllPosts`
  );
  return res.data.posts;
});

//* method to increment the like of a particular post
export const incrementPostLike = createAsyncThunk(
  "increment/PostLike",
  async ({ id, userID }) => {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URI}/api/post/likePost/${id.id}`,
      {
        userID,
      }
    );
    return res.data.posts;
  }
);

export const fetchParticularPost = createAsyncThunk(
  "fetch/ParticularPost",
  async ({ id }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/api/post/getPost/${id}`
    );
    return res.data.posts;
  }
);

export const postSlice = createSlice({
  name: "allPosts",
  initialState: {
    posts: [],
    particularPost: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //* Upload new post cases
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

    //* fetch all posts cases
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

    //* fetch Particular Post cases
    builder.addCase(fetchParticularPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchParticularPost.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.particularPost = action.payload;
    });
    builder.addCase(fetchParticularPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //* increment the particular post like cases
    builder.addCase(incrementPostLike.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(incrementPostLike.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.particularPost = action.payload;
    });
    builder.addCase(incrementPostLike.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const getAllPosts = (state) => state.allPosts.posts;
export const getParticularPost = (state) => state.allPosts.particularPost;
export const getPostUploadingState = (state) => state.allPosts.loading;
export const getPostUploadingErrorMessage = (state) => state.allPosts.error;

export default postSlice.reducer;
