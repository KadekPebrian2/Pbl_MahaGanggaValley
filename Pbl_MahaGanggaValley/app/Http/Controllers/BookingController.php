<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
// Import Model dan Auth agar bisa dipakai
use App\Models\Booking; 
use Illuminate\Support\Facades\Auth; 

class BookingController extends Controller
{
    // 1. FUNGSI SIMPAN (STORE)
    // Dipanggil saat tombol "Booking Sekarang" diklik
    public function store(Request $request)
    {
        // A. Ambil semua data dari formulir React
        $data = $request->all();

        // B. Tambahkan ID User yang sedang login
        // (Wajib ada karena di database kolom 'user_id' tidak boleh kosong)
        $data['user_id'] = Auth::id(); 
        
        // C. Simpan ke Database MySQL
        // Perintah ini akan membuat baris baru di tabel 'bookings'
        $booking = Booking::create($data);

        // D. Simpan ID Booking barusan ke SESSION
        // Kita tidak menyimpan seluruh data lagi, cukup ID-nya saja (misal: ID 5)
        // Tujuannya agar halaman Payment tahu: "Oh, kita mau bayar pesanan nomor 5"
        session(['current_booking_id' => $booking->id]);

        // E. Lanjut ke Halaman Pembayaran
        return redirect()->route('payment');
    }

    // 2. FUNGSI TAMPILKAN HALAMAN PAYMENT
    // Dipanggil saat halaman /payment dibuka
    public function showPayment()
    {
        // A. Cek Session: "Tadi user pesan nomor berapa ya?"
        $bookingId = session('current_booking_id');

        // Kalau session kosong (user iseng buka link /payment tanpa booking dulu)
        // Kita tendang balik ke Home biar tidak error
        if (!$bookingId) {
            return redirect('/');
        }

        // B. Ambil Data Lengkap dari Database berdasarkan ID tadi
        // SELECT * FROM bookings WHERE id = $bookingId
        $bookingData = Booking::find($bookingId);

        // C. Kirim data asli dari Database ke Payment.jsx
        return Inertia::render('Payment', [
            'bookingData' => $bookingData
        ]);
    }
    // 3. KONFIRMASI PEMBAYARAN (UPLOAD BUKTI)
    public function confirmPayment(Request $request)
    {
        // A. Validasi: Pastikan yang diupload adalah gambar
        $request->validate([
            'proofFile' => 'required|image|max:2048', // Maksimal 2MB
        ]);

        // B. Ambil ID Booking dari Session
        $bookingId = session('current_booking_id');
        $booking = Booking::find($bookingId);

        if (!$booking) {
            return redirect('/');
        }

        // C. Proses Upload Gambar
        if ($request->hasFile('proofFile')) {
            // Simpan gambar ke folder 'public/storage/payment_proofs'
            $path = $request->file('proofFile')->store('payment_proofs', 'public');
            
            // Simpan alamat gambar ke Database
            $booking->payment_proof = $path;
        }

        // D. Update Status jadi 'Paid' (atau Menunggu Konfirmasi)
        $booking->status = 'Paid';
        $booking->save();

        // E. Hapus Session (karena transaksi selesai)
        session()->forget(['current_booking_id', 'temp_booking_data']);

        // F. Lempar ke Halaman Sukses
        return redirect()->route('success');
    }

    // 4. MENAMPILKAN RIWAYAT PESANAN
    public function myOrders()
    {
        // Ambil semua booking milik user yang sedang login
        // urutkan dari yang terbaru (latest)
        $bookings = Booking::where('user_id', Auth::id())
                            ->latest()
                            ->get();

        return Inertia::render('MyOrders', [
            'bookings' => $bookings
        ]);
    }
}