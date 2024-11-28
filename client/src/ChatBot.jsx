import React, { useEffect } from "react";

const ChatbotScripts = () => {
    useEffect(() => {
        // Add the first chatbot script
        const injectScript = document.createElement("script");
        injectScript.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
        injectScript.async = true;
        document.body.appendChild(injectScript);

        // Add the second chatbot script
        const configScript = document.createElement("script");
        configScript.src = "https://mediafiles.botpress.cloud/ef59ada8-3cd1-4909-a11e-a060bbfdf739/webchat/config.js";
        configScript.async = true;
        document.body.appendChild(configScript);

        // Cleanup scripts and chatbot DOM element on unmount
        return () => {
            // Remove chatbot instance from DOM
            const chatbotContainer = document.getElementById("bp-web-widget");
            if (chatbotContainer) {
                chatbotContainer.remove(); // Remove the chatbot container
            }

            // Cleanup script tags
            document.body.removeChild(injectScript);
            document.body.removeChild(configScript);
        };
    }, []);

    return null;
};

export default ChatbotScripts;
