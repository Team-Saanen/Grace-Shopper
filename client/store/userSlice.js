import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

        // use this for log-in form component
export const fetchSingleUser = createAsyncThunk("/fetchSingleUser", async (userId) => {
    try {
        // double check api routes once routes are update
        const { data } = await axios.get(`/api/${userId}`)
        return data;
    } catch (err) {
        console.error("Failed to fetch user:", err);
        throw err;
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const selectUser = (state) => {
    return state.user;
}

export default userSlice.reducer;