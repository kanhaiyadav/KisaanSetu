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

const rootReducer = combineReducers({
    user: userSlice,
    form: formSlice,
    product: productSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

// const rootReducer = (state, action) => {
//     if (action.type === 'LOGOUT') {
//         state = undefined;  // Reset the state to initial state
//     }
//     return appReducer(state, action);
// };


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'product']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;