import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk(
    "user/signUp",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                return result;
            }
            return rejectWithValue(result);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signIn = createAsyncThunk(
    "user/signIn",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                return result;
            }
            return rejectWithValue(result);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    token: null,
    isfarmer: true,
};
    
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers:(builder) => {
        builder.addCase(signUp.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        }),
        builder.addCase(signUp.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }),
        builder.addCase(signIn.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.currentUser = action.payload.data.user;
            state.token = action.payload.data.token;
            state.isfarmer = action.payload.data.isfarmer;
            state.loading = false;
        }),
        builder.addCase(signIn.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },

});

export default userSlice.reducer;