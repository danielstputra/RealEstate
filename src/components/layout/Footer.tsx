import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#0a1e35] text-slate-300 pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand & Newsletter (Col 1-5) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <Home className="h-6 w-6 text-[#CBA135]" />
                                </div>
                                <span className="text-2xl font-bold text-white font-display tracking-wide">UNITIN</span>
                            </div>
                            <p className="text-slate-400 leading-relaxed max-w-md text-lg">
                                {t.footer.desc}
                            </p>
                        </div>

                        <div className="max-w-md bg-white/5 p-6 rounded-2xl border border-white/5">
                            <h4 className="text-white font-bold font-display mb-2">Berlangganan Newsletter</h4>
                            <p className="text-sm text-slate-400 mb-4">Dapatkan info properti eksklusif & promo menarik.</p>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Email Anda"
                                    className="bg-white/10 border-transparent text-white placeholder:text-slate-500 focus:border-[#CBA135]/50 focus:ring-[#CBA135]/50"
                                />
                                <Button className="bg-[#CBA135] hover:bg-[#b38b25] text-[#0a1e35] font-bold">
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Links Section (Col 6-12) */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Company */}
                        <div>
                            <h3 className="text-white font-bold font-display text-lg mb-6">{t.footer.company}</h3>
                            <ul className="space-y-4">
                                <li><Link to="/about" className="hover:text-[#CBA135] transition-colors relative group w-fit block">
                                    {t.footer.about}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CBA135] transition-all group-hover:w-full"></span>
                                </Link></li>
                                <li><Link to="/careers" className="hover:text-[#CBA135] transition-colors relative group w-fit block">
                                    {t.footer.careers}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CBA135] transition-all group-hover:w-full"></span>
                                </Link></li>
                                <li><Link to="/blog" className="hover:text-[#CBA135] transition-colors relative group w-fit block">
                                    {t.footer.blog}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CBA135] transition-all group-hover:w-full"></span>
                                </Link></li>
                                <li><Link to="/contact" className="hover:text-[#CBA135] transition-colors relative group w-fit block">
                                    {t.footer.contact}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CBA135] transition-all group-hover:w-full"></span>
                                </Link></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-white font-bold font-display text-lg mb-6">{t.footer.support}</h3>
                            <ul className="space-y-4">
                                <li><Link to="/help" className="hover:text-[#CBA135] transition-colors">{t.footer.helpCenter}</Link></li>
                                <li><Link to="/terms" className="hover:text-[#CBA135] transition-colors">{t.footer.terms}</Link></li>
                                <li><Link to="/privacy" className="hover:text-[#CBA135] transition-colors">{t.footer.privacy}</Link></li>
                                <li><Link to="/sitemap" className="hover:text-[#CBA135] transition-colors">{t.footer.sitemap}</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-white font-bold font-display text-lg mb-6">{t.footer.contactUs}</h3>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-3 group">
                                    <div className="p-2 rounded-full bg-white/5 text-[#CBA135] group-hover:bg-[#CBA135] group-hover:text-[#0a1e35] transition-colors">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm leading-relaxed">Jl. Jendral Sudirman No. 123, Jakarta Selatan, 12190</span>
                                </li>
                                <li className="flex items-center gap-3 group">
                                    <div className="p-2 rounded-full bg-white/5 text-[#CBA135] group-hover:bg-[#CBA135] group-hover:text-[#0a1e35] transition-colors">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <span>(021) 1234-5678</span>
                                </li>
                                <li className="flex items-center gap-3 group">
                                    <div className="p-2 rounded-full bg-white/5 text-[#CBA135] group-hover:bg-[#CBA135] group-hover:text-[#0a1e35] transition-colors">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <span>support@unitn.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} <span className="text-white font-bold">UNITIN</span>. All rights reserved.
                    </div>

                    {/* Social Media */}
                    <div className="flex gap-3">
                        {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-[#CBA135] hover:text-[#0a1e35] hover:-translate-y-1 transition-all">
                                <Icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
