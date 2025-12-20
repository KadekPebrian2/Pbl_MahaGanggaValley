import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { url } = usePage();

    // KODE WARNA BARU: #A3C4AC (Sage Green)
    const newGreen = "#A3C4AC";

    // --- KOLEKSI IKON SVG ---
    // Warna aktif: slate-800 (gelap), Warna inactive/hover: menyesuaikan
    const iconClasses = (active) => `w-6 h-6 transition-colors ${active ? 'text-slate-800' : 'text-slate-400 group-hover:text-[#A3C4AC]'}`;

    const icons = {
        dashboard: (active) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses(active)}>
                <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clipRule="evenodd" />
            </svg>
        ),
        orders: (active) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses(active)}>
                <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 17.25a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
        ),
        gallery: (active) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses(active)}>
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
            </svg>
        ),
        reviews: (active) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconClasses(active)}>
                <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clipRule="evenodd" />
            </svg>
        ),
        logout: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500 group-hover:text-white transition-colors">
                <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
            </svg>
        )
    };

    const menus = [
        { name: 'Ringkasan', url: '/admin/dashboard', iconKey: 'dashboard' },
        { name: 'Pesanan Tiket', url: '/admin/orders', iconKey: 'orders' },
        { name: 'Galeri Wisata', url: '/admin/gallery', iconKey: 'gallery' },
        { name: 'Ulasan Pengunjung', url: '/admin/reviews', iconKey: 'reviews' },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* --- SIDEBAR --- */}
            <aside className="w-72 bg-white border-r border-slate-100 fixed h-full z-20 flex flex-col hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                
                {/* 1. LOGO AREA */}
                <div className="h-32 flex items-center px-8 border-b border-slate-50">
                    <div className="flex flex-col items-start">
                        {/* Ikon Logo - Ganti warna text jadi hijau baru */}
                        <div className={`w-10 h-10 mb-2 text-[#A3C4AC]`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.07 0l-6.75 6.75a.75.75 0 0 0-1.06 1.06l6.75 6.75a.75.75 0 0 0 1.07 0l6.75-6.75a.75.75 0 0 0 0-1.07l-6.75-6.75ZM3.75 12a.75.75 0 0 0-1.06 1.06l6.75 6.75a.75.75 0 0 0 1.07 0l6.75-6.75a.75.75 0 0 0-1.07-1.06l-6.22 6.22-6.22-6.22Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {/* Teks Logo - Ganti warna text jadi hijau baru */}
                        <div>
                            <h1 className="text-xl font-black text-[#A3C4AC] tracking-tighter leading-none uppercase">
                                Maha Gangga
                            </h1>
                            <p className="text-xs font-bold text-slate-400 tracking-widest mt-1">VALLEY ADMIN</p>
                        </div>
                    </div>
                </div>

                {/* 2. MENU ITEMS */}
                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Menu Utama</p>
                    
                    {menus.map((item, index) => {
                        const isActive = url.startsWith(item.url);
                        return (
                            <Link
                                key={index}
                                href={item.url}
                                // UPDATE WARNA: Background jadi #A3C4AC, Teks jadi slate-800 agar kontras
                                className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ease-in-out relative overflow-hidden ${
                                    isActive
                                        ? 'bg-[#A3C4AC] text-slate-800 shadow-lg shadow-[#A3C4AC]/20 translate-x-1' 
                                        : 'text-slate-500 hover:bg-[#A3C4AC]/20 hover:text-[#A3C4AC] hover:translate-x-1'
                                }`}
                            >
                                {icons[item.iconKey](isActive)}
                                <span className="font-bold text-sm tracking-wide">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* 3. USER PROFILE & LOGOUT */}
                <div className="p-4 border-t border-slate-50 m-4">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <div className="flex items-center gap-3 mb-4">
                            {/* Avatar Ring Gradient - Update ke warna baru */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#A3C4AC] to-[#8FB398] p-0.5">
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-[#A3C4AC] text-xs">
                                    AD
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-700 truncate">Admin Petugas</p>
                                <p className="text-xs text-slate-400 truncate">admin@mahagangga.com</p>
                            </div>
                        </div>
                        
                        <Link 
                            href="/logout" 
                            method="post" 
                            as="button" 
                            className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-600 hover:text-red-600 py-2.5 rounded-xl text-xs font-bold transition-all group shadow-sm"
                        >
                            {icons.logout}
                            <span>Keluar Sistem</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 md:ml-72 p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-7xl mx-auto animate-fade-in-up">
                    {children}
                </div>
            </main>

            {/* Style Animasi */}
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}