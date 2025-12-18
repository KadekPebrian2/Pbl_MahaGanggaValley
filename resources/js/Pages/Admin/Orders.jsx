import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/Orders.css';

export default function Orders({ bookings }) {
    // Helper Format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    const { post } = useForm();

    const handleApprove = (id) => {
        if (confirm('Yakin ingin menyetujui pesanan ini?')) {
            post(route('admin.orders.approve', id));
        }
    }

    const handleReject = (id) => {
        if (confirm('Yakin ingin menolak pesanan ini?')) {
            post(route('admin.orders.reject', id));
        }
    }

    return (
        <div className="admin-container">
            <Head title="Kelola Pesanan" />

            {/* SIDEBAR */}
            <div className="admin-sidebar">
                <h2 className="sidebar-title">🌲 EcoAdmin</h2>
                <nav className="sidebar-nav">
                    <Link href="/admin/dashboard" className="nav-link">
                        📊 Ringkasan
                    </Link>
                    <Link href="/admin/orders" className="nav-link active">
                        🎟️ Pesanan Tiket
                    </Link>
                    <div className="nav-link" style={{ color: '#ccc', cursor: 'not-allowed' }}>
                        🖼️ Galeri (Soon)
                    </div>
                </nav>
                <Link href="/logout" method="post" as="button" className="btn-logout">
                    🚪 Keluar
                </Link>
            </div>

            {/* KONTEN UTAMA */}
            <main className="admin-content">
                <div className="header-title">
                    <h1>Daftar Pesanan Tiket</h1>
                    <span className="order-count">Total: {bookings.length} Pesanan</span>
                </div>

                <div className="table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama Pemesan</th>
                                <th>Tgl Kunjungan</th>
                                <th>Tiket</th>
                                <th>Total Harga</th>
                                <th>Bukti Bayar</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#999' }}>
                                        Belum ada pesanan masuk.
                                    </td>
                                </tr>
                            ) : bookings.map((item) => {
                                // 1. NORMALISASI STATUS
                                const statusRaw = item.status ? item.status.toLowerCase() : 'unknown';

                                // 2. TENTUKAN LABEL & KELAS WARNA (LOGIKA BARU)
                                let statusLabel = '';
                                let statusClass = '';

                                if (statusRaw === 'confirmed') {
                                    statusLabel = 'Selesai / Lunas';
                                    statusClass = 'confirmed'; // Hijau
                                } else if (statusRaw === 'rejected') {
                                    statusLabel = 'Ditolak';
                                    statusClass = 'rejected'; // Merah
                                } else if (statusRaw === 'pending') {
                                    statusLabel = 'Menunggu Konfirmasi'; // User SUDAH upload bukti
                                    statusClass = 'pending'; // Kuning
                                } else {
                                    // Default: unpaid
                                    statusLabel = 'Belum Upload Bukti'; // User BELUM upload
                                    statusClass = 'unpaid'; // Abu-abu (Class baru di CSS)
                                }

                                return (
                                    <tr key={item.id}>
                                        <td style={{ color: '#999' }}>#{item.id}</td>

                                        {/* NAMA USER */}
                                        <td style={{ fontWeight: 'bold' }}>
                                            {item.user ? item.user.name : item.name}
                                            <div style={{ fontSize: '12px', color: '#999', fontWeight: 'normal' }}>
                                                {item.user ? item.user.email : item.email}
                                            </div>
                                        </td>

                                        {/* TANGGAL */}
                                        <td>{item.date}</td>

                                        {/* TIKET */}
                                        <td>{item.qty} Orang</td>

                                        {/* HARGA */}
                                        <td style={{ fontWeight: 'bold', color: '#27ae60' }}>
                                            {formatRupiah(item.total_price)}
                                        </td>

                                        {/* BUKTI BAYAR */}
                                        <td>
                                            {item.payment_proof ? (
                                                <a href={`/storage/${item.payment_proof}`} target="_blank" rel="noreferrer" className="link-photo">
                                                    Lihat Foto
                                                </a>
                                            ) : (
                                                <span style={{ color: '#ccc', fontStyle: 'italic', fontSize: '12px' }}>
                                                    Belum ada
                                                </span>
                                            )}
                                        </td>

                                        {/* STATUS BADGE (Menggunakan variabel logic di atas) */}
                                        <td>
                                            <span className={`status-badge status-${statusClass}`}>
                                                {statusLabel}
                                            </span>
                                        </td>

                                        {/* TOMBOL AKSI */}
                                        <td>
                                            {/* HANYA MUNCUL JIKA STATUS 'PENDING' (Sudah Upload Bukti) */}
                                            {statusRaw === 'pending' ? (
                                                <div className="action-buttons">
                                                    <button
                                                        onClick={() => handleApprove(item.id)}
                                                        className="btn-approve"
                                                        title="Terima Pembayaran"
                                                    >
                                                        ✔
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(item.id)}
                                                        className="btn-reject"
                                                        title="Tolak Pembayaran"
                                                    >
                                                        ✖
                                                    </button>
                                                </div>
                                            ) : (
                                                // Jika status Confirmed, beri tanda ceklis hijau kecil
                                                statusRaw === 'confirmed' && (
                                                    <span style={{ color: '#27ae60', fontWeight: 'bold' }}>✔ Tuntas</span>
                                                )
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}