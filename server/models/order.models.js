import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    product: [
      {
        name: {
          type: String,
          default: "",
        },
        image: {
          type: Array,
          default: [],
        },
      },
    ],
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 0,
    },
    totalAmt: {
      type: Number,
      default: 0,
    },
    subTotalAmt: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      default: "COD",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
