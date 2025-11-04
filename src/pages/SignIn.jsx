// src/pages/SignIn.jsx

import React from "react";
// Import 'Link' untuk navigasi antar halaman (tanpa refresh)
// Import 'useNavigate' untuk navigasi yang dipicu oleh fungsi (seperti tombol 'Back')
import { Link, useNavigate } from "react-router-dom"; //
// Import file CSS khusus untuk halaman ini
import "../assets/styles/Auth.css"; //

// === Komponen Ikon (SVG Inline) ===
// Didefinisikan di sini agar file tetap mandiri (tidak perlu import file .svg)
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>; //
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>; //
const IconLock = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>; //

export default function SignIn() {
  // 1. Menggunakan 'useNavigate' Hook
  // 'navigate' adalah fungsi yang bisa kita panggil untuk "memaksa" pindah halaman.
  // Ini disebut navigasi programmatik (programmatic navigation).
  const navigate = useNavigate(); //

  // 2. Fungsi yang dipanggil saat form di-submit
  const handleSubmit = (e) => {
    // Mencegah halaman me-refresh (perilaku default form HTML)
    e.preventDefault(); //
    // Untuk saat ini, hanya menampilkan log di console
    console.log("Form Sign In dikirim"); //
    // (Di aplikasi nyata, di sini Anda akan memanggil API login)
  };

  return (
    // Pembungkus utama halaman (diatur oleh Auth.css)
    <div className="auth-full-screen-wrapper">
      {/* Gambar latar belakang (diatur oleh Auth.css) */}
      <div className="auth-background-image"></div>
      
      {/* 3. Tombol Kembali
         onClick-nya memanggil fungsi navigate('/')
         untuk kembali ke Halaman Utama ('/').
      */}
      <button className="auth-back-btn" onClick={() => navigate("/")} aria-label="Kembali"> {/* */}
        <IconArrowLeft />
      </button>

      {/* Kartu form "kaca" (glassmorphism) di tengah 
        (diatur oleh Auth.css)
      */}
      <div className="auth-center-form-container">
        {/* Blok Judul */}
        <div className="auth-title-block">
          <span className="title-main">Sign In</span>
          <span className="title-sub">to Maha Gangga Valley</span>
        </div>

        {/* 4. Formulir Login */}
        <form onSubmit={handleSubmit}>
          {/* Grup Input Username */}
          <div className="form-group-centered">
            <input type="text" id="username" placeholder="Username" required />
            <span className="input-icon-centered"><IconUser /></span>
          </div>
          
          {/* Grup Input Password */}
          <div className="form-group-centered">
            <input type="password" id="password" placeholder="Password" required />
            <span className="input-icon-centered"><IconLock /></span>
          </div>

          {/* Tombol Submit */}
          <button type="submit" className="auth-submit-button-centered">
            SIGN IN
          </button>

          {/* Opsi tambahan (Remember Me & Forgot Password) */}
          <div className="auth-options-centered">
            <label className="remember-me-checkbox">
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
            {/* Link ini akan pergi ke halaman /forgot-password */}
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </form>

        {/* 5. Link Pindah Halaman
          Menggunakan <Link> (navigasi deklaratif) untuk pindah ke rute "/signup"
          TANPA me-refresh seluruh halaman.
        */}
        <p className="auth-switch-link-bottom">
          Don't have an account? <Link to="/signup">Sign Up</Link> {/* */}
        </p>
      </div>
    </div>
  );
}