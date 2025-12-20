<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking; // <-- WAJIB: Panggil Model Booking agar bisa akses database

class AdminController extends Controller
{
    public function dashboard()
    {
        // 1. Hitung Total Uang
        // Ambil Booking yang statusnya 'Paid', lalu jumlahkan kolom 'total_price'
        $totalRevenue = Booking::where('status', 'Paid')->sum('total_price');

        // 2. Hitung Total Tiket
        // Ambil Booking yang statusnya 'Paid', lalu jumlahkan kolom 'qty' (jumlah orang)
        $totalTickets = Booking::where('status', 'Paid')->sum('qty');

        // 3. Hitung Total Transaksi
        // Hitung ada berapa baris data di tabel bookings (termasuk yang pending)
        $totalVisitors = Booking::count();

        // 4. Kirim paket data ini ke Frontend (Dashboard.jsx)
        return Inertia::render('Admin/Dashboard', [
            'totalRevenue' => $totalRevenue,
            'totalTickets' => $totalTickets,
            'totalVisitors' => $totalVisitors,
        ]);
    }
}