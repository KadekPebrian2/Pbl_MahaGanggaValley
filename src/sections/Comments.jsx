// src/sections/Comments.jsx
import React, { useEffect, useState } from "react";

// --- KOMPONEN IKON BINTANG ---
const StarIcon = ({ filled, onClick, size = 24 }) => (
  <svg
    onClick={onClick}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "#ffc107" : "#e4e5e9"}
    stroke={filled ? "#ffc107" : "#cbd5e1"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ cursor: onClick ? "pointer" : "default", transition: "0.2s" }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", text: "", rating: 0 });

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem("mg_comments");
    if (saved) setComments(JSON.parse(saved));
  }, []);

  // Save Data
  useEffect(() => {
    localStorage.setItem("mg_comments", JSON.stringify(comments));
  }, [comments]);

  // Hitung Rata-rata Rating
  const averageRating =
    comments.length > 0
      ? (comments.reduce((acc, curr) => acc + (curr.rating || 5), 0) / comments.length).toFixed(1)
      : "0.0";

  // Handlers
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (val) => {
    setForm({ ...form, rating: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.text.trim()) return;

    const newComment = {
      ...form,
      rating: form.rating === 0 ? 5 : form.rating,
      date: new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }),
    };

    setComments([newComment, ...comments]);
    setForm({ name: "", text: "", rating: 0 });
  };

  const removeComment = (idx) => {
    if (confirm("Hapus komentar ini?")) {
      const newArr = [...comments];
      newArr.splice(idx, 1);
      setComments(newArr);
    }
  };

  return (
    <section id="comments" className="comments-section-clean">
      <div className="container">
        
        {/* HEADER & TOTAL RATING */}
        <div className="section-head reveal">
          <h3>Apa Kata Mereka</h3>
          <p>Cerita seru dari pengunjung Maha Gangga Valley.</p>
          
          <div className="total-rating-badge">
            <span className="big-star">★</span>
            <span className="avg-score">{averageRating}</span>
            <span className="total-count">({comments.length} Ulasan)</span>
          </div>
        </div>

        {/* FORMULIR (POSISI DI ATAS) */}
        <div className="form-box-clean reveal">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="name"
                className="input-clean"
                placeholder="Nama Lengkap (Opsional)"
                value={form.name}
                onChange={handleInput}
              />
            </div>

            <div className="form-group">
              <textarea
                name="text"
                className="textarea-clean"
                placeholder="Tulis ulasan Anda di sini..."
                required
                value={form.text}
                onChange={handleInput}
              />
            </div>

            {/* Rating Bintang di Tengah Form */}
            <div className="rating-center">
              <span className="rating-label">Beri Rating:</span>
              <div className="stars-wrapper-lg">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon 
                    key={s} 
                    filled={s <= form.rating} 
                    onClick={() => handleRating(s)} 
                    size={32} 
                  />
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-submit-clean">
              Kirim Komentar
            </button>
          </form>
        </div>

        {/* LIST KOMENTAR (POSISI DI BAWAH - SWIPE SAMPING) */}
        <div className="comments-slider reveal">
          {comments.length === 0 ? (
            <div className="empty-message">Belum ada komentar. Jadilah yang pertama!</div>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="comment-card-original">
                <button className="btn-del" onClick={() => removeComment(i)}>&times;</button>
                
                <div className="card-header">
                  <div className="avatar-circle">
                    {c.name ? c.name.charAt(0).toUpperCase() : "A"}
                  </div>
                  <div>
                    <strong className="user-name">{c.name || "Pengunjung"}</strong>
                    <span className="comment-date">{c.date}</span>
                  </div>
                </div>

                <div className="card-rating">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} filled={s <= c.rating} size={14} />
                  ))}
                </div>

                <p className="comment-text">"{c.text}"</p>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}