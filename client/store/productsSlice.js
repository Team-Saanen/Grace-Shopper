import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("fetchAllProducts", async () => {
    try {
        // double check api routes once routes are update
        const { data } = await axios.get("/api");
        return data;
    } catch (err) {
        console.error("Failed to fetch details of all products:", err);
        throw err;
    }
});

const productsSlice = createSlice({
    name: "products",
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const selectProducts = (state) => {
    return state.products;
}

export default productsSlice.reducer;