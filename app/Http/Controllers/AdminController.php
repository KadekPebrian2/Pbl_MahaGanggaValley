<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking; // <--- WAJIB: Panggil Model Booking

class AdminController extends Controller
{
    // --- 1. DASHBOARD ---
    public function dashboard()
    {
        $stats = [
            // PERBAIKAN: Hitung total pesanan HANYA yang statusnya BUKAN 'unpaid'
            'total_orders'   => Booking::where('status', '!=', 'unpaid')->count(),
            
            // Hitung yang pending (Sudah upload, butuh verifikasi)
            'pending_orders' => Booking::where('status', 'pending')->count(), 
            
            // Hitung uang masuk (Hanya yang sudah confirmed)
            'revenue'        => Booking::where('status', 'confirmed')->sum('total_price') 
        ];

        // PERBAIKAN: Ambil 5 pesanan terbaru yang BUKAN 'unpaid'
        $recent_orders = Booking::with('user') // Tambah with('user') biar nama penampil di dashboard aman
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
        
        // Ambil data booking DIMANA status TIDAK SAMA DENGAN 'unpaid'
        // Artinya: Pesanan yang baru isi form (unpaid) TIDAK AKAN MUNCUL disini.
        $bookings = Booking::with('user')
                            ->where('status', '!=', 'unpaid') // <--- FILTER PENTING
                            ->latest()
                            ->get();

        return Inertia::render('Admin/Orders', [
            'bookings' => $bookings
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
}