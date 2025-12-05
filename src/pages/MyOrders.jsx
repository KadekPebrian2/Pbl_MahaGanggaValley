// src/pages/MyOrders.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/MyOrders.css"; 

export default function MyOrders() {
  // === DATA KOSONG (SESUAI PERMINTAAN) ===
  // Nanti array ini akan diisi otomatis dari Backend/Database
  const allOrders = []; 

  // State untuk Tab Filter (Tetap disiapkan logikanya)
  const [filter, setFilter] = useState("all");

  // Logika Filter (Akan menghasilkan array kosong juga karena sumbernya kosong)
  const filteredOrders = allOrders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  return (
    <div className="my-orders-section">
      
      {/* Header */}
      <div className="orders-header">
        <h2>Riwayat Pesanan</h2>
        <p>Pantau status tiket dan transaksi Anda.</p>
      </div>

      {/* Tabs Filter (Tetap ditampilkan agar UI tidak sepi) */}
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
          // === BAGIAN INI TIDAK AKAN MUNCUL SEKARANG ===
          filteredOrders.map((order) => (
            <div key={order.id} className={`order-card ${order.status}`}>
              <div className="order-info">
                <span className="order-id">#{order.id}</span>
                <span className="order-name">{order.item}</span>
                <span className="order-date">📅 {order.date}</span>
              </div>
              <div className="order-meta">
                <span className="order-price">Rp {order.total.toLocaleString("id-ID")}</span>
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          
          /* === TAMPILAN EMPTY STATE (INI YANG AKAN MUNCUL) === */
          <div className="empty-state">
            <div className="empty-icon-circle">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <h3>Belum ada riwayat pesanan</h3>
            <p>
              Anda belum melakukan transaksi apapun.<br/>
              Yuk, pesan tiket liburanmu sekarang!
            </p>
            <Link to="/booking" className="btn btn-primary" style={{marginTop:'15px', display:'inline-block'}}>
              Pesan Tiket Baru
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}