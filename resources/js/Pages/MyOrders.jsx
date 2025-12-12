import React, { useState } from "react";
import { Link, Head } from "@inertiajs/react"; 
import AppLayout from "@/Layouts/AppLayout"; 
import '../../css/MyOrders.css';

// 1. TERIMA PROPS 'bookings' DARI CONTROLLER
export default function MyOrders({ bookings }) {
  
  // Kita gunakan data dari props 'bookings' sebagai data utama
  // Jika bookings null/undefined, kita pakai array kosong [] biar aman
  const allOrders = bookings || []; 

  // State untuk Tab Filter
  const [filter, setFilter] = useState("all");

  // Logika Filter (Sesuai status di database: 'Pending', 'Paid', dll)
  const filteredOrders = allOrders.filter(order => {
    if (filter === "all") return true;
    
    // Sesuaikan dengan status database kamu: 'Pending' atau 'Paid'
    if (filter === 'pending') return order.status === 'Pending';
    if (filter === 'success') return order.status === 'Paid';
    
    return true;
  });

  return (
    <AppLayout>
      <Head title="Riwayat Pesanan" />

      <div className="my-orders-section">
        
        <div className="orders-header">
          <h2>Riwayat Pesanan</h2>
          <p>Pantau status tiket dan transaksi Anda.</p>
        </div>

        {/* Tabs Filter */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            Semua
          </button>
          <button 
            className={`tab-btn ${filter === 'pending' ? 'active' : ''}`} 
            onClick={() => setFilter('pending')}
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

        {/* List Pesanan */}
        <div className="orders-list">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className={`order-card ${order.status.toLowerCase()}`}>
                <div className="order-info">
                  <span className="order-id">#{order.id}</span>
                  <span className="order-name">Tiket Masuk ({order.qty} Org)</span>
                  
                  {/* Format Tanggal */}
                  <span className="order-date">📅 {order.date}</span>
                </div>
                
                <div className="order-meta">
                  {/* Format Harga */}
                  <span className="order-price">
                    Rp {Number(order.total_price).toLocaleString("id-ID")}
                  </span>
                  
                  {/* Badge Status */}
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status === 'Paid' ? 'Lunas' : order.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            /* === TAMPILAN EMPTY STATE === */
            <div className="empty-state">
              <div className="empty-icon-circle">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <h3>Belum ada riwayat pesanan</h3>
              <p>
                Anda belum melakukan transaksi apapun.<br/>
                Yuk, pesan tiket liburanmu sekarang!
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