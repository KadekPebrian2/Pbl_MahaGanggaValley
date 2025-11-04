// src/sections/Comments.jsx

// Kita butuh 'useEffect' (untuk load/save data) dan 'useState' (untuk data form & list)
import React, { useEffect, useState } from "react";

export default function Comments() {
  
  // --- STATE ---
  
  // State 'comments' (bentuknya array) untuk menyimpan DAFTAR komentar.
  const [comments, setComments] = useState([]);
  
  // State 'form' (bentuknya objek) untuk menyimpan NILAI INPUT dari form
  // (Nama dan Teks Komentar). Ini disebut "Controlled Component".
  const [form, setForm] = useState({ name: "", text: "" });

  // --- EFFECTS (untuk localStorage) ---

  // Efek ini berjalan HANYA SATU KALI saat komponen pertama kali muncul
  // (karena dependency array-nya kosong: []).
  // Tugasnya: MEMBACA data dari localStorage.
  useEffect(() => {
    // Ambil data dari localStorage dengan kunci "mg_comments"
    const savedComments = localStorage.getItem("mg_comments");
    // Jika ada data yang tersimpan...
    if (savedComments) {
      // Ubah data (yang tadinya string JSON) kembali menjadi array/objek JavaScript
      // lalu simpan ke dalam state 'comments'.
      setComments(JSON.parse(savedComments));
    }
  }, []); // <-- Array kosong, berarti "hanya jalan sekali saat mount"

  // Efek ini berjalan SETIAP KALI state 'comments' BERUBAH
  // (karena dependency array-nya: [comments]).
  // Tugasnya: MENYIMPAN data ke localStorage.
  useEffect(() => {
    // Simpan state 'comments' ke localStorage.
    // 'JSON.stringify' mengubah array/objek JavaScript menjadi string
    // karena localStorage hanya bisa menyimpan string.
    localStorage.setItem("mg_comments", JSON.stringify(comments));
  }, [comments]); // <-- Array berisi 'comments', berarti "jalan tiap 'comments' berubah"

  // --- FUNCTIONS (Handler) ---

  // Fungsi ini dipanggil saat form di-submit
  const handleSubmit = (e) => {
    // Mencegah halaman me-refresh (perilaku default form HTML)
    e.preventDefault();
    
    // Validasi sederhana: jangan kirim jika teks komentar kosong
    if (!form.text.trim()) return; 

    // Update state 'comments'
    // Ini adalah pola "immutable update":
    // 1. Buat komentar baru (objek { name, text })
    // 2. Buat array BARU yang berisi [komentar_baru, ...semua_komentar_lama]
    // Ini akan menaruh komentar baru di PALING ATAS daftar.
    setComments([{ name: form.name, text: form.text }, ...comments]);
    
    // Setelah kirim, kosongkan kembali input form
    setForm({ name: "", text: "" });
  };

  // Fungsi ini dipanggil saat tombol hapus (X) diklik
  const removeComment = (indexToDelete) => {
    // Tampilkan kotak konfirmasi
    if (window.confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
      // Buat array baru dengan "menyaring" (filter) komentar
      // Kita HANYA AKAN simpan komentar yang 'index'-nya TIDAK SAMA DENGAN 'indexToDelete'
      const updatedComments = comments.filter(
        (_, index) => index !== indexToDelete
      );
      // Simpan array baru tersebut sebagai state
      setComments(updatedComments);
    }
  };

  // --- RENDER (Tampilan JSX) ---

  return (
    <section id="comments" className="comments-section">
      <div className="container">
        {/* Judul Section */}
        <div className="section-head reveal">
          <h3>Komentar Pengunjung</h3>
          <p>Tinggalkan Pengalamanmu</p>
        </div>

        {/* Wrapper Form Komentar */}
        <div className="comment-form-wrapper reveal" style={{ '--delay': '0.2s' }}>
          {/* Form di-handle oleh fungsi 'handleSubmit' saat di-submit */}
          <form className="comment-form" onSubmit={handleSubmit}>
            {/* Ini adalah "Controlled Input".
              'value'-nya diatur oleh state 'form.name'.
              'onChange'-nya akan meng-update state 'form.name' setiap kali diketik.
            */}
            <input
              placeholder="Nama"
              value={form.name}
              // setForm({ ...form, ... }) adalah trik untuk update satu properti
              // di dalam state objek, tanpa menghapus properti lainnya.
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <textarea
              placeholder="Tambahkan Komentarmu...."
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              required // Atribut HTML5, form tidak bisa dikirim jika ini kosong
            />
            <div className="comment-form-actions">
              {/* Tombol type="submit" akan memicu 'onSubmit' pada <form> */}
              <button type="submit" className="btn btn-primary">
                KIRIM
              </button>
              {/* Tombol type="button" HANYA tombol biasa, tidak memicu submit form */}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setForm({ name: "", text: "" })} // Reset form
              >
                RESET
              </button>
            </div>
          </form>
        </div>

        {/* Wadah untuk Daftar Komentar */}
        <div className="comments-list-container reveal" style={{ '--delay': '0.4s' }}>
          
          {/* --- Render Kondisional (Conditional Rendering) --- */}
          {/* Jika panjang array comments adalah 0 (kosong)... */}
          {comments.length === 0 ? (
            // ...tampilkan pesan ini.
            <p className="muted" style={{ textAlign: "center" }}>
              Belum ada komentar — jadilah yang pertama!
            </p>
          ) : (
            // ...JIKA TIDAK, tampilkan daftar komentar:
            <div className="comments-list">
              {/* Looping (mapping) array 'comments'.
                Untuk setiap 'comment' di dalam array, render satu <article>.
              */}
              {comments.map((comment, index) => (
                <article key={index} className="comment-card">
                  {/* Tombol Hapus */}
                  <button
                    className="delete-comment-btn"
                    // Kita pakai arrow function () => ... di sini
                    // agar 'removeComment(index)' HANYA dipanggil saat di-klik,
                    // bukan saat render.
                    onClick={() => removeComment(index)}
                    aria-label="Hapus komentar"
                  >
                    ×
                  </button>
                  {/* Tampilkan nama. Jika nama kosong, tampilkan "Pengunjung" */}
                  <strong>{comment.name.trim() || "Pengunjung"}</strong>
                  <p className="body">"{comment.text}"</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}