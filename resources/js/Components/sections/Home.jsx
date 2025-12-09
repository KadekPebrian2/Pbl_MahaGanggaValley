// resources/js/Components/sections/Home.jsx

import React from "react";
// Import Link dari Inertia (bukan react-router-dom)
import { Link } from '@inertiajs/react';

export default function Home() {
  return (
    <section id="home" className="home-section">
      <div className="container">
        <div className="home-inner">
          <div className="hero-left">
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

            <div className="hero-cta reveal" style={{ '--delay': '0.4s' }}>
              
              {/* --- PERUBAHAN DI SINI --- */}
              {/* Ganti prop 'to' menjadi 'href' */}
              <Link href="/booking" className="btn btn-primary">
                Booking Sekarang
              </Link>
              {/* ------------------------- */}

              {/* Link Anchor (#) biarkan saja pakai tag <a> biasa */}
              <a href="#gallery" className="btn btn-outline">
                Lihat Gallery
              </a>
            </div>
          </div>

          <aside
            className="hero-card reveal"
            aria-hidden="true"
            style={{ '--delay': '0.5s' }}
          >
            {/* Class ini akan memanggil gambar dari CSS background-image */}
            <div className="card-image" />
            <div className="card-accent">Experience Natural</div>
          </aside>
        </div>
      </div>
    </section>
  );
}