import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    _id?: string;
    type?: "farmer" | "consumer" | "admin";
    avatar?: string;
    name?: string;
    email?: string;
    phone?: string;
}

const initialState: UserState = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload; // ✅ Return the new state
        },
        resetUser: () => initialState, // Reset to initial state
    },
});
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
