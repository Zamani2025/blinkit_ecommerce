import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  allSubCategories: [],
};

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: initialValue,
  reducers: {
    setAllSubCategories: (state, action) => {
      state.allSubCategories = [...action.payload];
    },
  },
});

export const { setAllSubCategories } = subCategorySlice.actions;

export default subCategorySlice.reducer;
