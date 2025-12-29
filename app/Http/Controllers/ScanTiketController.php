<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking; 

class ScanTiketController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ScanTiket');
    }

    public function store(Request $request)
    {
        $request->validate([
            'qr_code' => 'required|string'
        ]);

        $fullCode = $request->qr_code; // Contoh: "MGV-20251223-16"
        
        // --- LOGIKA CERDAS: Ambil ID dari String Panjang ---
        // Kita pecah text berdasarkan tanda strip "-"
        $parts = explode('-', $fullCode);
        
        // Ambil bagian paling terakhir (itu adalah ID-nya: "16")
        $bookingId = end($parts);

        // Pastikan yang diambil benar-benar angka
        if (!is_numeric($bookingId)) {
            // Fallback: Jika ternyata QR-nya cuma angka doang (bukan format MGV)
            if (is_numeric($fullCode)) {
                $bookingId = $fullCode;
            } else {
                 return response()->json([
                    'status' => 'error',
                    'message' => '❌ Format QR Salah!',
                    'detail'  => 'QR Code tidak dikenali sistem.'
                ], 400);
            }
        }

        // Cari tiket berdasarkan ID yang sudah diekstrak
        $tiket = Booking::find($bookingId);

        // --- VALIDASI STANDAR ---

        // 1. Cek Apakah Tiket Ada?
        if (!$tiket) {
            return response()->json([
                'status' => 'error',
                'message' => '❌ Tiket Tidak Ditemukan!',
                'detail'  => 'ID: ' . $bookingId . ' tidak terdaftar.'
            ], 404);
        }

        // 2. Cek Apakah Tiket SUDAH DIPAKAI?
        if ($tiket->status === 'used') {
            return response()->json([
                'status' => 'error',
                'message' => '⚠️ Tiket Sudah Terpakai!',
                'detail'  => 'Pengunjung ini sudah check-in sebelumnya.'
            ], 400);
        }

        // 3. Cek Apakah Tiket BELUM LUNAS?
        if ($tiket->status !== 'confirmed' && $tiket->status !== 'paid') {
            return response()->json([
                'status' => 'error',
                'message' => '⛔ Tiket Bermasalah!',
                'detail'  => 'Status saat ini: ' . $tiket->status
            ], 400);
        }

        // === SUKSES ===
        
        // Update status jadi 'used'
        $tiket->update(['status' => 'used']);

        return response()->json([
            'status' => 'success',
            'message' => '✅ BERHASIL CHECK-IN!',
            'detail'  => 'Silakan masuk.',
            'data'    => [
                'nama' => $tiket->name ?? 'Tamu', // Pakai kolom 'name' dari tabel bookings
                'qty'  => $tiket->qty . ' Orang',
                'tiket'=> $fullCode // Tampilkan kode lengkapnya biar keren
            ]
        ]);
    }
}