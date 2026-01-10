import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { motion, AnimatePresence } from 'framer-motion';

export const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased">
            <Navbar />
            <main className="flex-1 pt-20 md:pt-32">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut"
                        }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

