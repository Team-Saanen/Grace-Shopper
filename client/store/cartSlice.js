import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk("cart/fetchAll", async (tempID) => {
    console.log(`/api/cart?userId=${tempID}`)
    const { data } = await axios.get(`/api/cart?userId=${tempID}`);
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

export const setUserId = createAsyncThunk("cart/setUserId", async (tempID) => {
    try {
        return tempID;
    } catch (err) {
        console.error("Failed to set user ID", err)
        throw err;
    };
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        userId: null,
        productIds: [],
    },
    extraReducers: (builder) => {
        // may need more in the fetch async
        builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
            action.payload = state.cart;
            console.log(action.payload, "action payload not working")
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
        builder.addCase(setUserId.fulfilled, (state, action) => {
            action.payload = state.userId;
        })
    }
});

export const selectCart = (state) => {
    return state.cart.productIds;
};

export const selectUserId = (state) => {
    return state.cart.userId;
};

export default cartSlice.reducer;
