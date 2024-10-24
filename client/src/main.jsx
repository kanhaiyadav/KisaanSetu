// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './i18n.js'; 
import React from 'react';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <React.Suspense fallback="loading...">
                    <App />
                </React.Suspense>
                    <ToastContainer />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    // </StrictMode>,
)
