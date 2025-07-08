import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const selectUser = (state: RootState) => state.user;

export const selectUserInfo = createSelector(selectUser, (user) => user);

export const selectIsFarmer = createSelector(selectUser, (user) => user.type === "farmer");