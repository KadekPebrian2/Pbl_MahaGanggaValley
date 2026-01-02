import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function GalleryAdmin({ photos = [] }) {
    const { data: createData, setData: setCreateData, post, processing, reset } = useForm({ judul: '', deskripsi: '', foto: null });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(null);
    const { data: editData, setData: setEditData, post: postUpdate } = useForm({ judul: '', deskripsi: '', foto: null, _method: 'post' });

    const submitCreate = (e) => { e.preventDefault(); post(route('admin.gallery.store'), { onSuccess: () => reset() }); };
    
    const openEditModal = (photo) => {
        setCurrentPhoto(photo);
        setEditData({ judul: photo.judul, deskripsi: photo.deskripsi, foto: null, _method: 'post' });
        setIsEditModalOpen(true);
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        postUpdate(route('admin.gallery.update', currentPhoto.idFoto), { onSuccess: () => setIsEditModalOpen(false) });
    };

    const handleDelete = (id) => confirm('Hapus permanen?') && router.delete(route('admin.gallery.destroy', id));

    return (
        <AdminLayout>
            <Head title="Galeri Wisata" />
            
            <style>{`
                .section-card { background: white; padding: 25px; border-radius: 16px; border: 1px solid #f3f4f6; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px; }
                .section-title { font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 20px; border-bottom: 1px solid #f3f4f6; padding-bottom: 10px; }
                
                /* Form Styles */
                .form-group { margin-bottom: 15px; }
                .form-label { display: block; font-size: 12px; font-weight: 700; color: #4b5563; margin-bottom: 5px; text-transform: uppercase; }
                .form-input { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; transition: 0.2s; }
                .form-input:focus { border-color: #4f46e5; outline: none; ring: 2px solid #e0e7ff; }
                .btn-submit { width: 100%; padding: 12px; background: #4f46e5; color: white; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s; }
                .btn-submit:hover { background: #4338ca; }

                /* Grid Foto */
                .photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
                .photo-card { background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; transition: transform 0.2s; }
                .photo-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
                .photo-img { width: 100%; height: 180px; object-fit: cover; }
                .photo-body { padding: 15px; }
                .photo-title { font-weight: 700; font-size: 14px; margin: 0 0 5px 0; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .photo-desc { font-size: 12px; color: #6b7280; margin-bottom: 15px; height: 32px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
                
                .btn-group { display: flex; gap: 8px; }
                .btn-mini { flex: 1; padding: 8px; font-size: 12px; font-weight: 700; border: none; border-radius: 6px; cursor: pointer; }
                .btn-edit { background: #dbeafe; color: #1e40af; }
                .btn-del { background: #fee2e2; color: #991b1b; }

                /* Modal */
                .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
                .modal-box { background: white; padding: 25px; border-radius: 16px; width: 100%; max-width: 450px; }
            `}</style>

            <div className="section-card">
                <h3 className="section-title">UNGGAH MEDIA BARU</h3>
                <form onSubmit={submitCreate}>
                    <div className="form-group">
                        <label className="form-label">Judul Foto</label>
                        <input className="form-input" type="text" value={createData.judul} onChange={e => setCreateData('judul', e.target.value)} placeholder="Contoh: Pemandangan Pagi" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Deskripsi</label>
                        <textarea className="form-input" rows="2" value={createData.deskripsi} onChange={e => setCreateData('deskripsi', e.target.value)} placeholder="Deskripsi singkat..." />
                    </div>
                    <div className="form-group">
                        <label className="form-label">File Foto</label>
                        <input className="form-input" type="file" onChange={e => setCreateData('foto', e.target.files[0])} />
                    </div>
                    <button type="submit" className="btn-submit" disabled={processing}>{processing ? 'Mengunggah...' : 'Simpan ke Galeri'}</button>
                </form>
            </div>

            <h3 style={{fontSize:'18px', fontWeight:'800', marginBottom:'15px', color:'#1f2937'}}>KOLEKSI FOTO ({photos.length})</h3>
            <div className="photo-grid">
                {photos.map(photo => (
                    <div key={photo.idFoto} className="photo-card">
                        <img src={`/images/gallery/${photo.namaFile}`} alt={photo.judul} className="photo-img" />
                        <div className="photo-body">
                            <h4 className="photo-title">{photo.judul}</h4>
                            <p className="photo-desc">{photo.deskripsi}</p>
                            <div className="btn-group">
                                <button className="btn-mini btn-edit" onClick={() => openEditModal(photo)}>EDIT</button>
                                <button className="btn-mini btn-del" onClick={() => handleDelete(photo.idFoto)}>HAPUS</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3 className="section-title">EDIT FOTO</h3>
                        <div className="form-group">
                            <label className="form-label">Judul</label>
                            <input className="form-input" type="text" value={editData.judul} onChange={e => setEditData('judul', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Deskripsi</label>
                            <textarea className="form-input" rows="3" value={editData.deskripsi} onChange={e => setEditData('deskripsi', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Ganti Foto (Opsional)</label>
                            <input className="form-input" type="file" onChange={e => setEditData('foto', e.target.files[0])} />
                        </div>
                        <div className="btn-group">
                            <button className="btn-mini" style={{background:'#f3f4f6', color:'#374151'}} onClick={() => setIsEditModalOpen(false)}>BATAL</button>
                            <button className="btn-mini" style={{background:'#2563eb', color:'white'}} onClick={submitUpdate}>SIMPAN PERUBAHAN</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}