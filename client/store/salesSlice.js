import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateSales = createAsyncThunk("/updateSales", async ({ items, quantity, date }) => {
    try {
        // double check api routes once routes are update
        const { data } = await axios.post(`/api/sales`, {
            items, quantity, date
        });
        return data;
    } catch (err) {
        console.error("Failed to update sales history:", err);
        throw err;
    }
});

const salesSlice = createSlice({
    name: "sales",
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(updateSales.fulfilled, (state, action) => {
            state.push(action.payload);
        });
    }
});

export const selectSales = (state) => {
    return state.sales;
}

export default salesSlice.reducer;