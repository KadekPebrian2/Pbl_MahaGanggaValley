// src/App.jsx

import React, { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";

// --- IMPORT KOMPONEN ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// --- IMPORT SECTIONS (HALAMAN UTAMA) ---
import Home from "./sections/Home";
import Gallery from "./sections/Gallery"; 
import MapSection from "./sections/MapSection";
import Comments from "./sections/Comments";

// --- IMPORT PAGES ---
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Booking from "./pages/Booking"; 
import Payment from "./pages/Payment"; 
import Success from "./pages/Success"; // <--- IMPORT HALAMAN BARU
import MyOrders from "./pages/MyOrders";

// Layout Utama (Navbar + Footer)
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

// Konten Halaman Depan
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

  // Scroll ke atas saat pindah halaman
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Animasi Reveal (Scroll Animation)
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
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [location.pathname]);

  return (
    <Routes>
      {/* GRUP 1: Halaman dengan Navbar & Footer */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePageContent />} />
        
        {/* Rute Booking */}
        <Route path="booking" element={<Booking />} />
        
        {/* Rute Payment */}
        <Route path="payment" element={<Payment />} />

        {/* Rute Success (Halaman Konfirmasi) */}
        <Route path="success" element={<Success />} /> 

        <Route path="my-orders" element={<MyOrders />} />
      </Route>

      {/* GRUP 2: Halaman Login/Register (Tanpa Navbar/Footer) */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}