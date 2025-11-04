// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
// 1. Meng-import BrowserRouter dari library React Router
import { BrowserRouter } from "react-router-dom"; //
import App from "./App";
import "/src/assets/styles/App.css";

// 2. Mencari elemen <div id="root"> di file index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  // 3. Menjalankan mode "ketat" dari React untuk deteksi error
  <React.StrictMode>
    {/*
      4. MEMBUNGKUS <App /> dengan <BrowserRouter>
      Ini adalah langkah paling penting.
      Ini seperti "menghidupkan sistem GPS" untuk seluruh aplikasi Anda.
      Tanpa <BrowserRouter> di sini, semua <Routes>, <Route>, dan <Link>
      di dalam <App /> dan komponen anaknya TIDAK AKAN BERFUNGSI.
    */}
    <BrowserRouter> {/* */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);