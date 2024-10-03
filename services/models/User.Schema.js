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
    userDescription: {
      type: String,
      default: "",
    },
    userAreaOfInterests: {
      type: [String],
      default: [],
    },
    friends: {
      type: Number,
      default: 0,
    },
    interactions: {
      type: Number,
      default: 0,
    },
    hearts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
export default User;
