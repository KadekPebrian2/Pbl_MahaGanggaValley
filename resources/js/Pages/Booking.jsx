import React, { useState, useEffect } from "react";
// 1. GANTI IMPORT: Pakai Inertia untuk Link, Head, dan Router
import { Link, Head, router } from "@inertiajs/react";
import AppLayout from '@/Layouts/AppLayout';

export default function Booking() {
  const TICKET_PRICE = 15000;

  // --- STATE ---
  const [qty, setQty] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    phone: "",
    email: "",
    address: ""
  });

  // Hitung Total Otomatis
  const totalPrice = qty * TICKET_PRICE;

  // Scroll ke atas saat halaman dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- HANDLERS ---
  const handleQty = (operation) => {
    setQty((prev) =>
      operation === "inc" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 3. LOGIKA PINDAH HALAMAN (INERTIA WAY)
    // Kita gunakan router.post untuk mengirim data ke halaman payment
    router.post('/booking-store', {
      ...formData,
      qty: qty,
      total_price: totalPrice // Saran: gunakan snake_case biar cocok sama database nanti
    });
  };

  return (
    // 4. WRAPPER LAYOUT: Agar Navbar dan Footer tetap muncul
    <AppLayout>
      <Head title="Booking Tiket" />

      <div className="booking-section">

        {/* === KIRI: FORMULIR === */}
        <div className="booking-left">

          <div className="header-simple">
            <h2 style={{ lineHeight: "1.2", marginBottom: "35px" }}>
              Booking Tiket To<br />
              <span style={{ color: "#8fa38c", fontWeight: "400" }}>Maha Gangga</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">

            {/* Nama */}
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input
                type="text" name="name" className="form-input"
                placeholder="Contoh: Budi Santoso" required
                value={formData.name} onChange={handleInput}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email" name="email" className="form-input"
                placeholder="budi@example.com" required
                value={formData.email} onChange={handleInput}
              />
            </div>

            {/* No HP */}
            <div className="form-group">
              <label className="form-label">Nomor WhatsApp</label>
              <input
                type="tel" name="phone" className="form-input"
                placeholder="0812xxxx" required
                value={formData.phone} onChange={handleInput}
              />
            </div>

            {/* Alamat */}
            <div className="form-group">
              <label className="form-label">Alamat</label>
              <textarea
                name="address" className="form-textarea"
                placeholder="Alamat lengkap..." required
                value={formData.address} onChange={handleInput}
                style={{ height: "50px" }}
              />
            </div>

            {/* Tanggal & Jumlah Tiket */}
            <div className="form-group form-row">
              <div>
                <label className="form-label">Tanggal</label>
                <input
                  type="date" name="date" className="form-input" required
                  value={formData.date} onChange={handleInput}
                  style={{ height: "42px" }}
                />
              </div>
              <div>
                <label className="form-label">Jumlah Tiket</label>
                <div className="ticket-input-group">
                  <button type="button" className="ticket-btn" onClick={() => handleQty("dec")}>-</button>
                  <span className="ticket-display">{qty}</span>
                  <button type="button" className="ticket-btn" onClick={() => handleQty("inc")}>+</button>
                </div>
              </div>
            </div>

            {/* Total Harga */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px", marginBottom: "10px", fontWeight: "bold", color: "#4b5945" }}>
              <span>Total Tagihan:</span>
              <span style={{ fontSize: "1.1rem" }}>Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>

            <button type="submit" className="btn-book">
              Booking Sekarang
            </button>

          </form>
        </div>

        {/* === KANAN: GAMBAR & TOMBOL KEMBALI === */}
        <div className="booking-right">
          <div className="right-content">
            <h2>Pemesanan Tiket<br />Maha Gangga Valley</h2>
            <p>Rasakan keindahan alam yang sesungguhnya.</p>

            <Link href="/" className="btn-back-home">
              <span>&#8592;</span> Kembali ke Utama
            </Link>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}