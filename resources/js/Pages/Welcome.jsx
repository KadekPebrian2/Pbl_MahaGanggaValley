import React from 'react';
import { Head } from '@inertiajs/react';
// Import Layout Utama (yang ada Navbarnya)
import AppLayout from '@/Layouts/AppLayout'; 

// Import Bagian-bagian (Sections) Website Kamu
// Pastikan tulisan besar/kecilnya SESUAI dengan nama file di laptopmu
import HomeSection from '@/Components/sections/Home'; 
import Gallery from '@/Components/sections/Gallery';
import MapSection from '@/Components/sections/MapSection';
import Comments from '@/Components/sections/Comments';

export default function Welcome({galleries}) {
    return (
        <AppLayout>
            {/* Judul di Tab Browser */}
            <Head title="Home - Maha Gangga Valley" />
            
            {/* Tampilan Website Kamu */}
            <div className="bg-white">
                <HomeSection />
                <Gallery items={galleries} />
                <MapSection />
                <Comments />
            </div>
            
        </AppLayout>
    );
}