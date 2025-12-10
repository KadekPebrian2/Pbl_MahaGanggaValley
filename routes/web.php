<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BookingController;

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

// D. KONFIRMASI PEMBAYARAN (UPLOAD GAMBAR) <--- TAMBAHAN BARU DISINI
// Ini jalur khusus untuk menerima file upload dari Payment.jsx
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

// 3. Rute Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 4. Rute Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';