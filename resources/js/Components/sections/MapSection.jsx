// src/sections/MapSection.jsx

import React from "react";

export default function MapSection() {
  return (
    // Bagian section dengan id="map" (untuk anchor link)
    <section id="map" className="map-section">
      <div className="container">
        {/* Judul section, juga dengan animasi 'reveal' */}
        <div className="section-head reveal">
          <h3>Map Maha Gangga Valley</h3>
          <p>
            Temukan jalan menuju Maha Gangga Valley. Mudah dicari dan penuh
            pemandangan.
          </p>
        </div>

        {/* Pembungkus untuk iframe peta */}
        <div className="map-frame reveal" style={{ '--delay': '0.2s', marginTop: '-10px' }}>
          
          <iframe
            // 'title' penting untuk aksesibilitas (dibaca screen reader)
            title="Maha Gangga Valley Map"
            // 'src' adalah URL dari konten yang ingin ditanam
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d507.8264946146458!2d115.59009068360953!3d-8.405861937063156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd207006ba954ad%3A0x9ef49f943e5d390d!2sMaha%20Gangga%20Valley%20Restaurant!5e0!3m2!1sid!2sid!4v1761021349423!5m2!1sid!2sid"
            
            width="100%"   
            height="600"   
            
            // style={{ border: 0 }} untuk menghilangkan garis batas bawaan iframe
            style={{ border: 0 }}
            allowFullScreen=""
            // 'loading="lazy"' adalah optimasi PENTING!
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}