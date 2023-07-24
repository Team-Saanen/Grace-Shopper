import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleProduct = createAsyncThunk(
  "/fetchSingleProduct",
  async (productId) => {
    try {
      // double check api routes once routes are update
      const response = await axios.get(`/api/products/${productId}`);
      const product = response.data;
      return product;
    } catch (err) {
      console.error("Failed to fetch single product:", err);
      throw err;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

export const selectProduct = (state) => {
  return state.product;
};

export default productSlice.reducer;
