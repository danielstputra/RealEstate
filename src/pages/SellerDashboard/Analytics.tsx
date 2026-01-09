import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent } from '../../components/ui/Card';
import { ArrowUpRight, ArrowDownRight, Eye, MousePointerClick, MessageSquare } from 'lucide-react';

const data = [
    { name: 'Sen', views: 400, clicks: 240, messages: 24 },
    { name: 'Sel', views: 300, clicks: 139, messages: 18 },
    { name: 'Rab', views: 500, clicks: 280, messages: 30 },
    { name: 'Kam', views: 280, clicks: 200, messages: 15 },
    { name: 'Jum', views: 590, clicks: 380, messages: 45 },
    { name: 'Sab', views: 800, clicks: 500, messages: 60 },
    { name: 'Min', views: 700, clicks: 450, messages: 55 },
];

const StatCard = ({ title, value, detail, trend, icon: Icon }: any) => (
    <Card>
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <div className="rounded-full bg-teal-50 p-2 text-teal-600">
                    <Icon className="h-4 w-4" />
                </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-800">{value}</p>
                <div className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend === 'up' ? <ArrowUpRight className="mr-0.5 h-3 w-3" /> : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
                    {detail}
                </div>
            </div>
            <p className="mt-1 text-xs text-slate-400">vs minggu lalu</p>
        </CardContent>
    </Card>
);

export default function Analytics() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Statistik Penjualan</h1>
                <p className="text-slate-500">Pantau performa iklan properti anda minggu ini.</p>
            </div>

            {/* Key Stats */}
            <div className="grid gap-6 md:grid-cols-3">
                <StatCard
                    title="Total Dilihat"
                    value="3,570"
                    detail="+12%"
                    trend="up"
                    icon={Eye}
                />
                <StatCard
                    title="Total Klik"
                    value="2,189"
                    detail="+8%"
                    trend="up"
                    icon={MousePointerClick}
                />
                <StatCard
                    title="Pesan Masuk"
                    value="247"
                    detail="-5%"
                    trend="down"
                    icon={MessageSquare}
                />
            </div>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardContent className="p-6">
                        <h3 className="mb-6 text-lg font-bold text-slate-800">Tren Pengunjung</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="views" stroke="#0d9488" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <h3 className="mb-6 text-lg font-bold text-slate-800">Interaksi Mingguan</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                    <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="messages" fill="#0f766e" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="clicks" fill="#99f6e4" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
