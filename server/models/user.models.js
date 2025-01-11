import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    mobile: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    is_active: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    shopping_cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productCart",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wishlist",
      },
    ],
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],
    refresh_token: {
      type: String,
      default: "",
    },
    verify_email_token: {
      type: String,
      default: "",
    },
    forgot_password_token: {
      type: String,
      default: "",
    },
    forgot_password_token_expiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
