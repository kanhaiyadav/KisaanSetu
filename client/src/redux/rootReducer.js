import { combineReducers } from "@reduxjs/toolkit";

import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import userSlice from "./user/user.slice";
import formSlice from "./form/form.slice";
import productSlice from "./product/product.slice";
import salesSlice from "./sales/sales.slice";

const rootReducer = combineReducers({
    user: userSlice,
    form: formSlice,
    product: productSlice,
    sales: salesSlice,

});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'product']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;