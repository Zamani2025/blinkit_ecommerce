import express from "express";
import { uploadImageController } from "../controllers/uploadImage.controller.js";
import upload from "../utils/upload.js";
import { authMiddleware } from "../middleware/auth.js";

const uploadImageRoute = express.Router();

const uploadSingle = upload.single("image");

uploadImageRoute.post(
  "/upload-image",
  authMiddleware,
  uploadSingle,
  uploadImageController
);


export default uploadImageRoute;