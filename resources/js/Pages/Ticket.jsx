import React from 'react';
import { Head, Link } from '@inertiajs/react';
import '../../css/Ticket.css'; 

export default function Ticket({ booking }) {
    
    // 1. FORMAT RUPIAH
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    // 2. GENERATE KODE UNIK (BARU)
    // Fungsinya: Mengubah ID "13" menjadi kode keren "MGV-20251222-13"
    const generateUniqueCode = () => {
        if (!booking) return 'INVALID';
        // Hapus tanda strip pada tanggal: 2025-12-22 jadi 20251222
        const dateStr = booking.date ? booking.date.replace(/-/g, '') : '00000000'; 
        return `MGV-${dateStr}-${booking.id}`;
    };

    const uniqueCode = generateUniqueCode();

    const ticketData = {
        name: booking?.user?.name || booking?.name || 'Guest',
        bookingId: booking?.id ? `#${booking.id}` : '-',
        date: booking?.date || '-',
        quantity: booking?.qty ? `${booking.qty} Adult Tiket` : '-',
        totalPaid: booking?.total_price ? formatRupiah(booking.total_price) : '-',
        
        // Update URL agar isinya adalah uniqueCode tadi
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${uniqueCode}`,
    };

    return (
        <div className="ticket-container">
            <Head title={`E-Ticket #${booking?.id}`} />

            <div className="ticket-card">
                
                {/* --- HEADER --- */}
                <div className="ticket-header">
                    <Link href="/my-orders" className="back-button no-print">
                        <div style={{border:'2px solid white', borderRadius:'4px', width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            ←
                        </div>
                    </Link>
                    <div className="header-content">
                        <div className="logo-placeholder">
                            {/* Pastikan file logo ada di folder public/images/ */}
                            <img src="/images/logo.png" alt="Logo" style={{width:'100%', height:'100%', objectFit:'contain'}} />
                        </div>
                        <span className="header-title">E-Tiket To Maha Gangga Valley</span>
                    </div>
                </div>

                {/* --- BODY --- */}
                <div className="ticket-body">
                    
                    {/* BAGIAN UTAMA */}
                    <div className="main-section">
                        
                        <div className="payment-badge">
                            <div className="check-circle">✓</div>
                            <span>PAYMENT SUCCESSFUL</span>
                        </div>

                        <h2 className="ticket-title">Maha Gangga E-Tiket</h2>

                        <div className="content-wrapper">
                            
                            {/* Tabel Data */}
                            <table className="details-table">
                                <tbody>
                                    <tr>
                                        <td className="col-label">Name</td>
                                        <td className="col-value">{ticketData.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-label">Booking ID</td>
                                        <td className="col-value">{ticketData.bookingId}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-label">Date</td>
                                        <td className="col-value">{ticketData.date}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-label">Quantity</td>
                                        <td className="col-value">{ticketData.quantity}</td>
                                    </tr>
                                    <tr>
                                        <td className="col-label">Total Paid</td>
                                        <td className="col-value" style={{fontWeight:'bold', color:'#5D755B'}}>
                                            {ticketData.totalPaid}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* QR Code Area */}
                            <div className="qr-area">
                                <img src={ticketData.qrCodeUrl} alt="QR Code" className="qr-img" />
                                
                                {/* Menampilkan Kode Teks di bawah QR */}
                                <span className="scan-text" style={{fontWeight:'bold', marginTop:'5px', fontSize:'10px'}}>
                                    {uniqueCode}
                                </span>
                                <span className="scan-text">Scan at Entrance</span>
                            </div>

                        </div>
                    </div>

                    {/* BAGIAN SOBEKAN */}
                    <div className="stub-section">
                        <div className="vertical-text">
                            Maha Gangga Tiket
                        </div>
                    </div>

                </div>
            </div>

            {/* Tombol Print */}
            <button onClick={() => window.print()} className="no-print" style={{
                position:'fixed', bottom:'30px', right:'30px', padding:'15px', 
                borderRadius:'50%', background:'white', border:'1px solid #ccc', cursor:'pointer',
                boxShadow:'0 4px 10px rgba(0,0,0,0.1)'
            }}>
                🖨️
            </button>
        </div>
    );
}