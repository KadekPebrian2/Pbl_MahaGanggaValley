import React from "react";
import { Link, Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import '../../css/Success.css'; // Pastikan path ini sesuai dengan lokasi file CSS Anda

export default function Success({ bookingData }) {
  
  // Fallback nama jika data kosong
  const userName = bookingData?.name || "Pengunjung";

  return (
    <AppLayout>
      <Head title="Pembayaran Berhasil" />

      <div className="success-section">
        <div className="success-card">
          
          {/* Ikon Animasi Centang */}
          <div className="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h1 className="success-title">Bukti Diterima!</h1>
          
          <p className="success-desc">
            Terima kasih, <strong>{userName}</strong>.<br/>
            Pembayaran Anda telah kami terima. Admin akan memverifikasi dalam waktu maksimal 1x24 jam.
          </p>

          {/* Tombol Utama: Ke Riwayat Pesanan */}
          <Link href="/my-orders" className="btn-home">
            Lihat Pesanan Saya
          </Link>

          {/* Tombol Sekunder: Ke Beranda */}
          <Link href="/" className="btn-secondary">
            Kembali ke Beranda
          </Link>

          {/* Link Bantuan WhatsApp */}
          <a 
            href="https://wa.me/6281234567890?text=Halo%20Admin%2C%20saya%20sudah%20kirim%20bukti%20pembayaran%20mohon%20dicek." 
            target="_blank" 
            rel="noreferrer"
            className="wa-link"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            Butuh bantuan cepat? Chat Admin
          </a>

        </div>
      </div>
    </AppLayout>
  );
}