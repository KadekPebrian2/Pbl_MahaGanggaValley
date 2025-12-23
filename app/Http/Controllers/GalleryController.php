<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gallery; 
use Inertia\Inertia; 
use Illuminate\Support\Facades\Storage; 
use Illuminate\Support\Str;

class GalleryController extends Controller
{
    /**
     * 1. READ: Menampilkan Daftar Galeri di Halaman Admin
     */
    public function index()
    {
        // Menggunakan idFoto sesuai struktur tabel Anda
        $photos = Gallery::orderBy('idFoto', 'desc')->get(); 
        
        return Inertia::render('Admin/Gallery', [
            'photos' => $photos,
        ]);
    }

    /**
     * 2. CREATE: Menyimpan Foto Baru
     */
public function store(Request $request)
{
    // ... validasi tetap sama ...

    if ($request->hasFile('foto')) {
        $file = $request->file('foto');
        $extension = $file->getClientOriginalExtension();
        $fileNameToStore = time() . '_' . $file->getClientOriginalName();
        
        // PINDAHKAN KE SINI:
        $file->move(public_path('images/gallery'), $fileNameToStore);
        
        // Simpan ke database
        Gallery::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'namaFile' => $fileNameToStore,
        ]);
    }

    return redirect()->back();
}

    /**
     * 3. UPDATE: Mengubah Data atau Foto
     */
public function update(Request $request, $id)
{
    $gallery = Gallery::findOrFail($id);
    
    // Update Judul & Deskripsi
    $gallery->judul = $request->judul;
    $gallery->deskripsi = $request->deskripsi;

    // JIKA USER UPLOAD FOTO BARU
    if ($request->hasFile('foto')) {
        // 1. Hapus Foto Lama dari folder public
        $oldPath = public_path('images/gallery/' . $gallery->namaFile);
        if (file_exists($oldPath)) {
            unlink($oldPath);
        }

        // 2. Simpan Foto Baru
        $file = $request->file('foto');
        $newFileName = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('images/gallery'), $newFileName);
        
        $gallery->namaFile = $newFileName;
    }

    $gallery->save();
    return redirect()->back();
}

    /**
     * 4. DELETE: Menghapus Foto dan Data
     */
public function destroy($id)
{
    $gallery = Gallery::findOrFail($id);

    // 1. Tentukan lokasi file di folder public
    $filePath = public_path('images/gallery/' . $gallery->namaFile);

    // 2. Hapus file fisik dari folder jika ada
    if (file_exists($filePath)) {
        unlink($filePath);
    }

    // 3. Hapus data dari database
    $gallery->delete();

    return redirect()->back()->with('success', 'Data dan foto berhasil dihapus!');
}
}