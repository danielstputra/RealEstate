import React from 'react';
import { Search, ArrowRight, Star, MapPin, PlusSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

interface AgentMenuProps {
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const AgentMenu: React.FC<AgentMenuProps> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
    if (!isOpen) return null;

    const topAgents = [
        { name: 'Budi Santoso', area: 'Jakarta Selatan', sales: 120, rating: 4.9, image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100' },
        { name: 'Siti Aminah', area: 'Bandung', sales: 85, rating: 4.8, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100' },
        { name: 'Rudi Hermawan', area: 'Surabaya', sales: 98, rating: 4.9, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100' },
    ];

    return (
        <div
            className="absolute left-0 top-full w-full bg-white/95 backdrop-blur-xl shadow-premium border-t border-slate-100/50 z-40 origin-top animate-in fade-in slide-in-from-top-2 duration-300 ease-out transition-colors"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-8">
                    {/* Left Column: Banner (Info Pasang Iklan) */}
                    <div className="col-span-4 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#123C69] to-[#1e4d85] p-8 text-white shadow-lg">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-[#CBA135]">
                                    <PlusSquare className="w-6 h-6" />
                                </div>
                                <h3 className="font-display font-bold text-2xl mb-2">Mau Pasang Iklan?</h3>
                                <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                                    Jangkau jutaan calon pembeli potensial. Pasang listing properti Anda sekarang dan dapatkan respon lebih cepat.
                                </p>
                            </div>
                            <Button className="w-full bg-[#CBA135] text-[#123C69] hover:bg-white font-bold border-none">
                                Pasang Iklan Sekarang
                            </Button>
                        </div>

                        {/* Decorative BG */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#CBA135]/10 rounded-full blur-2xl"></div>
                    </div>

                    {/* Right Column: Cari Agen & List */}
                    <div className="col-span-8 px-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-display font-bold text-[#123C69] text-lg">Cari Agen Properti</h3>
                            <Link to="/agents" className="text-sm font-bold text-[#CBA135] hover:text-[#123C69] flex items-center gap-1 transition-colors group/link">
                                Lihat Semua Agen <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Search Mockup */}
                        <div className="relative mb-8">
                            <input
                                type="text"
                                placeholder="Cari nama agen atau lokasi spesialis..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#123C69] focus:ring-4 focus:ring-[#123C69]/5 outline-none transition-all placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>

                        {/* Top Agents Grid */}
                        <div className="grid grid-cols-3 gap-6">
                            {topAgents.map((agent, idx) => (
                                <Link
                                    key={idx}
                                    to={`/agent/${agent.name.toLowerCase().replace(' ', '-')}`}
                                    className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-[#123C69]/20 hover:shadow-lg hover:-translate-y-1 transition-all group"
                                >
                                    <img src={agent.image} alt={agent.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-[#CBA135] transition-all" />
                                    <div>
                                        <h4 className="font-bold text-[#123C69] text-sm mb-1 group-hover:text-[#CBA135] transition-colors">{agent.name}</h4>
                                        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                                            <MapPin className="w-3 h-3" /> {agent.area}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                                                <Star className="w-3 h-3 text-orange-400 fill-orange-400" /> {agent.rating}
                                            </div>
                                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">{agent.sales} Terjual</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
