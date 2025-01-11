import express from "express";
import {
    forgotPasswordController,
  loginUserController,
  registerUserController,
  resetPasswordController,
  verifyEmailController,
  verifyForgotPasswordOtpController,
} from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/register", registerUserController);
userRoute.post("/verify-email", verifyEmailController);
userRoute.post("/login", loginUserController);
userRoute.post("/forgot-password", forgotPasswordController);
userRoute.post("/verify-forgot-password-otp", verifyForgotPasswordOtpController);
userRoute.post("/reset-password", resetPasswordController);

export default userRoute;
