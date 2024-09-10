import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createSale = createAsyncThunk(
    "sales/createSale",
    async (sale) => {
        try {
            const response = await fetch("http://localhost:3000/api/sales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sale),
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            }
        } catch (error) {
            return error;
        }
    }
);

const salesSlice = createSlice({
    name: "sales",
    initialState: {
        // sales: [],
        status: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(createSale.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(createSale.fulfilled, (state) => {
            state.status = "success";
            // state.sales.push(action.payload);
        });
        builder.addCase(createSale.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    }
});

export default salesSlice.reducer;