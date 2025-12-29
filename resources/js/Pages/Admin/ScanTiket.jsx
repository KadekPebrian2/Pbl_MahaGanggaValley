import React, { useEffect, useState, useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

export default function ScanTiket() {
    const [scanResult, setScanResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // Gunakan Ref untuk menyimpan akses ke scanner (PENTING AGAR TIDAK ERROR)
    const scannerRef = useRef(null);

    // --- 1. INISIALISASI SCANNER ---
    useEffect(() => {
        // Cek apakah elemen reader sudah siap
        if (!document.getElementById("reader")) return;
        
        // Cek apakah scanner sudah pernah dibuat sebelumnya (biar gak double)
        if (scannerRef.current) return;

        const scanner = new Html5QrcodeScanner(
            "reader", 
            { 
                fps: 10, 
                qrbox: { width: 250, height: 250 },
                rememberLastUsedCamera: true,
                supportedScanTypes: [0] // Fokus ke kamera saja
            },
            false
        );

        // Simpan ke Ref
        scannerRef.current = scanner;

        // Handler saat scan berhasil
        async function onScanSuccess(decodedText) {
            // Jika sedang loading atau sudah ada hasil scan di layar, stop proses
            if (isLoading || scanResult) return;

            // Pause scanner agar tidak scan berkali-kali
            if (scannerRef.current) {
                try {
                    scannerRef.current.pause(); 
                } catch (e) {
                    // Abaikan error pause (kadang library versi lama tidak support)
                }
            }
            
            await handleCheckIn(decodedText);
        }

        function onScanFailure(error) {
            // Kosongkan biar console bersih
        }

        scanner.render(onScanSuccess, onScanFailure);

        // Cleanup saat pindah halaman
        return () => {
            if (scannerRef.current) {
                try {
                    scannerRef.current.clear();
                } catch (error) {
                    console.error("Cleanup error", error);
                }
                scannerRef.current = null;
            }
        };
    }, [isLoading, scanResult]); // Dependency array

    // --- 2. LOGIKA KE BACKEND ---
    const handleCheckIn = async (code) => {
        setIsLoading(true);

        try {
            const response = await axios.post(route('admin.scan.check'), { qr_code: code });
            
            // === SUKSES ===
            if (response.data.status === 'success') {
                playAudio('success');
                setScanResult({
                    type: 'success',
                    title: response.data.message, // "Berhasil"
                    detail: response.data.detail, // "Silakan Masuk"
                    data: response.data.data
                });
            }

        } catch (error) {
            // === ERROR / TIKET SUDAH DIPAKAI ===
            playAudio('error');
            const errorData = error.response ? error.response.data : {};
            
            setScanResult({
                type: 'error',
                title: errorData.message || 'Gagal Scan!',
                detail: errorData.detail || 'Terjadi kesalahan sistem.',
                data: null
            });
        } finally {
            setIsLoading(false);
        }
    };

    // --- 3. RESET UNTUK SCAN LAGI ---
    const handleReset = () => {
        setScanResult(null); // Hapus hasil scan -> Kamera otomatis muncul karena CSS
        
        // Resume scanner agar aktif lagi
        if (scannerRef.current) {
            try {
                scannerRef.current.resume();
            } catch (e) {
                // Jika resume gagal, reload halaman atau biarkan saja (biasanya render ulang handle sendiri)
                window.location.reload(); 
            }
        }
    };

    // --- 4. AUDIO ---
    const playAudio = (type) => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'success') {
            osc.frequency.value = 1000; 
            osc.type = 'sine';
        } else {
            osc.frequency.value = 200; 
            osc.type = 'sawtooth';
        }
        
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    };

    return (
        <AdminLayout>
            <Head title="Scan Tiket" />

            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937', textAlign: 'center' }}>
                    📸 Scan Tiket Pengunjung
                </h1>

                <div style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '15px', 
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                    minHeight: '300px' // Tinggi minimal agar layout tidak lompat
                }}>
                    
                    {/* === BAGIAN 1: KAMERA === */}
                    {/* Trik CSS: Jika ada hasil scan, sembunyikan kamera (display: none) */}
                    <div 
                        id="reader" 
                        style={{ display: scanResult ? 'none' : 'block' }} 
                    ></div>
                    
                    {!scanResult && (
                        <p style={{ textAlign: 'center', fontSize: '12px', color: '#6b7280', marginTop: '10px' }}>
                             Arahkan kamera ke QR Code. Pastikan cahaya cukup.
                        </p>
                    )}


                    {/* === BAGIAN 2: HASIL SCAN (MUNCUL GANTIKAN KAMERA) === */}
                    {scanResult && (
                        <div className="scan-result" style={{ 
                            textAlign: 'center', 
                            padding: '20px',
                            animation: 'fadeIn 0.5s'
                        }}>
                            {/* Ikon Status */}
                            <div style={{ fontSize: '60px', marginBottom: '10px' }}>
                                {scanResult.type === 'success' ? '✅' : '⛔'}
                            </div>

                            {/* Kotak Status Berwarna */}
                            <div style={{
                                backgroundColor: scanResult.type === 'success' ? '#dcfce7' : '#fee2e2',
                                color: scanResult.type === 'success' ? '#166534' : '#991b1b',
                                padding: '15px',
                                borderRadius: '10px',
                                border: `2px solid ${scanResult.type === 'success' ? '#22c55e' : '#ef4444'}`,
                                marginBottom: '20px'
                            }}>
                                <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
                                    {scanResult.title}
                                </h2>
                                <p style={{ fontSize: '16px', margin: '5px 0 0 0' }}>
                                    {scanResult.detail}
                                </p>
                            </div>

                            {/* Detail Data Tiket (Jika Ada) */}
                            {scanResult.data && (
                                <div style={{ 
                                    textAlign: 'left', 
                                    backgroundColor: '#f3f4f6', 
                                    padding: '15px', 
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    fontSize: '14px'
                                }}>
                                    <p style={{margin: '5px 0'}}><strong>Nama:</strong> {scanResult.data.nama}</p>
                                    <p style={{margin: '5px 0'}}><strong>Kode:</strong> <span style={{fontFamily:'monospace'}}>{scanResult.data.tiket}</span></p>
                                    <p style={{margin: '5px 0'}}><strong>Jumlah:</strong> {scanResult.data.qty}</p>
                                </div>
                            )}

                            {/* Tombol Scan Lagi */}
                            <button 
                                onClick={handleReset}
                                style={{
                                    backgroundColor: scanResult.type === 'success' ? '#166534' : '#991b1b',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 30px',
                                    borderRadius: '50px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                                }}
                            >
                                📸 Scan Pengunjung Berikutnya
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Tambahan CSS Animasi */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </AdminLayout>
    );
}