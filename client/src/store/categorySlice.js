import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  allCategories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialValue,
  reducers: {
    setAllCategories: (state, action) => {
      state.allCategories = [...action.payload];
    },
  },
});

export const { setAllCategories } = categorySlice.actions;

export default categorySlice.reducer;
