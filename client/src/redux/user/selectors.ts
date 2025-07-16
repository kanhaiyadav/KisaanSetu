import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const selectUser = (state: RootState) => state.user;

export const selectUserInfo = createSelector(selectUser, (user) => user);

export const selectIsFarmer = createSelector(selectUserInfo, (user) => {
    if(!user) return null;
    return user.type === "farmer"
});
export const selectUserAvatar = createSelector(selectUser, (user) => user.avatar?.length !== 0 ? user.avatar : null);