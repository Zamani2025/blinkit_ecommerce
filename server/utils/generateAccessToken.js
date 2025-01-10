import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = async ({ email, name, role, id }) => {
  const accessToken = jwt.sign(
    { email, name, role, id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "5h" }
  );
  return accessToken;
};

export default generateAccessToken;
