<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController; 

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// --- 1. HALAMAN DEPAN (PUBLIC) ---
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/success', function () {
    return Inertia::render('Success');
})->name('success');


// --- 2. USER DASHBOARD & PROFILE ---
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard User Biasa
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Profile User
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // History Pesanan User
    Route::get('/my-orders', [BookingController::class, 'myOrders'])->name('my-orders');
});


// --- 3. ALUR BOOKING (PEMESANAN TIKET) ---
Route::middleware(['auth'])->group(function () {
    Route::get('/booking', function () {
        return Inertia::render('Booking');
    })->name('booking');

    Route::post('/booking-store', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/payment', [BookingController::class, 'showPayment'])->name('payment');
    Route::post('/payment-confirm', [BookingController::class, 'confirmPayment'])->name('payment.confirm');
});


// --- 4. KHUSUS ADMIN (SIDEBAR HIJAU) ---
// Semua URL di sini akan berawalan /admin/....
// Contoh: /admin/dashboard, /admin/orders
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    
    // A. Dashboard Admin
    // URL: /admin/dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard'); 
    })->name('dashboard');

    // B. Pesanan Tiket
    // URL: /admin/orders
    Route::get('/orders', function () {
        // Pastikan Anda punya file: resources/js/Pages/Admin/Orders.jsx
        return Inertia::render('Admin/Orders');
    })->name('orders');

    // C. Galeri Wisata
    // URL: /admin/gallery
    Route::get('/gallery', function () {
        return Inertia::render('Admin/Gallery');
    })->name('gallery');

    // D. Ulasan Pengunjung
    // URL: /admin/reviews
    Route::get('/reviews', function () {
        return Inertia::render('Admin/Reviews');
    })->name('reviews');

});

// --- 5. LOGOUT ---
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// Load Rute Auth (Login/Register)
require __DIR__ . '/auth.php';