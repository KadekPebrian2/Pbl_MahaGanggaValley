import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Laporan({ stats, chart, activeFilter, chartTitle }) {
    const handleFilterChange = (filterType) => {
        router.get(route('admin.laporan'), { filter: filterType }, { preserveState: true, preserveScroll: true });
    };

    const chartOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1f2937', padding: 12, callbacks: { label: (c) => `${c.parsed.y} Tiket` } } },
        scales: { x: { grid: { display: false } }, y: { border: { dash: [4, 4] }, grid: { color: '#f3f4f6' }, beginAtZero: true } },
        interaction: { mode: 'index', intersect: false },
    };

    const chartDataConfig = {
        labels: chart.labels,
        datasets: [{
            label: 'Penjualan', data: chart.data, borderColor: '#10b981',
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

    return (
        <AdminLayout>
            <Head title="Laporan Penjualan" />
            
            <style>{`
                .header-title h1 { font-size: 24px; font-weight: 800; margin: 0; color: #111827; }
                .header-title p { color: #6b7280; font-size: 14px; margin-top: 5px; }
                
                .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 25px 0; }
                .mini-card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #f3f4f6; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
                .mini-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; }
                .mini-value { font-size: 22px; font-weight: 800; color: #1f2937; margin: 5px 0; }
                .trend { font-size: 12px; font-weight: 700; }
                .trend.up { color: #10b981; } .trend.down { color: #ef4444; }

                .chart-section { background: white; border-radius: 16px; padding: 25px; border: 1px solid #f3f4f6; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
                .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px; }
                .filter-group { display: flex; background: #f3f4f6; padding: 4px; border-radius: 8px; }
                .filter-btn { padding: 6px 16px; font-size: 12px; font-weight: 600; border: none; background: none; border-radius: 6px; cursor: pointer; color: #6b7280; }
                .filter-btn.active { background: white; color: #10b981; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                
                .chart-wrapper { height: 350px; width: 100%; position: relative; }
                
                @media (max-width: 768px) {
                    .chart-header { flex-direction: column; align-items: flex-start; }
                    .chart-wrapper { height: 250px; }
                }
            `}</style>

            <div className="header-title">
                <h1>Laporan Penjualan</h1>
                <p>Statistik performa penjualan tiket.</p>
            </div>

            <div className="stats-row">
                {[
                    { label: 'Hari Ini', val: stats.daily },
                    { label: 'Minggu Ini', val: stats.weekly },
                    { label: 'Bulan Ini', val: stats.monthly },
                    { label: 'Tahun Ini', val: stats.yearly },
                ].map((item, idx) => (
                    <div key={idx} className="mini-card">
                        <div className="mini-label">{item.label}</div>
                        <div className="mini-value">{item.val.current}</div>
                        <div className={`trend ${item.val.growth >= 0 ? 'up' : 'down'}`}>
                            {item.val.growth >= 0 ? '▲' : '▼'} {Math.abs(item.val.growth)}%
                        </div>
                    </div>
                ))}
            </div>

            <div className="chart-section">
                <div className="chart-header">
                    <h2 style={{fontSize:'16px', fontWeight:700}}>{chartTitle || 'Grafik Tren'}</h2>
                    <div className="filter-group">
                        {['weekly', 'monthly', 'yearly'].map(f => (
                            <button key={f} onClick={() => handleFilterChange(f)} className={`filter-btn ${activeFilter === f ? 'active' : ''}`}>
                                {f === 'weekly' ? 'Mingguan' : f === 'monthly' ? 'Bulanan' : 'Tahunan'}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="chart-wrapper">
                    <Line options={chartOptions} data={chartDataConfig} />
                </div>
            </div>
        </AdminLayout>
    );
}