import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { applyMiddleware } from "@reduxjs/toolkit";
//@ts-ignore
import persistStore from "redux-persist/es/persistStore";
import { Middleware } from "@reduxjs/toolkit";




const logoutMiddleware: Middleware = (store) => (next) => (action: any) => {
    if (action.type === "LOGOUT") {
        persistor.purge(); // Automatically clear storage on LOGOUT
    }
    return next(action);
};


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'product/addProduct/fulfilled', 'product/updateProduct/fulfilled'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['register', 'rehydrate', 'meta.arg', 'payload'],
                // Ignore these paths in the state
                ignoredPaths: ['register', 'rehydrate', 'product.formData'],
            },
        }).concat(logoutMiddleware),
});



export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export type RootState = ReturnType<typeof store.getState>;

const persistor = persistStore(store);

export { store, persistor };