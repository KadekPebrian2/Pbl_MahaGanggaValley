<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Booking; 
use Carbon\Carbon;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        // --- 1. AMBIL FILTER DARI FRONTEND ---
        // Default kita set 'weekly' (mingguan) agar grafik defaultnya harian
        $filter = $request->input('filter', 'weekly'); 

        // --- 2. SETUP TANGGAL & VARIABEL DASAR ---
        $now = Carbon::now();
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();
        
        $thisYear = $now->year;
        $lastYear = $now->subYear()->year;

        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();
        $startOfLastWeek = Carbon::now()->subWeek()->startOfWeek();
        $endOfLastWeek = Carbon::now()->subWeek()->endOfWeek();

        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth(); // Tambahan untuk limit bulan
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        // --- 3. STATUS VALID (FAKTA) ---
        $validStatus = ['paid', 'confirmed', 'used', 'lunas', 'settlement']; 

        // --- 4. HITUNG STATISTIK KARTU (TETAP SAMA SEPERTI KODE LAMA) ---
        // Kita biarkan ini tetap statis agar Admin selalu lihat ringkasan lengkap

        // A. HARIAN
        $salesToday = Booking::whereIn('status', $validStatus)->whereDate('created_at', $today)->sum('qty');
        $salesYesterday = Booking::whereIn('status', $validStatus)->whereDate('created_at', $yesterday)->sum('qty');

        // B. MINGGUAN
        $salesWeek = Booking::whereIn('status', $validStatus)->whereBetween('created_at', [$startOfWeek, $endOfWeek])->sum('qty');
        $salesLastWeek = Booking::whereIn('status', $validStatus)->whereBetween('created_at', [$startOfLastWeek, $endOfLastWeek])->sum('qty');

        // C. BULANAN
        $salesMonth = Booking::whereIn('status', $validStatus)->whereMonth('created_at', $now->month)->whereYear('created_at', $thisYear)->sum('qty');
        $salesLastMonth = Booking::whereIn('status', $validStatus)->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->sum('qty');

        // D. TAHUNAN
        $salesYear = Booking::whereIn('status', $validStatus)->whereYear('created_at', $thisYear)->sum('qty');
        $salesLastYear = Booking::whereIn('status', $validStatus)->whereYear('created_at', $lastYear)->sum('qty');

        // --- 5. LOGIKA GRAFIK DINAMIS (INI YANG BARU) ---
        $chartLabels = [];
        $chartData = [];
        $chartTitle = "";

        if ($filter === 'yearly') {
            // === TAHUNAN (Isinya: Jan - Des) ===
            $chartTitle = "Grafik Penjualan Tahun " . $thisYear;
            
            for ($i = 1; $i <= 12; $i++) {
                // Buat tanggal dummy untuk ambil nama bulan
                $date = Carbon::create($thisYear, $i, 1);
                $chartLabels[] = $date->format('M'); // Jan, Feb, Mar...
                
                $chartData[] = Booking::whereIn('status', $validStatus)
                    ->whereYear('created_at', $thisYear)
                    ->whereMonth('created_at', $i)
                    ->sum('qty');
            }

        } elseif ($filter === 'monthly') {
            // === BULANAN (Isinya: Minggu 1 - Minggu 4) ===
            $chartTitle = "Grafik Penjualan Bulan " . $now->format('F Y');
            
            // Kita bagi bulan ini menjadi 4 minggu
            for ($i = 0; $i < 4; $i++) {
                $startDay = ($i * 7) + 1;
                $endDay = ($i * 7) + 7;
                
                // Jika minggu terakhir, mentokkan ke akhir bulan (misal tgl 30/31)
                if ($i == 3) $endDay = $endOfMonth->day; 

                $chartLabels[] = "Minggu " . ($i + 1);

                $chartData[] = Booking::whereIn('status', $validStatus)
                    ->whereYear('created_at', $thisYear)
                    ->whereMonth('created_at', $now->month)
                    ->whereDay('created_at', '>=', $startDay)
                    ->whereDay('created_at', '<=', $endDay)
                    ->sum('qty');
            }

        } else {
            // === MINGGUAN (Isinya: Senin - Minggu) ===
            // Default filter='weekly'
            $chartTitle = "Grafik Penjualan Minggu Ini";
            $senin = Carbon::now()->startOfWeek(); 

            for ($i = 0; $i < 7; $i++) {
                $date = $senin->copy()->addDays($i);
                
                // Format Hari (Senin, Selasa, dll)
                // Jika server tidak support bhs indo, pakai format('l') (English)
                $chartLabels[] = $date->locale('id')->isoFormat('dddd'); 
                
                $chartData[] = Booking::whereIn('status', $validStatus)
                    ->whereDate('created_at', $date)
                    ->sum('qty');
            }
        }

        // --- 6. KIRIM KE FRONTEND ---
        return Inertia::render('Admin/Laporan', [
            'activeFilter' => $filter, // Kirim filter aktif agar tombol menyala
            'chartTitle' => $chartTitle, // Judul grafik
            'stats' => [
                'daily' => [
                    'current' => $salesToday,
                    'previous' => $salesYesterday,
                    'growth' => $this->calculateGrowth($salesToday, $salesYesterday)
                ],
                'weekly' => [
                    'current' => $salesWeek,
                    'previous' => $salesLastWeek,
                    'growth' => $this->calculateGrowth($salesWeek, $salesLastWeek)
                ],
                'monthly' => [
                    'current' => $salesMonth,
                    'previous' => $salesLastMonth,
                    'growth' => $this->calculateGrowth($salesMonth, $salesLastMonth)
                ],
                'yearly' => [
                    'current' => $salesYear,
                    'previous' => $salesLastYear,
                    'growth' => $this->calculateGrowth($salesYear, $salesLastYear)
                ],
            ],
            'chart' => [
                'labels' => $chartLabels,
                'data' => $chartData
            ]
        ]);
    }

    // Fungsi helper persentase (Tetap sama)
    private function calculateGrowth($current, $previous)
    {
        if ($previous == 0) {
            return $current > 0 ? 100 : 0; 
        }
        return round((($current - $previous) / $previous) * 100, 1);
    }
}