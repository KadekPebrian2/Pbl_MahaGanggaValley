import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Ulasan({ dataUlasan }) {
    // 1. State 'Rahasia' untuk menyimpan ID yang dipilih
    const [selectedId, setSelectedId] = useState(null);

    const { delete: destroy, processing } = useForm();

    // 2. Fungsi Eksekusi Hapus
    const handleDeleteSelected = () => {
        if (!selectedId) return; 

        if (confirm('Apakah Anda yakin ingin menghapus komentar yang dipilih ini?')) {
            destroy(route('admin.ulasan.hapus', selectedId), {
                preserveScroll: true,
                onSuccess: () => setSelectedId(null)
            });
        }
    };

    // 3. Fungsi Pilih Diam-diam
    const selectReview = (id) => {
        if (selectedId === id) {
            setSelectedId(null);
        } else {
            setSelectedId(id);
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Ulasan" />
            
            <style>{`
                /* STYLE KARTU ASLI (Stealth Mode) */
                .review-card { 
                    background: white; 
                    padding: 20px; 
                    border-radius: 12px; 
                    border: 1px solid #f3f4f6; 
                    margin-bottom: 20px; 
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02); 
                    cursor: pointer; 
                }

                .review-header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: flex-start; 
                    margin-bottom: 12px; 
                    /* Border bottom dihapus agar lebih bersih karena bintang pindah ke bawah */
                    /* border-bottom: 1px solid #f3f4f6; */ 
                    /* padding-bottom: 10px; */
                }
                
                .user-name { font-weight: 700; font-size: 16px; color: #111827; }
                .review-date { font-size: 12px; color: #9ca3af; display: block; margin-top: 2px; }
                
                .review-text { 
                    color: #374151; 
                    font-style: italic; 
                    font-size: 14px; 
                    line-height: 1.6; 
                    margin-bottom: 15px; /* Jarak antara teks dan bintang */
                }

                /* STYLE BINTANG (Posisi Baru) */
                .stars { 
                    color: #f59e0b; 
                    font-size: 18px; /* Sedikit diperbesar */
                    letter-spacing: 2px; 
                    text-align: right; /* Opsional: Bintang di kanan bawah */
                }
                
                /* TOMBOL HAPUS */
                .top-delete-btn {
                    padding: 8px 25px;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 14px;
                    border: none;
                    transition: all 0.3s ease;
                }
                .btn-disabled { background-color: #f3f4f6; color: #9ca3af; cursor: default; }
                .btn-active { background-color: #fee2e2; color: #ef4444; cursor: pointer; border: 1px solid #fecaca; }
                .btn-active:hover { background-color: #ef4444; color: white; }
            `}</style>

            {/* --- HEADER --- */}
            <div style={{marginBottom:'30px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                    <h1 style={{fontSize:'24px', fontWeight:800, color:'#111827', margin:0}}>Kelola Ulasan</h1>
                    <p style={{color:'#6b7280', fontSize:'14px', marginTop:'5px'}}>
                        Daftar ulasan dari pengunjung.
                    </p>
                </div>

                <button 
                    onClick={handleDeleteSelected} 
                    disabled={!selectedId || processing}
                    className={`top-delete-btn ${selectedId ? 'btn-active' : 'btn-disabled'}`}
                >
                    {processing ? '...' : (selectedId ? 'Hapus' : 'Hapus')}
                </button>
            </div>

            {/* --- LIST KOMENTAR --- */}
            <div>
                {(!dataUlasan || dataUlasan.length === 0) ? (
                    <div style={{textAlign:'center', padding:'40px', color:'#9ca3af', background:'white', borderRadius:'12px'}}>
                        Belum ada ulasan.
                    </div>
                ) : (
                    dataUlasan.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => selectReview(item.id)}
                            className="review-card"
                        >
                            {/* 1. Header (Hanya Nama & Tanggal) */}
                            <div className="review-header">
                                <div>
                                    <span className="user-name">{item.user.name}</span>
                                    <span className="review-date">
                                        {new Date(item.created_at).toLocaleDateString('id-ID', {
                                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>

                            {/* 2. Isi Komentar */}
                            <p className="review-text">"{item.isi_ulasan}"</p>

                            {/* 3. Bintang (Sekarang di Bawah) */}
                            <div className="stars">
                                {'★'.repeat(item.rating)}
                                <span style={{color:'#e5e7eb'}}>
                                    {'★'.repeat(5-item.rating)}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}