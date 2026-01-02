import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from '@/Layouts/AppLayout';
import '../../css/Payment.css';

export default function Payment({ bookingData }) {
  
  // 1. State untuk Preview & Error Lokal
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileError, setFileError] = useState(null);

  // 2. Setup Inertia Form (Agar bisa handle loading & error server)
  const { data, setData, post, processing, errors } = useForm({
    bookingData: bookingData,
    proofFile: null,
  });

  // Redirect jika data kosong (Akses paksa)
  if (!bookingData) {
    return (
      <AppLayout>
        <Head title="Error" />
        <div style={{ padding: '100px', textAlign: 'center' }}>
          <h3>Data tidak ditemukan.</h3>
          <Link href="/booking" style={{ color: 'blue' }}>Kembali</Link>
        </div>
      </AppLayout>
    );
  }

  // 3. LOGIKA VALIDASI FILE
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Reset state dulu
    setFileError(null);
    setPreviewUrl(null);
    setData('proofFile', null);

    if (file) {
      // Cek Tipe File (Hanya Gambar)
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setFileError("❌ File harus berupa Gambar (JPG / PNG).");
        return;
      }

      // Cek Ukuran File (Misal Maks 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileError("❌ Ukuran file terlalu besar (Maks 5MB).");
        return;
      }

      // Jika Lolos Validasi
      setData('proofFile', file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!data.proofFile) {
      setFileError("⚠️ Mohon upload bukti pembayaran.");
      return;
    }
    
    // Kirim ke Backend
    post("/payment-confirm");
  };

  return (
    <AppLayout>
      <Head title="Konfirmasi Pembayaran" />

      <section className="payment-section">
        
        {/* === KIRI: Form === */}
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
              <span>Rp. {Number(bookingData.total_price).toLocaleString("id-ID")}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Custom Upload Area */}
            <div className="upload-area-wrapper">
              <label className="upload-label">Upload Bukti Transfer</label>
              
              {/* Kotak Upload dengan Validasi Visual */}
              <div className="file-upload-box" style={{ 
                  border: fileError ? '2px dashed #ef4444' : '2px dashed #a8c3a7',
                  backgroundColor: fileError ? '#fef2f2' : 'white'
              }}>
                {/* Input hanya menerima gambar */}
                <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg" 
                    onChange={handleFileChange} 
                />
                
                <div className="upload-placeholder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={fileError ? "#ef4444" : "#a8c3a7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <span style={{ color: fileError ? '#ef4444' : '#6b7280' }}>
                      {fileError ? 'File tidak valid' : 'Klik atau tarik file gambar ke sini'}
                  </span>
                </div>
              </div>

              {/* NOTIFIKASI ERROR DI SINI */}
              {fileError && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {fileError}
                  </div>
              )}
              
              {/* Error dari Server (Jika ada) */}
              {errors.proofFile && (
                  <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>
                      {errors.proofFile}
                  </div>
              )}

              {/* Preview jika file benar */}
              {previewUrl && !fileError && (
                <div className="preview-box">
                  <img src={previewUrl} alt="Preview Bukti" />
                  <span>{data.proofFile.name}</span>
                </div>
              )}
            </div>

            <div className="action-buttons">
              {/* TOMBOL BERUBAH JIKA BELUM UPLOAD / ERROR */}
              <button 
                type="submit" 
                className="btn-confirm"
                disabled={processing || !data.proofFile || fileError} 
                style={{
                    backgroundColor: (processing || !data.proofFile || fileError) ? '#9ca3af' : '',
                    cursor: (processing || !data.proofFile || fileError) ? 'not-allowed' : 'pointer',
                    opacity: (processing || !data.proofFile || fileError) ? 0.7 : 1
                }}
              >
                {processing ? 'Memproses...' : 'Saya Sudah Transfer'}
              </button>
              
              <Link href="/booking" className="btn-cancel">
                Batal / Kembali
              </Link>
            </div>
          </form>
        </div>

        {/* === KANAN: Background Alam & Glass QRIS (TETAP SAMA) === */}
        <div className="payment-right">
          <div className="glass-qris">
            <h3>Maha Gangga Valley</h3>
            <p>Scan untuk melakukan pembayaran</p>
            
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
    </AppLayout>
  );
}