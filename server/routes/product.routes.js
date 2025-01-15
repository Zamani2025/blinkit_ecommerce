import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  updateProductController,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const productRoute = express.Router();

productRoute.post("/get-products", getProductController);
productRoute.post("/create-product", authMiddleware, createProductController);
productRoute.put("/update-product", authMiddleware, updateProductController);
productRoute.delete("/delete-product", authMiddleware, deleteProductController);

export default productRoute;
