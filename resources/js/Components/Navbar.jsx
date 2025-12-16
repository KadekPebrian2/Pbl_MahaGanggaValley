import React, { useState } from "react";
// Import Link dan usePage dari Inertia
import { Link, usePage } from "@inertiajs/react"; 

// === Ikon-ikon ===
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconOrder = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconLogout = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;

export default function Navbar() {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  
  // Ambil Data User
  const { auth } = usePage().props; 
  const user = auth?.user; 

  const toggleMobileNav = () => document.documentElement.classList.toggle("nav-open");
  const closeMobileNav = () => document.documentElement.classList.remove("nav-open");
  const toggleAccountMenu = () => setAccountMenuOpen(!isAccountMenuOpen);

  return (
    <>
      <header className="nav-wrap">
        <nav className="navbar container">
          <Link href="/" className="brand" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="brand-title">Maha Gangga Valley</div>
            <div className="brand-sub">Karangasem, Bali</div>
          </Link>

          <ul className="nav-links">
            <li><a href="/#home" onClick={closeMobileNav}>Home</a></li>
            <li><a href="/#gallery" onClick={closeMobileNav}>Gallery</a></li>
            <li><a href="/#map" onClick={closeMobileNav}>Map</a></li>
            <li><Link href="/booking" onClick={closeMobileNav}>Booking</Link></li>
            
            <li className="nav-divider"></li>

            <li className="nav-mobile-actions">
              {!user ? (
                // JIKA BELUM LOGIN
                <>
                  <Link href="/login" className="btn btn-ghost" onClick={closeMobileNav}>Sign In</Link>
                  <Link href="/register" className="btn btn-primary" onClick={closeMobileNav}>Sign Up</Link>
                </>
              ) : (
                // JIKA SUDAH LOGIN
                <Link href="/my-orders" className="btn btn-primary" onClick={closeMobileNav}>
                   Cek Pesanan
                </Link>
              )}
            </li>
          </ul>

          <div className="nav-actions-desktop">
            <button className="account-btn" onClick={toggleAccountMenu} aria-label="Buka menu akun">
              <IconUser />
              {/* Titik hijau tanda online */}
              {user && <span style={{position:'absolute', bottom:'0', right:'0', width:'10px', height:'10px', background:'#27ae60', borderRadius:'50%', border:'2px solid white'}}></span>}
            </button>
          </div>

          <button className="hamburger" aria-label="menu" onClick={toggleMobileNav}>
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>

      {/* Menu Sidebar */}
      <div className={`account-menu-overlay ${isAccountMenuOpen ? "open" : ""}`} onClick={toggleAccountMenu}></div>
      
      <aside className={`account-menu ${isAccountMenuOpen ? "open" : ""}`}>
        <div className="account-menu-header">
          <h3>{user ? `Hi, ${user.name}` : "Akun Saya"}</h3>
          <button onClick={toggleAccountMenu} aria-label="Tutup menu">&times;</button>
        </div>
        
        <div className="account-menu-body">
          {!user ? (
            // === TAMU ===
            <div className="guest-menu">
              <p>Selamat datang! Silakan masuk untuk melihat tiket.</p>
              <div className="account-menu-actions">
                <Link href="/login" className="btn btn-primary" onClick={toggleAccountMenu}>Sign In</Link>
                <Link href="/register" className="btn btn-ghost" onClick={toggleAccountMenu}>Sign Up</Link>
              </div>
            </div>
          ) : (
            // === USER LOGIN ===
            <div className="user-menu">
                <p style={{fontSize: '14px', color:'#666', marginBottom:'20px'}}>
                   Login sebagai: <strong>{user.email}</strong>
                </p>

                <ul className="account-links" style={{listStyle: 'none', padding: 0}}>
                    
                    {/* HANYA ADMIN: Link Manual ke /admin/dashboard */}
                    {user.role === 'admin' && (
                        <li>
                            <Link 
                                href="/admin/dashboard" 
                                onClick={toggleAccountMenu}
                                style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#333', fontWeight: '600', textDecoration: 'none', padding: '10px 0' }}
                            >
                                <IconDashboard />
                                Dashboard Admin
                            </Link>
                        </li>
                    )}

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
                </ul>
                <hr style={{margin: '20px 0', border: '0', borderTop: '1px solid #eee'}} />
                
                {/* TOMBOL LOGOUT: Link Manual ke /logout (Wajib method="post") */}
                <Link 
                    href="/logout" 
                    method="post" 
                    as="button" 
                    className="btn btn-ghost" 
                    style={{width: '100%', textAlign: 'left', color: 'red', display:'flex', alignItems:'center', gap:'10px'}}
                >
                    <IconLogout /> Log Out
                </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}