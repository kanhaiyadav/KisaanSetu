import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // Corrected spelling
import Backend from "i18next-http-backend";
import resources from "./locales/index.js"; // Corrected the path

i18next
    .use(Backend)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        debug: true,
        lng: "en", // Corrected the option key from `lan` to `lng`
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
