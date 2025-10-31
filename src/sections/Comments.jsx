import React, { useEffect, useState } from "react";

export default function Comments() {
  // ... (sisa kode state dan functions Anda tetap sama)
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", text: "" });

  useEffect(() => {
    const savedComments = localStorage.getItem("mg_comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mg_comments", JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.text.trim()) return;

    setComments([{ name: form.name, text: form.text }, ...comments]);
    setForm({ name: "", text: "" });
  };

  const removeComment = (indexToDelete) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
      const updatedComments = comments.filter(
        (_, index) => index !== indexToDelete
      );
      setComments(updatedComments);
    }
  };

  return (
    <section id="comments" className="comments-section">
      <div className="container">
        <div className="section-head reveal">
          <h3>Komentar Pengunjung</h3>
          <p>Tinggalkan Pengalamanmu</p>
        </div>

        <div className="comment-form-wrapper reveal" style={{ '--delay': '0.2s' }}>
          {/* ... (isi form Anda tetap sama) ... */}
          <form className="comment-form" onSubmit={handleSubmit}>
            <input
              placeholder="Nama"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <textarea
              placeholder="Tambahkan Komentarmu...."
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              required
            />
            <div className="comment-form-actions">
              <button type="submit" className="btn btn-primary">
                KIRIM
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setForm({ name: "", text: "" })}
              >
                RESET
              </button>
            </div>
          </form>
        </div>

        <div className="comments-list-container reveal" style={{ '--delay': '0.4s' }}>
          {/* ... (isi list komentar Anda tetap sama) ... */}
          {comments.length === 0 ? (
            <p className="muted" style={{ textAlign: "center" }}>
              Belum ada komentar — jadilah yang pertama!
            </p>
          ) : (
            <div className="comments-list">
              {comments.map((comment, index) => (
                <article key={index} className="comment-card">
                  <button
                    className="delete-comment-btn"
                    onClick={() => removeComment(index)}
                    aria-label="Hapus komentar"
                  >
                    ×
                  </button>
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