import { useState, useRef, useEffect } from 'react';
import { Search, Clock, ArrowRight, BookOpen, Share2, ChevronLeft, ChevronRight, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MOCK_BLOG_POSTS } from '../utils/mockBlogData';

const FALLBACK_POST_IMAGE = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200";
const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150";

export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // Pagination state
    const [visibleCount, setVisibleCount] = useState(6);
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);

    // Initial loading effect
    useEffect(() => {
        const timer = setTimeout(() => setIsPageLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    // Reset visible count when filters or search change
    useEffect(() => {
        setVisibleCount(6);
    }, [searchTerm, selectedCategory]);

    const categories = ['All', 'Tren Pasar', 'Tips & Trik', 'Investasi', 'Desain', 'Hukum & Legal', 'Teknologi', 'Gaya Hidup', 'Properti Baru', 'Keuangan'];

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const filteredPosts = MOCK_BLOG_POSTS.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = MOCK_BLOG_POSTS[0];

    // Derived display posts for the grid (skipping the main featured post in default view)
    const isDefaultView = !searchTerm && selectedCategory === 'All';
    const gridPosts = isDefaultView ? filteredPosts.slice(1) : filteredPosts;
    const displayPosts = gridPosts.slice(0, visibleCount);
    const hasMore = visibleCount < gridPosts.length;

    const handleLoadMore = async () => {
        setIsLoading(true);
        // Simulate network delay for "cool" loading effect
        await new Promise(resolve => setTimeout(resolve, 800));
        setVisibleCount(prev => prev + 6);
        setIsLoading(false);
    };

    if (isPageLoading) {
        return <BlogPageShimmer />;
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20 selection:bg-[#CBA135]/30">
            {/* Hero Section - Majestic Editorial Design */}
            <div className="relative bg-[#0a1e35] pt-32 pb-48 lg:pb-72 overflow-hidden">
                {/* Background Pattern & Gradients */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1e35] via-[#0a1e35]/80 to-[#0a1e35]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(203,161,53,0.08),transparent_50%)]"></div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -ml-40 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#CBA135]/5 rounded-full blur-[150px]"></div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <span className="flex h-2 w-2 rounded-full bg-[#CBA135] animate-pulse"></span>
                        <span className="text-[#CBA135] text-[10px] font-black tracking-[0.25em] uppercase">
                            EDISI TERBARU 2026
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold text-white font-display mb-8 leading-[0.9] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#CBA135] via-[#E6C97D] to-[#CBA135] italic font-serif">Journal</span>
                        <br className="hidden md:block" /> by Unitin
                    </h1>

                    <p className="text-slate-300 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 font-light tracking-wide mb-12">
                        Eksplorasi mendalam tentang hunian masa depan, strategi investasi properti, dan narasi desain yang mendefinisikan kemewahan modern.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl -mt-48 lg:-mt-72 relative z-20">
                {/* Featured Post - Large Floating Card */}
                <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 group cursor-pointer animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e35] via-[#0a1e35]/20 to-transparent z-10 opacity-70 group-hover:opacity-60 transition-opacity duration-700"></div>
                    <img
                        src={featuredPost.imageUrl}
                        alt={featuredPost.title}
                        className="w-full h-[600px] md:h-[800px] object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = FALLBACK_POST_IMAGE;
                        }}
                    />

                    {/* Content Overlay - Glassmorphism Box */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 z-20">
                        <div className="bg-[#0a1e35]/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden relative group/content max-w-5xl">
                            {/* Animated Background Glow */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#CBA135]/10 rounded-full blur-[80px] group-hover/content:bg-[#CBA135]/20 transition-colors duration-700"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="relative">
                                        <span className="px-5 py-2 bg-[#CBA135] text-[#0a1e35] text-[10px] font-black rounded-full shadow-lg relative z-10 overflow-hidden inline-block group/badge">
                                            <span className="relative z-10">FEATURED STORY</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/badge:animate-shimmer"></div>
                                        </span>
                                    </div>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#CBA135]/40"></span>
                                    <span className="text-white/60 text-[10px] font-black tracking-[0.3em] uppercase">{featuredPost.category}</span>
                                </div>

                                <h2 className="text-3xl md:text-6xl font-bold font-display mb-8 leading-[1.1] max-w-4xl text-white group-hover/content:text-[#CBA135] transition-colors duration-500">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-slate-200/80 text-lg md:text-xl mb-12 max-w-3xl line-clamp-3 font-light leading-relaxed tracking-wide">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex flex-wrap items-center gap-10">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-[#CBA135] rounded-full blur-md opacity-30"></div>
                                            <img
                                                src={featuredPost.authorAvatar}
                                                alt={featuredPost.author}
                                                className="w-14 h-14 rounded-full border-2 border-[#CBA135]/50 relative z-10 object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = FALLBACK_AVATAR;
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-base">{featuredPost.author}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Editor in Chief</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex items-center gap-3 py-2 px-5 rounded-full bg-white/5 border border-white/5">
                                        <Clock className="w-4 h-4 text-[#CBA135]" />
                                        <span className="text-white/70 text-xs font-bold uppercase tracking-widest">{featuredPost.readTime}</span>
                                    </div>

                                    <Button className="ml-auto w-full md:w-auto bg-white hover:bg-[#CBA135] text-[#0a1e35] px-10 h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] group/btn transition-all shadow-xl hover:-translate-y-1">
                                        Selengkapnya <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Bar - Refined Spacing */}
                <div className="mt-28 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 group/bar">
                    <div className="bg-white/70 backdrop-blur-2xl border border-white/80 p-3 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5 flex flex-col lg:flex-row items-center gap-3 transition-all duration-500 hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.08)]">

                        {/* Categories Scrollable Area */}
                        <div className="relative flex-1 w-full lg:w-auto overflow-hidden group/scroll px-4">
                            {/* Left Arrow - Enhanced Visibility */}
                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 ${showLeftArrow ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                <button
                                    onClick={() => scroll('left')}
                                    className="w-12 h-12 bg-white text-[#123C69] border border-slate-100 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#123C69] hover:text-white transition-all transform hover:scale-110 active:scale-95"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Scroll Container with refined masking */}
                            <div
                                ref={scrollContainerRef}
                                onScroll={checkScroll}
                                className="flex items-center gap-2 overflow-x-auto w-full py-4 scrollbar-hide scroll-smooth relative"
                                style={{
                                    maskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)',
                                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)'
                                }}
                            >
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`shrink-0 relative px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 ease-out whitespace-nowrap overflow-hidden
                                            ${selectedCategory === cat
                                                ? 'bg-[#123C69] text-white shadow-[0_15px_30px_-8px_rgba(18,60,105,0.4)] scale-[1.05] z-10'
                                                : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-lg hover:scale-[1.02]'
                                            }
                                        `}
                                    >
                                        <span className="relative z-10">{cat}</span>
                                        {selectedCategory === cat && (
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 animate-pulse"></div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Right Arrow - Enhanced Visibility */}
                            <div className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 ${showRightArrow ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                <button
                                    onClick={() => scroll('right')}
                                    className="w-12 h-12 bg-white text-[#123C69] border border-slate-100 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#123C69] hover:text-white transition-all transform hover:scale-110 active:scale-95"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="shrink-0 w-full lg:w-96 p-2">
                            <div className="relative group/search">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within/search:text-[#123C69] group-focus-within/search:scale-110 transition-all duration-300" />
                                <Input
                                    placeholder="Cari artikel inspiratif..."
                                    className="pl-12 h-14 bg-slate-50/40 border-transparent focus:bg-white focus:border-[#CBA135]/50 focus:ring-8 focus:ring-[#CBA135]/5 transition-all duration-500 rounded-2xl text-base placeholder:text-slate-400 placeholder:font-light"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Logic */}
                {searchTerm || selectedCategory !== 'All' ? (
                    /* Filtered/Search results grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {displayPosts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                        {isLoading && Array.from({ length: 3 }).map((_, i) => (
                            <BlogShimmer key={i} index={displayPosts.length + i} />
                        ))}
                    </div>
                ) : (
                    /* Default view - Grid only (Featured is already at the top) */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
                        {displayPosts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                        {isLoading && Array.from({ length: 3 }).map((_, i) => (
                            <BlogShimmer key={i} index={displayPosts.length + i} />
                        ))}
                    </div>
                )}

                {/* Load More Button */}
                {hasMore && (
                    <div className="flex justify-center mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Button
                            onClick={handleLoadMore}
                            disabled={isLoading}
                            className="bg-white hover:bg-[#0a1e35] text-[#0a1e35] hover:text-white px-12 h-16 rounded-2xl font-black text-xs uppercase tracking-[0.25em] border border-slate-200 shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(10,30,53,0.2)] transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    Muat Lebih Banyak
                                    <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </div>
                )}


                {filteredPosts.length === 0 && (
                    <div className="text-center py-40 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm animate-in zoom-in-95 duration-700">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
                            <BookOpen className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4 font-display">No articles found</h3>
                        <p className="text-slate-500 font-light text-lg">Try adjusting your filters or search keywords.</p>
                    </div>
                )}

                {/* Newsletter Section - High-End Editorial invite */}
                <div className="mt-40 mb-20 relative group/newsletter">
                    <div className="absolute inset-0 bg-[#0a1e35] rounded-[4rem] shadow-[0_60px_100px_-20px_rgba(10,30,53,0.3)] overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#CBA135]/10 to-transparent rounded-full blur-[150px] -mr-64 -mt-64 group-hover/newsletter:scale-110 transition-transform duration-[2000ms]"></div>
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -ml-48 -mb-48 group-hover/newsletter:scale-110 transition-transform duration-[2000ms] delay-150"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay"></div>
                    </div>

                    <div className="relative z-10 px-8 py-28 md:py-40 text-center max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-3 mb-12 py-2.5 px-7 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <span className="tracking-[0.5em] text-[#CBA135] text-[10px] font-black uppercase">Elite Journal Access</span>
                        </div>

                        <h2 className="text-4xl md:text-7xl font-bold text-white font-display mb-10 leading-[1.1] tracking-tight">
                            Bergabunglah dalam <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CBA135] via-[#E6C97D] to-[#CBA135] italic font-serif">Lingkaran Eksklusif</span> Kami
                        </h2>

                        <p className="text-slate-400 text-xl md:text-2xl mb-16 font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
                            Eksplorasi mendalam tentang hunian masa depan, strategi investasi properti, dan narasi desain yang mendefinisikan kemewahan modern.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 max-w-3xl mx-auto bg-white/5 p-4 rounded-[3rem] border border-white/10 backdrop-blur-2xl shadow-2xl group/input-container">
                            <div className="flex-1 relative">
                                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within/input-container:text-[#CBA135] transition-colors" />
                                <input
                                    type="email"
                                    placeholder="Alamat email premium Anda..."
                                    className="w-full bg-transparent border-none text-white placeholder:text-slate-600 px-16 py-5 focus:outline-none text-lg font-light tracking-wide"
                                />
                            </div>
                            <Button className="h-16 px-14 bg-[#CBA135] hover:bg-white text-[#0a1e35] font-black text-sm uppercase tracking-[0.25em] rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(203,161,53,0.3)] transition-all hover:-translate-y-1 active:scale-95 whitespace-nowrap">
                                Daftar Sekarang
                            </Button>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-12 mt-16 opacity-30">
                            {['Trusted by 10k+', 'Weekly Intelligence', 'Zero Spam Policy'].map((trait) => (
                                <div key={trait} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#CBA135] animate-pulse"></div>
                                    <span className="text-white text-[11px] font-black uppercase tracking-[0.3em] font-display">{trait}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

// Sub-component for Blog Card to keep things clean
function BlogCard({ post, index }: { post: any, index: number }) {
    return (
        <div
            className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-12 fill-mode-both"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Image Container */}
            <div className="relative h-72 lg:h-80 overflow-hidden">
                <div className="absolute top-6 left-6 z-20">
                    <span className="px-4 py-1.5 bg-[#0a1e35] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
                        {post.category}
                    </span>
                </div>

                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = FALLBACK_POST_IMAGE;
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e35]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-8">
                    <span className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Read Story <ArrowRight className="w-4 h-4 text-[#CBA135]" />
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-10 md:p-12 flex flex-col flex-1">
                <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <Clock className="w-4 h-4 text-[#CBA135]" />
                        <span>{post.readTime}</span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        {post.date}
                    </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-[#123C69] transition-colors line-clamp-2 font-display tracking-tight">
                    {post.title}
                </h3>

                <p className="text-slate-500 text-lg leading-relaxed line-clamp-3 mb-10 flex-1 font-light tracking-wide italic">
                    {post.excerpt}
                </p>

                <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="absolute inset-0 bg-slate-200 rounded-full blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
                            <img
                                src={post.authorAvatar}
                                alt={post.author}
                                className="w-12 h-12 rounded-full border-2 border-white shadow-sm relative z-10 object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = FALLBACK_AVATAR;
                                }}
                            />
                        </div>
                        <div>
                            <p className="text-base font-bold text-slate-900 leading-none">{post.author}</p>
                            <p className="text-[10px] text-[#CBA135] font-black uppercase tracking-[0.2em] mt-2 italic">{post.authorTitle || 'Journalist'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#CBA135]/10 hover:text-[#CBA135] transition-all cursor-pointer shadow-sm">
                            <Share2 className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-component for Shimmer Placeholder (Skeleton)
function BlogShimmer({ index }: { index: number }) {
    return (
        <div
            className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.04)] animate-in fade-in zoom-in-95 duration-700 animate-pulse-subtle"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Image Placeholder */}
            <div className="relative h-72 lg:h-80 bg-slate-100/80 overflow-hidden shimmer-mask">
                <div className="absolute top-6 left-6 w-28 h-8 bg-slate-200/50 rounded-full blur-[0.5px]"></div>
            </div>

            {/* Content Container */}
            <div className="p-10 md:p-12 flex flex-col flex-1">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-5 bg-slate-100 rounded-md shimmer-mask"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="w-28 h-5 bg-slate-100 rounded-md shimmer-mask"></div>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="w-full h-10 bg-slate-100 rounded-lg shimmer-mask"></div>
                    <div className="w-[85%] h-10 bg-slate-100 rounded-lg shimmer-mask"></div>
                </div>

                <div className="space-y-3 mb-10 flex-1">
                    <div className="w-full h-4 bg-slate-100/60 rounded-md shimmer-mask"></div>
                    <div className="w-full h-4 bg-slate-100/60 rounded-md shimmer-mask"></div>
                    <div className="w-[70%] h-4 bg-slate-100/60 rounded-md shimmer-mask"></div>
                </div>

                <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-slate-100/80 shimmer-mask"></div>
                        <div className="space-y-2.5">
                            <div className="w-32 h-5 bg-slate-100 rounded-md shimmer-mask"></div>
                            <div className="w-20 h-4 bg-slate-100/60 rounded-md shimmer-mask"></div>
                        </div>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-slate-100/80 shimmer-mask"></div>
                </div>
            </div>
        </div>
    );
}

function BlogPageShimmer() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20 selection:bg-[#CBA135]/30">
            {/* Hero Shimmer */}
            <div className="relative bg-[#0a1e35] pt-32 pb-48 lg:pb-72 overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center space-y-12">
                    <div className="w-48 h-10 bg-white/5 rounded-full mx-auto shimmer-mask animate-pulse-subtle"></div>
                    <div className="space-y-6">
                        <div className="w-full max-w-4xl h-24 bg-white/10 rounded-[2rem] mx-auto shimmer-mask animate-pulse-subtle shadow-2xl"></div>
                        <div className="w-3/4 h-24 bg-white/5 rounded-[2rem] mx-auto shimmer-mask animate-pulse-subtle"></div>
                    </div>
                    <div className="w-full max-w-2xl h-8 bg-white/5 rounded-full mx-auto shimmer-mask animate-pulse-subtle mb-10"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl -mt-48 lg:-mt-72 relative z-20">
                {/* Featured Shimmer Card */}
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-200">
                    <div className="w-full h-[600px] md:h-[800px] bg-slate-200 shimmer-mask animate-pulse-subtle"></div>
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 z-20">
                        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-5xl">
                            <div className="w-40 h-8 bg-white/20 rounded-full mb-8 shimmer-mask animate-pulse-subtle"></div>
                            <div className="w-full h-16 bg-white/30 rounded-2xl mb-8 shimmer-mask animate-pulse-subtle"></div>
                            <div className="w-2/3 h-10 bg-white/20 rounded-xl mb-12 shimmer-mask animate-pulse-subtle"></div>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-white/40 shimmer-mask animate-pulse-subtle"></div>
                                <div className="space-y-3">
                                    <div className="w-32 h-6 bg-white/30 rounded-lg shimmer-mask animate-pulse-subtle"></div>
                                    <div className="w-24 h-4 bg-white/20 rounded-md shimmer-mask animate-pulse-subtle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Bar Shimmer */}
                <div className="mt-28 mb-16 px-4">
                    <div className="bg-white/80 backdrop-blur-xl border border-white p-4 rounded-[2.5rem] shadow-xl flex items-center gap-4 overflow-hidden">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="shrink-0 w-32 h-12 bg-slate-100 rounded-2xl shimmer-mask animate-pulse-subtle"></div>
                        ))}
                    </div>
                </div>

                {/* Grid Shimmer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
                    {[1, 2, 3].map(i => (
                        <BlogShimmer key={i} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
