<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            // 1. Relasi ke User (Siapa yang pesan?)
            // constrained() otomatis mencari tabel 'users' dan kolom 'id'
            // onDelete('cascade') artinya kalau user dihapus, bookingannya juga dihapus
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // 2. Data Pesanan (Sesuai Form Booking.jsx)
            $table->string('name');       // Nama Lengkap
            $table->string('email');      // Email Kontak
            $table->string('phone');      // No WA
            $table->text('address');      // Alamat Lengkap
            $table->date('date');         // Tanggal Kunjungan
            $table->integer('qty');       // Jumlah Tiket

            // Harga Total (Gunakan decimal untuk uang agar presisi)
            // 12 digit total, 2 digit di belakang koma
            $table->decimal('total_price', 12, 2);

            // 3. Status & Bukti Bayar
            // Status default 'Pending' (Belum bayar)
            $table->string('status')->default('Pending');

            // Bukti transfer bisa kosong dulu (nullable) karena user baru upload nanti di halaman payment
            $table->string('payment_proof')->nullable();

            $table->timestamps(); // Created_at & Updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
