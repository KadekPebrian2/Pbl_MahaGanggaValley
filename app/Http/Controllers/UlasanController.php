<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ulasan; 
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UlasanController extends Controller
{
    // --- BAGIAN ADMIN ---

    // 1. Tampilkan Halaman Admin
    public function indexAdmin()
    {
        // Ambil data ulasan, urutkan dari yang terbaru (latest)
        $dataUlasan = Ulasan::with('user')->latest()->get();
        
        return Inertia::render('Admin/Ulasan', [
            'dataUlasan' => $dataUlasan
        ]);
    }

    // 2. Hapus Ulasan (Admin)
    // Fungsi ini menerima $id spesifik dari tombol "Hapus" yang diklik di Frontend
    public function hapusUlasanAdmin($id)
    {
        // findOrFail menjamin kita menghapus data yang TEPAT sesuai ID.
        // Jika ID tidak ketemu, dia akan error 404 (aman).
        $ulasan = Ulasan::findOrFail($id);
        
        $ulasan->delete();
        
        return redirect()->back()->with('message', 'Ulasan berhasil dihapus.');
    }

    // --- BAGIAN PENGUNJUNG (USER) ---
    // (Bagian ini tidak dirubah karena sudah valid)

    // 3. Simpan Ulasan Baru (User)
    public function simpanUlasan(Request $request)
    {
        // Validasi input
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'isi_ulasan' => 'required|string|max:500', 
        ]);

        // Simpan ke database
        Ulasan::create([
            'user_id' => Auth::id(), 
            'rating' => $request->rating,
            'isi_ulasan' => $request->isi_ulasan,
        ]);

        return redirect()->back()->with('message', 'Terima kasih atas ulasan Anda!');
    }

    // 4. Hapus Ulasan Sendiri (User)
    public function hapusUlasanSaya($id)
    {
        // Cari ulasan yang ID-nya cocok DAN user_id nya sama dengan yang login
        $ulasan = Ulasan::where('id', $id)->where('user_id', Auth::id())->first();

        if ($ulasan) {
            $ulasan->delete();
            return redirect()->back()->with('message', 'Ulasan Anda dihapus.');
        }

        return redirect()->back()->with('error', 'Gagal menghapus ulasan.');
    }
}