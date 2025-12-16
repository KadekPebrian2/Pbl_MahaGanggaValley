<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking; // <--- WAJIB: Panggil Model Booking

class AdminController extends Controller
{
    public function dashboard()
    {
        // 1. HITUNG STATISTIK DARI DATABASE
        $stats = [
            'total_orders'   => Booking::count(), // Hitung semua baris
            'pending_orders' => Booking::where('status', 'Pending')->count(), // Hitung yang pending
            // Hitung total uang hanya dari status 'Paid'
            'revenue'        => Booking::where('status', 'Paid')->sum('total_price') 
        ];

        // 2. AMBIL DATA PESANAN TERBARU
        // latest() = urutkan dari yang paling baru
        $recent_orders = Booking::latest()->get();

        // 3. KIRIM KE REACT
        return Inertia::render('Admin/Dashboard', [
            'stats'  => $stats,
            'orders' => $recent_orders
        ]);
    }
}