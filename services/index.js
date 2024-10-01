import express from "express";
import cors from "cors";

import { serverConnection } from "./utils/dbConnection.js";
import { port } from "./utils/constants.js";

import userRoutes from "./routes/User.Routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

serverConnection(); //* backend call to connect to the server

app.listen(port, () => {
  console.log(`Server Is Up And Running At Port: ${port}`);
});
