// src/sections/Home.jsx

import React from "react";
// 1. PENTING: Kita import komponen Link dari React Router
import { Link } from "react-router-dom"; 

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
              
              {/* --- BAGIAN INI YANG DIUBAH --- */}
              {/* Dulu: <a href="#comments">...</a> */}
              {/* Sekarang: Mengarah ke halaman /booking */}
              <Link to="/booking" className="btn btn-primary">
                Booking Sekarang
              </Link>
              {/* ----------------------------- */}

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
            <div className="card-image" />
            <div className="card-accent">Experience Natural</div>
          </aside>
        </div>
      </div>
    </section>
  );
}