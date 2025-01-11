import generateVerifyEmailToken from "../utils/generateVerifyEmailToken.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import UserModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import generateForgotPasswordOtp from "../utils/generateForgotPasswordOtp.js";
import forgotPasswordOtpTemplate from "../utils/forgotPasswordOtpTemplate.js";
import cloudinaryUpload from "../config/cloudinary.js";

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
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ verify_email_token: otp });

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

export const logoutUserController = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({
        message: "User with this email does not exist",
        success: false,
        error: true,
      });
    }
    user.refresh_token = null;
    await user.save();
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    return res.status(200).json({
      message: "User logged out successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const uploadUserAvatarController = async (req, res) => {
  try {
    const userId = req.userId;
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        message: "Image is required",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({
        message: "User with this email does not exist",
        success: false,
        error: true,
      });
    }
    const imageResponse = await cloudinaryUpload(image);

    if (imageResponse) {
      user.avatar = imageResponse.secure_url;
      await user.save();
      return res.status(200).json({
        message: "Image uploaded successfully",
        success: true,
        error: false,
        data: imageResponse.secure_url,
      });
    } else {
      return res.status(400).json({
        message: "Image upload failed",
        success: false,
        error: true,
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

export const updatedUserController = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, mobile } = req.body;

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({
        message: "User with this email does not exist",
        success: false,
        error: true,
      });
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (mobile) {
      user.mobile = mobile;
    }
    await user.save();
    return res.status(200).json({
      message: "User updated successfully",
      success: true,
      error: false,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
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

    const otp = generateForgotPasswordOtp();

    user.forgot_password_token = `${otp}`;
    user.forgot_password_token_expiry = Date.now() + 10 * 60 * 1000;

    const emailResponse = await sendEmail({
      sendTo: email,
      subject: "Forgot Password",
      html: forgotPasswordOtpTemplate({ name: user.name, code: otp }),
    });

    if (emailResponse) {
      const updatedUser = await user.save();
      return res.status(200).json({
        message: "OTP sent successfully",
        success: true,
        error: false,
        data: updatedUser,
      });
    } else {
      return res.status(500).json({
        message: emailResponse.error,
        success: false,
        error: true,
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

export const verifyForgotPasswordOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
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

    if (user.forgot_password_token_expiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
        success: false,
        error: true,
      });
    }

    if (user.forgot_password_token !== otp) {
      return res.status(400).json({
        message: "Incorrect OTP, please try again",
        success: false,
        error: true,
      });
    }
    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
      error: false,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
        error: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgot_password_token = "";
    user.forgot_password_token_expiry = null;

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
      error: false,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const token =
      req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "Refresh token not found",
        success: false,
        error: true,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);

    if (!decoded) {
      return res.status(400).json({
        message: "Invalid refresh token",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({
        message: "User with this email does not exist",
        success: false,
        error: true,
      });
    }

    const accessToken = generateAccessToken({
      email: user.email,
      name: user.name,
      role: user.role,
      id: user._id,
    });

    const refreshToken = generateRefreshToken({
      email: user.email,
      name: user.name,
      role: user.role,
      id: user._id,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Token refreshed successfully",
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
