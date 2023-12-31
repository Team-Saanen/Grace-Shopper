import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { head } from "superagent";

export const fetchCartAsync = createAsyncThunk('cart/fetchAll', async (tempID) => {
    try {
        //
        const token = window.localStorage.getItem('authorization');
        const headers = {headers: {'authorization': token}};
        const response = await axios.get(`/api/cart`, headers);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch cart data.");
      }
  });

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity }) => {
    try {
        // double check api routes once routes are update
        const response = await axios.put(`/api/cart/${productId}`, { quantity }
        // , {
        //     headers: {
        //       Authorization: `Bearer ${token}` // Include the user's authentication token in the request
        //     }
        // }
        );
        return response.data;
    } catch (err) {
        console.error("Failed to update cart with items:", err);
        throw err;
    }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId) => {
    try {
        // double check api routes once routes are update
        const response = await axios.delete(`/api/cart/${productId}`);
        return response.data;
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
        builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
            state.productIds = action.payload;
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
            state.userId = action.payload;
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
