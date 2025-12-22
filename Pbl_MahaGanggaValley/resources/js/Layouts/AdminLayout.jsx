import React from 'react';
import { Link } from '@inertiajs/react';
import '../../css/Admin.css';

export default function AdminLayout({ user, children }) {
    // Ambil path browser saat ini
    const currentPath = window.location.pathname;

    // Fungsi menentukan Class
    const getMenuClass = (path) => {
        // Logika: Jika URL browser diawali dengan path menu, maka aktif
        const isActive = currentPath === path || currentPath.startsWith(path + '/');
        
        // Kembalikan nama class string
        return isActive ? 'active' : '';
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-icon">
                        <i className="fa-solid fa-layer-group"></i>
                    </div>
                    <div className="logo-text">
                        <h2>MAHA GANGGA</h2>
                        <span>VALLEY ADMIN</span>
                    </div>
                </div>

                <div className="sidebar-menu">
                    <div className="menu-label">Menu Utama</div>
                    <ul>
                        {/* CATATAN: 
                           Sekarang kita pakai className={getMenuClass(...)} 
                           agar animasi di CSS (hover & active) bisa bekerja.
                        */}

                        {/* 1. RINGKASAN */}
                        <li className={getMenuClass('/admin/dashboard')}>
                            <Link href="/admin/dashboard">
                                <i className="fa-solid fa-table-cells-large"></i>
                                Ringkasan
                            </Link>
                        </li>

                        {/* 2. PESANAN TIKET */}
                        <li className={getMenuClass('/admin/orders')}>
                            <Link href="/admin/orders">
                                <i className="fa-solid fa-ticket"></i>
                                Pesanan Tiket
                            </Link>
                        </li>

                        {/* 3. GALERI WISATA */}
                        <li className={getMenuClass('/admin/gallery')}>
                            <Link href="/admin/gallery">
                                <i className="fa-solid fa-image"></i>
                                Galeri Wisata
                            </Link>
                        </li>

                        {/* 4. ULASAN PENGUNJUNG */}
                        <li className={getMenuClass('/admin/reviews')}>
                            <Link href="/admin/reviews">
                                <i className="fa-solid fa-comment"></i>
                                Ulasan Pengunjung
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="avatar">
                            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'AD'}
                        </div>
                        <div className="user-info">
                            <strong>{user?.name || 'Admin'}</strong>
                            <span>{user?.email || 'admin@gmail.com'}</span>
                        </div>
                    </div>
                    <Link href="/logout" method="post" as="button" className="btn-logout">
                        <i className="fa-solid fa-right-from-bracket"></i> Keluar Sistem
                    </Link>
                </div>
            </aside>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
}