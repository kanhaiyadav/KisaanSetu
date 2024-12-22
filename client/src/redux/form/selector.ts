import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const selectForm = (state: RootState) => state.form;

export const selectSignup = createSelector(
    selectForm,
    (form) => form.signup
);