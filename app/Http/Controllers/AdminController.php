<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking; 
use Carbon\Carbon; // <--- 1. WAJIB TAMBAH INI (Untuk Cek Tanggal)

class AdminController extends Controller
{
    // --- 1. DASHBOARD ---
    public function dashboard()
    {
        $stats = [
            'total_orders'   => Booking::where('status', '!=', 'unpaid')->count(),
            'pending_orders' => Booking::where('status', 'pending')->count(), 
            'revenue'        => Booking::where('status', 'confirmed')->sum('total_price') 
        ];

        $recent_orders = Booking::with('user')
                                ->where('status', '!=', 'unpaid') 
                                ->latest()
                                ->limit(5)
                                ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats'  => $stats,
            'orders' => $recent_orders
        ]);
    }

    // --- 2. HALAMAN DAFTAR PESANAN ---
    public function orders()
    {
        // Ambil semua pesanan kecuali yang belum bayar (unpaid)
        $bookings = Booking::with('user')
                            ->where('status', '!=', 'unpaid')
                            ->latest()
                            ->get();

        // 2. PERBAIKAN DISINI: Hitung jumlah data untuk dikirim ke Frontend
        // (Agar Badge "12 Total Transaksi" di Orders.jsx berfungsi)
        $totalOrders = $bookings->count();

        return Inertia::render('Admin/Orders', [
            'bookings'    => $bookings,
            'totalOrders' => $totalOrders // <--- Kirim variable ini
        ]);
    }

    // --- 3. AKSI TERIMA PEMBAYARAN ---
    public function approveOrder($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->status = 'confirmed';
        $booking->save();

        return redirect()->back()->with('message', 'Pesanan berhasil disetujui!');
    }

    // --- 4. AKSI TOLAK PEMBAYARAN ---
    public function rejectOrder($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->status = 'rejected';
        $booking->save();

        return redirect()->back()->with('message', 'Pesanan ditolak.');
    }

    // --- 5. [BARU] CEK TIKET PINTAR (VALIDASI TANGGAL) ---
    // Fungsi ini akan dipanggil saat QR Code discan
    public function checkTicket($id)
    {
        // A. Cari Data Pesanan
        $booking = Booking::with('user')->find($id);

        // B. Jika ID Tidak Ditemukan (QR Code Palsu/Typo)
        if (!$booking) {
            return response()->json([
                'status' => 'error',
                'message' => '❌ TIKET TIDAK DITEMUKAN! (ID Tidak Terdaftar)'
            ]);
        }

        // C. Cek Status Pembayaran (Harus Lunas)
        if ($booking->status !== 'confirmed') {
            // Cek spesifik kenapa gagal
            $msg = $booking->status === 'pending' ? '⚠️ TIKET BELUM DIVERIFIKASI ADMIN!' : '⛔ TIKET SUDAH DITOLAK!';
            return response()->json([
                'status' => 'error',
                'message' => $msg
            ]);
        }

        // D. LOGIKA TANGGAL (PINTAR)
        // Bandingkan Hari Ini vs Tanggal Tiket
        $ticketDate = Carbon::parse($booking->date)->startOfDay(); // Jam di-nol-kan (00:00:00)
        $today      = Carbon::now()->startOfDay();

        // Skenario 1: Datang Telat (Kadaluwarsa)
        if ($today->gt($ticketDate)) {
            return response()->json([
                'status' => 'error',
                'message' => '⛔ TIKET KADALUWARSA! Tanggal kunjungan (' . $booking->date . ') sudah lewat.'
            ]);
        }

        // Skenario 2: Datang Kepagian (Belum Harinya)
        if ($today->lt($ticketDate)) {
            return response()->json([
                'status' => 'error',
                'message' => '⏳ BELUM WAKTUNYA! Tiket ini berlaku untuk tanggal ' . $booking->date
            ]);
        }

        // E. Lolos Semua Cek (Tanggal Cocok & Status Lunas)
        return response()->json([
            'status' => 'success',
            'message' => '✅ TIKET VALID! Silakan Masuk.',
            'data' => [
                'name' => $booking->user->name ?? $booking->name,
                'qty'  => $booking->qty . ' Orang',
                'date' => $booking->date
            ]
        ]);
    }
}