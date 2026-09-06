import UserModel from "../models/usermodel.js";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../config/multer.js";

import express from "express";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/verify-token", authMiddleware, (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "Token is valid",
    user: req.user // optional: send back user info if your frontend needs it
  });
});

export default router;
