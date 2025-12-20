import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react"; // Pengganti useLocation
import Navbar from "@/Components/Navbar";   // Pastikan path import benar
import Footer from "@/Components/Footer";   // Tanda @ biasanya mengarah ke resources/js

// Kita terima 'children' (isi halaman) sebagai props
export default function AppLayout({ children }) {
  const { url } = usePage(); // Untuk mendeteksi perpindahan halaman

  // 1. Scroll ke atas saat pindah halaman
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [url]);

  // 2. Animasi Reveal (Scroll Animation)
  // Kita pasang ulang observer setiap kali halaman (url) berubah
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Cari elemen dengan class .reveal di dalam children yang baru dimuat
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    // Bersihkan observer saat komponen dicopot
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [url]); 

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Navbar selalu ada di atas */}
      <Navbar />

      {/* Main Content (Pengganti Outlet) */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer selalu ada di bawah */}
      <Footer />
    </div>
  );
}