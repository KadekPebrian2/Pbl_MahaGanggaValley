import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

// === IKON SVG SEDERHANA ===
const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const IconClose = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

export default function AdminLayout({ children }) {
    const { url } = usePage();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // MENU ADMIN
    const menus = [
        { name: 'Ringkasan', url: '/admin/dashboard', icon: '📊' },
        { name: 'Laporan Penjualan', url: '/admin/laporan', icon: '📈' }, 
        { name: 'Scan Tiket', url: '/admin/scan', icon: '📷' }, 
        { name: 'Pesanan Tiket', url: '/admin/orders', icon: '🎟️' },
        { name: 'Galeri Wisata', url: '/admin/gallery', icon: '🖼️' },
        { name: 'Ulasan Pengunjung', url: '/admin/ulasan', icon: '💬' }, 
    ];

    return (
        <div className="admin-layout-root">
            
            {/* === 1. HEADER MOBILE (Hanya di HP) === */}
            <header className="mobile-header">
                <div className="brand-mobile">
                    <span className="brand-icon">M</span>
                    <span className="brand-text">ADMIN PANEL</span>
                </div>
                <button className="btn-hamburger" onClick={() => setSidebarOpen(true)}>
                    <IconMenu />
                </button>
            </header>

            {/* === 2. OVERLAY GELAP (Saat Sidebar Buka di HP) === */}
            <div className={`overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}></div>

            {/* === 3. SIDEBAR === */}
            <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <div className="brand-desktop">
                        <div className="brand-icon">M</div>
                        <div>
                            <div className="brand-title">MAHA GANGGA</div>
                            <div className="brand-subtitle">VALLEY ADMIN</div>
                        </div>
                    </div>
                    <button className="btn-close" onClick={() => setSidebarOpen(false)}>
                        <IconClose />
                    </button>
                </div>

                <div className="sidebar-scroll">
                    <div className="menu-label">MENU UTAMA</div>
                    <nav className="menu-list">
                        {menus.map((item, index) => (
                            <Link
                                key={index}
                                href={item.url}
                                className={`menu-item ${url.startsWith(item.url) ? 'active' : ''}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-text">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="sidebar-footer">
                    <div className="user-card">
                        <div className="avatar">AD</div>
                        <div className="user-info">
                            <div className="name">Admin Petugas</div>
                            <div className="email">admin@mahagangga.com</div>
                        </div>
                    </div>
                    <Link href="/logout" method="post" as="button" className="btn-logout">
                        🚪 Keluar Sistem
                    </Link>
                </div>
            </aside>

            {/* === 4. MAIN CONTENT AREA === */}
            <main className="main-content">
                {/* WADAH UTAMA KONTEN: Ini yang menjaga konten tetap rapi */}
                <div className="content-container">
                    {children}
                </div>
            </main>

            {/* === CSS INTERNAL (Layout Engine) === */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
                
                :root {
                    --sidebar-width: 260px;
                    --header-height: 60px;
                    --bg-color: #f3f4f6;
                    --primary-color: #10b981;
                    --text-color: #1f2937;
                }

                * { box-sizing: border-box; }
                body { margin: 0; font-family: 'Inter', sans-serif; background: var(--bg-color); color: var(--text-color); }

                .admin-layout-root {
                    display: flex;
                    min-height: 100vh;
                }

                /* SIDEBAR STYLES */
                .sidebar {
                    width: var(--sidebar-width);
                    background: white;
                    border-right: 1px solid #e5e7eb;
                    position: fixed; top: 0; left: 0; bottom: 0;
                    z-index: 50;
                    display: flex; flex-direction: column;
                    transition: transform 0.3s ease;
                }
                .sidebar-header { padding: 20px; border-bottom: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: center; }
                .brand-desktop { display: flex; gap: 10px; align-items: center; }
                .brand-icon { width: 32px; height: 32px; background: #1f2937; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
                .brand-title { font-weight: 800; font-size: 14px; line-height: 1.2; }
                .brand-subtitle { font-size: 10px; color: #9ca3af; letter-spacing: 1px; }
                
                .sidebar-scroll { flex: 1; overflow-y: auto; padding: 20px; }
                .menu-label { font-size: 11px; font-weight: 700; color: #9ca3af; margin-bottom: 10px; letter-spacing: 0.5px; }
                
                .menu-item {
                    display: flex; align-items: center; gap: 12px; padding: 10px 12px;
                    color: #4b5563; text-decoration: none; border-radius: 8px;
                    margin-bottom: 4px; transition: all 0.2s; font-size: 14px; font-weight: 500;
                }
                .menu-item:hover { background: #f9fafb; color: #111827; }
                .menu-item.active { background: #dcfce7; color: #047857; font-weight: 600; }
                .menu-icon { font-size: 18px; }

                .sidebar-footer { padding: 15px; border-top: 1px solid #f3f4f6; background: #fff; }
                .user-card { display: flex; gap: 10px; align-items: center; padding: 10px; background: #f9fafb; border-radius: 8px; margin-bottom: 10px; }
                .avatar { width: 32px; height: 32px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; color: #6b7280; }
                .user-info .name { font-size: 13px; font-weight: 700; }
                .user-info .email { font-size: 10px; color: #9ca3af; }

                .btn-logout { width: 100%; padding: 8px; background: #fee2e2; color: #ef4444; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px; transition: 0.2s; }
                .btn-logout:hover { background: #fecaca; }

                /* MAIN CONTENT */
                .main-content {
                    flex: 1;
                    margin-left: var(--sidebar-width); /* KUNCI AGAR TIDAK KETUTUPAN SIDEBAR */
                    width: calc(100% - var(--sidebar-width));
                    min-height: 100vh;
                    display: flex; flex-direction: column;
                }
                .content-container {
                    padding: 30px;
                    width: 100%;
                    max-width: 1200px; /* Batas lebar konten agar enak dibaca */
                    margin: 0 auto; /* Tengah secara horizontal */
                }

                /* MOBILE ELEMENTS */
                .mobile-header { display: none; }
                .overlay { display: none; }
                .btn-close { display: none; }

                /* === RESPONSIVE (HP) === */
                @media (max-width: 768px) {
                    /* Header Mobile Muncul */
                    .mobile-header {
                        display: flex; align-items: center; justify-content: space-between;
                        height: var(--header-height); padding: 0 20px; background: white;
                        border-bottom: 1px solid #e5e7eb; position: fixed; top: 0; left: 0; right: 0; z-index: 40;
                    }
                    .brand-mobile { display: flex; gap: 8px; align-items: center; font-weight: 800; font-size: 14px; }
                    .btn-hamburger { background: none; border: none; font-size: 24px; cursor: pointer; }

                    /* Sidebar Sembunyi */
                    .sidebar { transform: translateX(-100%); width: 280px; }
                    .sidebar.active { transform: translateX(0); }
                    .btn-close { display: block; background: none; border: none; cursor: pointer; color: #6b7280; }

                    /* Main Content Geser */
                    .main-content {
                        margin-left: 0; /* Hapus margin kiri */
                        width: 100%;
                        margin-top: var(--header-height); /* Turunkan konten di bawah header */
                    }
                    .content-container { padding: 15px; }

                    /* Overlay */
                    .overlay {
                        display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5);
                        z-index: 45; opacity: 0; visibility: hidden; transition: 0.3s;
                    }
                    .overlay.active { opacity: 1; visibility: visible; }
                }
            `}</style>
        </div>
    );
}