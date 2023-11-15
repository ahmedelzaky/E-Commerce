import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "productSlice/fetchProducts",
  async () => {
    const res = await axios.get(
      "https://ecommerce-backend-9qsc.onrender.com/api/products"
    );
    return res.data;
  }
);

export const productSlice = createSlice({
  name: "productSlice",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;