import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';

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

export default function Ulasan({ reviews }) {
  const { auth } = usePage().props;

  const { data, setData, post, processing, reset } = useForm({
    rating: 5,
    isi_ulasan: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('ulasan.kirim'), {
      onSuccess: () => reset()
    });
  };

  return (
    <section id="comments" className="comments-section-clean">
      {/* Container bawaan layout agar rata kiri-kanan */}
      <div className="container">
        
        {/* HEADER */}
        <div className="section-head reveal">
          <h3>Apa Kata Mereka</h3>
          <p>Cerita seru dari pengunjung Maha Gangga Valley.</p>
        </div>

        {/* --- FORMULIR --- */}
        {/* PERBAIKAN: Tambahkan style width 100% agar melebar penuh menyamai Maps */}
        <div className="form-box-clean reveal" style={{ maxWidth: '74%', width: '100%' }}>
          {auth.user ? (
              <form onSubmit={handleSubmit}>
                
                {/* Sapaan User */}
                <div className="form-group" style={{textAlign:'left', marginBottom:'15px'}}>
                   <h4 style={{fontSize:'18px', fontWeight:'bold', color:'#333', margin:0}}>
                      Hi, <span style={{color:'#5D755B'}}>{auth.user.name}</span>! 👋
                   </h4>
                   <p style={{fontSize:'13px', color:'#777', marginTop:'5px'}}>Bagaimana pengalaman liburanmu?</p>
                </div>

                <div className="form-group">
                  <textarea
                    className="textarea-clean"
                    placeholder="Tulis ulasan Anda di sini..."
                    required
                    value={data.isi_ulasan}
                    onChange={(e) => setData('isi_ulasan', e.target.value)}
                    rows="4"
                    style={{ width: '100%' }} // Pastikan textarea juga full
                  />
                </div>

                {/* Rating & Tombol */}
                <div className="rating-center">
                  <span className="rating-label">Beri Rating:</span>
                  <div className="stars-wrapper-lg">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon 
                        key={s} 
                        filled={s <= data.rating} 
                        onClick={() => setData('rating', s)} 
                        size={32} 
                      />
                    ))}
                  </div>
                </div>

                <button type="submit" disabled={processing} className="btn btn-primary btn-submit-clean">
                  {processing ? 'Mengirim...' : 'Kirim Komentar'}
                </button>
              </form>
          ) : (
              // JIKA BELUM LOGIN
              <div style={{textAlign:'center', padding:'40px 20px'}}>
                  <p style={{color:'#666', marginBottom:'15px', fontSize:'16px'}}>Silakan login untuk memberikan ulasan.</p>
                  <Link href={route('login')} className="btn btn-primary">Login Disini</Link>
              </div>
          )}
        </div>

        {/* --- DAFTAR ULASAN --- */}
        {/* PERBAIKAN: Tambahkan style width 100% juga disini */}
        <div className="comments-slider reveal" style={{ maxWidth: '100%', width: '100%', marginTop: '30px' }}>
          {reviews.length === 0 ? (
            <div className="empty-message">Belum ada komentar. Jadilah yang pertama!</div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="comment-card-original" style={{position:'relative', marginBottom: '20px'}}>
                
                {/* Tombol Hapus (Punya Sendiri) */}
                {auth.user && auth.user.id === review.user_id && (
                    <Link 
                        href={route('ulasan.hapus.saya', review.id)}
                        method="delete"
                        as="button"
                        preserveScroll
                        onClick={(e) => { if(!confirm('Hapus komentar?')) e.preventDefault() }}
                        className="btn-del"
                        style={{border:'none', background:'transparent', fontSize:'20px', cursor:'pointer', position:'absolute', top:'15px', right:'15px', color:'#ff4d4d'}}
                    >
                        &times;
                    </Link>
                )}

                <div className="card-header">
                  <div className="avatar-circle">
                    {review.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <strong className="user-name">{review.user.name}</strong>
                    <span className="comment-date">
                        {new Date(review.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </div>
                </div>

                <div className="card-rating">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} filled={s <= review.rating} size={14} />
                  ))}
                </div>

                <p className="comment-text" style={{textAlign: 'left'}}>"{review.isi_ulasan}"</p>

                {/* Balasan Admin */}
                {review.balasan && (
                    <div style={{marginTop:'15px', background:'#f1f9f1', padding:'15px', borderRadius:'8px', borderLeft:'4px solid #5D755B', textAlign:'left'}}>
                        <strong style={{color:'#5D755B', fontSize:'13px', display:'block', marginBottom:'5px'}}>Respon Pengelola:</strong>
                        <span style={{color:'#333', fontSize:'14px'}}>{review.balasan}</span>
                    </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}