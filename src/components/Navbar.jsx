// src/components/Navbar.jsx

import React, { useState } from "react";
// PENTING: Import 'Link' dari React Router.
// 'Link' inilah yang membuat perpindahan halaman (seperti ke /signin)
// terjadi TANPA me-refresh seluruh halaman.
import { Link } from "react-router-dom"; //

// === Komponen Ikon (SVG Inline) ===
// Ikon User didefinisikan sebagai komponen React
// yang isinya adalah kode SVG (Scalable Vector Graphics).
// Ini adalah teknik modern untuk menampilkan ikon tanpa file gambar.
const IconUser = () => ( //
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default function Navbar() {
  // === STATE ===
  // State React untuk melacak status menu akun (terbuka/tertutup).
  // 'useState' memberi kita variabel (isAccountMenuOpen) & fungsi untuk mengubahnya (setAccountMenuOpen).
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false); //

  // === FUNGSI (PENGONTROL MENU) ===

  // Fungsi untuk Buka/Tutup menu mobile (hamburger)
  // PENTING: Logika ini tidak menggunakan state React, tapi memanipulasi DOM langsung.
  // Ini menambahkan/menghapus class 'nav-open' di elemen <html>.
  // File App.css Anda akan merespon class 'nav-open' ini untuk menampilkan/menyembunyikan menu.
  const toggleMobileNav = () => { //
    document.documentElement.classList.toggle("nav-open");
  };

  // Fungsi untuk *selalu* MENUTUP menu mobile.
  // Ini dipanggil saat kita mengklik salah satu link di dalam menu mobile.
  const closeMobileNav = () => { //
    document.documentElement.classList.remove("nav-open");
  };

  // Fungsi untuk Buka/Tutup menu akun (sidebar kanan)
  const toggleAccountMenu = () => { //
    // 1. Sama seperti toggleMobileNav, ini memanipulasi class di <html>
    //    CSS di App.css akan merespon class 'account-menu-open'
    document.documentElement.classList.toggle("account-menu-open");
    // 2. Ini juga mengupdate state React (meski state-nya belum banyak dipakai)
    setAccountMenuOpen(!isAccountMenuOpen); //
  };

  return (
    // === TAMPILAN JSX ===
    
    // Kita pakai <> (React Fragment) karena kita ingin mengembalikan
    // dua elemen sekaligus: <header> dan <aside> (menu akun),
    // tanpa perlu membungkusnya dengan <div> tambahan.
    <>
      {/* --- 1. Header / Navbar Utama --- */}
      <header className="nav-wrap">
        <nav className="navbar container">
          
          {/* Logo Brand:
            Menggunakan <Link to="/">. Ini adalah cara React Router
            untuk pindah ke Halaman Utama ('/') tanpa refresh.
          */}
          <Link to="/" className="brand" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="brand-title">Maha Gangga Valley</div>
            <div className="brand-sub">Karangasem, Bali</div>
          </Link>

          {/* Daftar Link Navigasi (Desktop & Mobile) */}
          <ul className="nav-links">
            {/*
              PERHATIKAN PERBEDAAN INI:
              Link-link ini menggunakan <a href="/#home"> (Anchor Link).
              Ini BUKAN pindah halaman, tapi untuk SCROLL ke elemen
              dengan 'id="home"' DI HALAMAN YANG SAMA (Homepage).
            */}
            <li><a href="/#home" onClick={closeMobileNav}>Home</a></li> {/* */}
            <li><a href="/#gallery" onClick={closeMobileNav}>Gallery</a></li> {/* */}
            <li><a href="/#map" onClick={closeMobileNav}>Map</a></li> {/* */}
            <li><a href="/#comments" onClick={closeMobileNav}>Comments</a></li> {/* */}
            
            {/* Garis pemisah (hanya tampil di mobile) */}
            <li className="nav-divider"></li>

            {/* Tombol Sign In/Up (hanya tampil di menu mobile) */}
            <li className="nav-mobile-actions">
              {/*
                Link-link ini menggunakan <Link to="/signin"> (React Router Link).
                Ini untuk PINDAH KE HALAMAN BARU ('/signin' atau '/signup').
                'onClick={closeMobileNav}' penting agar menu mobile tertutup
                setelah link diklik.
              */}
              <Link to="/signin" className="btn btn-ghost" onClick={closeMobileNav}>Sign In</Link> {/* */}
              <Link to="/signup" className="btn btn-primary" onClick={closeMobileNav}>Sign Up</Link> {/* */}
            </li>
          </ul>

          {/* Tombol Akun (Hanya tampil di Desktop) */}
          <div className="nav-actions-desktop">
            <button className="account-btn" onClick={toggleAccountMenu} aria-label="Buka menu akun">
              <IconUser />
            </button>
          </div>

          {/* Tombol "Hamburger" (Hanya tampil di Mobile) */}
          <button className="hamburger" aria-label="menu" onClick={toggleMobileNav}> {/* */}
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>

      {/* --- 2. Menu Akun (Sidebar Kanan) --- */}
      
      {/* Overlay: Latar belakang gelap di belakang sidebar.
         Jika diklik, akan menutup menu (memanggil 'toggleAccountMenu').
      */}
      <div className="account-menu-overlay" onClick={toggleAccountMenu}></div> {/* */}
      
      {/* <aside> adalah tag HTML yang pas untuk sidebar */}
      <aside className="account-menu">
        <div className="account-menu-header">
          <h3>Akun Saya</h3>
          <button onClick={toggleAccountMenu} aria-label="Tutup menu">&times;</button>
        </div>
        <div className="account-menu-body">
          <p>Selamat datang! Silakan masuk atau daftar untuk melanjutkan.</p>
          <div className="account-menu-actions">
            {/* Link Sign In/Up di dalam sidebar */}
            <Link to="/signin" className="btn btn-primary" onClick={toggleAccountMenu}>Sign In</Link> {/* */}
            <Link to="/signup" className="btn btn-ghost" onClick={toggleAccountMenu}>Sign Up</Link> {/* */}
          </div>
        </div>
      </aside>
    </>
  );
}