import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

// Terima props 'stats' dan 'recentOrders' dari Controller
export default function Dashboard({ stats, recentOrders }) {

    // Helper Format Rupiah
    const formatRupiah = (num) => {
        return new Intl.NumberFormat('id-ID').format(num);
    };

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            {/* Header Halaman */}
            <div className="dashboard-header">
                <div>
                    <h1 style={{fontSize:'28px', fontWeight:'800', margin:'0 0 5px 0', color:'#111827'}}>Dashboard</h1>
                    <p style={{color:'#6b7280', margin:0}}>Maha Gangga Valley.</p>
                </div>
                <div style={{background:'white', padding:'8px 15px', borderRadius:'50px', fontSize:'13px', border:'1px solid #eee', color:'#555'}}>
                    ● {new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}
                </div>
            </div>

            {/* 4 KARTU STATISTIK (DATA ASLI DARI DATABASE) */}
            <div className="stats-grid">
                
                {/* Card 1: Pendapatan */}
                <div className="stat-card">
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div className="icon-box bg-green">💰</div>
                        <span style={{fontSize:'10px', background:'#f3f4f6', height:'fit-content', padding:'4px 8px', borderRadius:'6px'}}>TOTAL</span>
                    </div>
                    <div className="stat-label">Total Pendapatan</div>
                    <div className="stat-value">Rp {formatRupiah(stats.income)}</div>
                    <div style={{fontSize:'12px', marginTop:'5px', color:'#10b981'}}>↗ Data Real-time</div>
                </div>

                {/* Card 2: Tiket */}
                <div className="stat-card">
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div className="icon-box bg-blue">🎟️</div>
                        <span style={{fontSize:'10px', background:'#f3f4f6', height:'fit-content', padding:'4px 8px', borderRadius:'6px'}}>TERJUAL</span>
                    </div>
                    <div className="stat-label">Tiket Terjual</div>
                    <div className="stat-value">{stats.tickets_sold} Lembar</div>
                    <div style={{fontSize:'12px', marginTop:'5px', color:'#9ca3af'}}>Total Akumulasi</div>
                </div>

                {/* Card 3: Pengunjung */}
                <div className="stat-card">
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div className="icon-box bg-purple">👥</div>
                        <span style={{fontSize:'10px', background:'#f3f4f6', height:'fit-content', padding:'4px 8px', borderRadius:'6px'}}>VISITOR</span>
                    </div>
                    <div className="stat-label">Total Pengunjung</div>
                    <div className="stat-value">{stats.visitors} Orang</div>
                    <div style={{fontSize:'12px', marginTop:'5px', color:'#a855f7'}}>Berdasarkan Tiket</div>
                </div>

                {/* --- [PERBAIKAN DISINI] Card 4: Rating & Ulasan --- */}
                <div className="stat-card">
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div className="icon-box bg-yellow">⭐</div>
                        <span style={{fontSize:'10px', background:'#f3f4f6', height:'fit-content', padding:'4px 8px', borderRadius:'6px'}}>RATA-RATA</span>
                    </div>
                    <div className="stat-label">Rating & Ulasan</div>
                    
                    {/* Mengambil Skor Rating dari Controller */}
                    <div className="stat-value">
                        {stats.rating} <span style={{fontSize:'16px', color:'#9ca3af'}}>/ 5.0</span>
                    </div>

                    {/* Mengambil Status Label (Sangat Baik/Stabil/dll) dari Controller */}
                    <div style={{fontSize:'12px', marginTop:'5px', color:'#eab308'}}>
                        ★ {stats.rating_status}
                    </div>
                </div>
            </div>

            {/* BAGIAN BAWAH */}
            <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:'25px'}}>
                
                {/* KIRI: Tabel Pesanan TERBARU (Data Asli) */}
                <div className="stat-card">
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
                        <h3 style={{margin:0, fontSize:'16px'}}>Pesanan Terbaru</h3>
                        <Link href="/admin/orders" style={{fontSize:'12px', color:'#98b89b', textDecoration:'none'}}>Lihat Semua →</Link>
                    </div>

                    {/* LOOPING DATA ASLI 'recentOrders' */}
                    {recentOrders && recentOrders.length > 0 ? (
                        recentOrders.map((order) => (
                            <div key={order.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'15px', borderBottom:'1px solid #f9fafb', paddingBottom:'10px'}}>
                                <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                                    {/* Inisial Nama User */}
                                    <div style={{
                                        width:'35px', height:'35px', 
                                        background: order.status === 'confirmed' ? '#dcfce7' : '#ffedd5', 
                                        borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', 
                                        color: order.status === 'confirmed' ? '#15803d' : '#c2410c', 
                                        fontWeight:'bold', fontSize:'12px'
                                    }}>
                                        {order.user?.name ? order.user.name.charAt(0).toUpperCase() : 'G'}
                                    </div>
                                    <div>
                                        <div style={{fontWeight:'bold', fontSize:'14px'}}>{order.user?.name || 'Guest'}</div>
                                        <div style={{fontSize:'11px', color:'#888'}}>
                                            {order.qty} Tiket • {order.date}
                                        </div>
                                    </div>
                                </div>
                                <div style={{textAlign:'right'}}>
                                    <div style={{fontWeight:'bold', fontSize:'14px'}}>Rp {formatRupiah(order.total_price)}</div>
                                    
                                    {/* Badge Status Dinamis */}
                                    <span style={{
                                        fontSize:'10px', 
                                        background: order.status === 'confirmed' ? '#dcfce7' : (order.status === 'pending' ? '#ffedd5' : '#fee2e2'), 
                                        color: order.status === 'confirmed' ? '#15803d' : (order.status === 'pending' ? '#c2410c' : '#ef4444'), 
                                        padding:'2px 6px', borderRadius:'4px'
                                    }}>
                                        {order.status === 'confirmed' ? 'Lunas' : (order.status === 'pending' ? 'Pending' : order.status)}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{fontSize:'13px', color:'#999', textAlign:'center', padding:'20px'}}>Belum ada pesanan masuk.</p>
                    )}

                </div>

                {/* KANAN: Status Operasional */}
                <div className="operational-card">
                    <h3 style={{margin:0, fontSize:'14px', opacity:0.9}}>Status Operasional</h3>
                    <div style={{marginTop:'30px'}}>
                        <h2 style={{fontSize:'24px', fontWeight:'800', margin:'0 0 10px 0'}}>Buka Normal</h2>
                        <p style={{fontSize:'13px', opacity:0.9, lineHeight:'1.5'}}>Loket dan area parkir siap menerima pengunjung.</p>
                        <div style={{marginTop:'20px', fontSize:'12px', background:'rgba(255,255,255,0.2)', width:'fit-content', padding:'5px 10px', borderRadius:'20px'}}>
                            ● Buka: 08.00 - 17.00
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}