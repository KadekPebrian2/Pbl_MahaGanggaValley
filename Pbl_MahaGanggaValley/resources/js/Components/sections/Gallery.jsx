// resources/js/Components/sections/Gallery.jsx

import React, { useEffect, useRef, useState } from "react";

// Data gambar sekarang menggunakan variabel import tadi, bukan string path.
const galleryImages = [
  { src: "/images/g1.jpg", title: "Spot #1", sub: "Bentuk bangunan yang unik." },
  { src: "/images/g2.jpg", title: "Spot #2", sub: "Pemandangan sawah terasering." },
  { src: "/images/g3.jpg", title: "Spot #3", sub: "Jembatan ikonik di atas lembah." },
  { src: "/images/g4.jpg", title: "Spot #4", sub: "Suasana pagi yang menyegarkan." },
  { src: "/images/g5.jpg", title: "Spot #5", sub: "Interior penginapan yang nyaman." },
];

export default function Gallery({ images = galleryImages }) {
  
  // --- LOGIKA DI BAWAH INI TIDAK ADA YANG DIUBAH (SUDAH AMAN) ---
  
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const length = images.length;

  const startAutoSlider = () => {
    stopAutoSlider(); 
    timerRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % length);
    }, 4000);
  };

  const stopAutoSlider = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoSlider();
    return () => stopAutoSlider();
  }, [length]);

  const goToPrev = () => setIndex((prevIndex) => (prevIndex - 1 + length) % length);
  const goToNext = () => setIndex((prevIndex) => (prevIndex + 1) % length);

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-head reveal">
          <h3>Galeri & Cerita</h3>
          <p>
            Nikmati keindahan alam yang memukau dan sudut-sudut estetik yang kami tawarkan.
          </p>
        </div>

        <div className="slider-wrap reveal" style={{ '--delay': '0.2s' }}>
          
          <button
            className="slide-btn left"
            onClick={goToPrev}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className="slider-viewport"
            onMouseEnter={stopAutoSlider}
            onMouseLeave={startAutoSlider}
          >
            <div
              className="slider-track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {images.map((img, i) => (
                <figure key={i} className="slide-item">
                  <img src={img.src} alt={img.title} />
                  <figcaption>
                    <div className="cap-title">{img.title}</div>
                    <div className="cap-sub">{img.sub}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <button
            className="slide-btn right"
            onClick={goToNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}