import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editQuantity = createAsyncThunk("cart/editQuantity", async ({ productId, quantity }) => {
    try {
        const response = await axios.put(`/api/cart/${productId}/change`, { quantity });
        return response.data;
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
        // double check
        builder.addCase(editQuantity.fulfilled, (state, action) => {
            const { productId, quantity } = action.payload;
            const cartItemToUpdate = state.find(item => item.id === productId);
            if (cartItemToUpdate) {
                cartItemToUpdate.quantity = quantity;
            }
        });
    }
});

export const selectQuantities = (state) => state.cartItem.quantities;

export default cartItemSlice.reducer;
