// src/components/Navbar.jsx

import React, { useState } from "react";
// Import Link dari React Router
import { Link } from "react-router-dom"; 

// === 1. Komponen Ikon User (Sudah Ada) ===
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// === 2. Komponen Ikon Order (BARU DITAMBAHKAN) ===
const IconOrder = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export default function Navbar() {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);

  // Manipulasi DOM untuk menu mobile
  const toggleMobileNav = () => {
    document.documentElement.classList.toggle("nav-open");
  };

  const closeMobileNav = () => {
    document.documentElement.classList.remove("nav-open");
  };

  // Fungsi Toggle Sidebar Akun
  const toggleAccountMenu = () => {
    setAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <>
      {/* --- Header / Navbar Utama --- */}
      <header className="nav-wrap">
        <nav className="navbar container">
          
          {/* Logo Brand */}
          <Link to="/" className="brand" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="brand-title">Maha Gangga Valley</div>
            <div className="brand-sub">Karangasem, Bali</div>
          </Link>

          {/* Daftar Link Navigasi */}
          <ul className="nav-links">
            <li><a href="/#home" onClick={closeMobileNav}>Home</a></li>
            <li><a href="/#gallery" onClick={closeMobileNav}>Gallery</a></li>
            <li><a href="/#map" onClick={closeMobileNav}>Map</a></li>
            <li>
              <Link to="/booking" onClick={closeMobileNav}>Booking</Link>
            </li>
            
            <li className="nav-divider"></li>

            <li className="nav-mobile-actions">
              <Link to="/signin" className="btn btn-ghost" onClick={closeMobileNav}>Sign In</Link>
              <Link to="/signup" className="btn btn-primary" onClick={closeMobileNav}>Sign Up</Link>
            </li>
          </ul>

          {/* Tombol Akun (Desktop) */}
          <div className="nav-actions-desktop">
            <button className="account-btn" onClick={toggleAccountMenu} aria-label="Buka menu akun">
              <IconUser />
            </button>
          </div>

          {/* Tombol Hamburger (Mobile) */}
          <button className="hamburger" aria-label="menu" onClick={toggleMobileNav}>
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>

      {/* --- Menu Akun (Sidebar Kanan) --- */}
      
      {/* Overlay Gelap */}
      <div 
        className={`account-menu-overlay ${isAccountMenuOpen ? "open" : ""}`} 
        onClick={toggleAccountMenu}
      ></div>
      
      {/* Sidebar */}
      <aside className={`account-menu ${isAccountMenuOpen ? "open" : ""}`}>
        <div className="account-menu-header">
          <h3>Akun Saya</h3>
          <button onClick={toggleAccountMenu} aria-label="Tutup menu">&times;</button>
        </div>
        
        <div className="account-menu-body">
          {/* Bagian Login/Register */}
          <div className="guest-menu">
            <p>Selamat datang! Silakan masuk untuk melihat tiket.</p>
            <div className="account-menu-actions">
              <Link to="/signin" className="btn btn-primary" onClick={toggleAccountMenu}>Sign In</Link>
              <Link to="/signup" className="btn btn-ghost" onClick={toggleAccountMenu}>Sign Up</Link>
            </div>
          </div>

          {/* Garis Pemisah */}
          <hr style={{margin: '20px 0', border: '0', borderTop: '1px solid #eee'}} />

          {/* === BAGIAN INI BARU DITAMBAHKAN === */}
          {/* Menu Navigasi Akun */}
          <ul className="account-links" style={{listStyle: 'none', padding: 0}}>
            <li>
              <Link 
                to="/my-orders" 
                onClick={toggleAccountMenu}
                style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  color: '#333', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  padding: '10px 0'
                }}
              >
                <IconOrder /> {/* Ikon Baru */}
                Riwayat Pesanan
              </Link>
            </li>
          </ul>
          {/* =================================== */}

        </div>
      </aside>
    </>
  );
}