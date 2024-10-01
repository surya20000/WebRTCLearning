import mongoose from "mongoose";
import { backendURI } from "./constants.js";

export const serverConnection = async () => {

  await mongoose
    .connect(backendURI)
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.log("Error Connecting db ", err);
    });
};
