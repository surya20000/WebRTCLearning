import express from "express";

import { handleGoogleLogin } from "../controllers/users/google/userGoogle.Controllers.js";
import { handleUpdateUserProfile } from "../controllers/users/database/userDataBase.Controller.js";

const router = express.Router();

router.post("/googleLogin", handleGoogleLogin);
router.put("/updateProfile/:id", handleUpdateUserProfile);

export default router;
