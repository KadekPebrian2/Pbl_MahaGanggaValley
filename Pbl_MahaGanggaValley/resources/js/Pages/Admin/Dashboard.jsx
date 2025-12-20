import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

// --- KOLEKSI IKON SVG ---
const Icons = {
    // Ikon Uang / Pendapatan
    revenue: (classes) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={classes}>
            <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
            <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.839 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
            <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
        </svg>
    ),
    // Ikon Tiket
    ticket: (classes) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={classes}>
            <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 17.25a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        </svg>
    ),
    // Ikon Pengunjung (People Group)
    visitors: (classes) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={classes}>
            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-4.42 6.753 6.753 0 0 0 .52-2.318v-.001a.75.75 0 0 0-.75-.75H17.25Z" />
        </svg>
    ),
    // Ikon Rating (Star)
    star: (classes) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={classes}>
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
    )
};

// --- KOMPONEN KARTU STATISTIK ---
const StatCard = ({ title, value, iconRender, colorClass, delay, isActive, onClick, renderSubtext }) => (
    <div 
        onClick={onClick}
        className={`
            relative overflow-hidden p-6 rounded-3xl transition-all duration-300 cursor-pointer group border h-full
            ${isActive 
                ? 'bg-[#A3C4AC] border-[#A3C4AC] shadow-xl shadow-[#A3C4AC]/30 -translate-y-2' 
                : 'bg-white border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 hover:border-[#A3C4AC]/50'
            }
        `}
        style={{ animationDelay: `${delay}ms` }}
    >
        {/* Dekorasi Background Icon Besar */}
        <div className={`absolute -right-6 -bottom-6 transition-all duration-500 rotate-12 select-none pointer-events-none
            ${isActive ? 'opacity-10 text-slate-800' : 'opacity-5 group-hover:opacity-10'}
        `}>
            {iconRender("w-32 h-32")}
        </div>

        {/* Header Icon & Label */}
        <div className="flex items-start justify-between mb-4 relative z-10">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300
                ${isActive ? 'bg-white/40 text-slate-800 backdrop-blur-sm' : colorClass}
            `}>
                {iconRender("w-6 h-6")}
            </div>
             <span className={`px-2 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] transition-colors
                ${isActive ? 'bg-slate-800/10 text-slate-800' : 'bg-slate-50 text-slate-400'}
             `}>
                Hari Ini
            </span>
        </div>

        {/* Konten Utama */}
        <div className="relative z-10 flex flex-col justify-end">
            <p className={`text-sm font-medium mb-1 transition-colors ${isActive ? 'text-slate-700' : 'text-slate-500'}`}>
                {title}
            </p>
            <h3 className={`text-3xl font-extrabold tracking-tight transition-colors ${isActive ? 'text-slate-800' : 'text-slate-800'}`}>
                {value}
            </h3>
            
            {/* Subtext */}
            <div className="mt-3">
                {renderSubtext(isActive)}
            </div>
        </div>
    </div>
);

export default function Dashboard() {
    const [currentDate, setCurrentDate] = useState('');
    const [activeCard, setActiveCard] = useState(null); 

    useEffect(() => {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(date.toLocaleDateString('id-ID', options));
    }, []);

    return (
        <AdminLayout>
            <Head title="Ringkasan Wisata" />

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard </h2>
                    <p className="text-slate-500 mt-2 text-lg">Maha Ganagga Valley.</p>
                </div>
                <div className="bg-white px-5 py-2.5 rounded-full border border-slate-200 text-sm font-medium text-slate-600 shadow-sm flex items-center gap-2 hover:border-[#A3C4AC] transition-colors cursor-default">
                    <span className="w-2 h-2 rounded-full bg-[#A3C4AC] animate-pulse"></span>
                    {currentDate}
                </div>
            </div>

            {/* STATS GRID - 4 KOLOM */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                {/* 1. Total Pendapatan */}
                <StatCard 
                    title="Total Pendapatan" 
                    value="Rp 40.000" 
                    iconRender={Icons.revenue} 
                    colorClass="bg-[#A3C4AC]/20 text-[#A3C4AC]"
                    delay={0}
                    isActive={activeCard === 0}
                    onClick={() => setActiveCard(0)}
                    renderSubtext={(isActive) => (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded flex w-fit items-center gap-1 transition-colors
                            ${isActive ? 'bg-slate-800/10 text-slate-800' : 'bg-[#A3C4AC]/20 text-[#A3C4AC]'}
                        `}>
                            ↗ +12% naik
                        </span>
                    )}
                />

                {/* 2. Tiket Terjual */}
                <StatCard 
                    title="Tiket Terjual" 
                    value="2 Lembar" 
                    iconRender={Icons.ticket} 
                    colorClass="bg-blue-50 text-blue-600"
                    delay={100}
                    isActive={activeCard === 1}
                    onClick={() => setActiveCard(1)}
                    renderSubtext={(isActive) => (
                        <span className={`text-xs font-semibold flex items-center gap-1 transition-colors
                            ${isActive ? 'text-slate-700' : 'text-slate-400'}
                        `}>
                            Target: 100/hari
                        </span>
                    )}
                />

                {/* 3. Total Pengunjung */}
                <StatCard 
                    title="Total Pengunjung" 
                    value="2 Orang" 
                    iconRender={Icons.visitors} 
                    colorClass="bg-purple-50 text-purple-600"
                    delay={200}
                    isActive={activeCard === 2}
                    onClick={() => setActiveCard(2)}
                    renderSubtext={(isActive) => (
                        <span className={`text-xs font-semibold flex items-center gap-1 transition-colors
                            ${isActive ? 'text-slate-800 font-bold' : 'text-purple-500'}
                        `}>
                            1 Menunggu Masuk
                        </span>
                    )}
                />

                {/* 4. Rating & Ulasan (BARU) */}
                <StatCard 
                    title="Rating & Ulasan" 
                    value="4.9 / 5.0" 
                    iconRender={Icons.star} 
                    colorClass="bg-yellow-50 text-yellow-500"
                    delay={300}
                    isActive={activeCard === 3}
                    onClick={() => setActiveCard(3)}
                    renderSubtext={(isActive) => (
                        <span className={`text-xs font-semibold flex items-center gap-1 transition-colors
                            ${isActive ? 'text-slate-800' : 'text-yellow-600'}
                        `}>
                            ⭐ +3 Ulasan Baru
                        </span>
                    )}
                />

            </div>

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: PESANAN */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="font-bold text-xl text-slate-800">Pesanan Terbaru</h3>
                                <p className="text-sm text-slate-400">Transaksi tiket masuk real-time</p>
                            </div>
                            <button className="text-[#A3C4AC] text-sm font-bold hover:bg-[#A3C4AC]/20 px-4 py-2 rounded-lg transition-colors">
                                Lihat Semua →
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Item 1 */}
                            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group cursor-pointer">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">SA</div>
                                    <div>
                                        <p className="font-bold text-slate-800">Siti Aminah</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">5 Tiket</span>
                                            <span className="text-[10px] text-slate-400">• Baru saja</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-800">Rp 100.000</p>
                                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-600">Pending</span>
                                </div>
                            </div>
                             {/* Item 2 */}
                             <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group cursor-pointer">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-[#A3C4AC]/20 text-[#A3C4AC] flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">BS</div>
                                    <div>
                                        <p className="font-bold text-slate-800">Budi Santoso</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">2 Tiket</span>
                                            <span className="text-[10px] text-slate-400">• 2 menit lalu</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-[#A3C4AC]">+ Rp 40.000</p>
                                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A3C4AC]/20 text-[#A3C4AC]">Lunas</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: STATUS OPERASIONAL */}
                <div className="space-y-6">
                    <div className="relative bg-[#A3C4AC] rounded-3xl p-8 shadow-xl shadow-[#A3C4AC]/30 overflow-hidden group">
                        {/* Dekorasi Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-800 opacity-5 rounded-full -ml-10 -mb-10 blur-xl"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-lg text-slate-800">Status Operasional</h3>
                                <span className="w-3 h-3 bg-slate-800/60 rounded-full animate-ping"></span>
                            </div>
                            
                            <p className="text-slate-800 text-2xl font-bold mb-2">
                                Buka Normal
                            </p>
                            <p className="text-slate-700 text-sm leading-relaxed mb-8 opacity-90">
                                Loket dan area parkir siap menerima pengunjung.
                            </p>

                            <div className="inline-flex items-center gap-2 bg-slate-800/10 text-slate-800 px-4 py-2 rounded-xl text-sm font-bold">
                                <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                                Buka: 08.00 - 17.00
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}