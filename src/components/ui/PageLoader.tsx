import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800); // Simulate loading duration

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-gradient-to-r from-[#CBA135] via-[#E6C97D] to-[#CBA135] shadow-[0_0_15px_rgba(203,161,53,0.5)]"
                />
            )}
        </AnimatePresence>
    );
}
