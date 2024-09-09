import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import persistStore from "redux-persist/es/persistStore";


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
        }),
});


const persistor = persistStore(store);

export { store, persistor };