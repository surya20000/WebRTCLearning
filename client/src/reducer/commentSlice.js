import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk("add/Comment", async (formData) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URI}/api/comments/addComment`,
    formData
  );
  return res.data.comments;
});

export const fetchAllComments = createAsyncThunk(
  "fetch/AllComments",
  async ({ id }) => {
    const res = await axios.get(`
        ${import.meta.env.VITE_BACKEND_URI}/api/comments/getAllComments/${id}
        `);
    return res.data.comments;
  }
);

// export const likeComment = createAsyncThunk(
//   "increment/CommentLike",
//   async ({ id, userID, postID }) => {
//     const currPostID = postID.id;
//     const res = await axios.put(
//       `${import.meta.env.VITE_BACKEND_URI}/api/comments/likeComment/${id}`,
//       {
//         userID,
//         currPostID,
//       }
//     );
//     return res.data.comments;
//   }
// );

export const commentSlice = createSlice({
  name: "allComments",
  initialState: {
    allComments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //* Post Comment Cases
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      state.allComments = action.payload;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //* Fetch All Comments Cases
    builder.addCase(fetchAllComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllComments.fulfilled, (state, action) => {
      state.loading = false;
      state.allComments = action.payload;
    });
    builder.addCase(fetchAllComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //* increment comment cases
    // builder.addCase(likeComment.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(likeComment.fulfilled, (state, action) => {
    //   state.error = null;
    //   state.loading = false;
    //   state.allComments = action.payload;
    // });
    // builder.addCase(likeComment.rejected, (state, action) => {
    //   state.error = action.error.message;
    //   state.loading = false;
    //   state.allComments = [];
    // });
  },
});

export const getCommentsLoadingState = (state) => state.allComments.loading;
export const getAllComments = (state) => state.allComments.allComments;
export const getCommentsErrorMessage = (state) => state.allComments.error;

export default commentSlice.reducer;
