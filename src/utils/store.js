import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    order: orderSlice,
  },
});

export default store;
