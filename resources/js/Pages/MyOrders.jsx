import React, { useState } from "react";
import { Link, Head } from "@inertiajs/react"; 
import AppLayout from "@/Layouts/AppLayout"; 
import '../../css/MyOrders.css';

export default function MyOrders({ bookings }) {
  
  const allOrders = bookings || []; 
  const [filter, setFilter] = useState("all");

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  // --- LOGIKA FILTER (DIPERBAIKI) ---
  const filteredOrders = allOrders.filter(order => {
    const status = order.status ? order.status.toLowerCase() : 'unknown';

    // 1. ATURAN MUTLAK: Buang yang 'unpaid' (Belum Bayar)
    // Sesuai permintaan: anggap ini user iseng/cuma cek harga.
    if (status === 'unpaid') {
        return false; // HILANGKAN DARI SEMUA TAB
    }

    // 2. Logika Tab Navigasi
    if (filter === "all") {
        return true; // Tampilkan sisanya (Pending & Confirmed & Rejected)
    }
    
    if (filter === 'waiting') {
        return status === 'pending'; // Hanya yang sudah upload bukti
    }
    
    if (filter === 'success') {
        return status === 'confirmed'; // Hanya yang lunas
    }
    
    return false;
  });

  return (
    <AppLayout>
      <Head title="Riwayat Pesanan" />

      <div className="my-orders-section">
        
        <div className="orders-header">
          <h2>Riwayat Pesanan</h2>
          <p>Pantau status tiket dan transaksi Anda.</p>
        </div>

        {/* --- TABS FILTER --- */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            Semua
          </button>
          <button 
            className={`tab-btn ${filter === 'waiting' ? 'active' : ''}`} 
            onClick={() => setFilter('waiting')}
          >
            Menunggu Verifikasi
          </button>
          <button 
            className={`tab-btn ${filter === 'success' ? 'active' : ''}`} 
            onClick={() => setFilter('success')}
          >
            Berhasil
          </button>
        </div>

        {/* --- LIST PESANAN --- */}
        <div className="orders-list">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
                const statusRaw = order.status ? order.status.toLowerCase() : 'unknown';
                
                let statusText = statusRaw;
                if(statusRaw === 'confirmed') statusText = 'Lunas';
                if(statusRaw === 'pending') statusText = 'Verifikasi Admin';
                if(statusRaw === 'rejected') statusText = 'Ditolak';

                return (
                  <div key={order.id} className={`order-card ${statusRaw}`}>
                    <div className="order-info">
                      <span className="order-id">#{order.id}</span>
                      <h4 style={{margin:'5px 0', color:'#111827'}}>Tiket Masuk ({order.qty} Org)</h4>
                      
                      <span className="order-date">📅 {order.date}</span>
                    </div>
                    
                    <div className="order-meta">
                      <span className="order-price">
                        {formatRupiah(order.total_price)}
                      </span>
                      
                      <span className={`status-badge status-${statusRaw}`}>
                        {statusText}
                      </span>
                    </div>
                  </div>
                );
            })
          ) : (
            /* --- TAMPILAN JIKA KOSONG --- */
            <div className="empty-state">
              <div className="empty-icon-circle">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <h3>Belum ada riwayat pesanan</h3>
              <p>
                Pesanan yang belum dibayar tidak akan muncul di sini.<br/>
                Silakan lakukan pemesanan baru.
              </p>
              
              <Link href="/booking" className="btn btn-primary" style={{marginTop:'15px', display:'inline-block'}}>
                Pesan Tiket Baru
              </Link>
            </div>
          )}
        </div>

      </div>
    </AppLayout>
  );
}