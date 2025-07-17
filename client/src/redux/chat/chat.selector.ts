import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const selectChatState = (state: RootState) => state.chat;

export const selectChats = createSelector(
    [selectChatState],
    (chat) => {
        console.log("Selecting chats:", chat.chats);
        return chat.chats
    }
);

export const selectSelectedChat = createSelector(
    [selectChatState],
    (chat) => {
        console.log("Selecting selected chat:", chat);
        return chat.selectedChat;
    }
);

export const selectLoading = createSelector(
    [selectChatState],
    (chat) => chat.loading
);

export const selectError = createSelector(
    [selectChatState],
    (chat) => chat.error
);