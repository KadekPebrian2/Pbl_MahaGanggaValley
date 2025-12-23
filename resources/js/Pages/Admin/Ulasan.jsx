import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Ulasan({ dataUlasan }) { // <--- ADMIN MENERIMA 'dataUlasan'
    const { post, delete: destroy } = useForm();
    const [idSedangDibalas, setIdSedangDibalas] = useState(null);
    const [teksBalasan, setTeksBalasan] = useState('');

    const tanganiBalasan = (e, id) => {
        e.preventDefault();
        post(route('admin.ulasan.balas', id), {
            data: { balasan: teksBalasan },
            onSuccess: () => {
                setIdSedangDibalas(null);
                setTeksBalasan('');
            }
        });
    };

    const tanganiHapus = (id) => {
        if (confirm('Hapus ulasan ini?')) {
            destroy(route('admin.ulasan.hapus', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Ulasan Pengunjung" />
            
            <div style={{marginBottom:'20px'}}>
                <h1 style={{fontSize:'24px', fontWeight:'bold', color:'#111827'}}>Ulasan & Masukan</h1>
                <p style={{color:'#6b7280'}}>Kelola ulasan yang masuk dari pengunjung.</p>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                {/* Cek apakah dataUlasan ada isinya */}
                {(!dataUlasan || dataUlasan.length === 0) ? (
                    <div style={{padding:'40px', textAlign:'center', background:'white', borderRadius:'8px', color:'#6b7280'}}>
                        Belum ada ulasan dari pengunjung.
                    </div>
                ) : (
                    dataUlasan.map((item) => (
                        <div key={item.id} style={{background:'white', padding:'20px', borderRadius:'10px', boxShadow:'0 2px 5px rgba(0,0,0,0.05)'}}>
                            
                            {/* Header: Nama & Tombol Hapus */}
                            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                                <div>
                                    <span style={{fontWeight:'bold', fontSize:'16px'}}>{item.user.name}</span>
                                    <span style={{fontSize:'12px', color:'#9ca3af', marginLeft:'10px'}}>
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <button onClick={() => tanganiHapus(item.id)} style={{color:'red', border:'none', background:'none', cursor:'pointer', fontSize:'12px'}}>
                                    🗑 Hapus
                                </button>
                            </div>

                            {/* Isi Ulasan */}
                            <div style={{margin:'0 0 15px 0'}}>
                                <div style={{color:'#fbbf24', fontSize:'14px', marginBottom:'5px'}}>{'★'.repeat(item.rating)}</div>
                                <p style={{color:'#374151', fontStyle:'italic'}}>"{item.isi_ulasan}"</p>
                            </div>

                            {/* Kolom Balasan */}
                            <div style={{background:'#f9fafb', padding:'15px', borderRadius:'8px', borderLeft:'3px solid #5D755B'}}>
                                {item.balasan ? (
                                    <div>
                                        <div style={{color:'#5D755B', fontSize:'11px', fontWeight:'bold', textTransform:'uppercase', marginBottom:'3px'}}>Respon Anda:</div>
                                        <p style={{margin:0, fontSize:'14px', color:'#1f2937'}}>{item.balasan}</p>
                                    </div>
                                ) : (
                                    idSedangDibalas === item.id ? (
                                        <form onSubmit={(e) => tanganiBalasan(e, item.id)}>
                                            <textarea 
                                                value={teksBalasan} 
                                                onChange={(e) => setTeksBalasan(e.target.value)}
                                                placeholder="Tulis balasan..."
                                                rows="2"
                                                style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'6px', border:'1px solid #d1d5db'}}
                                            ></textarea>
                                            <div style={{display:'flex', gap:'10px'}}>
                                                <button type="submit" style={{background:'#5D755B', color:'white', border:'none', padding:'6px 12px', borderRadius:'4px', cursor:'pointer'}}>Kirim</button>
                                                <button type="button" onClick={() => setIdSedangDibalas(null)} style={{background:'#e5e7eb', color:'#374151', border:'none', padding:'6px 12px', borderRadius:'4px', cursor:'pointer'}}>Batal</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button onClick={() => setIdSedangDibalas(item.id)} style={{color:'#5D755B', background:'none', border:'none', cursor:'pointer', fontWeight:'600', fontSize:'13px'}}>
                                            ↩ Balas Ulasan Ini
                                        </button>
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