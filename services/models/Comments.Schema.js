import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    postID: {
      type: String,
      required: true,
      trim: true,
    },
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("comments", commentSchema);
export default Comments;
