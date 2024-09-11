import { createSelector } from "@reduxjs/toolkit";

export const selectProduct = (state) => state.product;

export const selectProducts = createSelector(
    [selectProduct],
    (product) => product.products
);