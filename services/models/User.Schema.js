import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profilePicURL: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    backgroundImageURL: {
      type: String,
      default: "https://i.ibb.co/zR1ykQb/background-Temp.jpg",
    },
    userSelectedCategory: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
export default User;
