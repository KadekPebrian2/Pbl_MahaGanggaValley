import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function GalleryAdmin({ photos = [] }) {
    const { data: createData, setData: setCreateData, post, processing: createProcessing, errors: createErrors, reset } = useForm({
        judul: '', deskripsi: '', foto: null, 
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(null);

    const { data: editData, setData: setEditData, post: postUpdate, processing: editProcessing } = useForm({
        judul: '', deskripsi: '', foto: null, _method: 'post' 
    });

    const basePath = '/images/gallery/';

    // --- LOGIKA CRUD ---
    const submitCreate = (e) => {
        e.preventDefault();
        post(route('admin.gallery.store'), { onSuccess: () => reset() });
    };

    const openEditModal = (photo) => {
        setCurrentPhoto(photo);
        setEditData({ judul: photo.judul, deskripsi: photo.deskripsi, foto: null, _method: 'post' });
        setIsEditModalOpen(true);
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        postUpdate(route('admin.gallery.update', currentPhoto.idFoto), { 
            onSuccess: () => setIsEditModalOpen(false),
        });
    };

    const handleDelete = (photoId) => {
        if (confirm('Apakah Anda yakin ingin menghapus foto ini secara permanen?')) {
            router.delete(route('admin.gallery.destroy', photoId));
        }
    };

    // === STYLE CSS MANUAl ===
    const styles = {
        cardUnggah: {
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            marginBottom: '40px',
            border: '1px solid #eee'
        },
        input: {
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '2px solid #ddd',
            display: 'block'
        },
        btnSimpan: {
            backgroundColor: '#4f46e5',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '25px'
        },
        photoCard: {
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #ddd',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        },
        btnEdit: {
            backgroundColor: '#2563eb', // BIRU CERAH
            color: 'white',
            padding: '10px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '8px',
            width: '100%',
            fontSize: '14px'
        },
        btnHapus: {
            backgroundColor: '#dc2626', // MERAH CERAH
            color: 'white',
            padding: '10px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            fontSize: '14px'
        }
    };

    return (
        <AdminLayout>
            <Head title="Galeri Wisata Admin" />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
                    MANAJEMEN GALERI
                </h2>

                {/* FORM UPLOAD MEDIA */}
                <div style={styles.cardUnggah}>
                    <h3 style={{ color: '#4f46e5', marginBottom: '20px', fontWeight: 'bold' }}>UNGGAH MEDIA BARU</h3>
                    <form onSubmit={submitCreate}>
                        <label style={{ fontWeight: 'bold', fontSize: '12px' }}>JUDUL FOTO</label>
                        <input style={styles.input} type="text" value={createData.judul} onChange={(e) => setCreateData('judul', e.target.value)} placeholder="Masukkan judul..." />
                        
                        <label style={{ fontWeight: 'bold', fontSize: '12px' }}>DESKRIPSI</label>
                        <textarea style={styles.input} value={createData.deskripsi} onChange={(e) => setCreateData('deskripsi', e.target.value)} rows="3" placeholder="Deskripsi foto..." />
                        
                        <label style={{ fontWeight: 'bold', fontSize: '12px' }}>PILIH FILE</label>
                        <input style={styles.input} type="file" onChange={(e) => setCreateData('foto', e.target.files[0])} />
                        
                        <button type="submit" style={styles.btnSimpan} disabled={createProcessing}>
                            {createProcessing ? 'PROSES...' : 'SIMPAN KE GALERI'}
                        </button>
                    </form>
                </div>

                {/* LIST DAFTAR FOTO */}
                <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>DAFTAR FOTO ({photos.length})</h3>
                <div style={styles.grid}>
                    {photos.map((photo) => (
                        <div key={photo.idFoto} style={styles.photoCard}>
                            <img src={basePath + photo.namaFile} alt={photo.judul} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                            <div style={{ padding: '15px' }}>
                                <h4 style={{ fontWeight: 'bold', marginBottom: '5px', textTransform: 'uppercase' }}>{photo.judul}</h4>
                                <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px', height: '35px', overflow: 'hidden' }}>{photo.deskripsi}</p>
                                
                                {/* TOMBOL EDIT & HAPUS */}
                                <button onClick={() => openEditModal(photo)} style={styles.btnEdit}>
                                    ✎ EDIT DATA
                                </button>
                                <button onClick={() => handleDelete(photo.idFoto)} style={styles.btnHapus}>
                                    🗑 HAPUS DATA
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL EDIT (CSS INLINE) */}
            {isEditModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', width: '100%', maxWidth: '500px' }}>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '20px' }}>EDIT DATA GALERI</h4>
                        <input style={styles.input} type="text" value={editData.judul} onChange={(e) => setEditData('judul', e.target.value)} />
                        <textarea style={styles.input} value={editData.deskripsi} onChange={(e) => setEditData('deskripsi', e.target.value)} rows="3" />
                        <input style={styles.input} type="file" onChange={(e) => setEditData('foto', e.target.files[0])} />
                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button onClick={() => setIsEditModalOpen(false)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>BATAL</button>
                            <button onClick={submitUpdate} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold' }}>SIMPAN</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}