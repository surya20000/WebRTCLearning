import express from "express";
import {
  getAllComments,
  addComment,
  // likeComment,
} from "../controllers/userComments/database/comments.Controllers.js";

const router = express.Router();

router.get("/getAllComments/:id", getAllComments);
router.post("/addComment", addComment);
// router.put("/likeComment/:id", likeComment);

export default router;
