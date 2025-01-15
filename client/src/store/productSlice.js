import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  allProducts: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = [...action.payload];
    },
  },
});

export const { setAllProducts } = productSlice.actions;

export default productSlice.reducer;
