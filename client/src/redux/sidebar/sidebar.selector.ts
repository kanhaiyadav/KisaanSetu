import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const selectSidebarState = (state: RootState) => state.sidebar;


export const selectMessageOpen = createSelector(selectSidebarState, (sidebarState) => {
    return sidebarState.messageOpen;
});

export const selectCartOpen = createSelector(selectSidebarState, (sidebarState) => {
    return sidebarState.cartOpen;
});

export const selectNotificationOpen = createSelector(selectSidebarState, (sidebarState) => {
    return sidebarState.notificationOpen;
});

export const selectSidebarExpanded = createSelector(selectSidebarState, (sidebarState) => {
    return sidebarState.expanded;
});