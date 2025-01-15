import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import subCategoryReducer from "./subCategorySlcie";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    product: productReducer,
  },
});
