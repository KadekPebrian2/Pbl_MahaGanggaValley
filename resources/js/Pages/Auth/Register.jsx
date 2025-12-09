import React, { useEffect } from "react";
import { Link, useForm, Head } from "@inertiajs/react";
// Pastikan jalur CSS ini benar. Sesuaikan jika folder assets kamu berbeda.
// Tanda '@' mengarah ke folder 'resources/js'
import "@/assets/styles/Auth.css"; 

// === Komponen Ikon (Sama seperti punya kamu) ===
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>;
const IconMail = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-10 7L2 7"></path></svg>;
const IconLock = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

export default function Register() {
  // 1. Setup Form Data (Biar nyambung ke Database Laravel)
  // Laravel butuh: Name, Email, Password, dan Password Confirmation
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  // 2. Fungsi Submit ke Laravel
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ini akan mengirim data ke jalur '/register' milik Laravel
    post(route("register")); 
  };

  return (
    <div className="auth-full-screen-wrapper">
      <Head title="Sign Up" />
      <div className="auth-background-image"></div>
      
      {/* Tombol Kembali (Menggunakan Link Inertia) */}
      <Link href="/" className="auth-back-btn" aria-label="Kembali">
        <IconArrowLeft />
      </Link>

      <div className="auth-center-form-container">
        <div className="auth-title-block">
          <span className="title-main">Sign Up</span>
          <span className="title-sub">to Maha Gangga Valley</span>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* === Input Nama (WAJIB ADA untuk Laravel) === */}
          {/* Saya tambahkan ini agar sesuai standar database Laravel, desainnya sama persis */}
          <div className="form-group-centered">
            <input 
                type="text" 
                id="name" 
                placeholder="Full Name" 
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required 
            />
            <span className="input-icon-centered"><IconUser /></span>
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
          </div>

          {/* Input Email */}
          <div className="form-group-centered">
            <input 
                type="email" 
                id="email" 
                placeholder="Email" 
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required 
            />
            <span className="input-icon-centered"><IconMail /></span>
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>
          
          {/* Input Password */}
          <div className="form-group-centered">
            <input 
                type="password" 
                id="password" 
                placeholder="Password" 
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                required 
            />
            <span className="input-icon-centered"><IconLock /></span>
            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
          </div>

          {/* === Input Konfirmasi Password (WAJIB ADA untuk Laravel) === */}
          <div className="form-group-centered">
            <input 
                type="password" 
                id="password_confirmation" 
                placeholder="Confirm Password" 
                value={data.password_confirmation}
                onChange={(e) => setData("password_confirmation", e.target.value)}
                required 
            />
            <span className="input-icon-centered"><IconLock /></span>
            {errors.password_confirmation && <div className="text-red-500 text-xs mt-1">{errors.password_confirmation}</div>}
          </div>

          {/* Tombol Submit */}
          <button type="submit" className="auth-submit-button-centered" disabled={processing}>
            {processing ? "CREATING..." : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* Link Pindah ke Login */}
        <p className="auth-switch-link-bottom">
          Already have an account? <Link href={route('login')}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}