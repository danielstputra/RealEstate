import { X, CheckCircle2, Home, MapPin, Phone, Send, CheckSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FindPropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FindPropertyModal({ isOpen, onClose }: FindPropertyModalProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [wantKPR, setWantKPR] = useState(false);

    const categories = [
        { id: 'rumah', label: 'Rumah' },
        { id: 'apartemen', label: 'Apartemen' },
        { id: 'ruko', label: 'Ruko' },
        { id: 'tanah', label: 'Tanah' },
        { id: 'pabrik', label: 'Pabrik' },
        { id: 'gudang', label: 'Gudang' },
    ];

    const toggleCategory = (id: string) => {
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

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
                        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row h-fit max-h-[90vh] z-10"
                    >
                        {/* Left Side: Visual & Info */}
                        <div className="hidden md:flex md:w-[40%] bg-[#0a1e35] relative overflow-hidden flex-col justify-between p-10 border-r border-white/5">
                            {/* Background Image */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-30">
                                <img
                                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover"
                                    alt="Property Search"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e35] via-[#0a1e35]/50 to-transparent" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-[#CBA135] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-[#CBA135]/30">
                                    <Home className="text-white w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 leading-tight font-display">
                                    Bantu Carikan Properti
                                </h3>
                                <p className="text-blue-100/70 text-sm leading-relaxed">
                                    Biarkan kami membantu menemukan properti impian yang sesuai dengan kriteria dan budget Anda.
                                </p>
                            </div>

                            <div className="relative z-10 space-y-4 mt-8">
                                <div className="flex items-center gap-3 text-white/90">
                                    <div className="p-1 rounded-full bg-[#CBA135]/20 text-[#CBA135]">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider">Hemat Waktu & Tenaga</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/90">
                                    <div className="p-1 rounded-full bg-[#CBA135]/20 text-[#CBA135]">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider">Rekomendasi Akurat</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/90">
                                    <div className="p-1 rounded-full bg-[#CBA135]/20 text-[#CBA135]">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider">Didampingi Agen Ahli</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="flex-1 p-8 md:p-10 bg-white relative overflow-y-auto custom-scrollbar">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            <h2 className="text-2xl font-bold text-[#123C69] mb-8 font-display pr-12">Isi Kriteria Properti</h2>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                {/* Transaction Type */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3">Saya ingin</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-[#123C69] bg-blue-50 cursor-pointer transition-all">
                                            <div className="w-5 h-5 rounded-md bg-[#123C69] flex items-center justify-center text-white">
                                                <CheckSquare className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="font-bold text-[#123C69] text-sm">Beli Properti</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Property Categories */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3">Properti yang saya inginkan <span className="text-red-500">*</span></label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {categories.map((cat) => (
                                            <label
                                                key={cat.id}
                                                className={`flex items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${selectedCategories.includes(cat.id) ? 'border-[#123C69] bg-blue-50' : 'border-slate-200 hover:border-[#123C69]/50 hover:bg-slate-50'}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={cat.id}
                                                    checked={selectedCategories.includes(cat.id)}
                                                    onChange={() => toggleCategory(cat.id)}
                                                    className="hidden"
                                                />
                                                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${selectedCategories.includes(cat.id) ? 'bg-[#123C69] text-white' : 'bg-slate-100 text-slate-300'}`}>
                                                    {selectedCategories.includes(cat.id) && <CheckSquare className="w-3.5 h-3.5" />}
                                                </div>
                                                <span className={`text-sm font-medium ${selectedCategories.includes(cat.id) ? 'text-[#123C69]' : 'text-slate-600'}`}>{cat.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Location Input */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Lokasi Properti <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Ketik lokasi yang diinginkan (Kota, Area, atau Kecamatan)"
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#123C69] focus:ring-4 focus:ring-[#123C69]/5 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Phone Input */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Handphone / WhatsApp <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="tel"
                                            placeholder="Contoh: 081234567890"
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#123C69] focus:ring-4 focus:ring-[#123C69]/5 outline-none transition-all placeholder:text-slate-400 font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Additional Options */}
                                <div>
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className={`mt-0.5 w-5 h-5 rounded border transition-colors flex items-center justify-center ${wantKPR ? 'bg-[#123C69] border-[#123C69]' : 'border-slate-300 bg-white group-hover:border-[#123C69]'}`}>
                                            {wantKPR && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={wantKPR}
                                            onChange={() => setWantKPR(!wantKPR)}
                                        />
                                        <span className="text-sm text-slate-600 leading-snug">Saya tertarik jika ada opsi cicilan <strong>KPR</strong> untuk pembelian rumah ini.</span>
                                    </label>
                                </div>

                                <div className="pt-4">
                                    <Button className="w-full py-4 bg-[#123C69] hover:bg-[#0a1e35] text-white rounded-xl font-bold shadow-lg shadow-blue-900/10 active:scale-[0.98]">
                                        <Send className="w-4 h-4 mr-2" /> Kirim Permintaan
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
