import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { StoreContextProvider } from "./context/storeContext.jsx";

axios.defaults.withCredentials = true;
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StoreContextProvider>
            <App />
        </StoreContextProvider>
    </React.StrictMode>
);
