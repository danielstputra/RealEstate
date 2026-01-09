import { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, MessageSquare, BarChart3, Home, Menu, X, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

export const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Properti Saya', href: '/dashboard' },
        { icon: PlusCircle, label: 'Tambah Properti', href: '/dashboard/create' },
        { icon: MessageSquare, label: 'Pesan', href: '/dashboard/messages' },
        { icon: BarChart3, label: 'Statistik', href: '/dashboard/analytics' },
    ];

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform duration-200 md:static md:translate-x-0',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
                    <Link to="/" className="flex items-center gap-2 text-lg font-bold text-teal-600">
                        <Home className="h-5 w-5" />
                        <span>UNITIN</span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden">
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                <div className="flex flex-col justify-between h-[calc(100vh-4rem)] p-4">
                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                end={item.href === '/dashboard'}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-teal-50 text-teal-700'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    )
                                }
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="border-t border-slate-200 pt-4">
                        <div className="mb-4 px-3">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                                    AD
                                </div>
                                <div className="overflow-hidden">
                                    <p className="truncate text-sm font-medium text-slate-700">Agen Properti</p>
                                    <p className="truncate text-xs text-slate-500">agen@example.com</p>
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
                            <LogOut className="mr-2 h-4 w-4" />
                            Keluar
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 md:hidden">
                    <button
                        className="text-slate-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="ml-4 text-lg font-semibold text-slate-800">Dashboard</span>
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
