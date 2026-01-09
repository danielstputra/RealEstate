import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { PropertyCard } from '../components/features/PropertyCard';
import { MOCK_PROPERTIES } from '../utils/mockData';
import { Search, Home as HomeIcon, Building2, Warehouse, Factory, Map, ArrowRight, Calculator, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PromoPopup } from '../components/features/PromoPopup';

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchTab, setSearchTab] = useState<'dijual' | 'disewa' | 'baru'>('dijual');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { t } = useLanguage();

    const SLIDES = [
        {
            image: "https://images.unsplash.com/photo-1600596542815-e32c8cc13bc9?auto=format&fit=crop&q=80&w=2000",
            title: t.home.hero.slide1,
            description: "Temukan hunian impian dengan desain modern dan fasilitas lengkap untuk kenyamanan keluarga Anda yang tak ternilai harganya.",
            color: "bg-blue-600"
        },
        {
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
            title: t.home.hero.slide2,
            description: "Apartemen eksklusif di jantung kota dengan pemandangan cakrawala yang menakjubkan dan akses mudah ke mana saja.",
            color: "bg-emerald-600"
        },
        {
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2000",
            title: t.home.hero.slide3,
            description: "Investasi properti terbaik dengan nilai yang terus meningkat dan lokasi strategis yang sangat menguntungkan.",
            color: "bg-purple-600"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    const scrollSlider = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = 320; // Approx card width + gap
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const categories = [
        { icon: HomeIcon, label: t.home.categories.house },
        { icon: Building2, label: t.home.categories.apartment },
        { icon: Warehouse, label: t.home.categories.shophouse },
        { icon: Factory, label: t.home.categories.factory },
        { icon: Map, label: t.home.categories.land },
    ];

    return (
        <div className="min-h-screen bg-slate-50 relative">
            <PromoPopup />

            {/* Cinematic Hero Slider */}
            <div className="relative h-[85vh] min-h-[600px] w-full bg-slate-900 group -mt-32">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 overflow-hidden"
                    >
                        {/* Ken Burns Image */}
                        <motion.img
                            src={SLIDES[currentSlide].image}
                            alt={SLIDES[currentSlide].title}
                            className="h-full w-full object-cover"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 6, ease: "easeOut" }}
                        />

                        {/* Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e35]/90 via-[#0a1e35]/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-black/20"></div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows - Glassmorphism */}
                <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-8 pointer-events-none">
                    <button
                        onClick={prevSlide}
                        className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                    {SLIDES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                        />
                    ))}
                </div>

                {/* Search Overlay Container */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="container mx-auto px-4 pointer-events-auto">
                        <div className="w-full max-w-4xl mx-auto">
                            <div className="overflow-hidden mb-8">
                                <AnimatePresence mode='wait'>
                                    <motion.h1
                                        key={`title-${currentSlide}`}
                                        initial={{ y: 40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -40, opacity: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="text-3xl md:text-6xl font-display font-bold text-white text-center drop-shadow-lg tracking-tight mb-4"
                                    >
                                        {SLIDES[currentSlide].title}
                                    </motion.h1>


                                </AnimatePresence>
                            </div>

                            {/* Search Box Card */}
                            <div className="bg-[#0f2a50]/80 backdrop-blur-sm p-1 rounded-t-xl inline-flex">
                                <button
                                    onClick={() => setSearchTab('dijual')}
                                    className={`px-6 py-2 text-sm font-bold rounded-t-lg transition-colors ${searchTab === 'dijual' ? 'bg-white text-[#0f2a50]' : 'text-white hover:text-blue-200'}`}
                                >
                                    {t.nav.forSale}
                                </button>
                                <button
                                    onClick={() => setSearchTab('disewa')}
                                    className={`px-6 py-2 text-sm font-bold rounded-t-lg transition-colors ${searchTab === 'disewa' ? 'bg-white text-[#0f2a50]' : 'text-white hover:text-blue-200'}`}
                                >
                                    {t.nav.forRent}
                                </button>
                                <button
                                    onClick={() => setSearchTab('baru')}
                                    className={`px-6 py-2 text-sm font-bold rounded-t-lg transition-colors ${searchTab === 'baru' ? 'bg-white text-[#0f2a50]' : 'text-white hover:text-blue-200'}`}
                                >
                                    {t.nav.newProperty}
                                </button>
                            </div>

                            {/* Search Box Container - Clean & Unified */}
                            <div className="bg-white p-2 rounded-lg shadow-2xl relative z-50 flex gap-2 items-center">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <Input
                                        placeholder="Lokasi, keyword, area, project, developer"
                                        className="pl-10 h-10 text-md border-none focus:ring-0 shadow-none bg-transparent w-full placeholder:text-slate-400"
                                        onFocus={() => setIsSearchFocused(true)}
                                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                    />
                                </div>
                                <Button className="h-10 px-6 bg-[#123C69] hover:bg-[#0f2a50] text-sm font-bold rounded-md">
                                    Cari
                                </Button>

                                {/* Search Dropdown - Absolute Positioned */}
                                {isSearchFocused && (
                                    <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-lg shadow-xl overflow-hidden border border-slate-100 z-30 text-left animate-in fade-in slide-in-from-top-2 duration-200">

                                        {/* Section: Penawaran Khusus */}
                                        <div className="bg-blue-50/50 p-4 border-b border-slate-100">
                                            <h3 className="text-sm font-bold text-[#123C69] mb-3">
                                                Penawaran Khusus
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-slate-700 hover:text-[#123C69] cursor-pointer group">
                                                    <Search className="h-4 w-4 text-[#123C69]" />
                                                    <span className="text-sm font-medium">Properti di bawah NJOP</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-slate-700 hover:text-[#123C69] cursor-pointer group">
                                                    <Search className="h-4 w-4 text-[#123C69]" />
                                                    <span className="text-sm font-medium">Properti Turun Harga</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section: Terakhir Dilihat */}
                                        <div className="p-4">
                                            <h3 className="text-sm font-bold text-[#123C69] mb-4">
                                                Terakhir Dilihat
                                            </h3>
                                            <div className="space-y-4">
                                                {MOCK_PROPERTIES.slice(0, 2).map((prop) => (
                                                    <div key={prop.id} className="flex gap-4 group cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition-colors">
                                                        <img src={prop.image} className="h-20 w-20 rounded-lg object-cover shrink-0" alt={prop.title} />
                                                        <div className="flex flex-col justify-center">
                                                            <span className="inline-block bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold w-fit mb-1">
                                                                Rumah
                                                            </span>
                                                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#123C69] line-clamp-1">{prop.title}</h4>
                                                            <p className="text-xs text-slate-500 mb-1">{prop.location}</p>
                                                            <p className="text-sm font-bold text-[#123C69]">{prop.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="relative z-20 -mt-10 mb-8 container mx-auto px-4 max-w-5xl">
                <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-6 grid grid-cols-5 gap-6 justify-items-center relative overflow-hidden border border-white/40 ring-1 ring-white/60">
                    {/* Subtle Gold Sheen */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#CBA135]/50 to-transparent"></div>

                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            className="flex flex-col items-center gap-3 group cursor-pointer transition-all duration-500 hover:-translate-y-1 relative"
                            onClick={() => navigate('/search')}
                        >
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-white shadow-sm flex items-center justify-center text-slate-600 transition-all duration-500 group-hover:from-[#123C69] group-hover:to-[#0a1e35] group-hover:text-[#CBA135] group-hover:shadow-[0_10px_30px_-5px_rgba(18,60,105,0.5)] group-hover:border-[#CBA135]/30">
                                <cat.icon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <span className="text-sm font-medium text-slate-600 group-hover:text-[#123C69] group-hover:font-semibold transition-all duration-300 tracking-wide">{cat.label}</span>

                            {/* Active Indicator Dot */}
                            <div className="w-1 h-1 rounded-full bg-[#CBA135] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1"></div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-16">

                {/* Banner Section */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl overflow-hidden relative h-48 group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800" className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="KPR" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent flex items-center p-8">
                            <div>
                                <div className="bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded w-fit mb-2">HOT</div>
                                <h3 className="text-xl font-bold text-white mb-2">{t.home.banners.mortgageTitle}</h3>
                                <p className="text-blue-100 mb-4 text-sm">{t.home.banners.mortgageDesc}</p>
                                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 border border-white/30">
                                    {t.home.banners.calculateNow} <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden relative h-48 group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1626177792800-e0052ad2c327?auto=format&fit=crop&w=800" className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="New Projects" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#123C69]/90 to-transparent flex items-center p-8">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{t.home.banners.newProjectsTitle}</h3>
                                <p className="text-teal-100 mb-4 text-sm">{t.home.banners.newProjectsDesc}</p>
                                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 border border-white/30">
                                    {t.home.banners.viewProjects} <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Properties */}
                <section className="relative group/slider">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{t.home.featured.title}</h2>
                            <p className="text-slate-500">{t.home.featured.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => scrollSlider('left')}
                                    className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-300 hover:bg-[#123C69] hover:text-white hover:border-[#123C69] transition-all text-slate-500"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => scrollSlider('right')}
                                    className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-300 hover:bg-[#123C69] hover:text-white hover:border-[#123C69] transition-all text-slate-500"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                            <Button variant="outline">{t.home.featured.viewAll}</Button>
                        </div>
                    </div>

                    {/* Slider Container */}
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto gap-6 pb-8 pt-2 snap-x scrollbar-hide px-1"
                    >
                        {MOCK_PROPERTIES.slice(0, 10).map((property) => (
                            <div key={property.id} className="min-w-[280px] md:min-w-[320px] lg:min-w-[350px] snap-start first:pl-2 last:pr-2">
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* KPR Calculator Teaser */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#123C69] to-[#0a1e35] p-12 shadow-2xl border border-white/10 isolate">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#CBA135]/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

                    <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
                        {/* Icon/Visual Area */}
                        <div className="relative group shrink-0">
                            <div className="absolute inset-0 bg-[#CBA135]/20 blur-xl rounded-full scale-0 group-hover:scale-110 transition-transform duration-700"></div>
                            <div className="h-32 w-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] group-hover:bg-white/15 transition-all duration-500 relative">
                                <Calculator className="h-14 w-14 text-[#CBA135] drop-shadow-[0_0_15px_rgba(203,161,53,0.3)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                            </div>
                            {/* Floating decorative elements */}
                            <div className="absolute top-0 right-0 h-8 w-8 bg-gradient-to-br from-[#CBA135] to-amber-600 rounded-full shadow-lg animate-bounce delay-100 flex items-center justify-center">
                                <span className="text-white font-bold text-xs">%</span>
                            </div>
                            <div className="absolute bottom-2 left-0 h-6 w-6 bg-blue-500/80 rounded-full shadow-lg animate-bounce delay-300 backdrop-blur-sm"></div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight font-display">
                                {t.home.calculator.title}
                                <span className="text-[#CBA135] inline-block ml-2">.</span>
                            </h2>
                            <p className="text-blue-100/80 mb-8 max-w-xl text-lg leading-relaxed mx-auto md:mx-0 font-light">
                                {t.home.calculator.desc}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Button className="bg-[#CBA135] hover:bg-[#b58e2a] text-[#0a1e35] font-bold px-8 py-6 text-base rounded-xl shadow-[0_4px_14px_0_rgba(203,161,53,0.39)] hover:shadow-[0_6px_20px_rgba(203,161,53,0.23)] hover:-translate-y-1 transition-all">
                                    {t.home.calculator.tryBtn}
                                </Button>
                                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base rounded-xl backdrop-blur-sm transition-all hover:-translate-y-1">
                                    {t.home.calculator.consultBtn}
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 z-50 bg-[#123C69] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:bg-[#0f2a50] hover:shadow-xl ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                aria-label="Scroll to top"
            >
                <ArrowUp className="h-6 w-6" />
            </button>
        </div >
    );
}
