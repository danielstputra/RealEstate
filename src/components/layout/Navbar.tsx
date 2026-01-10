import { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, Menu, X, User, Globe, PlusSquare, ChevronDown, Building2, Warehouse, Factory, Map, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../context/LanguageContext';
import { MegaMenu } from './MegaMenu';
import { CompanyMenu } from './CompanyMenu';
import { AgentMenu } from './AgentMenu';
import { AuthModal } from '../features/AuthModal';
import { PostAdModal } from '../features/PostAdModal';
import { FindPropertyModal } from '../features/FindPropertyModal';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isPostAdOpen, setIsPostAdOpen] = useState(false);
    const [isFindPropertyOpen, setIsFindPropertyOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const { language, setLanguage, t } = useLanguage();
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const toggleLang = () => {
        setLanguage(language === 'id' ? 'en' : 'id');
    };

    const handleMouseEnter = (menu: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setActiveMenu(menu);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 150); // Small delay to allow moving to the menu itself
    };

    return (
        <>
            <nav className="sticky top-0 z-[80] bg-[#0a1e35]/85 backdrop-blur-md text-white border-b border-white/10 shadow-sm transition-all duration-300">
                {/* Top Row: Logo & Main Actions */}
                <div className="container mx-auto px-6 h-20">
                    <div className="flex h-full items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                                <Home className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-wide font-display">UNITIN</span>
                        </Link>

                        {/* Desktop Actions */}
                        <div className="hidden items-center gap-8 md:flex">
                            <div className="flex items-center gap-6 border-r border-white/10 pr-6">
                                <button
                                    onClick={toggleLang}
                                    className="flex items-center gap-2 opacity-70 hover:opacity-100 cursor-pointer text-xs font-bold uppercase tracking-widest transition-all hover:scale-105"
                                    title="Ganti Bahasa"
                                >
                                    <Globe className="h-4 w-4" /> {language}
                                </button>
                                <div
                                    onClick={() => setIsAuthOpen(true)}
                                    className="flex items-center gap-2 opacity-70 hover:opacity-100 cursor-pointer text-sm font-medium transition-opacity"
                                >
                                    <User className="h-4 w-4" /> {t.nav.account}
                                </div>
                            </div>
                            <Button
                                onClick={() => setIsPostAdOpen(true)}
                                className="bg-white text-[#123C69] hover:bg-blue-50 font-bold gap-2 px-6 shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5"
                            >
                                <PlusSquare className="h-4 w-4" /> {t.nav.postAd}
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
                        </button>
                    </div>
                </div>

                {/* Bottom Row: Navigation Links (Desktop Only) */}
                <div className="hidden md:block w-full border-t border-white/5 bg-[#05111d]/30 relative">
                    <div className="container mx-auto px-6 h-12 flex items-center justify-between text-sm">
                        <div className="flex gap-2">
                            <div
                                onMouseEnter={() => handleMouseEnter('dijual')}
                                onMouseLeave={handleMouseLeave}
                                className="relative h-full flex items-center"
                            >
                                <Link
                                    to="/search"
                                    className={cn("px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:bg-white/10 hover:text-white flex items-center gap-1 cursor-default", activeMenu === 'dijual' ? "bg-white/15 text-white font-bold shadow-sm backdrop-blur-sm" : "text-white/70")}
                                >
                                    {t.nav.forSale}
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMenu === 'dijual' ? 'rotate-180' : ''}`} />
                                </Link>
                            </div>
                            <NavLink to="/search?type=baru" className={({ isActive }) => cn("px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:bg-white/10 hover:text-white", isActive ? "bg-white/15 text-white font-bold shadow-sm backdrop-blur-sm" : "text-white/70")}>{t.nav.newProperty}</NavLink>
                            <a href="#" className="px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:bg-white/10 hover:text-white text-white/70">{t.nav.bankAssets}</a>
                            <NavLink to="/kpr" className={({ isActive }) => cn("px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:bg-white/10 hover:text-white", isActive ? "bg-white/15 text-white font-bold shadow-sm backdrop-blur-sm" : "text-white/70")}>{t.nav.mortgage}</NavLink>
                        </div>
                        <div className="flex gap-6 text-xs font-medium tracking-wider uppercase items-center">
                            <button onClick={() => setIsFindPropertyOpen(true)} className="text-white/60 hover:text-white transition-colors uppercase">{t.nav.findProperty}</button>
                            <div
                                onMouseEnter={() => handleMouseEnter('agent')}
                                onMouseLeave={handleMouseLeave}
                                className="relative h-full flex items-center"
                            >
                                <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className={cn("px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:bg-white/10 hover:text-white flex items-center gap-1 cursor-default text-sm normal-case tracking-normal", activeMenu === 'agent' ? "bg-white/15 text-white font-bold shadow-sm backdrop-blur-sm" : "text-white/70")}
                                >
                                    {t.nav.agents}
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMenu === 'agent' ? 'rotate-180' : ''}`} />
                                </a>
                            </div>
                            <div
                                onMouseEnter={() => handleMouseEnter('company')}
                                onMouseLeave={handleMouseLeave}
                                className="relative h-full flex items-center"
                            >
                                <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className={cn("px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:bg-white/10 hover:text-white flex items-center gap-1 cursor-default text-sm normal-case tracking-normal", activeMenu === 'company' ? "bg-white/15 text-white font-bold shadow-sm backdrop-blur-sm" : "text-white/70")}
                                >
                                    {t.nav.company}
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMenu === 'company' ? 'rotate-180' : ''}`} />
                                </a>
                            </div>
                            <a href="#" className="text-white/60 hover:text-white transition-colors">{t.nav.apps}</a>
                        </div>
                    </div>

                    {/* Mega Menu Component */}
                    <MegaMenu
                        isOpen={activeMenu === 'dijual'}
                        onMouseEnter={() => handleMouseEnter('dijual')}
                        onMouseLeave={handleMouseLeave}
                    />
                    <CompanyMenu
                        isOpen={activeMenu === 'company'}
                        onMouseEnter={() => handleMouseEnter('company')}
                        onMouseLeave={handleMouseLeave}
                    />
                    <AgentMenu
                        isOpen={activeMenu === 'agent'}
                        onMouseEnter={() => handleMouseEnter('agent')}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden border-t border-white/10 bg-[#0a1e35] absolute w-full shadow-xl max-h-[80vh] overflow-y-auto">
                        <div className="container mx-auto px-4 py-6 space-y-4">
                            {/* Mobile Accordion for Dijual */}
                            <div>
                                <button
                                    onClick={() => setActiveMenu(activeMenu === 'dijual-mobile' ? null : 'dijual-mobile')}
                                    className="flex items-center justify-between w-full text-lg font-medium text-white opacity-80 mb-2"
                                >
                                    {t.nav.forSale}
                                    <ChevronDown className={`w-5 h-5 transition-transform ${activeMenu === 'dijual-mobile' ? 'rotate-180' : ''}`} />
                                </button>

                                {activeMenu === 'dijual-mobile' && (
                                    <div className="pl-0 space-y-4 mb-4 animate-in slide-in-from-top-2 fade-in duration-300">
                                        <div className="bg-white/5 mx-[-1rem] px-6 py-4 border-y border-white/5">
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <Link to="/search?type=rumah" className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5" onClick={() => setIsOpen(false)}>
                                                    <div className="p-1.5 rounded-lg bg-[#CBA135]/20 text-[#CBA135]">
                                                        <Home className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-white/90 text-sm font-medium">Rumah</span>
                                                </Link>
                                                <Link to="/search?type=apartemen" className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5" onClick={() => setIsOpen(false)}>
                                                    <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                                                        <Building2 className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-white/90 text-sm font-medium">Apartemen</span>
                                                </Link>
                                                <Link to="/search?type=ruko" className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5" onClick={() => setIsOpen(false)}>
                                                    <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                                                        <Warehouse className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-white/90 text-sm font-medium">Ruko</span>
                                                </Link>
                                                <Link to="/search?type=tanah" className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5" onClick={() => setIsOpen(false)}>
                                                    <div className="p-1.5 rounded-lg bg-green-500/20 text-green-400">
                                                        <Map className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-white/90 text-sm font-medium">Tanah</span>
                                                </Link>
                                                <Link to="/search?type=pabrik" className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5" onClick={() => setIsOpen(false)}>
                                                    <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
                                                        <Factory className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-white/90 text-sm font-medium">Pabrik</span>
                                                </Link>
                                                <Link to="/search?type=kantor" className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5" onClick={() => setIsOpen(false)}>
                                                    <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400">
                                                        <Building2 className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-white/90 text-sm font-medium">Kantor</span>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="px-2">
                                            <div className="flex items-center gap-2 mb-3 opacity-60">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Lokasi Populer</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {['Jakarta', 'Bandung', 'Surabaya', 'Bali', 'Tangerang', 'Bekasi'].map((loc) => (
                                                    <Link
                                                        key={loc}
                                                        to={`/search?loc=${loc.toLowerCase()}`}
                                                        className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 hover:bg-white/15 hover:text-white hover:border-white/20 transition-all active:scale-95"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {loc}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <NavLink to="/search?type=disewa" className="block text-lg font-medium opacity-80" onClick={() => setIsOpen(false)}>{t.nav.forRent}</NavLink>
                            <NavLink to="/kpr" className="block text-lg font-medium opacity-80" onClick={() => setIsOpen(false)}>{t.nav.mortgage}</NavLink>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsPostAdOpen(true);
                                }}
                                className="block text-left text-lg font-medium opacity-80 w-full"
                            >
                                {t.nav.postAd}
                            </button>
                            <hr className="border-white/10" />
                            <div className="flex items-center justify-between text-white opacity-80 px-1">
                                <span className="text-sm font-medium">{t.nav.language}</span>
                                <button onClick={toggleLang} className="flex items-center gap-2 uppercase font-bold border border-white/20 px-3 py-1.5 rounded bg-white/5">
                                    <Globe className="h-4 w-4" /> {language}
                                </button>
                            </div>
                            <div className="pt-4">
                                <Button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsAuthOpen(true);
                                    }}
                                    className="w-full bg-white text-[#123C69] h-12 text-lg font-bold"
                                >
                                    {t.nav.loginRegister}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

            </nav>
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            <PostAdModal
                isOpen={isPostAdOpen}
                onClose={() => setIsPostAdOpen(false)}
                onLoginClick={() => {
                    setIsPostAdOpen(false);
                    setIsAuthOpen(true);
                }}
            />
            <FindPropertyModal isOpen={isFindPropertyOpen} onClose={() => setIsFindPropertyOpen(false)} />
        </>
    );
}
