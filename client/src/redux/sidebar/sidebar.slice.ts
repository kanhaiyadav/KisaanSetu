import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
    messageOpen: boolean;
    cartOpen: boolean;
    notificationOpen: boolean;
    expanded: boolean;
}

const initialState: SidebarState = {
    messageOpen: false,
    cartOpen: false,
    notificationOpen: false,
    expanded: false,
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setMessageOpen: (state, action) => {
            console.log("Setting message sidebar state:", action.payload);
            state.messageOpen = action.payload;
        },
        setCartOpen: (state, action) => {
            console.log("Setting cart sidebar state:", action.payload);
            state.cartOpen = action.payload;
        },
        setNotificationOpen: (state, action) => {
            console.log("Setting notification sidebar state:", action.payload);
            state.notificationOpen = action.payload;
        },
        setSidebarExpanded: (state, action) => {
            console.log("Setting sidebar expanded state:", action.payload);
            state.expanded = action.payload;
        },
    },
});
export const { setCartOpen, setSidebarExpanded, setMessageOpen, setNotificationOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
