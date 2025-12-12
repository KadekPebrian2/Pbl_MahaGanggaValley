import React from 'react';
import { Link, usePage } from '@inertiajs/react';
// 👇 IMPORT CSS MANUAL DISINI
import '../../css/Admin.css'; 

export default function AdminLayout({ children }) {
    const { url } = usePage(); 

    const menus = [
        { name: 'Ringkasan', url: '/admin/dashboard', icon: '📊' },
        { name: 'Pesanan Tiket', url: '/admin/orders', icon: '🎟️' },
        { name: 'Galeri Wisata', url: '/admin/gallery', icon: '🖼️' },
        { name: 'Ulasan Pengunjung', url: '/admin/reviews', icon: '💬' },
    ];

    return (
        <div className="admin-container">
            {/* === SIDEBAR KIRI === */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h1 className="brand-logo">
                        <span>🌲</span> EcoAdmin
                    </h1>
                </div>

                <nav className="sidebar-menu">
                    {menus.map((item, index) => (
                        <Link
                            key={index}
                            href={item.url}
                            // Logika CSS Biasa: Kalau aktif tambah class 'active'
                            className={`menu-link ${url.startsWith(item.url) ? 'active' : ''}`}
                        >
                            <span>{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}

                    <div className="logout-section">
                        <Link href="/logout" method="post" as="button" className="btn-logout">
                            <span>🚪</span> Keluar
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* === KONTEN KANAN === */}
            <main className="admin-content">
                <header className="top-header">
                    <div>
                        <h2 style={{fontSize: '24px', fontWeight: 'bold', margin: 0}}>Dashboard</h2>
                        <p style={{color: '#6b7280', margin: 0}}>Pantau performa wisata hari ini.</p>
                    </div>
                    <div className="profile-badge">
                        <div className="avatar-circle">SA</div>
                        <div>
                            <div style={{fontWeight: 'bold', fontSize: '14px'}}>Super Admin</div>
                            <div style={{fontSize: '12px', color: '#059669'}}>● Online</div>
                        </div>
                    </div>
                </header>

                {/* Slot Halaman Anak */}
                {children}
            </main>
        </div>
    );
}