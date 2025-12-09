import React from "react";
// 1. Ganti import Library (Wajib di Inertia)
import { Link, Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout"; // Agar Navbar & Footer muncul

// 2. Import CSS (Pastikan file CSS sudah dipindah ke folder assets baru)
// Tanda @ mengarah ke folder resources/js
import "@/assets/styles/Success.css"; 

// Ikon Centang (SVG) - Tidak berubah
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

// Ikon WhatsApp Kecil - Tidak berubah
const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);

// 3. Terima data lewat 'props' (bookingData dikirim dari Controller nanti)
export default function Success({ bookingData }) {
  
  // Logic ambil nama user (fallback ke "Pengunjung" jika data kosong)
  const userName = bookingData?.name || "Pengunjung";
  const userEmail = bookingData?.email || "Email Anda";

  return (
    // 4. Bungkus dengan AppLayout agar ada Navbar & Footer
    <AppLayout>
      <Head title="Pembayaran Berhasil" />
      
      <div className="success-section">
        <div className="success-card">
          
          {/* Ikon Animasi */}
          <div className="icon-wrapper">
            <CheckIcon />
          </div>

          <h2 className="success-title">Bukti Diterima!</h2>
          
          <p className="success-desc">
            Terima kasih, <b>{userName}</b>. <br/>
            Bukti pembayaran Anda telah masuk ke sistem kami. 
            Admin akan memverifikasi dalam waktu maksimal 1x24 jam.
          </p>

          {/* Ringkasan Info */}
          <div className="info-summary">
            <div className="info-row">
              <span>Status:</span>
              <span style={{color: '#e67e22', fontWeight: 'bold'}}>Menunggu Konfirmasi</span>
            </div>
            <div className="info-row">
              <span>Tiket akan dikirim ke:</span>
              <strong>{userEmail}</strong>
            </div>
          </div>

          {/* 5. Ganti 'to' menjadi 'href' */}
          <Link href="/" className="btn-home">
            Kembali ke Beranda
          </Link>

          {/* Tombol Bantuan WA */}
          <a 
            href="https://wa.me/6281234567890?text=Halo%20Admin%2C%20saya%20sudah%20kirim%20bukti%20pembayaran%20mohon%20dicek." 
            target="_blank" 
            rel="noreferrer"
            className="wa-link"
          >
            <WaIcon /> Butuh konfirmasi cepat? Hubungi Admin
          </a>

        </div>
      </div>
    </AppLayout>
  );
}