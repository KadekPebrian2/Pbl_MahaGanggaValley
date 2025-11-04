// src/sections/Gallery.jsx

// Kita butuh 'useEffect' (untuk timer), 'useRef' (menyimpan timer),
// dan 'useState' (menyimpan slide yang aktif)
import React, { useEffect, useRef, useState } from "react";

// Data gambar-gambar galeri. Ditaruh di luar komponen
// agar tidak dibuat ulang setiap kali komponen render.
const galleryImages = [
  { src: "/images/g1.jpg", title: "Spot #1", sub: "Bentuk bangunan yang unik." },
  { src: "/images/g2.jpg", title: "Spot #2", sub: "Pemandangan sawah terasering." },
  { src: "/images/g3.jpg", title: "Spot #3", sub: "Jembatan ikonik di atas lembah." },
  { src: "/images/g4.jpg", title: "Spot #4", sub: "Suasana pagi yang menyegarkan." },
  { src: "/images/g5.jpg", title: "Spot #5", sub: "Interior penginapan yang nyaman." },
];

// 'images = galleryImages' berarti jika komponen ini dipakai
// tanpa mengirim 'props' images, ia akan otomatis pakai 'galleryImages' di atas.
export default function Gallery({ images = galleryImages }) {
  
  // --- STATE & REF ---
  
  // 'index' adalah state untuk melacak slide mana yang sedang aktif (dimulai dari 0).
  const [index, setIndex] = useState(0);

  // 'timerRef' digunakan untuk menyimpan ID dari 'setInterval' (timer).
  // Kita pakai 'useRef' (bukan 'useState') karena perubahan ref
  // *tidak akan* memicu komponen untuk render ulang, cocok untuk menyimpan timer.
  const timerRef = useRef(null);
  
  // Menyimpan panjang array agar mudah dipakai.
  const length = images.length;

  // --- FUNCTIONS (Fungsi) ---

  // Fungsi untuk memulai slider otomatis
  const startAutoSlider = () => {
    stopAutoSlider(); // Hentikan dulu timer lama (jika ada)
    // 'setInterval' akan menjalankan fungsi di dalamnya setiap 4000ms (4 detik)
    timerRef.current = setInterval(() => {
      // (prevIndex + 1) % length adalah trik matematika (modulo)
      // untuk "looping". Contoh: (4 + 1) % 5 = 0. (Kembali ke slide pertama)
      setIndex((prevIndex) => (prevIndex + 1) % length);
    }, 4000);
  };

  // Fungsi untuk menghentikan slider otomatis
  const stopAutoSlider = () => {
    // Jika ada timer yang tersimpan di ref, hentikan (clear)
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // --- EFFECT (Efek Samping) ---

  // 'useEffect' ini akan berjalan *setelah* komponen pertama kali muncul di layar.
  useEffect(() => {
    startAutoSlider(); // Langsung jalankan slider otomatis

    // 'return' function di dalam useEffect adalah "cleanup function".
    // Ini akan dipanggil saat komponen akan 'hilang' (unmount).
    // Sangat penting untuk membersihkan timer agar tidak ada "memory leak".
    return () => stopAutoSlider();
  }, [length]); // Dependency array [length], efek ini akan jalan ulang jika panjang gambar berubah.

  // Fungsi untuk tombol "Sebelumnya"
  const goToPrev = () => setIndex((prevIndex) => (prevIndex - 1 + length) % length);
  // Fungsi untuk tombol "Berikutnya"
  const goToNext = () => setIndex((prevIndex) => (prevIndex + 1) % length);

  // --- RENDER (Tampilan JSX) ---
  
  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        {/* Bagian Judul Section */}
        <div className="section-head reveal">
          <h3>Galeri & Cerita</h3>
          <p>
            {/* ... (deskripsi galeri) ... */}
          </p>
        </div>

        {/* Wrapper untuk seluruh slider */}
        <div className="slider-wrap reveal" style={{ '--delay': '0.2s' }}>
          
          {/* Tombol Navigasi Kiri */}
          <button
            className="slide-btn left"
            onClick={goToPrev}
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Viewport: Bagian yang terlihat dari slider */}
          <div
            className="slider-viewport"
            // Saat mouse masuk, hentikan slider
            onMouseEnter={stopAutoSlider}
            // Saat mouse keluar, jalankan lagi slidernya
            onMouseLeave={startAutoSlider}
          >
            {/* Track: "Rel" panjang yang berisi semua gambar */}
            <div
              className="slider-track"
              // Ini adalah "sihir"-nya:
              // Kita geser "rel" ini ke kiri sebesar (index * 100)%
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {/* Kita "looping" data gambar dan membuat satu <figure> untuk tiap gambar */}
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

          {/* Tombol Navigasi Kanan */}
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


  