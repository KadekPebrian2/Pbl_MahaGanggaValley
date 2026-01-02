import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom"; 
import { Link, usePage } from "@inertiajs/react"; 

// === IKON ===
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconOrder = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const IconClose = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

export default function Navbar() {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 

  const { auth } = usePage().props; 
  const user = auth?.user; 

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
        document.documentElement.classList.remove("nav-open");
        document.body.classList.remove("nav-open");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const toggleMobileNav = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileNav = () => setMobileMenuOpen(false);
  const toggleAccountMenu = () => setAccountMenuOpen(!isAccountMenuOpen);

  // === KONTEN MENU MOBILE (TIDAK DIUBAH) ===
  const MobileMenuContent = (
    <div className={`mobile-menu-portal ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-backdrop" onClick={closeMobileNav}></div>
        
        <div className="mobile-menu-box">
            <div className="mobile-header">
                <h3>Menu</h3>
                <button onClick={closeMobileNav} className="btn-close-simple"><IconClose /></button>
            </div>

            <div className="mobile-scroll-area">
                {user && (
                    <div className="user-info-card">
                        <div className="avatar-circle">{user.name.charAt(0)}</div>
                        <div>
                            <div style={{fontSize:'14px', fontWeight:'bold'}}>{user.name}</div>
                            <div style={{fontSize:'12px', color:'#666'}}>{user.email}</div>
                        </div>
                    </div>
                )}

                <div className="link-list">
                    <a href="/#home" onClick={closeMobileNav}>Home</a>
                    <a href="/#gallery" onClick={closeMobileNav}>Gallery</a>
                    <a href="/#map" onClick={closeMobileNav}>Map</a>
                    <Link href="/booking" onClick={closeMobileNav}>Get Tickets</Link>
                </div>

                <hr style={{margin:'15px 0', border:'0', borderTop:'1px solid #eee'}}/>

                <div className="action-area">
                    {!user ? (
                        <div style={{display:'grid', gap:'10px'}}>
                            <Link href="/login" className="btn-mobile-ghost" onClick={closeMobileNav}>Sign In</Link>
                            <Link href="/register" className="btn-mobile-primary" onClick={closeMobileNav}>Sign Up</Link>
                        </div>
                    ) : (
                        <div>
                            {user.role === 'admin' && (
                                <Link href="/admin/dashboard" className="menu-item-admin" onClick={closeMobileNav}>
                                    <IconDashboard /> Dashboard Admin
                                </Link>
                            )}
                            <div className="user-buttons-grid">
                                <Link href="/my-orders" className="btn-action-mobile btn-green-mobile" onClick={closeMobileNav}>
                                    Cek Pesanan
                                </Link>
                                <Link href="/logout" method="post" as="button" className="btn-action-mobile btn-red-mobile" onClick={closeMobileNav}>
                                    Logout
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
        <style>{`
            .mobile-menu-portal { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 2147483647; pointer-events: none; visibility: hidden; }
            .mobile-menu-portal.open { pointer-events: auto; visibility: visible; }
            .mobile-backdrop { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); opacity: 0; transition: opacity 0.3s; }
            .mobile-menu-portal.open .mobile-backdrop { opacity: 1; }
            .mobile-menu-box { position: absolute; top: 0; right: -300px; width: 85%; max-width: 300px; height: 100%; background: white; display: flex; flex-direction: column; transition: right 0.3s ease; box-shadow: -5px 0 20px rgba(0,0,0,0.2); }
            .mobile-menu-portal.open .mobile-menu-box { right: 0; }
            .mobile-header { padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
            .mobile-scroll-area { padding: 20px; overflow-y: auto; flex: 1; }
            .btn-close-simple { background: none; border: none; font-size: 24px; cursor: pointer; }
            .user-info-card { background: #f8f9fa; padding: 15px; border-radius: 10px; display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
            .avatar-circle { width: 40px; height: 40px; background: #8ab493; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; }
            .link-list a { display: block; padding: 12px 0; font-size: 16px; color: #333; text-decoration: none; border-bottom: 1px solid #f9f9f9; }
            .user-buttons-grid { display: flex; gap: 10px; margin-top: 10px; }
            .btn-action-mobile { flex: 1; display: flex; align-items: center; justify-content: center; padding: 12px; border-radius: 8px; font-weight: 600; font-size: 14px; text-decoration: none; border: none; cursor: pointer; transition: opacity 0.2s; }
            .btn-action-mobile:hover { opacity: 0.9; }
            .btn-green-mobile { background-color: #8ab493; color: white; }
            .btn-red-mobile { background-color: #fee2e2; color: #ef4444; }
            .menu-item-admin { display: flex; align-items: center; gap: 10px; padding: 12px; margin-bottom: 10px; background: #f3f4f6; color: #333; text-decoration: none; font-weight: 600; border-radius: 8px; }
            .btn-mobile-primary { display: block; width: 100%; padding: 12px; background: #8ab493; color: white; text-align: center; border-radius: 8px; font-weight: bold; text-decoration: none; }
            .btn-mobile-ghost { display: block; width: 100%; padding: 12px; background: white; color: #333; text-align: center; border-radius: 8px; font-weight: bold; border: 1px solid #8ab493; text-decoration: none; }
        `}</style>
    </div>
  );

  return (
    <>
      <header className="nav-wrap">
        <nav className="navbar container" style={{position: 'relative', zIndex: 100}}>
          <Link href="/" className="brand" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="brand-title">Maha Gangga Valley</div>
            <div className="brand-sub">Karangasem, Bali</div>
          </Link>

          {/* MENU DESKTOP */}
          <ul className="nav-links desktop-only">
            <li><a href="/#home">Home</a></li>
            <li><a href="/#gallery">Gallery</a></li>
            <li><a href="/#map">Map</a></li>
            <li><Link href="/booking">Get Tickets</Link></li>
            <li className="nav-divider"></li>
            <li className="nav-mobile-actions">
              {!user ? (
                <>
                  <Link href="/login" className="btn btn-ghost">Sign In</Link>
                  <Link href="/register" className="btn btn-primary">Sign Up</Link>
                </>
              ) : (
                <Link href="/my-orders" className="btn btn-primary">Cek Pesanan</Link>
              )}
            </li>
          </ul>

          <div className="nav-actions-desktop desktop-only">
            <button className="account-btn" onClick={toggleAccountMenu}>
              <IconUser />
              {user && <span className="online-dot"></span>}
            </button>
          </div>

          <button 
            id="my-custom-hamburger"
            className="hamburger-custom" 
            onClick={toggleMobileNav}
            aria-label="Menu"
            style={{display: 'none'}} 
          >
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>

      {/* RENDER MENU MOBILE */}
      {mounted && createPortal(MobileMenuContent, document.body)}

      {/* === SIDEBAR DESKTOP (AKUN SAYA) === */}
      <div className={`account-menu-overlay ${isAccountMenuOpen ? "open" : ""}`} onClick={toggleAccountMenu}></div>
      <aside className={`account-menu ${isAccountMenuOpen ? "open" : ""}`}>
         <div className="account-menu-header">
            <h3>{user ? `Hi, ${user.name}` : "Akun Saya"}</h3>
            <button onClick={toggleAccountMenu}>&times;</button>
         </div>
         <div className="account-menu-body">
            {!user ? (
                // === MODE TAMU (Layout Vertikal) ===
                <div className="guest-menu">
                    <p style={{marginBottom:'15px', color:'#666', fontSize:'14px', lineHeight:'1.5'}}>
                        Selamat datang! Silakan masuk untuk melihat tiket.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Link 
                            href="/login" 
                            className="btn-sidebar btn-green-desktop"
                            onClick={toggleAccountMenu}
                        >
                            Sign In
                        </Link>
                        <Link 
                            href="/register" 
                            className="btn-sidebar btn-outline-desktop"
                            onClick={toggleAccountMenu}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            ) : (
                // === MODE USER ===
                <div className="user-menu">
                    <p>{user.email}</p>
                    <ul className="account-links" style={{listStyle: 'none', padding: 0}}>
                        {user.role === 'admin' && (
                            <li><Link href="/admin/dashboard" onClick={toggleAccountMenu} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#333', fontWeight: '600', textDecoration: 'none', padding: '10px 0' }}><IconDashboard /> Dashboard Admin</Link></li>
                        )}
                        <li><Link href="/my-orders" onClick={toggleAccountMenu} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#333', fontWeight: '600', textDecoration: 'none', padding: '10px 0' }}><IconOrder /> Riwayat Pesanan</Link></li>
                    </ul>
                    <hr style={{margin: '20px 0', border: '0', borderTop: '1px solid #eee'}} />
                    <Link href="/logout" method="post" as="button" className="btn btn-ghost" style={{color:'red', width:'100%', textAlign:'left'}}>Logout</Link>
                </div>
            )}
         </div>
      </aside>

      {/* STYLE CSS GLOBAL (Untuk Sidebar Desktop) */}
      <style>{`
        /* Tombol di Sidebar Desktop */
        .btn-sidebar {
            display: block; width: 100%; padding: 12px; border-radius: 8px;
            font-weight: 600; font-size: 14px; text-align: center; text-decoration: none;
            transition: 0.2s;
        }
        /* PERBAIKAN WARNA DI SINI (Lebih Soft) */
        .btn-green-desktop { background: #8ab493; color: white; border: none; } /* Hijau Sage */
        .btn-green-desktop:hover { background: #769c7f; }
        
        .btn-outline-desktop { background: white; color: #333; border: 1px solid #ccc; }
        .btn-outline-desktop:hover { background: #f9f9f9; border-color: #999; color: #111; }

        /* Responsive */
        @media (max-width: 768px) {
            .nav-links, .desktop-only { display: none !important; }
            .hamburger-custom { display: flex !important; }
        }
        .hamburger-custom {
            display: none; flex-direction: column; justify-content: space-between;
            width: 30px; height: 21px; background: none; border: none; cursor: pointer; z-index: 101;
        }
        .hamburger-custom span {
            display: block; width: 100%; height: 3px; background: #333; border-radius: 3px;
        }
      `}</style>
    </>
  );
}