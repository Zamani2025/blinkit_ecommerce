import ProductModel from "../models/products.models.js";

export const getProductController = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.body;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const query = search
      ? {
          $or: [
            { name: { $regex: `.*${search}.*`, $options: "i" } },
            { description: { $regex: `.*${search}.*`, $options: "i" } },
          ],
        }
      : {};

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
      ProductModel.countDocuments(query),
    ]);

    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      error: false,
      totalCount,
      totalNoPage: Math.ceil(totalCount / limit),
      data,
    });
  } catch (error) {
    console.error("Error in getProductController:", error);
    return res.status(500).json({
      message: error.message || "An unexpected error occurred",
      success: false,
      error: true,
    });
  }
};

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      unit,
      image,
      discount,
      more_details,
      subCategory,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !subCategory ||
      !image
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const productExists = await ProductModel.findOne({ name: name });
    if (productExists) {
      return res.status(400).json({
        message: "Product already exists",
        success: false,
        error: true,
      });
    }

    const product = new ProductModel({
      name,
      description,
      price,
      category,
      stock,
      unit,
      discount,
      more_details,
      subCategory,
      image,
    });
    await product.save();
    return res.status(200).json({
      message: "Product created successfully",
      success: true,
      error: false,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({
        message: "Product id is required",
        success: false,
        error: true,
      });
    }
    const {
      name,
      description,
      price,
      category,
      stock,
      image,
      unit,
      discount,
      more_details,
      subCategory,
    } = req.body;

    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      return res.status(400).json({
        message: "Product with this id does not exist",
        success: false,
        error: true,
      });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;
    product.unit = unit;
    product.discount = discount;
    product.more_details = more_details;
    product.subCategory = subCategory;
    product.image = image;
    await product.save();
    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
      error: false,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({
        message: "Product id is required",
        success: false,
        error: true,
      });
    }
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      return res.status(400).json({
        message: "Product with this id does not exist",
        success: false,
        error: true,
      });
    }
    await product.remove();
    return res.status(200).json({
      message: "Product deleted successfully",
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
