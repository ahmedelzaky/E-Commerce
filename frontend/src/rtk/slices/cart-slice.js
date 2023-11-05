import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  initialState: [],
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
    removeFromCart: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    update: (state, action) => {
      const product = state.find((product) => product.id === action.payload.id);
      product.qty = action.payload.qty;
    },
  },
  extraReducers: (builder) => {},
});

export const { update, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
