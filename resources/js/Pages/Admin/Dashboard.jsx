import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import '../../../css/Orders.css';

// Props disesuaikan dengan Controller: stats (array) dan orders (recent)
export default function Dashboard({ stats, orders }) {
    return (
        <AdminLayout headerTitle="Dashboard Ringkasan">
            <Head title="Admin Dashboard" />

            {/* === GRID KARTU STATISTIK === */}
            <div className="stats-grid">
                
                {/* Kartu 1: Pendapatan */}
                <div className="stat-card">
                    <div>
                        <p className="stat-label">Pendapatan Total</p>
                        <h4 className="stat-value">
                            {/* Mengambil dari props stats.revenue */}
                            Rp {Number(stats.revenue).toLocaleString('id-ID')}
                        </h4>
                    </div>
                    <div className="stat-icon icon-green">💰</div>
                </div>

                {/* Kartu 2: Tiket Terjual (Total Orders) */}
                <div className="stat-card">
                    <div>
                        <p className="stat-label">Total Pesanan</p>
                        <h4 className="stat-value">{stats.total_orders}</h4>
                    </div>
                    <div className="stat-icon icon-blue">🎟️</div>
                </div>

                {/* Kartu 3: Menunggu Verifikasi */}
                <div className="stat-card">
                    <div>
                        <p className="stat-label">Perlu Verifikasi</p>
                        <h4 className="stat-value">{stats.pending_orders}</h4>
                    </div>
                    <div className="stat-icon icon-purple">⏳</div>
                </div>
            </div>

            {/* === TABEL PESANAN TERBARU (BARU DITAMBAHKAN) === */}
            <div className="recent-orders-section" style={{marginTop: '30px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold'}}>5 Pesanan Terbaru</h3>
                    <Link href="/admin/orders" style={{color:'#059669', fontSize:'14px', textDecoration:'none'}}>Lihat Semua →</Link>
                </div>
                
                <div className="table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Tanggal</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.user ? order.user.name : 'Guest'}</td>
                                    <td>{order.date}</td>
                                    <td>Rp {Number(order.total_price).toLocaleString('id-ID')}</td>
                                    <td>
                                        <span className={`status-badge status-${order.status}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </AdminLayout>
    );
}