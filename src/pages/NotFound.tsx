import React, { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';

const NotFound: React.FC = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isGlitching, setIsGlitching] = useState(true);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        x.set((clientX - centerX) / 30);
        y.set((clientY - centerY) / 30);
    };

    return (
        <div
            className="min-h-screen bg-[#050a11] relative overflow-hidden flex items-center justify-center font-sans selection:bg-[#eb4160] selection:text-white"
            onMouseMove={handleMouseMove}
        >
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,60,105,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(18,60,105,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none"></div>

            {/* Glitch Overlay Noise */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">

                {/* 404 Glitch Element */}
                <motion.div
                    className="relative mb-8"
                    style={{ x, y }}
                    onHoverStart={() => setIsGlitching(true)}
                >
                    <div className="relative">
                        {/* Main Glitch Text */}
                        <div
                            className={`text-[10rem] md:text-[18rem] font-display font-black leading-none tracking-tighter text-white select-none ${isGlitching ? 'glitch-text' : ''}`}
                            data-text="404"
                        >
                            404
                        </div>
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="space-y-8 max-w-2xl relative"
                >
                    {/* Decorative Line */}
                    <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#eb4160]/50 to-transparent hidden md:block"></div>

                    <div className="absolute -right-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#eb4160]/50 to-transparent hidden md:block"></div>

                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-wide">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eb4160] to-[#CBA135]">Terjadi Kesalahan</span>
                            <p>Lokasi Tidak Ditemukan</p>
                        </h2>
                        <p className="text-slate-400 text-lg font-light leading-relaxed font-mono">
                            &gt; Target koordinat URL tidak valid.<br />
                            &gt; Inisialisasi protokol pencarian ulang...
                        </p>
                    </div>

                    {/* Cyber Actions */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link to="/" className="w-full sm:w-auto">
                            <Button className="w-full h-14 px-8 bg-white hover:bg-slate-200 text-[#050a11] rounded-none border border-white skew-x-[-10deg] font-bold tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all group relative overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></span>
                                <span className="flex items-center gap-3 skew-x-[10deg]">
                                    <Home className="w-5 h-5" />
                                    HALAMAN UTAMA
                                </span>
                            </Button>
                        </Link>

                        <Link to="/search" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full h-14 px-8 border-[#eb4160] text-[#eb4160] hover:bg-[#eb4160]/10 rounded-none skew-x-[-10deg] font-mono hover:shadow-[0_0_20px_rgba(235,65,96,0.2)] transition-all group">
                                <span className="flex items-center gap-3 skew-x-[10deg]">
                                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                    PENCARIAN UNIT
                                </span>
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Footer Data */}
                {/* <motion.div
                    className="mt-16 font-mono text-xs text-slate-600 flex gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <span>ERR_CODE: 0x404</span>
                    <span className="animate-pulse text-[#eb4160]">STATUS: DISCONNECTED</span>
                    <span>SERVER: AP-SOUTH-1</span>
                </motion.div> */}
            </div>
        </div>
    );
};

export default NotFound;
