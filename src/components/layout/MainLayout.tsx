import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from '../common/WhatsAppButton';

export const MainLayout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};
