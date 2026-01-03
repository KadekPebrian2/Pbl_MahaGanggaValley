<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
// Import Model
use App\Models\Booking;
use App\Models\Ulasan;

class DashboardController extends Controller
{
    public function index()
    {
        // --- PERBAIKAN PENTING: DEFINISI STATUS SAH ---
        // Kita harus menghitung tiket yang 'confirmed' (belum scan), 'paid' (lunas),
        // DAN 'used' (sudah masuk). Kalau cuma 'confirmed', nanti pas di-scan
        // uangnya hilang dari dashboard.
        $validStatus = ['confirmed', 'paid', 'used', 'settlement'];

        // 1. Hitung Pendapatan (Total Uang)
        $totalIncome = Booking::whereIn('status', $validStatus)->sum('total_price');

        // 2. Hitung Tiket Terjual (TRANSAKSI / LEMBAR)
        // Gunakan count() untuk menghitung jumlah baris/transaksi
        $totalTickets = Booking::whereIn('status', $validStatus)->count();

        // 3. Hitung Pengunjung (MANUSIA / ORANG)
        // Gunakan sum('qty') untuk menjumlahkan total orang dalam tiket
        $totalVisitors = Booking::whereIn('status', $validStatus)->sum('qty');

        // ==========================================
        // 4. HITUNG RATING & ULASAN
        // ==========================================
        
        $rawRating = Ulasan::avg('rating') ?? 0;
        $ratingScore = number_format($rawRating, 1);

        $ratingStatus = 'Belum ada data';
        if ($rawRating >= 4.5) {
            $ratingStatus = 'Sangat Baik';
        } elseif ($rawRating >= 4.0) {
            $ratingStatus = 'Baik';
        } elseif ($rawRating > 0) {
            $ratingStatus = 'Cukup';
        }

        // 5. Ambil 5 Pesanan Terbaru
        $recentOrders = Booking::with('user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // 6. Kirim data ke React
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'income'        => $totalIncome,
                'tickets_sold'  => $totalTickets, // Ini jumlah Transaksi
                'visitors'      => $totalVisitors, // Ini jumlah Orang
                
                'rating'        => $ratingScore,   
                'rating_status' => $ratingStatus,  
            ],
            'recentOrders' => $recentOrders
        ]);
    }
}