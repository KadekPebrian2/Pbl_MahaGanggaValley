<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking; // <--- WAJIB: Panggil Model Booking

class AdminController extends Controller
{
    // --- 1. DASHBOARD (YANG SUDAH ANDA BUAT) ---
    public function dashboard()
    {
        $stats = [
            'total_orders'   => Booking::count(),
            'pending_orders' => Booking::where('status', 'pending')->count(), 
            // Pastikan penulisan status konsisten (pending/confirmed/rejected) di database
            'revenue'        => Booking::where('status', 'confirmed')->sum('total_price') 
        ];

        $recent_orders = Booking::latest()->limit(5)->get(); // Ambil 5 terbaru saja untuk dashboard

        return Inertia::render('Admin/Dashboard', [
            'stats'  => $stats,
            'orders' => $recent_orders
        ]);
    }

    // --- 2. HALAMAN DAFTAR PESANAN (BARU) ---
    public function orders()
    {
        // Ambil SEMUA data booking
        // with('user') -> Mengambil data nama user dari tabel users (Relasi)
        // latest()     -> Urutkan dari yang paling baru
        $bookings = Booking::with('user')->latest()->get();

        // Kirim data ke file React: resources/js/Pages/Admin/Orders.jsx
        return Inertia::render('Admin/Orders', [
            'bookings' => $bookings
        ]);
    }

    // --- 3. AKSI TERIMA PEMBAYARAN (BARU) ---
    public function approveOrder($id)
    {
        // Cari booking berdasarkan ID, kalau gak ketemu tampilkan error 404
        $booking = Booking::findOrFail($id);

        // Ubah status menjadi 'confirmed' (Sesuai logika di Orders.jsx)
        $booking->status = 'confirmed';
        $booking->save();

        // Kembali ke halaman sebelumnya (Reload data)
        return redirect()->back()->with('message', 'Pesanan berhasil disetujui!');
    }

    // --- 4. AKSI TOLAK PEMBAYARAN (BARU) ---
    public function rejectOrder($id)
    {
        $booking = Booking::findOrFail($id);

        // Ubah status menjadi 'rejected'
        $booking->status = 'rejected';
        $booking->save();

        return redirect()->back()->with('message', 'Pesanan ditolak.');
    }
}