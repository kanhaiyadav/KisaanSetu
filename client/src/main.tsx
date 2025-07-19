// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
//@ts-ignore
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./i18n.js";
import React from "react";
import { AuthProvider } from "./contexts/authContext.js";
import { SocketProvider } from "./contexts/socketContext.js";


createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
                <SocketProvider>
                    <BrowserRouter>
                        <React.Suspense fallback="loading...">
                            <App />
                        </React.Suspense>
                        <ToastContainer />
                    </BrowserRouter>
                </SocketProvider>
            </AuthProvider>
        </PersistGate>
    </Provider>
    // </StrictMode>,
);
