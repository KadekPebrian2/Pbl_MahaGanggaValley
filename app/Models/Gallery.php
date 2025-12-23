<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;
    
    // 1. Menentukan nama tabel sesuai di database Anda
    protected $table = 'galery_admin'; 

    // 2. Menentukan Primary Key karena Anda menggunakan idFoto
    protected $primaryKey = 'idFoto';

    // 3. Mematikan timestamps otomatis (created_at/updated_at) karena tidak ada di tabel Anda
    public $timestamps = false;

    // 4. Daftar kolom yang boleh diisi melalui form
    protected $fillable = [
        'judul',
        'namaFile',
        'deskripsi',
        'tanggalInput', // Saya tambahkan ini agar tanggal bisa tersimpan
    ];
}