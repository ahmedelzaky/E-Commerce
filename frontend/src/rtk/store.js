import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/product-slice";
import cartSlice from "./slices/cart-slice";

export default configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
  },
});
