import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import '../../css/Admin.css';

export default function AdminLayout({ children }) {
    const { url } = usePage();

    // DAFTAR MENU SIDEBAR
    const menus = [
        { name: 'Ringkasan', url: '/admin/dashboard', icon: '📊' },
        { name: 'Scan Tiket', url: '/admin/scan', icon: '📷' }, 
        { name: 'Pesanan Tiket', url: '/admin/orders', icon: '🎟️' },
        { name: 'Galeri Wisata', url: '/admin/gallery', icon: '🖼️' },
        { name: 'Ulasan Pengunjung', url: '/admin/ulasan', icon: '💬' }, 
    ];

    return (
        <div className="admin-container">
            
            {/* === SIDEBAR KIRI === */}
            <aside className="admin-sidebar">
                {/* BAGIAN ATAS: LOGO & MENU */}
                <div>
                    <div className="brand-logo">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 18 L12 2 L16 18 L8 18 Z"></path>
                            <path d="M12 2 L2 22 L22 22 L12 2 Z"></path>
                        </svg>
                        <div>
                            <div style={{fontWeight:'800', fontSize:'16px', lineHeight:'1'}}>MAHA GANGGA</div>
                            <div style={{fontSize:'10px', color:'#9ca3af', letterSpacing:'1px'}}>VALLEY ADMIN</div>
                        </div>
                    </div>

                    <div className="menu-label">MENU UTAMA</div>

                    <nav className="sidebar-menu">
                        {menus.map((item, index) => (
                            <Link
                                key={index}
                                href={item.url}
                                className={`menu-link ${url.startsWith(item.url) ? 'active' : ''}`}
                            >
                                <span style={{fontSize:'18px'}}>{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* BAGIAN BAWAH: PROFIL & LOGOUT */}
                <div className="sidebar-footer">
                    <div className="user-profile-card">
                        <div style={{
                            width:'35px', height:'35px', background:'#e5e7eb', 
                            borderRadius:'50%', display:'flex', alignItems:'center', 
                            justifyContent:'center', fontWeight:'bold', color:'#6b7280'
                        }}>AD</div>
                        <div style={{overflow:'hidden'}}>
                            <div style={{fontSize:'14px', fontWeight:'700', color:'#374151'}}>Admin Petugas</div>
                            <div style={{fontSize:'11px', color:'#9ca3af'}}>admin@mahagangga.com</div>
                        </div>
                    </div>
                    
                    <Link href="/logout" method="post" as="button" className="btn-logout">
                        🚪 Keluar Sistem
                    </Link>
                </div>
            </aside>

            {/* === KONTEN KANAN (Tempat Halaman Berubah-ubah) === */}
            <main className="admin-content">
                {children}
            </main>
        </div>
    );
}