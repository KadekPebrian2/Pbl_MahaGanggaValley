// src/sections/Home.jsx

import React from "react";

// Ini adalah komponen "Section" (bagian) khusus untuk Halaman Utama (Homepage)
export default function Home() {
  return (
    // <section> adalah tag HTML5 yang pas untuk sebuah "bagian" halaman.
    // id="home" ini penting agar link di Navbar (misal <a href="#home">)
    // bisa otomatis scroll ke bagian ini.
    <section id="home" className="home-section">
      <div className="container">
        <div className="home-inner">
          {/* Sisi kiri dari Hero, berisi teks */}
          <div className="hero-left">
            {/* 'reveal' adalah class untuk animasi (dideteksi oleh App.jsx).
              'style={{ '--delay': '0.1s' }}' adalah trik CSS Custom Property
              untuk membuat animasi muncul satu per satu (staggered effect).
            */}
            <div className="eyebrow reveal" style={{ '--delay': '0.1s' }}>
              Discover • Relax • Remember
            </div>
            <h1 className="hero-title reveal" style={{ '--delay': '0.2s' }}>
              Maha Gangga Valley
            </h1>
            <p className="hero-sub reveal" style={{ '--delay': '0.3s' }}>
              Lembah yang memeluk alam, udara segar, panorama hijau, dan
              pengalaman tak terlupakan.
            </p>

            {/* Bagian Tombol Aksi (Call to Action / CTA) */}
            <div className="hero-cta reveal" style={{ '--delay': '0.4s' }}>
              {/* href="#comments" adalah "anchor link". Saat diklik,
                browser akan scroll ke elemen yang punya id="comments".
              */}
              <a href="#comments" className="btn btn-primary">
                Booking Sekarang
              </a>
              <a href="#gallery" className="btn btn-outline">
                Lihat Gallery
              </a>
            </div>
          </div>

          {/* Sisi kanan dari Hero, berisi kartu gambar dekoratif.
            <aside> adalah tag HTML5 untuk konten sampingan.
            aria-hidden="true" memberitahu screen reader (alat bantu tunanetra)
            untuk mengabaikan elemen ini, karena ini hanya dekorasi.
          */}
          <aside
            className="hero-card reveal"
            aria-hidden="true"
            style={{ '--delay': '0.5s' }}
          >
            <div className="card-image" />
            <div className="card-accent">Experience Natural</div>
          </aside>
        </div>
      </div>
    </section>
  );
}