<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    
    public function run(): void
    {
        // 1. KITA BUAT AKUN ADMIN (KTP MERAH)
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@gmail.com', // Email Admin
            'password' => Hash::make('password'), // Password: password
            'role' => 'admin', // <--- INI KUNCINYA! Kita paksa jadi admin.
        ]);

        // 2. KITA BUAT AKUN PENGUNJUNG (KTP BIRU)
        User::create([
            'name' => 'Rio Pengunjung',
            'email' => 'rio@gmail.com', // Email User
            'password' => Hash::make('password'),
            'role' => 'user', // Status biasa
        ]);
    }
}
