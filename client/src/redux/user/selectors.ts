import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const selectUser = (state: RootState) => state.user;

export const selectUserInfo = createSelector(selectUser, (user) => user.currentUser);

export const selectToken = createSelector(selectUser, (user) => user.token);

export const selectIsFarmer = createSelector(selectUser, (user) => user.isfarmer);