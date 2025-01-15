import express from "express";
import {
  createSubCategoryController,
  deleteSubCategoryController,
  getSubCategoriesController,
  updateSubCategoryController,
} from "../controllers/subCategory.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const subCategoryRoute = express.Router();

subCategoryRoute.get("/get-subcategories", getSubCategoriesController);
subCategoryRoute.post(
  "/create-subcategory",
  authMiddleware,
  createSubCategoryController
);
subCategoryRoute.put(
  "/update-subcategory",
  authMiddleware,
  updateSubCategoryController
);
subCategoryRoute.delete(
  "/delete-subcategory",
  authMiddleware,
  deleteSubCategoryController
);

export default subCategoryRoute;
