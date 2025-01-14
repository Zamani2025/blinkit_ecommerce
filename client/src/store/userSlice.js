import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  mobile: "",
  role: "",
  avatar: "",
  verify_email: false,
  shopping_cart: [],
  address: [],
  orderHistory: [],
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
      state.orderHistory = action.payload.ordersHistory;
      state.refresh_token = action.payload.refresh_token;
      state.avatar = action.payload.avatar;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload.avatar;
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
      state.avatar = "";
    },
    updateUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
    },
  },
});

export const { getUserDetails, logout, setAvatar, updateUserDetails } =
  userSlice.actions;

export default userSlice.reducer;
