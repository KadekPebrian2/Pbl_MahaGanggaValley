import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout'; 

// Import Bagian-bagian (Sections)
import HomeSection from '@/Components/sections/Home'; 
import Gallery from '@/Components/sections/Gallery';
import MapSection from '@/Components/sections/MapSection';
import Ulasan from '@/Components/sections/Ulasan'; 

export default function Welcome({ galleries, reviews }) { 
    return (
        <AppLayout>
            <Head title="Home - Maha Gangga Valley" />
            
            <div className="bg-white">
                <HomeSection />
                
                <Gallery items={galleries} />
                
                <MapSection />
                
                {/* [PERBAIKAN] Panggil komponen Ulasan */}
                <Ulasan reviews={reviews} />
            </div>
            
        </AppLayout>
    );
}