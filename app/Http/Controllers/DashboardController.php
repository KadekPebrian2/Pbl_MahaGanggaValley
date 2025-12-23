<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
// Import Model
use App\Models\Booking;
use App\Models\Ulasan; // <--- [PENTING] Tambahkan ini

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Hitung Pendapatan (Status 'confirmed')
        $totalIncome = Booking::where('status', 'confirmed')->sum('total_price');

        // 2. Hitung Tiket Terjual
        $totalTickets = Booking::where('status', 'confirmed')->sum('qty');

        // 3. Hitung Pengunjung
        $totalVisitors = $totalTickets; 

        // ==========================================
        // 4. HITUNG RATING & ULASAN (LOGIKA BARU)
        // ==========================================
        
        // Ambil rata-rata kolom 'rating' dari tabel ulasan
        // Jika belum ada ulasan, default ke 0
        $rawRating = Ulasan::avg('rating') ?? 0;
        
        // Format jadi 1 angka di belakang koma (contoh: 4.8)
        $ratingScore = number_format($rawRating, 1);

        // Tentukan Status/Label berdasarkan nilai
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
                'tickets_sold'  => $totalTickets,
                'visitors'      => $totalVisitors,
                
                // Masukkan data rating yang sudah dihitung tadi
                'rating'        => $ratingScore,   
                'rating_status' => $ratingStatus,  
            ],
            'recentOrders' => $recentOrders
        ]);
    }
}