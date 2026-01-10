import { useState, useMemo, useEffect } from 'react';
import { Home, Tag, Percent, Banknote, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MASTER_LOCATIONS } from '../../utils/masterLocation';
import { MOCK_PROPERTIES } from '../../utils/mockData';
import { CATEGORIES } from '../../utils/categories';

interface MegaMenuProps {
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
    // Default to the first category if none hovered yet, but we want it to be responsive to hover
    // So we initialize with null, but in useMemo we defaults to the first category if null?
    // User requested: "Active category ... adalah array data pertama"
    const [hoveredCategory, setHoveredCategory] = useState<string>(CATEGORIES[0].id);

    useEffect(() => {
        if (isOpen) {
            setHoveredCategory(CATEGORIES[0].id);
        }
    }, [isOpen]);

    // Dynamic Filter Logic grouped by Province
    const groupedLocations = useMemo(() => {
        const targetCategory = hoveredCategory || CATEGORIES[0].id;

        // Filter MOCK_PROPERTIES by type
        const relevantProperties = MOCK_PROPERTIES.filter(
            p => p.type.toLowerCase() === targetCategory.toLowerCase()
        );

        // Group by Province -> Cities
        // Structure: { 'Provinsi': Set('City1', 'City2') }
        const grouping: Record<string, Set<string>> = {};

        relevantProperties.forEach(prop => {
            // prop.location might be "BSD City, Tangerang Selatan"
            // We iterate through MASTER_LOCATIONS to find which province contains a city mentioned in prop.location
            let foundProvince = false;

            for (const [province, cities] of Object.entries(MASTER_LOCATIONS)) {
                for (const city of cities) {
                    // Check if property location string strictly contains the city name
                    // e.g. "BSD City, Tangerang Selatan" contains "Tangerang Selatan"
                    if (prop.location.includes(city)) {
                        if (!grouping[province]) {
                            grouping[province] = new Set();
                        }
                        grouping[province].add(city);
                        foundProvince = true;
                        break; // Stop checking cities for this province, move to next property (assumption: one location belongs to one province)
                    }
                }
                if (foundProvince) break;
            }
        });

        // Convert to array for rendering
        const result = Object.entries(grouping).map(([province, citiesSet]) => ({
            province,
            cities: Array.from(citiesSet).slice(0, 5) // Limit to 5 cities per province to fit UI
        })).slice(0, 6); // Limit to 6 provinces

        return result;

    }, [hoveredCategory]);

    if (!isOpen) return null;

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
                    {/* Column 1: Property Types (Left Sidebar Style) */}
                    <div className="col-span-3 border-r-2 border-slate-200 pr-0">
                        {/* Removed Header for cleaner sidebar look per image inspiration */}
                        <div className="space-y-1">
                            {CATEGORIES.map((item, idx) => (
                                <Link
                                    key={idx}
                                    to={item.link}
                                    onMouseEnter={() => setHoveredCategory(item.id)}
                                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 relative group overflow-hidden ${hoveredCategory === item.id
                                        ? 'bg-[#123C69] text-white font-bold shadow-lg shadow-blue-900/20 translate-x-2'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-[#123C69]'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className={`p-1.5 rounded-lg transition-colors duration-300 ${hoveredCategory === item.id
                                            ? 'bg-white/10 text-white'
                                            : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-[#123C69] group-hover:shadow-sm'
                                            }`}>
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm tracking-wide">{item.label}</span>
                                    </div>

                                    {hoveredCategory === item.id && (
                                        <ArrowRight className="w-4 h-4 text-white animate-in fade-in slide-in-from-left-2 duration-300 relative z-10" />
                                    )}

                                    {/* Decorative background element for active state */}
                                    {hoveredCategory === item.id && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#123C69] to-[#0a1e35] opacity-50 z-0" />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Locations (Grouped Grid) */}
                    <div className="col-span-6 px-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-display font-bold text-[#123C69] text-lg">
                                Penawaran di {CATEGORIES.find(c => c.id === hoveredCategory)?.label}
                            </h3>
                            <Link to={`/search?type=${hoveredCategory}`} className="text-xs font-bold text-[#CBA135] hover:underline uppercase tracking-wider">
                                Lihat Semua
                            </Link>
                        </div>

                        {groupedLocations.length > 0 ? (
                            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                {groupedLocations.map((group, groupIdx) => (
                                    <div key={groupIdx} className="animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: `${groupIdx * 50}ms`, animationFillMode: 'both' }}>
                                        <div className="flex items-center justify-between mb-3 border-b-2 border-slate-200 pb-2">
                                            <h4 className="font-bold text-[#123C69] text-sm uppercase tracking-wide">{group.province}</h4>
                                        </div>
                                        <ul className="space-y-2.5">
                                            {group.cities.map((city) => (
                                                <li key={city}>
                                                    <Link
                                                        to={`/search?type=${hoveredCategory}&location=${city}`}
                                                        className="group flex items-center justify-between text-[13px] text-slate-500 hover:bg-[#123C69] hover:text-white hover:font-bold hover:shadow-lg hover:shadow-blue-900/20 px-3 py-2 rounded-xl transition-all duration-300 hover:translate-x-2"
                                                    >
                                                        <span>{city}</span>
                                                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-48 text-slate-400 animate-in fade-in bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                <Home className="w-10 h-10 mb-3 text-slate-300" />
                                <p className="text-sm font-medium">Belum ada properti terdata untuk kategori ini.</p>
                                <Link to="/search" className="mt-3 text-xs bg-[#123C69] text-white px-4 py-2 rounded-full font-bold hover:bg-[#0a1e35] transition-colors">Cari Properti Lain</Link>
                            </div>
                        )}
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
