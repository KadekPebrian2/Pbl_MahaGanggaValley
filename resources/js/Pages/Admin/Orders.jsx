import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout'; // Import Layout
import '../../../css/Orders.css';

export default function Orders({ bookings }) {
    
    // --- HELPERS & FORMATTING SAMA SEPERTI SEBELUMNYA ---
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0 
        }).format(number);
    };

    const getInitials = (name) => {
        if (!name) return '?';
        const names = name.split(' ');
        let initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    // --- FORM HANDLERS ---
    const { post } = useForm();

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
        // BUNGKUS DENGAN ADMIN LAYOUT & KIRIM JUDUL HEADER
        <AdminLayout headerTitle="Kelola Pesanan Tiket">
            <Head title="Kelola Pesanan" />
            
            {/* HAPUS SIDEBAR MANUAL DISINI, LANGSUNG KE KONTEN */}
            
            <div className="header-title" style={{marginBottom: '20px'}}>
                <div>
                    <span className="order-count">{bookings.length} Total Transaksi</span>
                </div>
            </div>

            <div className="table-container">
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
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', padding: '50px' }}>
                                    📭 Belum ada data pesanan.
                                </td>
                            </tr>
                        ) : bookings.map((item) => {
                            // --- LOGIKA STATUS SAMA PERSIS SEPERTI KODE LAMA ANDA ---
                            const statusRaw = item.status ? item.status.toLowerCase() : 'unknown';
                            const displayName = item.user ? item.user.name : (item.name || 'Tamu');
                            const displayEmail = item.user ? item.user.email : (item.email || '-');
                            
                            let statusLabel = 'Belum Bayar', statusClass = 'unpaid';
                            if (statusRaw === 'confirmed') { statusLabel = 'Lunas'; statusClass = 'confirmed'; }
                            else if (statusRaw === 'rejected') { statusLabel = 'Ditolak'; statusClass = 'rejected'; }
                            else if (statusRaw === 'pending') { statusLabel = 'Verifikasi'; statusClass = 'pending'; }

                            return (
                                <tr key={item.id}>
                                    <td>#{item.id}</td>
                                    <td>
                                        <div className="user-cell">
                                            <div className="user-avatar">{getInitials(displayName)}</div>
                                            <div className="user-info">
                                                <span className="user-name">{displayName}</span>
                                                <span className="user-email">{displayEmail}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.date}</td>
                                    <td>{item.qty} Org</td>
                                    <td style={{ fontWeight: 'bold', color: '#5D755B' }}>
                                        {formatRupiah(item.total_price)}
                                    </td>
                                    <td>
                                        {item.payment_proof ? (
                                            <a href={`/storage/${item.payment_proof}`} target="_blank" className="link-photo">Lihat</a>
                                        ) : '-'}
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${statusClass}`}>● {statusLabel}</span>
                                    </td>
                                    <td>
                                        {statusRaw === 'pending' ? (
                                            <div className="action-buttons">
                                                <button onClick={() => handleApprove(item.id)} className="btn-approve">✓</button>
                                                <button onClick={() => handleReject(item.id)} className="btn-reject">✕</button>
                                            </div>
                                        ) : (
                                            <span style={{fontSize:'12px', color:'#9ca3af'}}>Selesai</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}