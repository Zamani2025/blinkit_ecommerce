import SubCategoryModel from "../models/subCategory.models.js";
import ProductModel from "../models/products.models.js";

export const createSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;
    if (!name || !image || !category) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const subCategoryExists = await SubCategoryModel.findOne({ name: name });
    if (subCategoryExists) {
      return res.status(400).json({
        message: "SubCategory already exists",
        success: false,
        error: true,
      });
    }

    const subCategory = new SubCategoryModel({
      name,
      image,
      category,
    });
    await subCategory.save();
    return res.status(200).json({
      message: "SubCategory created successfully",
      success: true,
      error: false,
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const getSubCategoriesController = async (req, res) => {
  try {
    const subCategories = await SubCategoryModel.find()
      .sort({ createdAt: -1 })
      .populate("category");
    return res.status(200).json({
      message: "SubCategories fetched successfully",
      success: true,
      error: false,
      data: subCategories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const updateSubCategoryController = async (req, res) => {
  try {
    const {subCategoryId} = req.body;
    if (!subCategoryId) {
      return res.status(400).json({
        message: "SubCategory id is required",
        success: false,
        error: true,
      });
    }
    const { name, image, category } = req.body;

    const subCategory = await SubCategoryModel.findOne({ _id: subCategoryId });
    if (!subCategory) {
      return res.status(400).json({
        message: "SubCategory with this id does not exist",
        success: false,
        error: true,
      });
    }

    subCategory.name = name;
    subCategory.image = image;
    subCategory.category = category;
    await subCategory.save();
    return res.status(200).json({
      message: "SubCategory updated successfully",
      success: true,
      error: false,
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const deleteSubCategoryController = async (req, res) => {
  try {
    const { subCategoryId } = req.body;
    if (!subCategoryId) {
      return res.status(400).json({
        message: "SubCategory id is required",
        success: false,
        error: true,
      });
    }
    const subCategory = await SubCategoryModel.findOne({ _id: subCategoryId });

    const checkProductInSubCategory = await ProductModel.find({
      subCategory: {
        $in: [subCategoryId],
      },
    }).countDocuments();
    if (checkProductInSubCategory) {
      return res.status(400).json({
        message: " SubCategory is associated with products",
        success: false,
        error: true,
      });
    }
    if (!subCategory) {
      return res.status(400).json({
        message: "SubCategory with this id does not exist",
        success: false,
        error: true,
      });
    }
    await SubCategoryModel.findByIdAndDelete(subCategoryId);
    return res.status(200).json({
      message: "SubCategory deleted successfully",
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
