import generateVerifyEmailToken from "../utils/generateVerifyEmailToken.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import UserModel from "../models/user.models.js";

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

    const savedUser = new UserModel({
      name,
      email,
      password,
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
