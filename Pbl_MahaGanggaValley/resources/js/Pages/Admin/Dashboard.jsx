import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    // --- LOGIKA TANGGAL OTOMATIS (REAL-TIME) ---
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('id-ID', dateOptions);
    // Hasilnya akan seperti: "Senin, 22 Desember 2025" (Sesuai hari ini)

    // Data dummy pesanan
    const recentOrders = [
        { id: 1, name: 'Siti Aminah', initials: 'SA', tickets: '5 Tiket', time: 'Baru saja', price: 'Rp 100.000', status: 'Pending', statusClass: 'status-pending', avatarClass: '' },
        { id: 2, name: 'Budi Santoso', initials: 'BS', tickets: '2 Tiket', time: '2 menit lalu', price: '+ Rp 40.000', status: 'Lunas', statusClass: 'status-success', avatarClass: 'green' },
    ];

    return (
        <AdminLayout user={props.auth?.user}>
            <Head title="Dashboard" />

            {/* --- Header Halaman --- */}
            <div className="top-header">
                <div>
                    <h1>Dashboard</h1>
                    <p className="subtitle">Maha Gangga Valley.</p>
                </div>
                {/* TANGGAL OTOMATIS DISINI */}
                <div className="date-badge">
                    <span className="dot"></span> {currentDate}
                </div>
            </div>

            {/* --- STATS CARDS --- */}
            <section className="stats-grid">
                {/* Card 1: Pendapatan */}
                <div className="card stat-card">
                    <div className="stat-header">
                        <div className="icon-box green-icon"><i className="fa-solid fa-wallet"></i></div>
                        <span className="badge-text">HARI INI</span>
                    </div>
                    <p className="stat-label">Total Pendapatan</p>
                    <h3 className="stat-value">Rp 40.000</h3>
                    <span className="stat-trend positive">↗ +12% naik</span>
                </div>

                {/* Card 2: Tiket */}
                <div className="card stat-card">
                    <div className="stat-header">
                        <div className="icon-box blue-icon"><i className="fa-solid fa-ticket-simple"></i></div>
                        <span className="badge-text">HARI INI</span>
                    </div>
                    <p className="stat-label">Tiket Terjual</p>
                    <h3 className="stat-value">2 Lembar</h3>
                    <span className="stat-sub">Target: 100/hari</span>
                </div>

                {/* Card 3: Pengunjung */}
                <div className="card stat-card">
                    <div className="stat-header">
                        <div className="icon-box purple-icon"><i className="fa-solid fa-user-group"></i></div>
                        <span className="badge-text">HARI INI</span>
                    </div>
                    <p className="stat-label">Total Pengunjung</p>
                    <h3 className="stat-value">2 Orang</h3>
                    <span className="stat-sub alert-text">1 Menunggu Masuk</span>
                </div>

                {/* Card 4: Rating */}
                <div className="card stat-card">
                    <div className="stat-header">
                        <div className="icon-box yellow-icon"><i className="fa-solid fa-star"></i></div>
                        <span className="badge-text">HARI INI</span>
                    </div>
                    <p className="stat-label">Rating & Ulasan</p>
                    <h3 className="stat-value">4.9 / 5.0</h3>
                    <span className="stat-trend warning">★ +3 Ulasan Baru</span>
                </div>
            </section>

            {/* --- BOTTOM SECTION --- */}
            <section className="dashboard-bottom">
                {/* Bagian Kiri: Pesanan Terbaru */}
                <div className="recent-orders">
                    <div className="card-header">
                        <div>
                            <h3>Pesanan Terbaru</h3>
                            <p className="subtitle">Transaksi tiket masuk real-time</p>
                        </div>
                        <a href="#" className="link-view-all">Lihat Semua &rarr;</a>
                    </div>
                    
                    {recentOrders.map(order => (
                        <div className="order-item" key={order.id}>
                            <div className="order-left">
                                <div className={`avatar-circle ${order.avatarClass}`}>{order.initials}</div>
                                <div>
                                    <span className="customer-name">{order.name}</span>
                                    <div className="ticket-info">
                                        <span className="ticket-badge">{order.tickets}</span>
                                        <span className="time-ago">• {order.time}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="order-right">
                                <span className="price">{order.price}</span>
                                <span className={`status-badge ${order.statusClass}`}>{order.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bagian Kanan: Status Operasional */}
                <div className="operational-status">
                    <h3>Status Operasional</h3>
                    <div className="status-content">
                        <h2>Buka Normal</h2>
                        <p>Loket dan area parkir siap menerima pengunjung.</p>
                        <div className="open-hours">
                            <span className="dot-black"></span> Buka: 08.00 - 17.00
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}