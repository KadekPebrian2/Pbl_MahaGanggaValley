<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    // 1. Menangkap Data dari Form Booking (POST)
    public function store(Request $request)
    {
        // Ambil semua data yang dikirim dari React
        $data = $request->all();

        // VALIDASI SEDERHANA (Opsional tapi disarankan)
        // $request->validate([
        //     'name' => 'required',
        //     'email' => 'required|email',
        // ]);

        // Simpan data ke SESSION sementara (agar bisa diambil di halaman sebelah)
        // Kita namakan koper datanya: 'temp_booking_data'
        session(['temp_booking_data' => $data]);

        // Lempar user ke halaman Payment
        return redirect()->route('payment');
    }

    // 2. Menampilkan Halaman Payment (GET)
    public function showPayment()
    {
        // Ambil data yang tadi dititipkan di Session
        $bookingData = session('temp_booking_data');

        // Jika datanya kosong (misal user langsung ketik url /payment tanpa booking dulu)
        // Maka bookingData akan bernilai null (React akan menampilkan pesan error)
        
        // Kirim data tersebut ke Frontend (Payment.jsx) via props 'bookingData'
        return Inertia::render('Payment', [
            'bookingData' => $bookingData
        ]);
    }
}