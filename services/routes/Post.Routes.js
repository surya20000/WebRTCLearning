import express from "express";
import {
  createPost,
  getAllPosts,
} from "../controllers/usersPost/database/posts.controllers.js";

const router = express.Router();

router.post("/createPost", createPost);
router.get("/getAllPosts", getAllPosts);

export default router;
