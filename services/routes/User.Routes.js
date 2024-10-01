import express from "express";

import { handleGoogleLogin } from "../controllers/users/google/userGoogle.Controllers.js";

const router = express.Router();

router.post("/googleLogin", handleGoogleLogin);

export default router;
