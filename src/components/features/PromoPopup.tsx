import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export function PromoPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    useEffect(() => {
        const hasSeenPromo = localStorage.getItem('hidePromo');
        if (!hasSeenPromo) {
            // Small delay for better UX on load
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        if (dontShowAgain) {
            localStorage.setItem('hidePromo', 'true');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with blur - Fade In */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-500"
                onClick={handleClose}
            ></div>

            {/* Popup Card - Scale Up & Fade In */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-500 slide-in-from-bottom-4">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors backdrop-blur-md"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Content */}
                <div className="relative h-48 bg-blue-600">
                    <img
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
                        alt="Promo"
                        className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#123C69] to-transparent flex flex-col justify-end p-6">
                        <span className="bg-yellow-400 text-[#123C69] text-xs font-bold px-3 py-1 rounded-full w-fit mb-2 animate-pulse">
                            LIMITED OFFER
                        </span>
                        <h2 className="text-2xl font-bold text-white leading-tight">
                            Diskon Spesial Hari Ini!
                        </h2>
                    </div>
                </div>

                <div className="p-6 bg-white">
                    <p className="text-slate-600 mb-6">
                        Dapatkan potongan harga hingga <span className="font-bold text-[#123C69]">Rp 50 Juta</span> untuk pembelian unit di Menteng Exclusive. Berlaku hanya untuk 5 pembeli pertama bulan ini.
                    </p>

                    <Button
                        onClick={handleClose}
                        className="w-full bg-[#123C69] hover:bg-[#0f2a50] h-12 text-lg font-bold shadow-lg shadow-blue-900/20 mb-4"
                    >
                        Klaim Promo Sekarang
                    </Button>

                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => setDontShowAgain(!dontShowAgain)}
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                        >
                            <div className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${dontShowAgain ? 'bg-[#123C69] border-[#123C69] text-white' : 'border-slate-300'}`}>
                                {dontShowAgain && <Check className="h-3 w-3" />}
                            </div>
                            Jangan tampilkan lagi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
