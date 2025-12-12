import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ totalRevenue, totalTickets, totalVisitors }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            {/* === GRID KARTU STATISTIK === */}
            <div className="stats-grid">
                
                {/* Kartu 1: Pendapatan */}
                <div className="stat-card">
                    <div>
                        <p className="stat-label">Pendapatan Total</p>
                        <h4 className="stat-value">
                            Rp {Number(totalRevenue).toLocaleString('id-ID')}
                        </h4>
                    </div>
                    <div className="stat-icon icon-green">💰</div>
                </div>

                {/* Kartu 2: Tiket Terjual */}
                <div className="stat-card">
                    <div>
                        <p className="stat-label">Tiket Terjual</p>
                        <h4 className="stat-value">{totalTickets}</h4>
                    </div>
                    <div className="stat-icon icon-blue">🎟️</div>
                </div>

                {/* Kartu 3: Total Transaksi */}
                <div className="stat-card">
                    <div>
                        <p className="stat-label">Total Transaksi</p>
                        <h4 className="stat-value">{totalVisitors}</h4>
                    </div>
                    <div className="stat-icon icon-purple">👥</div>
                </div>
            </div>

            {/* === AREA PRO TIPS === */}
            <div className="pro-tips-card">
                <div className="tips-content">
                    <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>Pro Tips 💡</h3>
                    <p style={{lineHeight: '1.5'}}>
                        Pastikan untuk selalu mengecek menu "Pesanan Tiket" setiap pagi. 
                        Verifikasi pembayaran yang masuk agar pengunjung mendapatkan E-Tiket mereka tepat waktu.
                    </p>
                </div>
            </div>

        </AdminLayout>
    );
}