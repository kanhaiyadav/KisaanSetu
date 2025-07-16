import { combineReducers } from "@reduxjs/toolkit";

//@ts-ignore
import persistReducer from "redux-persist/es/persistReducer";
//@ts-ignore
import storage from "redux-persist/lib/storage";
import userSlice from "./user/user.slice";
import formSlice from "./form/form.slice";
import productSlice from "./product/product.slice";
import sidebarSlice from "./sidebar/sidebar.slice";

const appReducer = combineReducers({
    user: userSlice,
    form: formSlice,
    product: productSlice,
    sidebar: sidebarSlice,
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