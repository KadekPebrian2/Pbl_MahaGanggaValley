<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking; // <--- JANGAN LUPA IMPORT MODEL INI
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Hitung Pendapatan (Hanya yang statusnya 'confirmed' / lunas)
        $totalIncome = Booking::where('status', 'confirmed')->sum('total_price');

        // 2. Hitung Tiket Terjual (Qty dari yang statusnya 'confirmed')
        $totalTickets = Booking::where('status', 'confirmed')->sum('qty');

        // 3. Hitung Pengunjung (Bisa disamakan dengan tiket terjual atau logika lain)
        $totalVisitors = $totalTickets; 

        // 4. Ambil 5 Pesanan Terbaru untuk list di bawah
        $recentOrders = Booking::with('user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // 5. Kirim data ke React
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'income' => $totalIncome,
                'tickets_sold' => $totalTickets,
                'visitors' => $totalVisitors,
                'rating' => 4.8, // Rating masih dummy (kecuali sudah ada tabel review)
            ],
            'recentOrders' => $recentOrders
        ]);
    }
}