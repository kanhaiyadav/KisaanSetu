import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDA8bJJIvinfG49Vp0AEEJhHsgnSvSZl7E",
    authDomain: "kisaansetu-a3510.firebaseapp.com",
    projectId: "kisaansetu-a3510",
    storageBucket: "kisaansetu-a3510.firebasestorage.app",
    messagingSenderId: "48749420881",
    appId: "1:48749420881:web:7100b43083fe683fa9b370",
    measurementId: "G-6W46Y5CY1V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
