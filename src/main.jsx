// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- Import
import App from "./App";
import "/src/assets/styles/App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Bungkus App di sini */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);