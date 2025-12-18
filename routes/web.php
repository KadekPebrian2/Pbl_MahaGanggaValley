<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;

// 1. Rute Halaman Depan (Home)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

// --- ALUR TRANSAKSI (Booking -> Bayar -> Konfirmasi) ---

// A. Form Booking
Route::get('/booking', function () {
    return Inertia::render('Booking');
})->name('booking')->middleware(['auth']);

// B. Simpan Data Booking
Route::post('/booking-store', [BookingController::class, 'store'])
    ->name('booking.store')
    ->middleware(['auth']);

// C. Halaman Pembayaran
Route::get('/payment', [BookingController::class, 'showPayment'])
    ->name('payment')
    ->middleware(['auth']);

// D. KONFIRMASI PEMBAYARAN (UPLOAD GAMBAR)
Route::post('/payment-confirm', [BookingController::class, 'confirmPayment'])
    ->name('payment.confirm')
    ->middleware(['auth']);

// -------------------------------------------------------

Route::get('/success', function () {
    return Inertia::render('Success');
})->name('success');

Route::get('/my-orders', [BookingController::class, 'myOrders'])
    ->name('my-orders')
    ->middleware(['auth']);

// (Bagian Dashboard User sudah dihapus disini) 🗑️

// 4. Rute Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// === AREA KHUSUS ADMIN ===
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () { 
    
    // URL: localhost/admin/dashboard
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    // Nanti langkah selanjutnya kita tambah route Order, Gallery, Review di sini...
    // 1. Halaman Daftar Pesanan
    Route::get('/orders', [AdminController::class, 'orders'])->name('admin.orders');
    
    // 2. Aksi Terima Pembayaran (Approve)
    Route::post('/orders/{id}/approve', [AdminController::class, 'approveOrder'])->name('admin.orders.approve');
    
    // 3. Aksi Tolak Pembayaran (Reject)
    Route::post('/orders/{id}/reject', [AdminController::class, 'rejectOrder'])->name('admin.orders.reject');
});

require __DIR__ . '/auth.php';