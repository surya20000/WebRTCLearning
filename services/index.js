import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import { serverConnection } from "./utils/dbConnection.js";
import { port } from "./utils/constants.js";

import userRoutes from "./routes/User.Routes.js";
import postRoutes from "./routes/Post.Routes.js";
import commentRoutes from "./routes/Comments.Routes.js";

const app = express();
const server = http.createServer(app);
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "https://web-rtc-learning.vercel.app", // Your frontend URL
  methods: ["GET", "POST"],
  credentials: true, // If you need to send credentials
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("hello from the server");
});
app.use("/api/user", userRoutes); //* path for all the user routes
app.use("/api/post", postRoutes); //* path for all the comments routes
app.use("/api/comments", commentRoutes); //* path for all the comment routes

serverConnection(); //* backend call to connect to the server

const io = new Server(server, {
  cors: {
    origin: "https://web-rtc-learning.vercel.app", // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`A user Connected ${socket.id}`);
  socket.on("userJoinedRoom", (userInfo) => {
    io.emit("userJoinedRoom", userInfo);
  });

  socket.on(
    "showConnectionRequestToTheRemoteUser",
    ({ offeredUserSocketId, remoteUserSocketId, userName }) => {
      const remoteSocket = io.sockets.sockets.get(remoteUserSocketId);
      if (remoteSocket) {
        io.to(remoteUserSocketId).emit("receivedConnectionRequest", {
          userName,
          offeredUserSocketId,
        });
      } else {
        console.log("Remote socket not found, cannot emit.");
      }
    }
  );

  socket.on("offer", ({ from, to, offer }) => {
    io.to(to).emit("offer", { from, to, offer });
  });

  socket.on("answer", ({ from, to, answer }) => {
    io.to(from).emit("answer", { from, to, answer });
  });

  socket.on("callDeclined", (offeredUserId) => {
    io.to(offeredUserId).emit("callDeclined");
  });

  socket.on("icecandidate", ({ candidate, to }) => {
    io.to(to).emit("icecandidate", { candidate });
  });
});

server.listen(port, () => {
  console.log(`Server Is Up And Running At Port: ${port}`);
});

//* deployed https://ace-backend-d8eq6unnd-surya20000s-projects.vercel.app/
