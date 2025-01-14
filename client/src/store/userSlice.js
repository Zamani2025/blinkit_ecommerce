import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  mobile: "",
  role: "",
  verify_email: false,
  shopping_cart: [],
  address: [],
  ordersHistory: [],
  refresh_token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserDetails: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.role = action.payload.role;
      state.verify_email = action.payload.verify_email;
      state.shopping_cart = action.payload.shopping_cart;
      state.address = action.payload.address;
      state.ordersHistory = action.payload.ordersHistory;
      state.refresh_token = action.payload.refresh_token;
    },
    logout: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.mobile = "";
      state.role = "";
      state.verify_email = false;
      state.shopping_cart = [];
      state.address = [];
      state.ordersHistory = [];
      state.refresh_token = "";
    },
  },
});

export const { getUserDetails, logout } = userSlice.actions;

export default userSlice.reducer;
