import React from 'react';
import { Info, Briefcase, Phone, HelpCircle, FileText, Award, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CompanyMenuProps {
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const CompanyMenu: React.FC<CompanyMenuProps> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
    if (!isOpen) return null;

    const companyLinks = [
        { icon: Info, label: 'Tentang Kami', desc: 'Mengenal lebih dekat visi & misi kami', link: '/about' },
        { icon: Users, label: 'Tim Kami', desc: 'Bertemu dengan para profesional', link: '/team' },
        { icon: Briefcase, label: 'Karir', desc: 'Bergabung dan tumbuh bersama', link: '/careers' },
        { icon: Award, label: 'Penghargaan', desc: 'Prestasi yang telah kami raih', link: '/awards' },
    ];

    const supportLinks = [
        { icon: Phone, label: 'Hubungi Kami', link: '/contact' },
        { icon: HelpCircle, label: 'Pusat Bantuan', link: '/help' },
        { icon: BookOpen, label: 'Blog & Berita', link: '/blog' },
        { icon: FileText, label: 'Syarat & Ketentuan', link: '/terms' },
    ];

    return (
        <div
            className="absolute left-0 top-full w-full bg-white/95 backdrop-blur-xl shadow-premium border-t border-slate-100/50 z-40 origin-top animate-in fade-in slide-in-from-top-2 duration-300 ease-out transition-colors"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-10">
                    {/* Left Column: Intro / Hero for Menu */}
                    <div className="col-span-4 relative overflow-hidden rounded-2xl bg-[#123C69] p-8 text-white group">
                        <div className="relative z-10">
                            <h3 className="font-display font-bold text-2xl mb-2">Unitin Corp.</h3>
                            <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                                Membangun masa depan properti Indonesia dengan inovasi dan integritas terdepan.
                            </p>
                            <Link to="/about" className="inline-flex items-center text-sm font-bold bg-[#CBA135] text-[#123C69] px-4 py-2 rounded-lg hover:bg-white transition-colors">
                                Baca Selengkapnya
                            </Link>
                        </div>
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#CBA135]/20 rounded-full blur-xl -ml-8 -mb-8"></div>
                    </div>

                    {/* Middle Column: Main Company Links */}
                    <div className="col-span-5">
                        <h4 className="font-display font-bold text-[#123C69] text-sm uppercase tracking-wider mb-5">Perusahaan</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {companyLinks.map((item, idx) => (
                                <Link
                                    key={idx}
                                    to={item.link}
                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group"
                                >
                                    <div className="p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-[#123C69] group-hover:text-white transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-slate-700 group-hover:text-[#123C69] transition-colors">{item.label}</span>
                                        <span className="text-xs text-slate-500">{item.desc}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Support & Resources */}
                    <div className="col-span-3 border-l border-slate-100 pl-8">
                        <h4 className="font-display font-bold text-[#123C69] text-sm uppercase tracking-wider mb-5">Dukungan</h4>
                        <div className="space-y-3">
                            {supportLinks.map((item, idx) => (
                                <Link
                                    key={idx}
                                    to={item.link}
                                    className="flex items-center gap-3 text-slate-600 hover:text-[#123C69] transition-colors group"
                                >
                                    <item.icon className="w-4 h-4 text-slate-400 group-hover:text-[#CBA135] transition-colors" />
                                    <span className="font-medium text-sm">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
