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

// 2. Rute Halaman Lainnya (Sesuai App.jsx lama kamu)
Route::get('/booking', function () {
    return Inertia::render('Booking');
})->name('booking');
// Kita arahkan ke Controller 'showPayment' agar data session bisa diambil
Route::get('/payment', [BookingController::class, 'showPayment'])->name('payment');

Route::get('/payment', function () {
    return Inertia::render('Payment');
})->name('payment');

Route::get('/success', function () {
    return Inertia::render('Success');
})->name('success');

Route::get('/my-orders', function () {
    return Inertia::render('MyOrders');
})->name('my-orders');

// 3. Rute Dashboard (Bawaan Breeze, biarkan saja)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 4. Rute Profile (Bawaan Breeze)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';