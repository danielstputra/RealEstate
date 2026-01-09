import React from 'react';
import { Building2, Home, Warehouse, Factory, Map, ArrowRight, Tag, Percent, Banknote, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MegaMenuProps {
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
    if (!isOpen) return null;

    const propertyTypes = [
        { icon: Home, label: 'Rumah', link: '/search?type=rumah' },
        { icon: Building2, label: 'Apartemen', link: '/search?type=apartemen' },
        { icon: Map, label: 'Tanah', link: '/search?type=tanah' },
        { icon: Warehouse, label: 'Ruko', link: '/search?type=ruko' },
        { icon: Factory, label: 'Pabrik', link: '/search?type=pabrik' },
        { icon: Building2, label: 'Perkantoran', link: '/search?type=kantor' },
        { icon: Warehouse, label: 'Ruang Usaha', link: '/search?type=ruang-usaha' },
        { icon: Warehouse, label: 'Gudang', link: '/search?type=gudang' },
        { icon: Home, label: 'Kost', link: '/search?type=kost' },
        { icon: Home, label: 'Villa', link: '/search?type=villa' },
        { icon: Building2, label: 'Hotel', link: '/search?type=hotel' },
    ];

    const locations = {
        'DKI Jakarta': ['Jakarta Selatan', 'Jakarta Barat', 'Jakarta Utara', 'Jakarta Timur', 'Jakarta Pusat'],
        'Jawa Barat': ['Bandung', 'Bekasi', 'Bogor', 'Depok', 'Cimahi'],
        'Banten': ['Tangerang', 'Tangerang Selatan', 'Serang', 'Cilegon', 'Lebak'],
        'Jawa Timur': ['Surabaya', 'Malang', 'Sidoarjo', 'Gresik', 'Pasuruan'],
        'Jawa Tengah': ['Semarang', 'Solo', 'Sukoharjo', 'Karanganyar', 'Surakarta'],
        'Bali': ['Badung', 'Denpasar', 'Gianyar', 'Tabanan', 'Buleleng'],
    };

    const offers = [
        { icon: Tag, title: 'Properti Turun Harga', color: 'text-orange-500', bg: 'bg-orange-50' },
        { icon: Percent, title: 'Properti DP 0%', color: 'text-blue-500', bg: 'bg-blue-50' },
        { icon: Banknote, title: 'Properti Promo', color: 'text-green-500', bg: 'bg-green-50' },
        { icon: Home, title: 'Properti Free Biaya', color: 'text-purple-500', bg: 'bg-purple-50' },
        { icon: ShieldCheck, title: 'Properti dibawah NJOP', color: 'text-red-500', bg: 'bg-red-50' },
    ];

    return (
        <div
            className="absolute left-0 top-full w-full bg-white/95 backdrop-blur-xl shadow-premium border-t border-slate-100/50 z-40 origin-top animate-in fade-in slide-in-from-top-2 duration-300 ease-out transition-colors"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-8">
                    {/* Column 1: Property Types */}
                    <div className="col-span-2 border-r border-slate-100 pr-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-display font-bold text-[#123C69] text-lg">Properti Dijual</h3>
                        </div>
                        <div className="space-y-1">
                            {propertyTypes.map((item, idx) => (
                                <Link
                                    key={idx}
                                    to={item.link}
                                    className="flex items-center gap-3 p-2 rounded-lg text-slate-600 hover:text-[#123C69] hover:bg-slate-50 transition-all group animate-in slide-in-from-left-2 fade-in duration-500"
                                    style={{ animationDelay: `${idx * 30}ms`, animationFillMode: 'both' }}
                                >
                                    <div className="p-1.5 rounded-md bg-slate-100 text-slate-400 group-hover:bg-[#123C69] group-hover:text-white transition-colors">
                                        <item.icon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Locations (Wide) */}
                    <div className="col-span-7 px-6">
                        <h3 className="font-display font-bold text-[#123C69] text-lg mb-5">Lokasi Populer</h3>
                        <div className="grid grid-cols-3 gap-8">
                            {Object.entries(locations).map(([province, cities], groupIdx) => (
                                <div key={province} className="animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: `${groupIdx * 50 + 100}ms`, animationFillMode: 'both' }}>
                                    <h4 className="font-bold text-[#123C69] mb-3 text-sm uppercase tracking-wider opacity-80">{province}</h4>
                                    <ul className="space-y-2">
                                        {cities.map((city) => (
                                            <li key={city}>
                                                <Link
                                                    to={`/search?location=${city}`}
                                                    className="text-sm text-slate-500 hover:text-[#CBA135] hover:translate-x-1 inline-block transition-all"
                                                >
                                                    {city}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-100 flex gap-6 items-center animate-in fade-in duration-700 delay-300 fill-mode-both">
                            <h4 className="font-bold text-[#123C69] text-sm">Provinsi Lainnya:</h4>
                            <div className="flex gap-4">
                                <Link to="#" className="text-sm text-slate-500 hover:text-[#123C69] hover:underline decoration-[#CBA135] underline-offset-4 decoration-2">Daerah Istimewa Yogyakarta</Link>
                                <Link to="#" className="text-sm text-slate-500 hover:text-[#123C69] hover:underline decoration-[#CBA135] underline-offset-4 decoration-2">Kepulauan Riau</Link>
                                <Link to="#" className="text-sm text-slate-500 hover:text-[#123C69] hover:underline decoration-[#CBA135] underline-offset-4 decoration-2">Sulawesi Selatan</Link>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Special Offers */}
                    <div className="col-span-3 border-l border-slate-100 pl-8">
                        <h3 className="font-display font-bold text-[#123C69] text-lg mb-5">Penawaran Spesial</h3>
                        <div className="space-y-3">
                            {offers.map((offer, idx) => (
                                <Link
                                    key={idx}
                                    to="/offers"
                                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-[#CBA135]/30 hover:shadow-lg hover:shadow-[#CBA135]/5 hover:-translate-y-1 transition-all group bg-white animate-in slide-in-from-right-4 fade-in duration-500"
                                    style={{ animationDelay: `${idx * 50 + 200}ms`, animationFillMode: 'both' }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${offer.bg} group-hover:scale-110 transition-transform`}>
                                            <offer.icon className={`w-5 h-5 ${offer.color}`} />
                                        </div>
                                        <span className="font-bold text-[#123C69] text-sm group-hover:text-[#CBA135] transition-colors">{offer.title}</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#CBA135] group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100">
                            <Link to="/offers" className="flex items-center justify-between text-sm font-bold text-[#123C69] group hover:text-[#CBA135] transition-colors">
                                <span>Lihat Semua Promo</span>
                                <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#CBA135] group-hover:text-white transition-all">
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
