import { createSelector } from "@reduxjs/toolkit";

export const selectForm = (state) => state.form;

export const selectSignup = createSelector(
    selectForm,
    (form) => form.signup
);