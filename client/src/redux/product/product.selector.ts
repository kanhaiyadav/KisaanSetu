import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const selectProduct = (state: RootState) => state.product;

export const selectProducts = createSelector(
    [selectProduct],
    (product) => {
        if(product.products)
            return product.products
        else
            return []
    }
);

export const selectSearchedProducts = createSelector(
    [selectProduct],
    (product) => product.searchedProducts
);

export const selectSales = createSelector(
    [selectProduct],
    (product) => product.sales
);
