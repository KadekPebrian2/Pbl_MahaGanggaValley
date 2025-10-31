// src/components/Navbar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom"; // <-- PENTING: Import Link

// ... (Komponen IconUser Anda tetap sama)
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default function Navbar() {
  // ... (semua state dan fungsi toggle Anda tetap sama)
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);

  const toggleMobileNav = () => {
    document.documentElement.classList.toggle("nav-open");
  };

  const closeMobileNav = () => {
    document.documentElement.classList.remove("nav-open");
  };

  const toggleAccountMenu = () => {
    document.documentElement.classList.toggle("account-menu-open");
    setAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <>
      <header className="nav-wrap">
        <nav className="navbar container">
          {/* Brand logo mengarah ke halaman utama */}
          <Link to="/" className="brand" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="brand-text">
              <div className="brand-title">Maha Gangga Valley</div>
              <div className="brand-sub">Karangasem</div>
            </div>
          </Link>

          <ul className="nav-links">
            <li><a href="/#home" onClick={closeMobileNav}>Home</a></li>
            <li><a href="/#gallery" onClick={closeMobileNav}>Gallery</a></li>
            <li><a href="/#map" onClick={closeMobileNav}>Map</a></li>
            <li><a href="/#comments" onClick={closeMobileNav}>Comments</a></li>
            <li className="nav-divider"></li>
            <li className="nav-mobile-actions">
              {/* === PERUBAHAN DI SINI === */}
              <Link to="/signin" className="btn btn-ghost" onClick={closeMobileNav}>Sign In</Link>
              <Link to="/signup" className="btn btn-primary" onClick={closeMobileNav}>Sign Up</Link>
            </li>
          </ul>

          <div className="nav-actions-desktop">
            <button className="account-btn" onClick={toggleAccountMenu} aria-label="Buka menu akun">
              <IconUser />
            </button>
          </div>

          <button className="hamburger" aria-label="menu" onClick={toggleMobileNav}>
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>

      <div className="account-menu-overlay" onClick={toggleAccountMenu}></div>
      <aside className="account-menu">
        <div className="account-menu-header">
          <h3>Akun Saya</h3>
          <button onClick={toggleAccountMenu} aria-label="Tutup menu">&times;</button>
        </div>
        <div className="account-menu-body">
          <p>Selamat datang! Silakan masuk atau daftar untuk melanjutkan.</p>
          <div className="account-menu-actions">
            {/* === PERUBAHAN DI SINI === */}
            <Link to="/signin" className="btn btn-primary" onClick={toggleAccountMenu}>Sign In</Link>
            <Link to="/signup" className="btn btn-ghost" onClick={toggleAccountMenu}>Sign Up</Link>
          </div>
        </div>
      </aside>
    </>
  );
}