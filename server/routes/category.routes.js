import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  updateCategoryController,
} from "../controllers/category.controller.js";

const categoryRoute = express.Router();

categoryRoute.get("/get-categories", getCategoriesController);
categoryRoute.post("/create-category", createCategoryController);
categoryRoute.put("/update-category", updateCategoryController);
categoryRoute.delete("/delete-category", deleteCategoryController);

export default categoryRoute;
