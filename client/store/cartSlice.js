import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity }) => {
    try {
        // double check api routes once routes are update
        const { data } = await axios.put(`/api/cart/${productId}`, { quantity }
        // , {
        //     headers: {
        //       Authorization: `Bearer ${token}` // Include the user's authentication token in the request
        //     }
        // }
        );
        return data;
    } catch (err) {
        console.error("Failed to update cart with items:", err);
        throw err;
    }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId) => {
    try {
        // double check api routes once routes are update
        const { data } = await axios.delete(`/api/cart/${productId}`);
        return data;
    } catch (err) {
        console.error("Failed to delete item from cart:", err);
        throw err;
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        productIds: [],
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            const { productId } = action.payload;
            if (!state.productIds.includes(productId)) {
              state.productIds.push(productId);
            }
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            const productIdToRemove = action.payload.productId;
            state.productIds = state.productIds.filter(id => id !== productIdToRemove);
        });
    }
});

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;