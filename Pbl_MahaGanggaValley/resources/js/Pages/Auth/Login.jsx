// resources/js/Pages/Auth/Login.jsx

import React, { useEffect } from "react";
// 1. Import Link, Head, dan useForm dari Inertia
import { Head, Link, useForm } from "@inertiajs/react";

// 2. Import CSS (Gunakan tanda @ untuk mengarah ke folder resources/js)
// Pastikan file Auth.css kamu ada di folder resources/js/assets/styles/
import "../../../css/Auth.css"; 

// === Komponen Ikon (SVG Inline) - Tetap Sama ===
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconLock = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;

export default function Login({ status, canResetPassword }) {
  // 3. Setup Form Helper dari Inertia (Pengganti useState manual)
  // Laravel Breeze butuh 'email', 'password', dan 'remember'
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "", // Default Breeze pakai email, bukan username
    password: "",
    remember: false,
  });

  // Bersihkan password dari form jika user meninggalkan halaman
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  // 4. Fungsi Submit ke Backend Laravel
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim data ke route 'login' milik Laravel
    post(route("login"));
  };

  return (
    // Pembungkus utama halaman (Auth.css)
    <div className="auth-full-screen-wrapper">
      {/* Judul Tab Browser */}
      <Head title="Log in" />

      {/* Gambar latar belakang */}
      <div className="auth-background-image"></div>
      
      {/* Tombol Kembali (Pakai Link Inertia) */}
      <Link href="/" className="auth-back-btn" aria-label="Kembali">
        <IconArrowLeft />
      </Link>

      {/* Kartu form "kaca" */}
      <div className="auth-center-form-container">
        {/* Blok Judul */}
        <div className="auth-title-block">
          <span className="title-main">Sign In</span>
          <span className="title-sub">to Maha Gangga Valley</span>
        </div>

        {/* Tampilkan Pesan Status (misal: sukses reset password) */}
        {status && <div className="mb-4 font-medium text-sm text-green-600 text-center">{status}</div>}

        {/* Formulir Login */}
        <form onSubmit={handleSubmit}>
          
          {/* Input Email (Pengganti Username) */}
          <div className="form-group-centered">
            <input 
                type="email" // Ubah jadi email agar validasi browser jalan
                id="email" 
                placeholder="Email Address" // Ubah placeholder biar user tau
                required 
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                autoComplete="username"
            />
            <span className="input-icon-centered"><IconUser /></span>
          </div>
          {/* Tampilkan Error Email jika ada */}
          {errors.email && <div className="text-red-500 text-xs mt-1 text-center">{errors.email}</div>}
          
          {/* Input Password */}
          <div className="form-group-centered" style={{marginTop: '15px'}}>
            <input 
                type="password" 
                id="password" 
                placeholder="Password" 
                required 
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                autoComplete="current-password"
            />
            <span className="input-icon-centered"><IconLock /></span>
          </div>
          {/* Tampilkan Error Password jika ada */}
          {errors.password && <div className="text-red-500 text-xs mt-1 text-center">{errors.password}</div>}

          {/* Tombol Submit */}
          <button type="submit" className="auth-submit-button-centered" disabled={processing}>
            {processing ? 'LOGGING IN...' : 'SIGN IN'}
          </button>

          {/* Opsi tambahan */}
          <div className="auth-options-centered">
            <label className="remember-me-checkbox">
              <input 
                type="checkbox" 
                checked={data.remember}
                onChange={(e) => setData('remember', e.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            
            {/* Link Lupa Password (arahkan ke route bawaan Laravel) */}
            {canResetPassword && (
                <Link href={route('password.request')}>Forgot Password</Link>
            )}
          </div>
        </form>

        {/* Link ke Register */}
        <p className="auth-switch-link-bottom">
          Don't have an account? <Link href="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}