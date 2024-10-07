import express from "express";
import { getAllComments, addComment } from "../controllers/userComments/database/comments.Controllers.js";

const router = express.Router();

router.get("/getAllComments/:id", getAllComments)
router.post("/addComment", addComment)

export default router;
