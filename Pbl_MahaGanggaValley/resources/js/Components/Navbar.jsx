// resources/js/Components/Navbar.jsx

import React, { useState } from "react";
// 1. GANTI INI: Pakai Link dan usePage dari Inertia
import { Link, usePage } from "@inertiajs/react"; 

// === 1. Komponen Ikon User ===
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// === 2. Komponen Ikon Order ===
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
  
  // 2. AMBIL DATA USER DARI LARAVEL
  const { auth } = usePage().props; 
  const user = auth.user; // Isinya data user kalau login, atau null kalau belum

  // Manipulasi DOM untuk menu mobile (Tetap dipertahankan sesuai request)
  const toggleMobileNav = () => {
    document.documentElement.classList.toggle("nav-open");
  };

  const closeMobileNav = () => {
    document.documentElement.classList.remove("nav-open");
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <>
      <header className="nav-wrap">
        <nav className="navbar container">
          
          {/* 3. GANTI 'to' JADI 'href' UNTUK SEMUA LINK */}
          <Link href="/" className="brand" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="brand-title">Maha Gangga Valley</div>
            <div className="brand-sub">Karangasem, Bali</div>
          </Link>

          <ul className="nav-links">
            {/* Link Anchor (#) tetap pakai a href biasa agar scroll jalan */}
            <li><a href="/#home" onClick={closeMobileNav}>Home</a></li>
            <li><a href="/#gallery" onClick={closeMobileNav}>Gallery</a></li>
            <li><a href="/#map" onClick={closeMobileNav}>Map</a></li>
            <li>
              <Link href="/booking" onClick={closeMobileNav}>Booking</Link>
            </li>
            
            <li className="nav-divider"></li>

            <li className="nav-mobile-actions">
              {/* Logika: Kalau user login, jangan tampilkan tombol signin/signup di menu mobile */}
              {!user ? (
                <>
                  <Link href="/login" className="btn btn-ghost" onClick={closeMobileNav}>Sign In</Link>
                  <Link href="/register" className="btn btn-primary" onClick={closeMobileNav}>Sign Up</Link>
                </>
              ) : (
                <Link href={route('dashboard')} className="btn btn-primary" onClick={closeMobileNav}>
                   Dashboard
                </Link>
              )}
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

      {/* --- Menu Akun (Sidebar Kanan) --- */}
      
      <div 
        className={`account-menu-overlay ${isAccountMenuOpen ? "open" : ""}`} 
        onClick={toggleAccountMenu}
      ></div>
      
      <aside className={`account-menu ${isAccountMenuOpen ? "open" : ""}`}>
        <div className="account-menu-header">
          {/* Tampilkan Nama User jika login */}
          <h3>{user ? `Hi, ${user.name}` : "Akun Saya"}</h3>
          <button onClick={toggleAccountMenu} aria-label="Tutup menu">&times;</button>
        </div>
        
        <div className="account-menu-body">
          
          {/* LOGIKA SIDEBAR: Cek apakah user sudah login? */}
          {!user ? (
             // === TAMPILAN KALAU BELUM LOGIN (GUEST) ===
            <div className="guest-menu">
              <p>Selamat datang! Silakan masuk untuk melihat tiket.</p>
              <div className="account-menu-actions">
                {/* Gunakan route bawaan Laravel: /login dan /register */}
                <Link href="/login" className="btn btn-primary" onClick={toggleAccountMenu}>Sign In</Link>
                <Link href="/register" className="btn btn-ghost" onClick={toggleAccountMenu}>Sign Up</Link>
              </div>
            </div>
          ) : (
            // === TAMPILAN KALAU SUDAH LOGIN (USER) ===
            <div className="user-menu">
                {/* <p className="text-sm text-gray-500 mb-4">{user.email}</p> */}
                
                <ul className="account-links" style={{listStyle: 'none', padding: 0}}>
                    <li>
                    <Link 
                        href="/my-orders" 
                        onClick={toggleAccountMenu}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#333', fontWeight: '600', textDecoration: 'none', padding: '10px 0' }}
                    >
                        <IconOrder />
                        Riwayat Pesanan
                    </Link>
                    </li>
                    {/* Kamu bisa tambah menu Dashboard disini jika mau */}
                </ul>

                <hr style={{margin: '20px 0', border: '0', borderTop: '1px solid #eee'}} />

                {/* Tombol Logout Wajib method="post" di Laravel */}
                <Link 
                    href={route('logout')} 
                    method="post" 
                    as="button" 
                    className="btn btn-ghost" 
                    style={{width: '100%', textAlign: 'left', color: 'red'}}
                >
                    Log Out
                </Link>
            </div>
          )}

        </div>
      </aside>
    </>
  );
}