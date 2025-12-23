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
        // Ambil data ulasan beserta data user-nya, urutkan dari terbaru
        $dataUlasan = Ulasan::with('user')->latest()->get();
        
        return Inertia::render('Admin/Ulasan', [
            'dataUlasan' => $dataUlasan
        ]);
    }

    // 2. Simpan Balasan Admin
    public function simpanBalasan(Request $request, $id)
    {
        $ulasan = Ulasan::findOrFail($id);
        
        // Update kolom 'balasan'
        $ulasan->balasan = $request->balasan;
        $ulasan->save();

        return redirect()->back()->with('message', 'Balasan berhasil dikirim!');
    }

    // 3. Hapus Ulasan (Admin)
    public function hapusUlasanAdmin($id)
    {
        $ulasan = Ulasan::findOrFail($id);
        $ulasan->delete();
        return redirect()->back()->with('message', 'Ulasan berhasil dihapus.');
    }

    // --- BAGIAN PENGUNJUNG (USER) ---

    // 4. [TAMBAHAN BARU] Simpan Ulasan Baru (Agar User Bisa Kirim)
    public function simpanUlasan(Request $request)
    {
        // Validasi input
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'isi_ulasan' => 'required|string|max:500', // Sesuai nama kolom DB
        ]);

        // Simpan ke database
        Ulasan::create([
            'user_id' => Auth::id(), // Ambil ID user yang sedang login
            'rating' => $request->rating,
            'isi_ulasan' => $request->isi_ulasan,
        ]);

        return redirect()->back()->with('message', 'Terima kasih atas ulasan Anda!');
    }

    // 5. Hapus Ulasan Sendiri
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