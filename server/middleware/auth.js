import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access, please login",
        success: false,
        error: true,
      });
    }
    const decode = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    
    req.userId = decode.id;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
