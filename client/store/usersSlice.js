import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

        // add admin authorization 
export const fetchAllUsers = createAsyncThunk("/fetchAllUsers", async () => {
    try {
        // double check api routes once routes are update
        const { data } = await axios.get("/api");
        return data;
    } catch (err) {
        console.error("Failed to fetch details of all users:", err);
        throw err;
    }
});
        // use this for sign-up form component
        // double check updated route and maybe add authentication
export const addUser = createAsyncThunk("/addUser", async ({ firstName, lastName, email, userName, password }) => {
    try {
        // double check api routes once routes are update
        const { data } = await axios.post('/api/signup', {
            firstName, lastName, email, userName, password
        });
        return data;
    } catch (err) {
        console.error("Failed to create new user:", err);
        throw err;
    }
});
        
const usersSlice = createSlice({
    name: "users",
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.push(action.payload);
        });
    }
});

export const selectUsers = (state) => {
    return state.users;
}

export default usersSlice.reducer;