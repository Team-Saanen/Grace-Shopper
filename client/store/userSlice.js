import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUser = createAsyncThunk("/fetchSingleUser", async (userId) => {
    try {
        const token = window.localStorage.getItem('authorization');
        const headers = {headers: {'authorization': token}};
        const { data } = await axios.get(`/api/user/${userId}`, headers);
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