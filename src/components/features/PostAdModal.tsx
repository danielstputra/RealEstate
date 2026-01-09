import { X, CheckCircle2, ArrowRight, Home, Building2, Map } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface PostAdModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginClick: () => void;
}

export function PostAdModal({ isOpen, onClose, onLoginClick }: PostAdModalProps) {
    const { t } = useLanguage();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 lg:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row h-fit max-h-[90vh] z-10"
                    >
                        {/* Left Side: Visual Context */}
                        <div className="hidden md:flex md:w-[45%] bg-[#0a1e35] relative overflow-hidden flex-col justify-between p-10 border-r border-white/5">
                            <div className="absolute top-0 left-0 w-full h-full opacity-40">
                                <img
                                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover scale-110"
                                    alt="Luxury Home"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e35] via-[#0a1e35]/40 to-transparent" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-[#CBA135] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-[#CBA135]/30">
                                    <Home className="text-white w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 leading-tight font-display">
                                    {t.postAd.title}
                                </h3>
                                <p className="text-blue-100/70 text-sm leading-relaxed">
                                    {t.postAd.subtitle}
                                </p>
                            </div>

                            <div className="relative z-10 space-y-4">
                                {[t.postAd.benefit1, t.postAd.benefit2, t.postAd.benefit3].map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3 text-white/90">
                                        <div className="p-1 rounded-full bg-[#CBA135]/20 text-[#CBA135]">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-semibold uppercase tracking-wider">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                        </div>

                        {/* Right Side: Action Area */}
                        <div className="flex-1 p-8 md:p-12 bg-white relative">
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            <div className="h-full flex flex-col justify-center">
                                <div className="mb-10 text-center md:text-left">
                                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#123C69] text-[11px] font-bold rounded-full mb-4 tracking-[0.2em] uppercase">
                                        {t.postAd.loginCheck}
                                    </span>
                                    <h2 className="text-4xl font-bold text-[#123C69] mb-4 font-display">
                                        Post <span className="text-[#CBA135]">Property</span>.
                                    </h2>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        {t.postAd.loginRequired}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 mb-10">
                                    <div className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#CBA135]/30 hover:bg-white hover:shadow-xl hover:shadow-[#CBA135]/5 transition-all duration-500 cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#123C69] group-hover:bg-[#CBA135] group-hover:text-white transition-all duration-500 shadow-sm">
                                                    <Building2 className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#123C69] mb-0.5">Rumah & Apartemen</h4>
                                                    <p className="text-xs text-slate-400 font-medium">Residential Property</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#CBA135] group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                    <div className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-300/30 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#123C69] group-hover:bg-[#123C69] group-hover:text-white transition-all duration-500 shadow-sm">
                                                    <Map className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#123C69] mb-0.5">Tanah & Industri</h4>
                                                    <p className="text-xs text-slate-400 font-medium">Commercial Land</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#123C69] group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Button
                                        onClick={onLoginClick}
                                        className="w-full bg-[#123C69] hover:bg-[#0a1e35] text-white py-6 rounded-[1.5rem] font-bold shadow-xl shadow-blue-900/20 active:scale-[0.98] transition-all text-lg"
                                    >
                                        {t.postAd.startBtn}
                                    </Button>
                                    <button className="w-full py-4 text-slate-400 hover:text-[#CBA135] font-bold text-sm transition-colors tracking-wide">
                                        {t.postAd.consultBtn}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
