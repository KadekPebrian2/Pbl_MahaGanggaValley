<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ulasan extends Model
{
    use HasFactory;

    // 1. Beritahu nama tabelnya (PENTING)
    protected $table = 'ulasan';

    // 2. Daftar kolom yang boleh diisi
    protected $fillable = [
        'user_id',
        'rating',
        'isi_ulasan',
        'balasan'
    ];

    // 3. Relasi ke Pengguna (User)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}