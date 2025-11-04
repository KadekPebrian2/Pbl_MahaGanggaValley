// src/App.jsx

import React, { useEffect } from "react";
// 1. Import "alat-alat" penting dari React Router
import { Routes, Route, Outlet, useLocation } from "react-router-dom"; //

// 2. Import semua komponen "Layout"
import Navbar from "./components/Navbar"; //
import Footer from "./components/Footer"; //

// 3. Import semua "Section" untuk Halaman Utama
import Home from "./sections/Home"; //
import Gallery from "./sections/Gallery"; //
import MapSection from "./sections/MapSection"; //
import Comments from "./sections/Comments"; //

// 4. Import semua "Page" mandiri
import SignIn from "./pages/SignIn"; //
import SignUp from "./pages/SignUp"; //

/**
 * 5. Komponen 'MainLayout' (Template Halaman Utama)
 * Ini adalah template untuk halaman-halaman yang SELALU punya Navbar dan Footer.
 */
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/*
          6. <Outlet> (Tempat Konten)
          Ini adalah "placeholder" ajaib. React Router akan secara otomatis
          mengganti <Outlet> ini dengan komponen yang cocok dengan rute-anaknya.
        */}
        <Outlet /> {/* */}
      </main>
      <Footer />
    </>
  );
};

/**
 * 7. Komponen 'HomePageContent' (Pengelompok)
 * Dibuat agar <App> lebih rapi. Isinya adalah gabungan
 * semua "section" yang ada di halaman utama.
 */
const HomePageContent = () => {
  return (
    <>
      <Home />
      <Gallery />
      <MapSection />
      <Comments />
    </>
  );
};

// 8. Komponen Inti <App>
export default function App() {
  // 'useLocation' memberi kita info URL saat ini,
  // kita butuh 'location.pathname' (misal: "/" atau "/signin")
  const location = useLocation(); //

  // 9. Efek Animasi 'Reveal'
  // 'useEffect' ini akan berjalan setiap kali 'location.pathname' berubah
  useEffect(() => {
    // ... (Logika IntersectionObserver Anda untuk class 'reveal') ...
    //
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    // Cleanup function (penting!)
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [location.pathname]); // <-- INI KUNCINYA: Jalankan ulang efek saat pindah halaman

  // 10. Definisi Peta Rute (Sitemap)
  return (
    // <Routes> adalah "papan sirkuit" yang berisi semua rute
    <Routes>
      {/*
        RUTE GRUP 1: Halaman dengan Layout (Navbar/Footer)
        Semua rute yang ada DI DALAM <Route path="/"> ini
        akan otomatis menggunakan <MainLayout /> sebagai template.
      */}
      <Route path="/" element={<MainLayout />}> {/* */}
        {/*
          'index' berarti ini adalah rute default untuk "/".
          Hasilnya: URL "/" -> tampilkan <MainLayout> + <HomePageContent> di <Outlet>-nya
        */}
        <Route index element={<HomePageContent />} /> {/* */}
        {/* (Anda bisa tambah rute lain di sini, misal <Route path="about" ... />) */}
      </Route>

      {/*
        RUTE GRUP 2: Halaman Mandiri (TANPA Layout)
        Rute-rute ini ada DI LUAR grup "/".
        Artinya, mereka TIDAK akan dibungkus oleh <MainLayout />.
      */}
      <Route path="/signin" element={<SignIn />} /> {/* */}
      <Route path="/signup" element={<SignUp />} /> {/* */}
    </Routes>
  );
}