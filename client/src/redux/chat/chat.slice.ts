import { createSlice } from "@reduxjs/toolkit";

interface ExtendedChat extends Chat {
    status: string; // Optional status field to track chat status
}

const initialState = {
    chats: Array<Chat>(),
    loading: false,
    error: null,
    selectedChat: null as ExtendedChat | null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setOneChat: (state, action) => {
            const chatIndex = state.chats.findIndex((chat:any) => chat._id === action.payload._id);
            if (chatIndex !== -1) {
                state.chats[chatIndex] = action.payload;
            } else {
                state.chats.push(action.payload);
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        clearSelectedChat: (state) => {
            state.selectedChat = null;
        },
    },
});

export const { setChats, setOneChat, setLoading, setError, setSelectedChat, clearSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;