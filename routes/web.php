<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// Import Controller
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController; 
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\UlasanController;
use App\Http\Controllers\ScanTiketController; 
use App\Http\Controllers\LaporanController;
// Import Model
use App\Models\Gallery;
use App\Models\Ulasan;

// ==========================================================
// 1. HALAMAN DEPAN (PUBLIC)
// ==========================================================
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
        'galleries'   => Gallery::orderBy('idFoto', 'desc')->get(),
        'reviews'     => Ulasan::with('user')->latest()->take(10)->get() 
    ]);
})->name('home');

// ==========================================================
// 2. ALUR TRANSAKSI (USER LOGIN)
// ==========================================================
Route::middleware(['auth'])->group(function () {
    
    // A. Booking & Pembayaran
    Route::get('/booking', function () {
        return Inertia::render('Booking');
    })->name('booking');

    Route::post('/booking-store', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/payment', [BookingController::class, 'showPayment'])->name('payment');
    Route::post('/payment-confirm', [BookingController::class, 'confirmPayment'])->name('payment.confirm');

    // B. Riwayat Pesanan & Tiket
    Route::get('/success', function () { return Inertia::render('Success'); })->name('success');
    Route::get('/my-orders', [BookingController::class, 'myOrders'])->name('my-orders');
    Route::get('/booking/{id}/ticket', [BookingController::class, 'showTicket'])->name('booking.ticket');
    
    // C. Fitur Ulasan (User)
    Route::post('/kirim-ulasan', [UlasanController::class, 'simpanUlasan'])->name('ulasan.kirim');
    Route::delete('/ulasan-saya/{id}', [UlasanController::class, 'hapusUlasanSaya'])->name('ulasan.hapus.saya');

    // D. Profil User
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ==========================================================
// 3. AREA KHUSUS ADMIN
// ==========================================================
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () { 
    
    // A. Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // B. Pesanan Tiket
    Route::get('/orders', [AdminController::class, 'orders'])->name('admin.orders');
    Route::post('/orders/{id}/approve', [AdminController::class, 'approveOrder'])->name('admin.orders.approve');
    Route::post('/orders/{id}/reject', [AdminController::class, 'rejectOrder'])->name('admin.orders.reject');

    // ======================================================
    // C. SCAN TIKET (YANG KITA PERBAIKI)
    // ======================================================
    // Catatan: Karena ada di dalam group 'prefix' admin, 
    // kita cukup tulis '/scan', nanti otomatis jadi '/admin/scan'
    
    // 1. Halaman Kamera
    Route::get('/scan', [ScanTiketController::class, 'index'])->name('admin.scan');

    // 2. Proses API Cek QR (Dipanggil Axios)
    Route::post('/scan/check', [ScanTiketController::class, 'store'])->name('admin.scan.check');
    // ======================================================

    // D. Manajemen Galeri
    Route::get('/gallery', [GalleryController::class, 'index'])->name('admin.gallery.index');
    Route::post('/gallery', [GalleryController::class, 'store'])->name('admin.gallery.store');
    Route::post('/gallery/{id}', [GalleryController::class, 'update'])->name('admin.gallery.update');
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy'])->name('admin.gallery.destroy');

    // E. Manajemen Ulasan
    Route::get('/ulasan', [UlasanController::class, 'indexAdmin'])->name('admin.ulasan');
    Route::post('/ulasan/{id}/balas', [UlasanController::class, 'simpanBalasan'])->name('admin.ulasan.balas');
    Route::delete('/ulasan/{id}', [UlasanController::class, 'hapusUlasanAdmin'])->name('admin.ulasan.hapus');

    // F. Laporan Penjualan Tiket
    Route::get('/laporan', [LaporanController::class, 'index'])->name('admin.laporan');
});

require __DIR__ . '/auth.php';