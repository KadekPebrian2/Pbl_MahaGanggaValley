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

// 3. Rute Dashboard User Biasa (Jika ada)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 4. Rute Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// === AREA KHUSUS ADMIN (YANG SUDAH DIPERBAIKI) ===
// middleware(['auth']): Wajib Login
// prefix('admin'): Semua URL otomatis ada '/admin' di depannya
Route::middleware(['auth'])->prefix('admin')->group(function () {
    
    // 1. Dashboard Admin
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard'); 
    })->name('admin.dashboard');

    // 2. Pesanan Tiket (Orders)
    Route::get('/orders', function () {
        return Inertia::render('Admin/Orders');
    })->name('admin.orders');

    // 3. Galeri Wisata (Gallery)
    Route::get('/gallery', function () {
        return Inertia::render('Admin/Gallery');
    })->name('admin.gallery');

    // 4. Ulasan Pengunjung (Reviews)
    Route::get('/reviews', function () {
        return Inertia::render('Admin/Reviews');
    })->name('admin.reviews');

});

// Load Rute Autentikasi (Login, Register, Logout)
require __DIR__ . '/auth.php';