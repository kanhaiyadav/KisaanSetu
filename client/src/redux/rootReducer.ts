import { combineReducers } from "@reduxjs/toolkit";

//@ts-ignore
import persistReducer from "redux-persist/es/persistReducer";
//@ts-ignore
import storage from "redux-persist/lib/storage";

//@ts-ignore
import userSlice from "./user/user.slice";
//@ts-ignore
import formSlice from "./form/form.slice";
import productSlice from "./product/product.slice";

const appReducer = combineReducers({
    user: userSlice,
    form: formSlice,
    product: productSlice,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState, action: {
    type: string;
}) => {
    if (action.type === 'LOGOUT') {
        // Reset the state to initial values
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['product']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;