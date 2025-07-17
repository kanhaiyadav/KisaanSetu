import { combineReducers } from "@reduxjs/toolkit";

//@ts-ignore
import persistReducer from "redux-persist/es/persistReducer";
//@ts-ignore
import storage from "redux-persist/lib/storage";
import userSlice from "./user/user.slice";
import productSlice from "./product/product.slice";
import sidebarSlice from "./sidebar/sidebar.slice";
import chatSlice from  "./chat/chat.slice";

const appReducer = combineReducers({
    user: userSlice,
    product: productSlice,
    sidebar: sidebarSlice,
    chat: chatSlice,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState, action: {
    type: string;
    payload: any;
}) => {
    return appReducer(state, action);
};


const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;