import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import '../../../css/Laporan.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Laporan({ stats, chart, activeFilter, chartTitle }) {

    const handleFilterChange = (filterType) => {
        router.get(route('admin.laporan'), { filter: filterType }, {
            preserveState: true, preserveScroll: true,
        });
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1f2937', padding: 12, titleFont: { size: 14 }, bodyFont: { size: 13 }, displayColors: false,
                callbacks: { label: (c) => `${c.parsed.y} Tiket` }
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
            y: { border: { dash: [4, 4] }, grid: { color: '#f3f4f6' }, beginAtZero: true }
        },
        interaction: { mode: 'index', intersect: false },
    };

    const chartDataConfig = {
        labels: chart.labels,
        datasets: [{
            label: 'Penjualan',
            data: chart.data,
            borderColor: '#10b981',
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 350);
                gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
                gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
                return gradient;
            },
            borderWidth: 3, pointBackgroundColor: '#fff', pointBorderColor: '#10b981', fill: true, tension: 0.4,
        }],
    };

    const StatCard = ({ title, value, subtext, trend, iconClass, iconSvg }) => {
        const isUp = trend >= 0;
        return (
            <div className="stat-card">
                <div className="stat-header">
                    <div className={`icon-box ${iconClass}`}>{iconSvg}</div>
                    <span className={`trend-badge ${isUp ? 'trend-up' : 'trend-down'}`}>
                        {isUp ? '▲' : '▼'} {Math.abs(trend)}%
                    </span>
                </div>
                <div>
                    <div className="stat-title">{title}</div>
                    <div className="stat-value">{value}</div>
                    <div className="stat-subtext">{subtext}</div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <Head title="Laporan Penjualan" />

            <div className="dashboard-container">
                {/* HEADER */}
                <div className="header-section">
                    <div>
                        <h1 className="page-title">Dashboard Laporan</h1>
                        <p className="page-subtitle">Statistik penjualan tiket Mahagangga Valley</p>
                    </div>
                    <div className="date-badge">
                        <div className="dot-indicator"></div>
                        {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                </div>

                {/* GRID KARTU ATAS */}
                <div className="stats-grid">
                    <StatCard 
                        title="Penjualan Hari Ini" value={stats.daily.current} subtext="vs Kemarin" trend={stats.daily.growth} iconClass="icon-blue"
                        iconSvg={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                    />
                    <StatCard 
                        title="Minggu Ini" value={stats.weekly.current} subtext="vs Minggu Lalu" trend={stats.weekly.growth} iconClass="icon-purple"
                        iconSvg={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
                    />
                    <StatCard 
                        title="Bulan Ini" value={stats.monthly.current} subtext="vs Bulan Lalu" trend={stats.monthly.growth} iconClass="icon-orange"
                        iconSvg={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>}
                    />
                    <StatCard 
                        title="Tahun Ini" value={stats.yearly.current} subtext="vs Tahun Lalu" trend={stats.yearly.growth} iconClass="icon-green"
                        iconSvg={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>}
                    />
                </div>

                {/* CONTENT GRID (Sekarang hanya 1 kolom: Grafik Full Width) */}
                <div className="content-grid">
                    
                    <div className="chart-card">
                        {/* Header Grafik & Tombol Filter */}
                        <div className="chart-header">
                            <h2 className="chart-title">{chartTitle || 'Tren Penjualan'}</h2>
                            <div className="filter-tabs">
                                {['weekly', 'monthly', 'yearly'].map((filter) => (
                                    <button 
                                        key={filter}
                                        onClick={() => handleFilterChange(filter)}
                                        className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                                    >
                                        {filter === 'weekly' ? 'Mingguan' : filter === 'monthly' ? 'Bulanan' : 'Tahunan'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Canvas Grafik */}
                        <div className="chart-container">
                            <Line options={chartOptions} data={chartDataConfig} />
                        </div>

                        {/* === BAGIAN BARU: INSIGHT DI BAWAH GRAFIK === */}
                        <div className="chart-footer-insight">
                            <div className="insight-icon-small">
                                {/* Icon Info kecil */}
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div className="insight-text-wrapper">
                                <h4>Insight Sistem</h4>
                                <p>
                                    Berdasarkan data {activeFilter === 'weekly' ? 'mingguan' : activeFilter === 'monthly' ? 'bulanan' : 'tahunan'}, 
                                    penjualan tiket saat ini sedang mengalami 
                                    <span className={stats[activeFilter].growth >= 0 ? 'highlight-green' : 'highlight-red'}>
                                        {stats[activeFilter].growth >= 0 ? ' KENAIKAN ' : ' PENURUNAN '}
                                    </span>
                                    sebesar <strong>{Math.abs(stats[activeFilter].growth)}%</strong>. 
                                    {stats[activeFilter].growth < 0 
                                        ? " Strategi promosi perlu ditingkatkan." 
                                        : " Kinerja sangat baik, pertahankan!"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}