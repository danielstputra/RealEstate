import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Github, Chrome, Home } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useLanguage();

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 lg:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row h-fit max-h-[90vh] z-10"
                    >
                        {/* Left Side: Visual/Brand (Visible on MD+) */}
                        <div className="hidden md:flex md:w-[40%] bg-[#0a1e35] relative overflow-hidden flex-col justify-end p-8 border-r border-white/5">
                            <div className="absolute top-0 left-0 w-full h-full opacity-30">
                                <img
                                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"
                                    className="w-full h-full object-cover"
                                    alt="Auth"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e35] via-transparent to-transparent" />
                            </div>

                            <div className="relative z-10 font-display">
                                <div className="w-10 h-10 bg-[#CBA135] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#CBA135]/20">
                                    <Home className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 leading-tight">{t.auth.welcome}</h3>
                                <p className="text-blue-100/60 text-xs">{t.auth.welcomeDesc}</p>
                            </div>

                            {/* Decorative blobs */}
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#CBA135]/10 rounded-full blur-3xl" />
                        </div>

                        {/* Right Side: Form */}
                        <div className="flex-1 p-6 md:p-10 bg-white relative overflow-y-auto">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="mb-6">
                                <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit mb-6">
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-white text-[#123C69] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        {t.nav.login}
                                    </button>
                                    <button
                                        onClick={() => setIsLogin(false)}
                                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-white text-[#123C69] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        {t.nav.register}
                                    </button>
                                </div>
                                <h2 className="text-2xl font-bold text-[#123C69] mb-1 font-display">
                                    {isLogin ? t.auth.loginTitle : t.auth.registerTitle}
                                </h2>
                                <p className="text-slate-500 text-xs font-medium">
                                    {isLogin ? t.auth.loginSubtitle : t.auth.registerSubtitle}
                                </p>
                            </div>

                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                {!isLogin && (
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 ml-1">{t.auth.fullName}</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#123C69] transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123C69]/10 focus:border-[#123C69] transition-all text-sm text-slate-800 placeholder:text-slate-400 font-medium"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 ml-1 text-sm">{t.auth.email}</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#123C69] transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="nama@email.com"
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123C69]/10 focus:border-[#123C69] transition-all text-sm text-slate-800 placeholder:text-slate-400 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-xs font-bold text-slate-700">{t.auth.password}</label>
                                        {isLogin && <button className="text-[10px] font-bold text-[#CBA135] hover:underline uppercase tracking-tight">{t.auth.forgotPassword}</button>}
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#123C69] transition-colors" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#123C69]/10 focus:border-[#123C69] transition-all text-sm text-slate-800 placeholder:text-slate-400 font-medium"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <Button className="w-full bg-[#123C69] hover:bg-[#0a1e35] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all mt-6 text-sm">
                                    {isLogin ? t.auth.loginBtn : t.auth.registerBtn}
                                </Button>

                                <div className="relative py-4">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                                    <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-3 text-slate-400 font-bold tracking-[0.2em]">{t.auth.orWith}</span></div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-600 text-[11px] active:scale-[0.98]">
                                        <Chrome className="h-4 w-4 text-[#ea4335]" /> Google
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-600 text-[11px] active:scale-[0.98]">
                                        <Github className="h-4 w-4 text-slate-800" /> Github
                                    </button>
                                </div>
                            </form>

                            <p className="text-center text-xs text-slate-500 mt-8">
                                {isLogin ? t.auth.noAccount : t.auth.hasAccount} {' '}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-[#CBA135] font-bold hover:underline"
                                >
                                    {isLogin ? t.auth.registerHere : t.auth.loginHere}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
