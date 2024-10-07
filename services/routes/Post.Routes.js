import express from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  likePost,
} from "../controllers/usersPost/database/posts.controllers.js";

const router = express.Router();

router.post("/createPost", createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getPost/:id", getPost);
router.put("/likePost/:id", likePost);

export default router;
