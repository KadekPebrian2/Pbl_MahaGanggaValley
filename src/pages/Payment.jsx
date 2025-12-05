// src/pages/Payment.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../assets/styles/Payment.css"; 

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data
  const { bookingData } = location.state || {};
  
  const [proofFile, setProofFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Redirect jika tidak ada data booking (akses paksa url)
  if (!bookingData) {
    return (
      <div className="payment-empty">
        <h3>Data pesanan tidak ditemukan.</h3>
        <Link to="/booking" className="btn-back">Kembali ke Booking</Link>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!proofFile) {
      alert("Mohon upload bukti pembayaran!");
      return;
    }
    
    // Arahkan ke halaman SUCCESS sambil membawa data nama user
    navigate("/success", { 
      state: { bookingData: bookingData } 
    });
  };

  return (
    <section className="payment-section">
      
      {/* === KIRI: Form Bersih (Clean Design) === */}
      <div className="payment-left">
        <div className="payment-header">
          <h2>Konfirmasi Pembayaran</h2>
          <p>Selesaikan pembayaran Anda untuk mengamankan tiket.</p>
        </div>

        {/* Ringkasan Pesanan */}
        <div className="order-summary">
          <div className="summary-row">
            <span>Nama Pemesan</span>
            <strong>{bookingData.name}</strong>
          </div>
          <div className="summary-row">
            <span>Tanggal Kunjungan</span>
            <strong>{bookingData.date}</strong>
          </div>
          <div className="summary-row">
            <span>Jumlah Tiket</span>
            <strong>{bookingData.qty} Orang</strong>
          </div>
          
          <div className="summary-total">
            <span>Total Tagihan</span>
            <span>Rp {bookingData.totalPrice.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Custom Upload Area */}
          <div className="upload-area-wrapper">
            <label className="upload-label">Upload Bukti Transfer</label>
            
            <div className="file-upload-box">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <div className="upload-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a8c3a7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span>Klik atau tarik file ke sini</span>
              </div>
            </div>

            {/* Preview jika file sudah dipilih */}
            {previewUrl && (
              <div className="preview-box">
                <img src={previewUrl} alt="Preview Bukti" />
                <span>{proofFile.name}</span>
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button type="submit" className="btn-confirm">
              Saya Sudah Transfer
            </button>
            <Link to="/booking" className="btn-cancel">
              Batal / Kembali
            </Link>
          </div>
        </form>
      </div>

      {/* === KANAN: Background Alam & Glass QRIS === */}
      <div className="payment-right">
        <div className="glass-qris">
          <h3>Maha Gangga Valley</h3>
          <p>Scan untuk melakukan pembayaran</p>
          
          {/* Ganti src ini dengan file QRIS Anda nanti */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
            alt="QRIS Code" 
            className="qris-image-large" 
          />
          
          <div className="scan-instruction">
            <span>Mendukung: GoPay, OVO, Dana, BCA, dll.</span>
          </div>
        </div>
      </div>

    </section>
  );
}