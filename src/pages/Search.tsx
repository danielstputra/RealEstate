import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Filter, ArrowUpDown, Share2, FileText, Bookmark, ChevronDown, Plus, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PropertyCard } from '../components/features/PropertyCard';
import { MOCK_PROPERTIES } from '../utils/mockData';

export default function Search() {
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // Initialize state from URL params or navigation state
    const initialLocation = searchParams.get('location') || '';
    const initialType = searchParams.get('type') || (location.state as any)?.category || null;

    const [searchTerm, setSearchTerm] = useState(initialLocation);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialType);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activePopup, setActivePopup] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        priceRange: { min: 0, max: 10000000000 }, // Default up to 10M
        landArea: { min: 0, max: 1000 },
        buildingArea: { min: 0, max: 1000 },
        bedrooms: 0,
        sort: 'relevant'
    });

    // Pagination state
    const [visibleCount, setVisibleCount] = useState(6);
    const [isLoading, setIsLoading] = useState(false);

    // Reset visible count when filters or search change
    useEffect(() => {
        setVisibleCount(6);
    }, [searchTerm, selectedCategory, filters]);

    const togglePopup = (popup: string) => {
        if (activePopup === popup) {
            setActivePopup(null);
        } else {
            setActivePopup(popup);
        }
    };

    // Update state when URL params change (e.g. clicking links in MegaMenu while already on Search page)
    useEffect(() => {
        const typeParam = searchParams.get('type');
        const locationParam = searchParams.get('location');

        if (typeParam) setSelectedCategory(typeParam);
        if (locationParam) setSearchTerm(locationParam);
    }, [searchParams]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredProperties = MOCK_PROPERTIES.filter((property) => {
        const matchesSearch = property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.title.toLowerCase().includes(searchTerm.toLowerCase());

        // Case-insensitive comparison for category/type
        const matchesType = selectedCategory
            ? property.type.toLowerCase() === selectedCategory.toLowerCase()
            : true;

        const matchesPrice = property.price >= filters.priceRange.min && property.price <= filters.priceRange.max;
        const matchesLandArea = property.area >= filters.landArea.min && property.area <= filters.landArea.max;
        // Mock data might not have building area separate, using area for both simplified or assume mock fits
        const matchesBedrooms = filters.bedrooms === 0 || (property.bedrooms || 0) >= filters.bedrooms;

        return matchesSearch && matchesType && matchesPrice && matchesLandArea && matchesBedrooms;
    });

    const formatPrice = (price: number) => {
        if (price >= 1000000000) return `${(price / 1000000000).toFixed(1)} M`;
        if (price >= 1000000) return `${(price / 1000000).toFixed(0)} Jt`;
        return price.toString();
    };

    const displayProperties = filteredProperties.length > 0 ? filteredProperties.slice(0, visibleCount) : [];
    const hasMore = visibleCount < filteredProperties.length;

    const handleLoadMore = async () => {
        setIsLoading(true);
        // Simulate network delay for "cool" loading effect
        await new Promise(resolve => setTimeout(resolve, 800));
        setVisibleCount(prev => prev + 6);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20" onClick={() => setActivePopup(null)}>
            {/* Sticky Header Section */}
            <div className={`sticky top-[80px] z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-white/80 ${isScrolled ? 'py-2' : 'py-4'}`}>
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Top Search Bar */}
                    <div className={`flex flex-col lg:flex-row gap-4 transition-all duration-300 ease-in-out overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-40 opacity-100 mb-4'}`}>
                        <div className="flex-1 relative flex items-center gap-3">
                            <div className="relative flex-1 group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400 group-focus-within:text-[#123C69] transition-colors">
                                    <SearchIcon className="h-5 w-5" />
                                </div>
                                <Input
                                    placeholder="Cari lokasi, nama properti, atau area..."
                                    className="pl-12 pr-12 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-[#123C69] focus:border-2 focus:ring-0 transition-all rounded-xl shadow-sm text-base"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-200 transition-all"
                                    >
                                        <Plus className="h-4 w-4 rotate-45" />
                                    </button>
                                )}
                            </div>
                            <Button className="h-12 px-8 bg-[#123C69] hover:bg-[#0a2340] text-white rounded-xl shadow-lg shadow-blue-900/20 font-medium tracking-wide transition-all hover:-translate-y-0.5 active:translate-y-0">
                                Cari
                            </Button>
                            <Button variant="outline" className="h-12 w-12 p-0 border-slate-200 text-slate-600 hover:border-[#123C69] hover:text-[#123C69] hidden md:flex items-center justify-center rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                                <Bookmark className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mask-linear-fade relative" onClick={(e) => e.stopPropagation()}>
                        {/* Main Filter Toggle - Primary Action */}
                        <Button
                            variant="outline"
                            className={`h-9 border-[#123C69] text-[#123C69] bg-blue-50/30 hover:bg-blue-50 font-semibold px-4 gap-2 flex-shrink-0 rounded-full shadow-sm hover:shadow transition-all ${activePopup ? 'z-0' : 'z-10'}`}
                        >
                            <Filter className="h-3.5 w-3.5" />
                            Filter
                        </Button>

                        <div className="w-[1px] h-5 bg-slate-200 flex-shrink-0 mx-1"></div>

                        {/* Sort Dropdown - Subtle */}
                        <div className="relative">
                            <Button
                                variant="ghost"
                                className="h-9 text-slate-500 hover:text-slate-800 hover:bg-slate-50 px-3 flex-shrink-0 rounded-full font-medium transition-all text-sm"
                            >
                                Urutkan: <span className="text-[#123C69] ml-1">Paling Sesuai</span> <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-50" />
                            </Button>
                        </div>

                        {/* Price Filter */}
                        <div className="relative">
                            <Button
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePopup('price');
                                }}
                                className={`h-9 px-4 gap-2 flex-shrink-0 rounded-full text-sm font-medium transition-all duration-200 ${activePopup === 'price' || (filters.priceRange.min > 0 || filters.priceRange.max < 10000000000)
                                    ? 'border-[#123C69] bg-blue-50/50 text-[#123C69] shadow-inner'
                                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 bg-white shadow-sm'
                                    }`}
                            >
                                Harga
                                {(filters.priceRange.min > 0 || filters.priceRange.max < 10000000000) && <div className="w-1.5 h-1.5 rounded-full bg-[#123C69] animate-pulse" />}
                                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activePopup === 'price' ? 'rotate-180 text-[#123C69]' : 'text-slate-400'}`} />
                            </Button>
                            {activePopup === 'price' && (
                                <>
                                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-40 md:hidden transition-opacity" onClick={() => setActivePopup(null)} />
                                    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] p-6 z-50 md:absolute md:top-11 md:left-0 md:w-80 md:rounded-2xl md:shadow-xl md:shadow-slate-200/50 md:border md:border-slate-100 md:p-5 animate-in slide-in-from-bottom-10 fade-in duration-200 md:zoom-in-95 origin-top-left">
                                        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6 md:hidden" />

                                        <div className="flex items-center justify-between mb-4 md:mb-3">
                                            <h4 className="font-bold text-slate-800 text-lg md:text-sm">Rentang Harga</h4>
                                            {(filters.priceRange.min > 0 || filters.priceRange.max < 10000000000) && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFilters({ ...filters, priceRange: { min: 0, max: 10000000000 } });
                                                    }}
                                                    className="text-xs text-red-500 hover:text-red-600 font-medium"
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Minimum (Rp)</label>
                                                    <Input
                                                        type="number"
                                                        value={filters.priceRange.min}
                                                        onClick={(e) => e.stopPropagation()}
                                                        onChange={(e) => setFilters({ ...filters, priceRange: { ...filters.priceRange, min: Number(e.target.value) } })}
                                                        className="h-10 md:h-9 text-sm bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                                    />
                                                    <p className="text-[10px] font-medium text-[#123C69] truncate">{formatPrice(filters.priceRange.min)}</p>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Maksimum (Rp)</label>
                                                    <Input
                                                        type="number"
                                                        value={filters.priceRange.max}
                                                        onClick={(e) => e.stopPropagation()}
                                                        onChange={(e) => setFilters({ ...filters, priceRange: { ...filters.priceRange, max: Number(e.target.value) } })}
                                                        className="h-10 md:h-9 text-sm bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                                    />
                                                    <p className="text-[10px] font-medium text-[#123C69] truncate">{formatPrice(filters.priceRange.max)}</p>
                                                </div>
                                            </div>
                                            <Button
                                                className="w-full bg-[#123C69] hover:bg-[#0a2340] text-white h-11 md:h-10 rounded-xl font-semibold shadow-lg shadow-blue-900/10 active:scale-95 transition-all"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActivePopup(null);
                                                }}
                                            >
                                                Terapkan Filter
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Land Area Filter */}
                        <div className="relative">
                            <Button
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePopup('area');
                                }}
                                className={`h-9 px-4 gap-2 flex-shrink-0 rounded-full text-sm font-medium transition-all duration-200 ${activePopup === 'area' || (filters.landArea.min > 0 || filters.landArea.max < 1000)
                                    ? 'border-[#123C69] bg-blue-50/50 text-[#123C69] shadow-inner'
                                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 bg-white shadow-sm'
                                    }`}
                            >
                                Luas Tanah
                                {(filters.landArea.min > 0 || filters.landArea.max < 1000) && <div className="w-1.5 h-1.5 rounded-full bg-[#123C69] animate-pulse" />}
                                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activePopup === 'area' ? 'rotate-180 text-[#123C69]' : 'text-slate-400'}`} />
                            </Button>
                            {activePopup === 'area' && (
                                <>
                                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-40 md:hidden transition-opacity" onClick={() => setActivePopup(null)} />
                                    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] p-6 z-50 md:absolute md:top-11 md:left-0 md:w-80 md:rounded-2xl md:shadow-xl md:shadow-slate-200/50 md:border md:border-slate-100 md:p-5 animate-in slide-in-from-bottom-10 fade-in duration-200 md:zoom-in-95 origin-top-left">
                                        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6 md:hidden" />

                                        <div className="flex items-center justify-between mb-4 md:mb-3">
                                            <h4 className="font-bold text-slate-800 text-lg md:text-sm">Luas Tanah (m²)</h4>
                                            {(filters.landArea.min > 0 || filters.landArea.max < 1000) && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFilters({ ...filters, landArea: { min: 0, max: 1000 } });
                                                    }}
                                                    className="text-xs text-red-500 hover:text-red-600 font-medium"
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 mb-6 md:mb-4">
                                            <div className="relative flex-1">
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    value={filters.landArea.min}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => setFilters({ ...filters, landArea: { ...filters.landArea, min: Number(e.target.value) } })}
                                                    className="h-11 md:h-10 text-center bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 ring-blue-100 transition-all rounded-xl"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">m²</span>
                                            </div>
                                            <div className="w-4 h-[2px] bg-slate-300 rounded-full"></div>
                                            <div className="relative flex-1">
                                                <Input
                                                    type="number"
                                                    placeholder="1000+"
                                                    value={filters.landArea.max}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => setFilters({ ...filters, landArea: { ...filters.landArea, max: Number(e.target.value) } })}
                                                    className="h-11 md:h-10 text-center bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 ring-blue-100 transition-all rounded-xl"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">m²</span>
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full bg-[#123C69] hover:bg-[#0a2340] text-white h-11 md:h-10 rounded-xl font-semibold shadow-lg shadow-blue-900/10 active:scale-95 transition-all"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActivePopup(null);
                                            }}
                                        >
                                            Terapkan Filter
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Bedroom Filter */}
                        <div className="relative">
                            <Button
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePopup('bedrooms');
                                }}
                                className={`h-9 px-4 gap-2 flex-shrink-0 rounded-full text-sm font-medium transition-all duration-200 ${activePopup === 'bedrooms' || filters.bedrooms > 0
                                    ? 'border-[#123C69] bg-blue-50/50 text-[#123C69] shadow-inner'
                                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 bg-white shadow-sm'
                                    }`}
                            >
                                Kamar Tidur
                                {filters.bedrooms > 0 && <div className="w-1.5 h-1.5 rounded-full bg-[#123C69] animate-pulse" />}
                                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${activePopup === 'bedrooms' ? 'rotate-180 text-[#123C69]' : 'text-slate-400'}`} />
                            </Button>
                            {activePopup === 'bedrooms' && (
                                <>
                                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-40 md:hidden transition-opacity" onClick={() => setActivePopup(null)} />
                                    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] p-6 z-50 md:absolute md:top-11 md:left-0 md:w-72 md:rounded-2xl md:shadow-xl md:shadow-slate-200/50 md:border md:border-slate-100 md:p-5 animate-in slide-in-from-bottom-10 fade-in duration-200 md:zoom-in-95 origin-top-left">
                                        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6 md:hidden" />

                                        <div className="flex items-center justify-between mb-4 md:mb-3">
                                            <h4 className="font-bold text-slate-800 text-lg md:text-sm">Jumlah Kamar Tidur</h4>
                                            {filters.bedrooms > 0 && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFilters({ ...filters, bedrooms: 0 });
                                                    }}
                                                    className="text-xs text-red-500 hover:text-red-600 font-medium"
                                                >
                                                    Reset
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex gap-3 md:gap-2 mb-6 md:mb-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <button
                                                    key={num}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFilters({ ...filters, bedrooms: num === filters.bedrooms ? 0 : num });
                                                    }}
                                                    className={`w-12 h-12 md:w-10 md:h-10 rounded-2xl md:rounded-xl flex-shrink-0 flex items-center justify-center text-lg md:text-sm font-bold transition-all duration-200 ${filters.bedrooms === num
                                                        ? 'bg-[#123C69] text-white shadow-lg shadow-blue-900/30 scale-105'
                                                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
                                                        }`}
                                                >
                                                    {num}+
                                                </button>
                                            ))}
                                        </div>
                                        <Button
                                            className="w-full bg-[#123C69] hover:bg-[#0a2340] text-white h-11 md:h-10 rounded-xl font-semibold shadow-lg shadow-blue-900/10 active:scale-95 transition-all"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActivePopup(null);
                                            }}
                                        >
                                            Terapkan Filter
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Info Bar */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-5 w-5 text-[#CBA135] animate-bounce" />
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-display">
                                {selectedCategory ? `${selectedCategory} Dijual` : 'Properti Dijual'}
                                {searchTerm ? ` di "${searchTerm}"` : ''}
                            </h1>
                        </div>
                        <p className="text-slate-500 pl-7 text-base">
                            Menampilkan <span className="font-semibold text-slate-900">{Math.min(displayProperties.length, filteredProperties.length)}</span> dari {filteredProperties.length} properti pilihan

                        </p>
                    </div>
                    <div className="flex items-center gap-3 pl-7 md:pl-0">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-[#123C69] hover:text-[#123C69] transition-all shadow-sm hover:shadow-md">
                            <Share2 className="h-4 w-4" /> Bagikan
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-[#123C69] hover:text-[#123C69] transition-all shadow-sm hover:shadow-md">
                            <FileText className="h-4 w-4" /> Simpan Pencarian
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Property List */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Top Property Highlight */}
                        {displayProperties.length > 0 && (
                            <div className="bg-gradient-to-r from-[#123C69] to-[#0D2B4A] rounded-xl p-6 text-white shadow-xl relative overflow-hidden group">
                                <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors"></div>
                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-[#CBA135] rounded-xl shadow-lg rotate-3 group-hover:rotate-6 transition-transform">
                                            <ArrowUpDown className="h-6 w-6 text-[#123C69]" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg tracking-wide mb-1">Top Properti Pilihan</h3>
                                            <p className="text-blue-100 text-sm font-light">Rekomendasi terbaik {searchTerm ? `di ${searchTerm}` : 'untuk Anda'}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white rounded-lg px-4">Lihat Semua</Button>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {displayProperties.map((property) => (
                                <div key={property.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination / Load More */}
                        <div className="flex flex-col items-center justify-center pt-12 pb-8 gap-4">
                            <p className="text-slate-400 text-sm font-medium">
                                Menampilkan {displayProperties.length} dari {filteredProperties.length} properti
                            </p>
                            {hasMore && (
                                <Button
                                    variant="outline"
                                    onClick={handleLoadMore}
                                    disabled={isLoading}
                                    className="w-full md:w-auto px-8 h-12 border-slate-300 text-slate-600 hover:border-[#123C69] hover:text-[#123C69] hover:bg-white transition-all rounded-xl shadow-sm hover:shadow-md font-medium disabled:opacity-70 disabled:cursor-not-allowed group"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#123C69]" />
                                            <span className="animate-pulse">Memuat Properti...</span>
                                        </>
                                    ) : (
                                        <>
                                            Muat Lebih Banyak
                                            <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>

                        {/* Price Range Widget */}
                        <div className="mt-4 bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-blue-50 rounded-xl">
                                    <Filter className="h-5 w-5 text-[#123C69]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">Pilih Rentang Harga</h3>
                                    <p className="text-slate-500 text-sm">Sesuaikan dengan budget Anda</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {['100 - 400 jt', '400 - 600 jt', '600 - 800 jt', '800 - 1 Milyar', '1 - 1.5 Milyar', 'Di atas 2 Milyar'].map((range) => (
                                    <button key={range} className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:border-[#123C69] hover:text-[#123C69] hover:shadow-md hover:-translate-y-0.5 transition-all">
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar / Ads */}
                    <div className="hidden lg:block lg:col-span-4 space-y-8">
                        {/* Banner Ad */}
                        <div className="sticky top-[160px]">
                            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/20 block group cursor-pointer relative h-[600px] transform transition-all hover:scale-[1.02] duration-500 hover:shadow-blue-900/30">
                                <img
                                    src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    alt="Ad Banner"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#123C69] via-[#123C69]/30 to-transparent opacity-90"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-[#CBA135] text-[#123C69] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">Exclusive Deal</span>
                                    </div>
                                    <h3 className="text-4xl font-display font-bold mb-3 leading-tight text-white drop-shadow-lg">Southgate<br />Residence</h3>
                                    <div className="w-12 h-1.5 bg-[#CBA135] mb-5 rounded-full"></div>
                                    <p className="text-blue-50 mb-8 font-light leading-relaxed text-sm">Hunian mewah terintegrasi langsung dengan AEON Mall di kawasan premium TB Simatupang.</p>
                                    <Button className="w-full h-14 bg-white text-[#123C69] hover:bg-blue-50 font-bold text-lg rounded-xl shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl border-2 border-transparent hover:border-blue-100">
                                        Lihat Unit
                                    </Button>
                                    <p className="text-center text-white/50 text-[10px] mt-4 uppercase tracking-widest font-medium">Sponsored Content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
