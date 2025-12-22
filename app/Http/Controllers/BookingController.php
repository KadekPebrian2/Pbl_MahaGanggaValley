<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
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
        $data['user_id'] = Auth::id(); 
        
        // --- PERBAIKAN 1: SET STATUS AWAL JADI 'unpaid' ---
        // Artinya: User baru pesan tiket, tapi belum upload bukti bayar
        $data['status'] = 'unpaid'; 
        $data['payment_proof'] = null;
        // --------------------------------------------------

        // C. Simpan ke Database MySQL
        $booking = Booking::create($data);

        // D. Simpan ID Booking barusan ke SESSION
        session(['current_booking_id' => $booking->id]);

        // E. Lanjut ke Halaman Pembayaran
        return redirect()->route('payment');
    }

    // 2. FUNGSI TAMPILKAN HALAMAN PAYMENT
    public function showPayment()
    {
        $bookingId = session('current_booking_id');

        if (!$bookingId) {
            return redirect('/');
        }

        $bookingData = Booking::find($bookingId);

        return Inertia::render('Payment', [
            'bookingData' => $bookingData
        ]);
    }

    // 3. KONFIRMASI PEMBAYARAN (UPLOAD BUKTI)
    public function confirmPayment(Request $request)
    {
        // A. Validasi
        $request->validate([
            'proofFile' => 'required|image|max:2048', 
        ]);

        // B. Ambil ID Booking dari Session
        $bookingId = session('current_booking_id');
        $booking = Booking::find($bookingId);

        if (!$booking) {
            return redirect('/');
        }

        // C. Proses Upload Gambar
        if ($request->hasFile('proofFile')) {
            $path = $request->file('proofFile')->store('payment_proofs', 'public');
            
            // Simpan alamat gambar ke Database
            $booking->payment_proof = $path;
        }

        // --- PERBAIKAN 2: UBAH STATUS JADI 'pending' ---
        // Artinya: User SUDAH bayar/upload, sekarang giliran Admin mengecek (Pending)
        $booking->status = 'pending'; 
        // -----------------------------------------------
        
        $booking->save();

        // E. Hapus Session (karena transaksi selesai)
        session()->forget(['current_booking_id', 'temp_booking_data']);

        // F. Lempar ke Halaman Sukses
        return redirect()->route('success');
    }

    // 4. MENAMPILKAN RIWAYAT PESANAN
    public function myOrders()
    {
        $bookings = Booking::where('user_id', Auth::id())
                            ->latest()
                            ->get();

        return Inertia::render('MyOrders', [
            'bookings' => $bookings
        ]);
    }

    public function showTicket($id)
    {
        // 1. Cari Pesanan
        $booking = Booking::where('user_id', Auth::id())
                          ->where('id', $id)
                          ->firstOrFail();

        // 2. Cek Keamanan
        if ($booking->status !== 'confirmed') {
            return redirect()->route('my-orders')->with('error', 'Tiket belum tersedia.');
        }
        return Inertia::render('Ticket', [
            'booking' => $booking
        ]);
    }
}