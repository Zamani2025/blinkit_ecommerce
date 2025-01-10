import generateVerifyEmailToken from "../utils/generateVerifyEmailToken.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import UserModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

export const registerUserController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
        error: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists, please login",
        success: false,
        error: true,
      });
    }

    const verifyCode = generateVerifyEmailToken();

    savedUser.verify_email_token = verifyCode;

    const emailTemplate = verifyEmailTemplate({
      name: name,
      code: verifyCode,
    });

    const emailResponse = await sendEmail({
      sendTo: email,
      subject: "Verify Your Email",
      html: emailTemplate,
    });

    if (!emailResponse) {
      return res.status(500).json({
        message: emailResponse.error,
        success: false,
        error: true,
      });
    } else {
      const user = await savedUser.save();

      return res.status(201).json({
        message: "User registered successfully",
        success: true,
        error: false,
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ verify_email_token: code });

    if (!user) {
      return res.status(400).json({
        message: "Invalid verification code",
        success: false,
        error: true,
      });
    }

    user.verify_email = true;
    user.verify_email_token = null;

    const updatedUser = await user.save();

    if (updatedUser) {
      return res.status(200).json({
        message: "Email verified successfully",
        success: true,
        error: false,
        data: updatedUser,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User with this email does not exist",
        success: false,
        error: true,
      });
    }
    if (user.is_active !== "active") {
      return res.status(400).json({
        message: "User is not active, please contact admin",
        success: false,
        error: true,
      });
    }
    if (user.verify_email !== true) {
      return res.status(400).json({
        message: "User is not verified, please verify your email",
        success: false,
        error: true,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
        error: true,
      });
    }
    const accessToken = await generateAccessToken({
      email: user.email,
      name: user.name,
      role: user.role,
      id: user._id,
    });

    const refreshToken = await generateRefreshToken({
      email: user.email,
      name: user.name,
      role: user.role,
      id: user._id,
    });

    const tokenOptional = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    res.cookie("refreshToken", refreshToken, tokenOptional);

    res.cookie("accessToken", accessToken, tokenOptional);

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      error: false,
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
