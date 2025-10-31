// src/App.jsx

import React, { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import Gallery from "./sections/Gallery";
import MapSection from "./sections/MapSection";
import Comments from "./sections/Comments";
import SignIn from "./pages/SignIn"; // <-- Halaman baru
import SignUp from "./pages/SignUp"; // <-- Halaman baru

// Komponen Layout untuk halaman utama (yang punya Navbar dan Footer)
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Outlet akan merender konten halaman seperti Home, Gallery, dll. */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

// Komponen yang berisi semua section dari halaman utama Anda
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

export default function App() {
  const location = useLocation();

  // Logika untuk animasi scroll Anda
  useEffect(() => {
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

    // Terapkan observer ke semua elemen dengan class 'reveal'
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    // Cleanup function
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [location.pathname]); // <-- Jalankan ulang efek saat halaman berubah

  return (
    <Routes>
      {/* Rute untuk halaman utama yang menggunakan MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePageContent />} />
      </Route>

      {/* Rute untuk halaman Sign In & Sign Up (tanpa Navbar/Footer) */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}