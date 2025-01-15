import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    image: {
      type: Array,
      default: [],
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    unit: {
      type: String,
      default: "",
    },
    
    price: {
      type: Number,
      default: 0,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    more_details: {
      type: Object,
      default: {},
    },
    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: "text", description: "text" });

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
