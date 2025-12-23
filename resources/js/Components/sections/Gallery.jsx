import React, { useEffect, useRef, useState } from "react";

const galleryImages = [
  // Gunakan salah satu nama file yang ada di screenshot folder Anda
  { src: "/images/gallery/1766384199_IMG_5559.JPG", title: "Spot #1", sub: "Bentuk bangunan yang unik." },
  { src: "/images/gallery/DSC04097.JPG", title: "Spot #2", sub: "Pemandangan sawah terasering." },
];

export default function Gallery({ items = [] }) {

  const displayImages = items.length > 0
    ? items.map(img => ({
      src: `/images/gallery/${img.namaFile}`, // Pastikan path mengarah ke /storage/
      title: img.judul,
      sub: img.deskripsi
    }))
    : galleryImages;

  // --- LOGIKA SLIDER (TIDAK BERUBAH) ---
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const length = displayImages.length;

  const startAutoSlider = () => {
    stopAutoSlider();
    timerRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % length);
    }, 4000);
  };

  const stopAutoSlider = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startAutoSlider();
    return () => stopAutoSlider();
  }, [length]);

  const goToPrev = () => setIndex((prevIndex) => (prevIndex - 1 + length) % length);
  const goToNext = () => setIndex((prevIndex) => (prevIndex + 1) % length);

  return (
    <section id="gallery" className="gallery-section" style={{ marginBottom: '50px' }}>
      <div className="container">
        <div className="section-head reveal">
          <h3>Galeri & Cerita</h3>
          <p>Nikmati keindahan alam yang memukau dan sudut-sudut estetik.</p>
        </div>

        <div className="slider-wrap reveal" style={{ '--delay': '0.2s' }}>
          <button className="slide-btn left" onClick={goToPrev}>‹</button>

          <div className="slider-viewport" onMouseEnter={stopAutoSlider} onMouseLeave={startAutoSlider}>
            <div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
              {displayImages.map((img, i) => (
                <figure key={i} className="slide-item">
                  {/* PERBAIKAN: Tambahkan onError agar jika link error, gambar tidak hilang */}
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{
                      width: '100%',        // Lebar penuh
                      height: '375px',      //tinggi tetap
                      objectFit: 'cover'    // Wajib ada biar gambar tidak gepeng
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      // Pastikan path ini sama dengan yang ada di folder public/images/gallery/
                      e.target.src = "/images/gallery/g4.jpg_1766043720.png";
                    }}
                  />
                  <figcaption>
                    <div className="cap-title">{img.title}</div>
                    <div className="cap-sub">{img.sub}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <button className="slide-btn right" onClick={goToNext}>›</button>
        </div>
      </div>
    </section>
  );
}