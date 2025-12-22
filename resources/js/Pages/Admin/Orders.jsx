import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import '../../../css/Orders.css'; // Pastikan path ini sesuai dengan struktur folder Anda

export default function Orders({ bookings, totalOrders }) {
    
    // 1. STATE UNTUK PENCARIAN
    const [searchTerm, setSearchTerm] = useState('');

    // 2. FORM HANDLER (INERTIA)
    const { post } = useForm();

    // 3. HELPER FORMAT RUPIAH
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0 
        }).format(number);
    };

    // 4. HELPER INISIAL NAMA (Contoh: "Budi Santoso" -> "BS")
    const getInitials = (name) => {
        if (!name) return '?';
        const names = name.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    // 5. LOGIKA SUPER SEARCH (Filter Nama / Email / ID)
    const filteredData = bookings.filter((item) => {
        if (searchTerm === '') return true; 

        const lowerTerm = searchTerm.toLowerCase();
        
        // Ambil data dari berbagai sumber
        const nameMatch  = (item.user?.name || item.name || '').toLowerCase().includes(lowerTerm);
        const emailMatch = (item.user?.email || item.email || '').toLowerCase().includes(lowerTerm);
        const idMatch    = item.id.toString().includes(lowerTerm);

        // Jika salah satu cocok, tampilkan
        return nameMatch || emailMatch || idMatch;
    });

    // 6. HANDLER TOMBOL AKSI
    const handleApprove = (id) => {
        if (confirm('Yakin ingin menyetujui pembayaran ini?')) {
            post(route('admin.orders.approve', id));
        }
    }

    const handleReject = (id) => {
        if (confirm('Yakin ingin menolak pesanan ini?')) {
            post(route('admin.orders.reject', id));
        }
    }

    return (
        <AdminLayout>
            <Head title="Manajemen Pesanan" />
            
            {/* === HEADER HALAMAN === */}
            <div className="dashboard-header">
                <div>
                    <h1 className="header-title">Manajemen Pesanan</h1>
                    <p className="header-subtitle">
                        Pantau dan kelola semua transaksi tiket masuk pengunjung.
                    </p>
                </div>
            </div>

            {/* === KARTU PEMBUNGKUS TABEL === */}
            <div className="orders-card">
                
                {/* Bagian Kontrol (Judul Tabel & Search) */}
                <div className="controls-row">
                    <div className="title-group">
                        <h2 className="table-title">Data Transaksi</h2>
                        <span className="data-badge">
                            {filteredData.length} Data Tampil
                        </span>
                    </div>

                    {/* Input Pencarian */}
                    <input 
                        type="text" 
                        placeholder="Cari Nama / Email / ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Container Tabel (Scrollable) */}
                <div className="table-wrapper">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Pengunjung</th>
                                <th>Tgl Kunjungan</th>
                                <th>Tiket</th>
                                <th>Total</th>
                                <th>Bukti TF</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* STATE JIKA DATA KOSONG / TIDAK DITEMUKAN */}
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="empty-state">
                                        <div className="empty-icon">🔍</div>
                                        <p>Data tidak ditemukan untuk "{searchTerm}"</p>
                                    </td>
                                </tr>
                            ) : (
                                // MAPPING DATA PESANAN
                                filteredData.map((item) => {
                                    // Normalisasi data biar aman
                                    const statusRaw = item.status ? item.status.toLowerCase() : 'unknown';
                                    const displayName = item.user ? item.user.name : (item.name || 'Tamu');
                                    const displayEmail = item.user ? item.user.email : (item.email || '-');
                                    
                                    // Tentukan Class CSS & Label untuk Badge Status
                                    let badgeClass = '';
                                    let labelText = '';

                                    if (statusRaw === 'confirmed') {
                                        badgeClass = 'status-lunas';
                                        labelText = 'LUNAS';
                                    } else if (statusRaw === 'pending') {
                                        badgeClass = 'status-verifikasi';
                                        labelText = 'VERIFIKASI';
                                    } else {
                                        badgeClass = 'status-ditolak';
                                        labelText = 'DITOLAK';
                                    }
                                    
                                    return (
                                        <tr key={item.id}>
                                            <td style={{fontWeight: 'bold', color: '#6b7280'}}>#{item.id}</td>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="avatar-circle">
                                                        {getInitials(displayName)}
                                                    </div>
                                                    <div>
                                                        <div className="user-name">{displayName}</div>
                                                        <div className="user-email">{displayEmail}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{fontSize:'14px', color:'#374151'}}>{item.date}</td>
                                            <td style={{fontSize:'14px'}}>{item.qty} Org</td>
                                            <td className="text-price">
                                                {formatRupiah(item.total_price)}
                                            </td>
                                            <td>
                                                {item.payment_proof ? (
                                                    <a href={`/storage/${item.payment_proof}`} target="_blank" className="link-photo">Lihat</a>
                                                ) : '-'}
                                            </td>
                                            <td>
                                                <span className={`status-badge ${badgeClass}`}>
                                                    {labelText}
                                                </span>
                                            </td>
                                            <td>
                                                {/* Tombol Aksi Muncul HANYA jika status Pending */}
                                                {statusRaw === 'pending' ? (
                                                    <div className="action-buttons">
                                                        <button onClick={() => handleApprove(item.id)} className="btn-action btn-approve" title="Terima Pembayaran">✓</button>
                                                        <button onClick={() => handleReject(item.id)} className="btn-action btn-reject" title="Tolak Pesanan">✕</button>
                                                    </div>
                                                ) : (
                                                    <span className="text-selesai">Selesai</span>
                                                )}
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