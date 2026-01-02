import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Orders({ bookings }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { post } = useForm();

    const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?';

    // Logika Filter
    const filteredData = bookings.filter((item) => {
        if (!searchTerm) return true; 
        const lowerTerm = searchTerm.toLowerCase();
        return (item.user?.name || item.name || '').toLowerCase().includes(lowerTerm) ||
               (item.user?.email || item.email || '').toLowerCase().includes(lowerTerm) ||
               item.id.toString().includes(lowerTerm);
    });

    const handleApprove = (id) => confirm('Setujui pembayaran ini?') && post(route('admin.orders.approve', id));
    const handleReject = (id) => confirm('Tolak pesanan ini?') && post(route('admin.orders.reject', id));

    return (
        <AdminLayout>
            <Head title="Manajemen Pesanan" />

            <style>{`
                /* Header */
                .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; flex-wrap: wrap; gap: 15px; }
                .title-text h1 { font-size: 24px; font-weight: 800; color: #111827; margin: 0; }
                .title-text p { color: #6b7280; font-size: 14px; margin-top: 5px; }

                /* Card Table */
                .table-card { background: white; border-radius: 16px; padding: 25px; border: 1px solid #f3f4f6; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                
                /* Controls (Search & Title) */
                .controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px; }
                .table-title h2 { font-size: 18px; font-weight: 700; margin: 0; }
                .badge-count { background: #f3f4f6; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; color: #4b5563; margin-left: 10px; }
                
                .search-input {
                    padding: 10px 15px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; width: 300px; transition: 0.2s;
                }
                .search-input:focus { border-color: #10b981; outline: none; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }

                /* Tabel Responsif */
                .table-responsive { overflow-x: auto; -webkit-overflow-scrolling: touch; }
                .custom-table { width: 100%; border-collapse: collapse; white-space: nowrap; }
                .custom-table th { text-align: left; padding: 12px 15px; background: #f9fafb; font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e5e7eb; }
                .custom-table td { padding: 12px 15px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #374151; vertical-align: middle; }
                .custom-table tr:last-child td { border-bottom: none; }

                /* Elemen Tabel */
                .user-cell { display: flex; align-items: center; gap: 12px; }
                .avatar { width: 35px; height: 35px; background: #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; color: #6b7280; }
                .user-info div:first-child { font-weight: 600; color: #111827; }
                .user-info div:last-child { font-size: 11px; color: #9ca3af; }

                .status-badge { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; display: inline-block; }
                .status-lunas { background: #dcfce7; color: #15803d; }
                .status-pending { background: #ffedd5; color: #c2410c; }
                .status-ditolak { background: #fee2e2; color: #991b1b; }

                .btn-action { width: 30px; height: 30px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; margin-right: 5px; transition: 0.2s; }
                .btn-yes { background: #dcfce7; color: #15803d; } .btn-yes:hover { background: #bbf7d0; }
                .btn-no { background: #fee2e2; color: #991b1b; } .btn-no:hover { background: #fecaca; }
                .link-bukti { color: #2563eb; font-weight: 600; text-decoration: none; font-size: 13px; }

                @media (max-width: 768px) {
                    .controls { flex-direction: column; align-items: stretch; }
                    .search-input { width: 100%; }
                }
            `}</style>

            <div className="page-header">
                <div className="title-text">
                    <h1>Manajemen Pesanan</h1>
                    <p>Pantau status pembayaran pengunjung.</p>
                </div>
            </div>

            <div className="table-card">
                <div className="controls">
                    <div className="table-title">
                        <h2>Data Transaksi <span className="badge-count">{filteredData.length}</span></h2>
                    </div>
                    <input 
                        type="text" placeholder="Cari Nama / Email / ID..." 
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                        className="search-input"
                    />
                </div>

                <div className="table-responsive">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>#ID</th><th>Pengunjung</th><th>Tanggal</th><th>Tiket</th>
                                <th>Total</th><th>Bukti</th><th>Status</th><th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr><td colSpan="8" style={{textAlign:'center', padding:'30px', color:'#9ca3af'}}>Data tidak ditemukan.</td></tr>
                            ) : (
                                filteredData.map((item) => {
                                    const status = item.status?.toLowerCase() || 'unknown';
                                    return (
                                        <tr key={item.id}>
                                            <td style={{fontWeight:'bold', color:'#9ca3af'}}>#{item.id}</td>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="avatar">{getInitials(item.user?.name || item.name)}</div>
                                                    <div className="user-info">
                                                        <div>{item.user?.name || item.name || 'Tamu'}</div>
                                                        <div>{item.user?.email || item.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.date}</td>
                                            <td>{item.qty} Org</td>
                                            <td style={{fontWeight:'bold'}}>{formatRupiah(item.total_price)}</td>
                                            <td>{item.payment_proof ? <a href={`/storage/${item.payment_proof}`} target="_blank" className="link-bukti">Lihat</a> : '-'}</td>
                                            <td>
                                                <span className={`status-badge status-${status === 'confirmed' ? 'lunas' : status === 'pending' ? 'pending' : 'ditolak'}`}>
                                                    {status === 'confirmed' ? 'LUNAS' : status === 'pending' ? 'VERIFIKASI' : 'DITOLAK'}
                                                </span>
                                            </td>
                                            <td>
                                                {status === 'pending' ? (
                                                    <>
                                                        <button onClick={() => handleApprove(item.id)} className="btn-action btn-yes" title="Terima">✓</button>
                                                        <button onClick={() => handleReject(item.id)} className="btn-action btn-no" title="Tolak">✕</button>
                                                    </>
                                                ) : <span style={{fontSize:'12px', color:'#9ca3af'}}>Selesai</span>}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}