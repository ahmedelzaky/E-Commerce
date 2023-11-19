import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  initialState: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  name: "cartSlice",
  reducers: {
    addToCart: (state, action) => {
      const product = state.find((product) => product.id === action.payload.id);
      if (product) {
        product.qty++;
      } else {
        const productClone = { ...action.payload, qty: 1 };
        state.push(productClone);
      }
    },
    addToCartWithQty: (state, action) => {
      const product = state.find((product) => product.id === action.payload.id);
      if (product) {
        product.qty = action.payload.qty;
      } else {
        const productClone = { ...action.payload, qty: action.payload.qty };
        state.push(productClone);
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    update: (state, action) => {
      const product = state.find((product) => product.id === action.payload.id);
      product.qty = action.payload.qty;
    },
  },
});

export const { addToCart, addToCartWithQty, update, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
