import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editQuantity = createAsyncThunk("cart/editQuantity", async ({ productId, quantity }) => {
    try {
        // double check api routes once routes are update
        const { data } = await axios.put(`/api/cart/${productId}`, { quantity });
        return data;
    } catch (err) {
        console.error("Failed to update quantity of items in cart:", err);
        throw err;
    }
});

const cartItemSlice = createSlice({
    name: "cartItem",
    initialState: {
        quantities: {},
    },
    extraReducers: (builder) => {
        builder.addCase(editQuantity.fulfilled, (state, action) => {
            const { productId, quantity } = action.payload;
            state.quantities[productId] = quantity;
        });
    }
});

export const selectQuantities = (state) => state.cartItem.quantities;

export default cartItemSlice.reducer;