import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signup: {
        isfarmer: false,
        name: "",
        email: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
        password: "",
        confirmPassword: "",
    }
}

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setSignup: (state, action) => {
            state.signup = { ...state.signup, ...action.payload };
        }
    }
});

export const { setSignup } = formSlice.actions;
export default formSlice.reducer;