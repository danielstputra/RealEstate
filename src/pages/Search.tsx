import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PropertyCard } from '../components/features/PropertyCard';
import { MOCK_PROPERTIES } from '../utils/mockData';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const filteredProperties = MOCK_PROPERTIES.filter((property) => {
        const matchesSearch = property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType ? property.type === selectedType : true;
        return matchesSearch && matchesType;
    });

    const propertyTypes = ['Rumah', 'Apartemen', 'Ruko'];

    return (
        <div className="min-h-screen pb-20">
            {/* Search Header */}
            <div className="relative bg-blue-50/50 pt-10 pb-8 border-b border-slate-100 overflow-hidden">
                {/* Premium Grid Pattern (Subtle) */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#123C69 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                </div>

                {/* Soft ambient light */}
                <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-gradient-to-br from-blue-50/80 via-purple-50/20 to-transparent rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute top-1/2 -left-24 w-[300px] h-[300px] bg-[#CBA135]/5 rounded-full blur-[60px] pointer-events-none"></div>

                {/* Bottom Highlight Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#CBA135]/60 to-transparent shadow-[0_-2px_10px_rgba(203,161,53,0.3)]"></div>

                <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                    <h1 className="text-4xl font-display font-bold text-[#123C69] mb-8 text-center md:text-left">Cari Properti Impian</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <Input
                                placeholder="Cari lokasi, nama properti..."
                                className="pl-10 h-11"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            <Button
                                variant={selectedType === null ? 'primary' : 'outline'}
                                onClick={() => setSelectedType(null)}
                            >
                                Semua
                            </Button>
                            {propertyTypes.map(type => (
                                <Button
                                    key={type}
                                    variant={selectedType === type ? 'primary' : 'outline'}
                                    onClick={() => setSelectedType(type)}
                                >
                                    {type}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-slate-600">
                        Menampilkan <span className="font-bold text-slate-900">{filteredProperties.length}</span> properti
                    </p>
                </div>

                {filteredProperties.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                            <SearchIcon className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">Tidak ada properti ditemukan</h3>
                        <p className="text-slate-500">Coba ubah kata kunci pencarian atau filter anda.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
