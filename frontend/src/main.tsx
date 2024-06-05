import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { UtilityProvider } from "./UtilityContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UtilityProvider>
            <Toaster />
            <App />
        </UtilityProvider>
    </React.StrictMode>
);
