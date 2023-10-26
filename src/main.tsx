import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import store from "./Redux/store.ts";
import "./index.scss";
import "./styles/global-style.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider>
            <App />
            <ToastContainer />
        </ThemeProvider>
    </Provider>
    // </React.StrictMode>
);
