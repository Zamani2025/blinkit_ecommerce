import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateRefreshToken = async ({ email, name, role, id }) => {
    const refreshToken = jwt.sign(
        { email, name, role, id },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
    return refreshToken;
};

export default generateRefreshToken;