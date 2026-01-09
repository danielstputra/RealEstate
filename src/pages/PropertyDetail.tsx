import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Share2, Heart, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Rating } from '../components/ui/Rating';
import { Card, CardContent } from '../components/ui/Card';
import { MOCK_PROPERTIES } from '../utils/mockData';
import { formatIDR } from '../utils/formatters';

export default function PropertyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    // In a real app, fetch by ID. For now, find in mock data or default to first.
    const property = MOCK_PROPERTIES.find(p => p.id === id) || MOCK_PROPERTIES[0];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Back Button */}
            <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
                <div className="container mx-auto px-4 py-4">
                    <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Kembali
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="h-[400px] w-full object-cover"
                            />
                        </div>

                        {/* Header Info */}
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900">{property.title}</h1>
                                    <p className="flex items-center text-slate-500 mt-2">
                                        <MapPin className="mr-1 h-4 w-4" />
                                        {property.location}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm"><Share2 className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="sm"><Heart className="h-4 w-4" /></Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Badge>{property.type}</Badge>
                                <Badge variant="secondary">SHM</Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-y border-slate-200 py-6">
                                <div className="text-center border-r border-slate-200">
                                    <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                                        <Bed className="h-5 w-5" />
                                        <span className="text-sm">Kamar Tidur</span>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900">{property.bedrooms}</p>
                                </div>
                                <div className="text-center border-r border-slate-200">
                                    <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                                        <Bath className="h-5 w-5" />
                                        <span className="text-sm">Kamar Mandi</span>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900">{property.bathrooms}</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                                        <Square className="h-5 w-5" />
                                        <span className="text-sm">Luas Tanah</span>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900">{property.area} m²</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Deskripsi</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Price Card */}
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <p className="text-sm text-slate-500 mb-1">Harga Mulai</p>
                                    <h2 className="text-3xl font-bold text-teal-600">{formatIDR(property.price)}</h2>
                                </div>
                                <Button className="w-full" size="lg">Hubungi Penjual</Button>
                                <Button variant="outline" className="w-full">Ajukan KPR</Button>
                            </CardContent>
                        </Card>

                        {/* Seller Profile */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-bold text-slate-900 mb-4">Informasi Penjual</h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <img
                                        src={property.seller.avatar}
                                        alt={property.seller.name}
                                        className="h-12 w-12 rounded-full bg-slate-200"
                                    />
                                    <div>
                                        <p className="font-bold text-slate-900">{property.seller.name}</p>
                                        <p className="text-sm text-slate-500">Agen Properti</p>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <Rating rating={property.rating} />
                                </div>
                                <Button variant="outline" className="w-full">Lihat Profil</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
