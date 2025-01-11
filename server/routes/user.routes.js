import express from "express";
import {
  forgotPasswordController,
  loginUserController,
  logoutUserController,
  registerUserController,
  resetPasswordController,
  uploadUserAvatarController,
  verifyEmailController,
  verifyForgotPasswordOtpController,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import upload from "../utils/upload.js";

const userRoute = express.Router();

const uploadSingle = upload.single("avatar");

userRoute.post("/register", registerUserController);
userRoute.post("/verify-email", verifyEmailController);
userRoute.post("/login", loginUserController);
userRoute.get("/logout", authMiddleware, logoutUserController);
userRoute.post("/forgot-password", forgotPasswordController);
userRoute.post(
  "/verify-forgot-password-otp",
  verifyForgotPasswordOtpController
);
userRoute.post(
  "/upload-avatar",
  authMiddleware,
  uploadSingle,
  uploadUserAvatarController
);
userRoute.post("/reset-password", resetPasswordController);

export default userRoute;
