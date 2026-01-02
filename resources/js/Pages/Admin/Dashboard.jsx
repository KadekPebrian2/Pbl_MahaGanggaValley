import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({ stats, recentOrders }) {

    const formatRupiah = (num) => new Intl.NumberFormat('id-ID').format(num);

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <style>{`
                /* Header Halaman */
                .dashboard-header {
                    display: flex; justify-content: space-between; align-items: flex-end;
                    margin-bottom: 30px; flex-wrap: wrap; gap: 15px;
                }
                .page-title { font-size: 28px; font-weight: 800; color: #111827; margin: 0; line-height: 1.2; }
                .page-subtitle { color: #6b7280; margin-top: 5px; font-size: 14px; }
                .date-badge { 
                    background: white; padding: 8px 16px; border-radius: 50px; 
                    font-size: 13px; border: 1px solid #e5e7eb; color: #374151; font-weight: 600; 
                    display: flex; align-items: center; gap: 8px;
                }
                .dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; }

                /* Grid 4 Kartu Statistik */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 20px;
                    margin-bottom: 30px;
                }
                .stat-card {
                    background: white; border-radius: 12px; padding: 20px;
                    border: 1px solid #f3f4f6; box-shadow: 0 2px 5px rgba(0,0,0,0.02);
                    display: flex; flex-direction: column; justify-content: space-between;
                }
                .stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
                .icon-box { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
                .badge { font-size: 10px; padding: 4px 8px; border-radius: 6px; font-weight: 700; text-transform: uppercase; background: #f9fafb; color: #6b7280; }
                
                .stat-label { font-size: 13px; font-weight: 600; color: #6b7280; }
                .stat-value { font-size: 24px; font-weight: 800; color: #111827; margin: 4px 0; }
                .stat-trend { font-size: 12px; font-weight: 600; }

                /* Warna-warni Icon */
                .bg-green { background: #dcfce7; color: #15803d; } .text-green { color: #15803d; }
                .bg-blue { background: #dbeafe; color: #1e40af; }
                .bg-purple { background: #f3e8ff; color: #7e22ce; } .text-purple { color: #7e22ce; }
                .bg-yellow { background: #fef9c3; color: #a16207; } .text-yellow { color: #a16207; }

                /* Grid Bawah (2 Kolom: Tabel & Info) */
                .bottom-grid {
                    display: grid; grid-template-columns: 2fr 1fr; gap: 25px;
                }
                .section-card {
                    background: white; border-radius: 16px; padding: 25px;
                    border: 1px solid #f3f4f6; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .section-title { font-size: 16px; font-weight: 700; color: #111827; }
                .link-view { font-size: 13px; color: #10b981; text-decoration: none; font-weight: 600; }

                /* List Pesanan */
                .order-item {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 12px 0; border-bottom: 1px solid #f3f4f6;
                }
                .order-item:last-child { border-bottom: none; }
                .user-info { display: flex; gap: 12px; align-items: center; }
                .avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; }
                .user-details h4 { font-size: 14px; font-weight: 600; margin: 0; color: #1f2937; }
                .user-details p { font-size: 11px; color: #9ca3af; margin: 2px 0 0 0; }
                .price-info { text-align: right; }
                .price { font-weight: 700; font-size: 14px; color: #111827; }
                .status-pill { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; }
                .status-lunas { background: #dcfce7; color: #15803d; }
                .status-pending { background: #ffedd5; color: #c2410c; }

                /* Kartu Info Operasional (Hijau) */
                .card-green { background: #10b981; color: white; }
                .card-green h2 { font-size: 24px; font-weight: 800; margin: 0 0 10px 0; }
                .card-green p { font-size: 13px; opacity: 0.9; line-height: 1.5; }
                .time-pill { 
                    background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 20px; 
                    font-size: 12px; font-weight: 600; display: inline-block; margin-top: 15px;
                }

                /* RESPONSIVE HP */
                @media (max-width: 768px) {
                    .stats-grid { grid-template-columns: 1fr; }
                    .bottom-grid { grid-template-columns: 1fr; }
                    .page-title { font-size: 22px; }
                }
            `}</style>

            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Ringkasan data & statistik Maha Gangga Valley.</p>
                </div>
                <div className="date-badge">
                    <div className="dot"></div>
                    {new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}
                </div>
            </div>

            {/* Statistik Atas */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="icon-box bg-green">💰</div>
                        <span className="badge">TOTAL</span>
                    </div>
                    <div>
                        <div className="stat-label">Total Pendapatan</div>
                        <div className="stat-value">Rp {formatRupiah(stats.income)}</div>
                        <div className="stat-trend text-green">↗ Data Real-time</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="icon-box bg-blue">🎟️</div>
                        <span className="badge">TERJUAL</span>
                    </div>
                    <div>
                        <div className="stat-label">Tiket Terjual</div>
                        <div className="stat-value">{stats.tickets_sold} Lembar</div>
                        <div className="stat-trend" style={{color:'#9ca3af'}}>Total Akumulasi</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="icon-box bg-purple">👥</div>
                        <span className="badge">VISITOR</span>
                    </div>
                    <div>
                        <div className="stat-label">Total Pengunjung</div>
                        <div className="stat-value">{stats.visitors} Orang</div>
                        <div className="stat-trend text-purple">Berdasarkan Tiket</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="icon-box bg-yellow">⭐</div>
                        <span className="badge">RATA-RATA</span>
                    </div>
                    <div>
                        <div className="stat-label">Rating & Ulasan</div>
                        <div className="stat-value">{stats.rating} <span style={{fontSize:'14px', color:'#9ca3af', fontWeight:400}}>/ 5.0</span></div>
                        <div className="stat-trend text-yellow">★ {stats.rating_status}</div>
                    </div>
                </div>
            </div>

            {/* Grid Bawah */}
            <div className="bottom-grid">
                
                {/* Tabel Pesanan */}
                <div className="section-card">
                    <div className="section-header">
                        <div className="section-title">Pesanan Terbaru</div>
                        <Link href="/admin/orders" className="link-view">Lihat Semua →</Link>
                    </div>
                    
                    {recentOrders && recentOrders.length > 0 ? (
                        recentOrders.map((order) => (
                            <div key={order.id} className="order-item">
                                <div className="user-info">
                                    <div className="avatar" style={{background: order.status === 'confirmed' ? '#dcfce7' : '#ffedd5', color: order.status === 'confirmed' ? '#15803d' : '#c2410c'}}>
                                        {order.user?.name ? order.user.name.charAt(0).toUpperCase() : 'G'}
                                    </div>
                                    <div className="user-details">
                                        <h4>{order.user?.name || 'Guest'}</h4>
                                        <p>{order.qty} Tiket • {order.date}</p>
                                    </div>
                                </div>
                                <div className="price-info">
                                    <div className="price">Rp {formatRupiah(order.total_price)}</div>
                                    <span className={`status-pill ${order.status === 'confirmed' ? 'status-lunas' : 'status-pending'}`}>
                                        {order.status === 'confirmed' ? 'Lunas' : order.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{textAlign:'center', color:'#9ca3af', fontSize:'13px', margin:'20px 0'}}>Belum ada data.</p>
                    )}
                </div>

                {/* Status Operasional */}
                <div className="section-card card-green">
                    <h2>Buka Normal</h2>
                    <p>Sistem berjalan lancar. Loket dan area parkir siap menerima pengunjung.</p>
                    <div className="time-pill">● Buka: 08.00 - 17.00</div>
                </div>
            </div>
        </AdminLayout>
    );
}