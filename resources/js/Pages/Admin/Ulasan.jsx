import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Ulasan({ dataUlasan }) {
    const { post, delete: destroy } = useForm();
    const [idReply, setIdReply] = useState(null);
    const [textReply, setTextReply] = useState('');

    const handleReply = (e, id) => {
        e.preventDefault();
        post(route('admin.ulasan.balas', id), {
            data: { balasan: textReply },
            onSuccess: () => { setIdReply(null); setTextReply(''); }
        });
    };

    const handleDelete = (id) => confirm('Hapus ulasan ini?') && destroy(route('admin.ulasan.hapus', id));

    return (
        <AdminLayout>
            <Head title="Ulasan Pengunjung" />
            
            <style>{`
                .review-card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #f3f4f6; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
                .review-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
                .user-name { font-weight: 700; font-size: 15px; color: #111827; }
                .review-date { font-size: 12px; color: #9ca3af; margin-left: 8px; }
                .stars { color: #f59e0b; font-size: 14px; margin-bottom: 8px; }
                .review-text { color: #374151; font-style: italic; font-size: 14px; line-height: 1.5; }
                
                .reply-box { margin-top: 15px; background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 3px solid #10b981; }
                .reply-label { font-size: 11px; font-weight: 700; color: #059669; text-transform: uppercase; margin-bottom: 4px; }
                .reply-content { font-size: 14px; color: #1f2937; }

                .btn-del { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 12px; font-weight: 600; }
                .btn-del:hover { text-decoration: underline; }
                
                .reply-area { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; margin-bottom: 10px; }
                .btn-send { background: #10b981; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px; margin-right: 8px; }
                .btn-cancel { background: #e5e7eb; color: #374151; border: none; padding: 6px 12px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 13px; }
                .btn-toggle-reply { color: #10b981; background: none; border: none; cursor: pointer; font-weight: 600; font-size: 13px; }
            `}</style>

            <div style={{marginBottom:'30px'}}>
                <h1 style={{fontSize:'24px', fontWeight:800, color:'#111827', margin:0}}>Ulasan & Masukan</h1>
                <p style={{color:'#6b7280', fontSize:'14px', marginTop:'5px'}}>Apa kata pengunjung tentang Maha Gangga Valley.</p>
            </div>

            <div>
                {(!dataUlasan || dataUlasan.length === 0) ? (
                    <div style={{textAlign:'center', padding:'40px', color:'#9ca3af', background:'white', borderRadius:'12px'}}>Belum ada ulasan.</div>
                ) : (
                    dataUlasan.map((item) => (
                        <div key={item.id} className="review-card">
                            <div className="review-header">
                                <div>
                                    <span className="user-name">{item.user.name}</span>
                                    <span className="review-date">{new Date(item.created_at).toLocaleDateString()}</span>
                                </div>
                                <button onClick={() => handleDelete(item.id)} className="btn-del">Hapus</button>
                            </div>

                            <div className="stars">{'★'.repeat(item.rating)}</div>
                            <p className="review-text">"{item.isi_ulasan}"</p>

                            <div className="reply-box">
                                {item.balasan ? (
                                    <>
                                        <div className="reply-label">Respon Admin:</div>
                                        <div className="reply-content">{item.balasan}</div>
                                    </>
                                ) : (
                                    idReply === item.id ? (
                                        <form onSubmit={(e) => handleReply(e, item.id)}>
                                            <textarea className="reply-area" rows="2" placeholder="Tulis balasan..." value={textReply} onChange={(e) => setTextReply(e.target.value)}></textarea>
                                            <button type="submit" className="btn-send">Kirim</button>
                                            <button type="button" onClick={() => setIdReply(null)} className="btn-cancel">Batal</button>
                                        </form>
                                    ) : (
                                        <button onClick={() => setIdReply(item.id)} className="btn-toggle-reply">↩ Balas Ulasan</button>
                                    )
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}