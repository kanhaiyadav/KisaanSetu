import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/redux";

export const signUp = createAsyncThunk(
    "user/signUp",
    async (data: {
        name: string;
        email: string;
        password: string;
        isfarmer: boolean;
    }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
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
    async (data: {
        email: string;
        password: string;
    }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
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

export const verify = createAsyncThunk(
    "user/verify",
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/verify`,
                {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                }
            );
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

interface InitialState {
    currentUser: User;
    error: unknown;
    loading: boolean;
    token: string;
    isfarmer: boolean;
}

const initialState: InitialState = {
    currentUser: {
        _id: "",
        name: "",
        email: "",

    },
    error: null,
    loading: false,
    token: "",
    isfarmer: true,
};
    
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOut: (state) => {
            state.currentUser = initialState.currentUser;
            state.token = "";
            state.isfarmer = true;
        }
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
        }),
        builder.addCase(verify.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(verify.fulfilled, (state, action) => {
            state.currentUser = action.payload.data.user;
            state.loading = false;
        }),
        builder.addCase(verify.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
    },

});
export const { signOut } = userSlice.actions;
export default userSlice.reducer;