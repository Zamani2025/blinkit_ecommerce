import CategoryModel from "../models/category.models.js";
import ProductModel from "../models/products.models.js";
import SubCategoryModel from "../models/subCategory.models.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }
    const categoryExists = await CategoryModel.findOne({ name: name });
    if (categoryExists) {
      return res.status(400).json({
        message: "Category already exists",
        success: false,
        error: true,
      });
    }
    const category = new CategoryModel({
      name,
      image,
    });
    await category.save();
    return res.status(200).json({
      message: "Category created successfully",
      success: true,
      error: false,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const getCategoriesController = async (req, res) => {
  try {
    const categories = await CategoryModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Categories fetched successfully",
      success: true,
      error: false,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name, image, categoryId } = req.body;
    if (!name || !image || !categoryId) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }
    const category = await CategoryModel.findOne({ _id: categoryId });
    if (!category) {
      return res.status(400).json({
        message: "Category with this id does not exist",
        success: false,
        error: true,
      });
    }
    category.name = name;
    category.image = image;
    await category.save();
    return res.status(200).json({
      message: "Category updated successfully",
      success: true,
      error: false,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }
    const category = await CategoryModel.findOne({ _id: categoryId });
    if (!category) {
      return res.status(400).json({
        message: "Category with this id does not exist",
        success: false,
        error: true,
      });
    }
    const checkProductInCategory = await ProductModel.find({
      category: {
        $in: [categoryId],
      },
    }).countDocuments();
    const checkSubCategoryInCategory = await SubCategoryModel.find({
      category: {
        $in: [categoryId],
      },
    }).countDocuments();
    if (checkSubCategoryInCategory) {
      return res.status(400).json({
        message: "Category has subcategories, please delete them first",
        success: false,
        error: true,
      });
    }
    if (checkProductInCategory) {
      return res.status(400).json({
        message: "Category has products, please delete them first",
        success: false,
        error: true,
      });
    }
    await CategoryModel.deleteOne({ _id: categoryId });
    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
