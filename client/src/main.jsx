// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./i18n.js";
import React from "react";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

// In voice call, set mode to "rtc"
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <React.Suspense fallback="loading...">
          <AgoraRTCProvider client={client}>
            <App />
          </AgoraRTCProvider>
        </React.Suspense>
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </StrictMode>,
);
