import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product, Sale } from "../../types/redux";
import { stat } from "fs";

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (farmerId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${farmerId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
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

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (
        data: {
            formData: FormData;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/products`,
                {
                    method: "POST",
                    body: data.formData,
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

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (
        data: {
            _id: string;
        },
        { rejectWithValue }
    ) => {
        console.log(data);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${data._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
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

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (
        data: {
            formData: FormData;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/products`,
                {
                    method: "PUT",
                    body: data.formData,
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

export const createSale = createAsyncThunk(
    "product/createSale",
    async (sale: Sale, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/createSale`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(sale),
                }
            );
            const data = await response.json();
            if (response.ok) {
                console.log(response.ok);
                return data;
            }
            return rejectWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getSales = createAsyncThunk(
    "product/getSales",
    async (farmerId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/getSales/${farmerId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
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

export const searchProduct = createAsyncThunk(
    "product/searchProduct",
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/search/${name}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
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

export const outOfStock = createAsyncThunk(
    "product/outOfStock",
    async (productId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/outOfStock/${productId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
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

const initialState: {
    products: Product[];
    searchedProducts: Product[];
    sales: Sale[];
    status: string;
    error: any;
} = {
    products: [],
    searchedProducts: [],
    sales: [],
    status: "idle",
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        addSale: (state, action: PayloadAction<Sale>) => {
            state.sales.push(action.payload);
        },
        localOutofStock: (state, action: PayloadAction<string>) => {
            const newProducts = state.products.map((product) => {
                if (product._id === action.payload) {
                    product.stocks = 0;
                }
                return product;
            });
            console.log(newProducts);
            state.products = newProducts;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.products = action.payload.data.products;
            console.log(action.payload.data.products);
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });

        builder.addCase(addProduct.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.products.push(action.payload.data.product);
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });

        builder.addCase(deleteProduct.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.products = state.products.filter(
                (product) => product._id !== action.payload.data._id
            );
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
        builder.addCase(updateProduct.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            console.log(action.payload.data);
            state.products = state.products.map((product) =>
                product._id === action.payload.data.product._id
                    ? action.payload.data.product
                    : product
            );
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
        builder.addCase(createSale.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(createSale.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.sales.push(action.payload.data.sale);
            state.products = state.products.map((product) => {
                if (product._id === action.payload.data.sale.product) {
                    product.stocks -= action.payload.data.sale.quantity;
                }
                return product;
            });
        });
        builder.addCase(createSale.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
        builder.addCase(searchProduct.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(searchProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.searchedProducts = action.payload.data.products;
        });
        builder.addCase(searchProduct.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
        builder.addCase(getSales.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getSales.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.sales = action.payload.data.sales;
        });
        builder.addCase(getSales.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
});

export const { clearError, addSale, localOutofStock } = productSlice.actions;
export default productSlice.reducer;
