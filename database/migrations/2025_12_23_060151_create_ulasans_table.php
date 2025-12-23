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
        Schema::create('ulasan', function (Blueprint $table) {
            $table->id();
            // Tetap user_id biar relasi aman
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            $table->integer('rating');
            $table->text('isi_ulasan'); // Bahasa Indonesia
            $table->text('balasan')->nullable(); // Bahasa Indonesia (untuk admin)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ulasan');
    }
};