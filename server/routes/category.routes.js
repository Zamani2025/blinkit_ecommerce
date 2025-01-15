import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  updateCategoryController,
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const categoryRoute = express.Router();

categoryRoute.get("/get-categories", getCategoriesController);
categoryRoute.post("/create-category", authMiddleware, createCategoryController);
categoryRoute.put("/update-category", authMiddleware, updateCategoryController);
categoryRoute.delete("/delete-category", authMiddleware, deleteCategoryController);

export default categoryRoute;
