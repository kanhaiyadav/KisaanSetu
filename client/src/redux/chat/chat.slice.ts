import { createSlice } from "@reduxjs/toolkit";

interface ExtendedChat extends Chat {
    status: string; // Optional status field to track chat status
}

const initialState = {
    chats: Array<Chat>(),
    loading: false,
    error: null,
    selectedChat: null as ExtendedChat | null,
    unreadChats: Array<String>()
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload.chats;
            action.payload.chats.forEach((chat: any) => {
                if (chat.unreadCount > 0 && chat.lastMessage.sender !== action.payload.currentUserId) {
                    if (!state.unreadChats.includes(chat._id)) {
                        state.unreadChats.push(chat._id);
                    }
                }
            });
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
        resetChatUnreadCount: (state, action) => {
            const chatIndex = state.chats.findIndex((chat:any) => chat._id === action.payload);
            if (chatIndex !== -1) {
                state.chats[chatIndex].unreadCount = 0; // Reset unread count for the selected chat
            }
        },
        increamentChatUnreadCount: (state, action) => {
            const chatIndex = state.chats.findIndex((chat:any) => chat._id === action.payload);
            if (chatIndex !== -1) {
                state.chats[chatIndex].unreadCount = (state.chats[chatIndex].unreadCount || 0) + 1;
            }
        },
        updateChatLastMessage: (state, action) => {
            const { chat, sender, content, timestamp } = action.payload;
            const chatIndex = state.chats.findIndex((chatObj:any) => chatObj._id === chat);
            if (chatIndex !== -1) {
                state.chats[chatIndex].lastMessage = {
                    sender,
                    content,
                    timestamp: timestamp || new Date().toISOString()
                };
            }
        },
        updateUnreadChats: (state, action) => {
            const chatId = action.payload;
            if (!state.unreadChats.includes(chatId)) {
                state.unreadChats.push(chatId);
            }
        },
        removeUnreadChat: (state, action) => {
            const chatId = action.payload;
            state.unreadChats = state.unreadChats.filter(id => id !== chatId);
        }
    },
});

export const { setChats, setOneChat, setLoading, setError, setSelectedChat, clearSelectedChat, resetChatUnreadCount, increamentChatUnreadCount, updateChatLastMessage, updateUnreadChats, removeUnreadChat } = chatSlice.actions;

export default chatSlice.reducer;