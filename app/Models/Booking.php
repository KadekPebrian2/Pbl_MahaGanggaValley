<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // 1. Izin Pengisian Data (Mass Assignment)
    // Kita daftar semua kolom tabel di sini agar bisa diisi sekaligus
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'address',
        'date',
        'qty',
        'total_price',
        'status',
        'payment_proof',
    ];

    // 2. Relasi ke User
    // "Setiap Booking pasti milik satu User"
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}