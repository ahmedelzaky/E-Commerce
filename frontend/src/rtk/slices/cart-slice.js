import { createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

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
        product.qty += Number(action.payload.qty);
      } else {
        const productClone = { ...action.payload };
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
    refresh: (state, action) => {
      const product = state.find((product) => product.id === action.payload.id);
      product.price = action.payload.price;
      product.title = action.payload.title;
      product.image = action.payload.image;
      product.stockQuantity = action.payload.stockQuantity;
    },
    clearCart: (state) => {
      state = [];
      return state;
    },
  },
});

export const {
  addToCart,
  addToCartWithQty,
  update,
  removeFromCart,
  refresh,
  clearCart,
} = cartSlice.actions;

export const refreshCart = () => async (dispatch, getState) => {
  const cart = getState().cart;
  if (cart.length > 0) {
    try {
      cart.map(async (product) => {
        const response = await axios.get(`/products/${product.id}`);
        const productData = response.data;
        dispatch(
          refresh({
            id: productData.id,
            price: productData.price,
            title: productData.title,
            image: productData.image,
            stockQuantity: productData.stockQuantity,
          })
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export default cartSlice.reducer;
