import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/user.routes.js";
import { authMiddleware } from "./middleware/auth.js";
import categoryRoute from "./routes/category.routes.js";
import uploadImageRoute from "./routes/uploadImage.routes.js";
import subCategoryRoute from "./routes/subCategory.routes.js";
import productRoute from "./routes/product.routes.js";

dotenv.config();

const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(morgan("common"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.get("/", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to the backend",
  });
});
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/file", uploadImageRoute);
app.use("/api/sub-category", subCategoryRoute);
app.use("/api/products", productRoute);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
