import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import { serverConnection } from "./utils/dbConnection.js";
import { port } from "./utils/constants.js";

import userRoutes from "./routes/User.Routes.js";
import postRoutes from "./routes/Post.Routes.js"

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes); //* path for all the user routes
app.use("/api/post", postRoutes)

serverConnection(); //* backend call to connect to the server

const io = new Server(server, {
  cors: {
    methods: "GET,POST",
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`A user Connected ${socket.id}`);
});

server.listen(port, () => {
  console.log(`Server Is Up And Running At Port: ${port}`);
});
