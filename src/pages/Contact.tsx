
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';

export default function Contact() {
    const [subject, setSubject] = useState('');

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative bg-[#123C69] pt-32 pb-32 lg:pb-48 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#123C69]/90 to-[#123C69] via-[#123C69]/80"></div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-[#CBA135]/20 rounded-full blur-3xl -mr-20 animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -ml-20"></div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#CBA135]/20 text-[#CBA135] text-xs font-bold tracking-widest uppercase mb-6 border border-[#CBA135]/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Hubungi Kami
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-display mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Mari Mulai Percakapan
                    </h1>
                    <p className="text-blue-100/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        Apakah Anda memiliki pertanyaan tentang properti atau membutuhkan bantuan ahli? Tim kami siap memberikan solusi terbaik untuk kebutuhan Anda.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Contact Info Cards (Left Side) */}
                    <div className="lg:col-span-4 space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                        {/* Primary Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-[#123C69] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-900/20 group-hover:rotate-6 transition-transform">
                                    <MessageSquare className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Layanan Pelanggan</h3>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                    Tim support kami siap membantu Anda setiap hari kerja untuk pertanyaan umum.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors group/item">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover/item:text-[#123C69] shadow-sm">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Telepon</p>
                                            <p className="text-slate-900 font-bold">(021) 1234-5678</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors group/item">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover/item:text-[#123C69] shadow-sm">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</p>
                                            <p className="text-slate-900 font-bold">hello@unitin.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Office Location Card */}
                        <div className="bg-[#0a1e35] rounded-2xl p-8 shadow-xl shadow-slate-900/20 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute right-0 bottom-0 w-40 h-40 bg-white/5 rounded-tl-full -mr-10 -mb-10 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10 text-white">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-[#CBA135] mb-6 border border-white/10 group-hover:rotate-6 transition-transform">
                                    <MapPin className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Kantor Pusat</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    Kunjungi kantor kami untuk konsultasi langsung dengan agen properti profesional.
                                </p>
                                <div className="space-y-4 text-sm">
                                    <p className="flex items-start gap-3">
                                        <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-[#CBA135]"></span>
                                        <span className="text-slate-300">Jl. Jendral Sudirman No. 123,<br />Jakarta Selatan, 12190</span>
                                    </p>
                                    <p className="flex items-center gap-3 pt-2 border-t border-white/10">
                                        <Clock className="w-4 h-4 text-[#CBA135]" />
                                        <span className="text-slate-300">Senin - Jumat, 09:00 - 18:00</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Right Side) */}
                    <div className="lg:col-span-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 h-full">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Kirim Pesan</h2>
                                    <p className="text-slate-500 text-sm">Kami akan membalas pesan Anda dalam waktu 24 jam.</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium text-[#123C69] bg-blue-50 px-4 py-2 rounded-full">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#123C69]"></span>
                                    </span>
                                    Online Support
                                </div>
                            </div>

                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2 group">
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider group-focus-within:text-[#123C69] transition-colors">Nama Lengkap</label>
                                        <Input
                                            placeholder="Masukkan nama lengkap"
                                            className="bg-slate-50 border-slate-200 h-14 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#123C69] transition-all text-base px-5"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider group-focus-within:text-[#123C69] transition-colors">Email Address</label>
                                        <Input
                                            type="email"
                                            placeholder="nama@email.com"
                                            className="bg-slate-50 border-slate-200 h-14 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#123C69] transition-all text-base px-5"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <Select
                                        label="Subjek"
                                        placeholder="Pilih topik pesan..."
                                        value={subject}
                                        onChange={setSubject}
                                        options={[
                                            { value: 'buy', label: 'Saya ingin membeli properti' },
                                            { value: 'sell', label: 'Saya ingin menjual properti' },
                                            { value: 'collaboration', label: 'Kerjasama / Partnership' },
                                            { value: 'other', label: 'Lainnya' }
                                        ]}
                                    />
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider group-focus-within:text-[#123C69] transition-colors">Pesan</label>
                                    <textarea
                                        className="w-full min-h-[200px] rounded-xl border border-slate-200 bg-slate-50 p-5 text-base focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#123C69] outline-none transition-all placeholder:text-slate-400 resize-none"
                                        placeholder="Tuliskan detail pesan Anda di sini..."
                                    ></textarea>
                                </div>

                                <div className="pt-4 flex items-center justify-end">
                                    <Button className="w-full md:w-auto h-14 px-10 text-base font-bold bg-[#123C69] hover:bg-[#0a2340] text-white rounded-xl shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all group">
                                        <span className="mr-2">Kirim Pesan Sekarang</span>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section (Full Width Bottom) */}
                <div className="mt-20 mb-10 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
                    <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="bg-slate-100 h-96 rounded-2xl overflow-hidden relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.28318428801!2d106.75620956461048!3d-6.229571329680327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1650352319234!5m2!1sid!2sid"
                                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>

                            {/* Overlay Card on Map */}
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 max-w-xs hidden md:block">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-[#123C69] rounded-lg flex items-center justify-center text-white">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold text-slate-900 text-sm">Kantor Utama</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Gedung Menara Unitin, Lt. 12<br />Jl. Jendral Sudirman, Jakarta
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
