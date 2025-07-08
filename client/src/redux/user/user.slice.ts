import { createSlice } from "@reduxjs/toolkit";

interface UserState { 
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
}

const initialState:UserState = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => { 
            console.log("Setting user state:", action.payload);
            state = action.payload;
        }
    },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
