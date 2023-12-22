import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
});
