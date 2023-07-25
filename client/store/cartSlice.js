import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk("cart/fetchAll", async () => {
    const { data } = await axios.get("/api/cart");
    return data;
  });


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
        userId: [],
        productIds: [],
    },
    extraReducers: (builder) => {
        // may need more in the fetch async
        builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
            action.payload = state.userId;
            return action.payload;
          });

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

export const selectCart = (state) => {
    if (state.userId && state.userId.isGuest && !state.user.id) {
        let tempID = localStorage.getItem("tempID");
        if (!tempID) {
            tempID = Math.floor(Math.random() * 1000);
            localStorage.setItem("tempID", tempID);
        }
        state.userId = tempID;
    }
    return state.userId;
};

export default cartSlice.reducer;
