import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MOCK_PROPERTIES } from '../../utils/mockData';
import { formatIDR } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

export default function MyListings() {
    const navigate = useNavigate();
    // Simulate only showing current user's properties (using mock data for now)
    const [listings, setListings] = useState(MOCK_PROPERTIES.slice(0, 4));

    const handleDelete = (id: string) => {
        if (confirm('Apakah anda yakin ingin menghapus properti ini?')) {
            setListings(listings.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Properti Saya</h1>
                    <p className="text-slate-500">Kelola daftar properti yang anda jual atau sewakan.</p>
                </div>
                <Button onClick={() => navigate('/dashboard/create')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Properti
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-6 py-4 font-medium">Properti</th>
                            <th className="px-6 py-4 font-medium">Tipe</th>
                            <th className="px-6 py-4 font-medium">Harga</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Statistik</th>
                            <th className="px-6 py-4 font-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {listings.map((property) => (
                            <tr key={property.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="h-12 w-12 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-slate-900">{property.title}</p>
                                            <p className="text-xs text-slate-500">{property.location}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="outline">{property.type}</Badge>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-900">
                                    {formatIDR(property.price)}
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="success">Aktif</Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-slate-500">
                                        <Eye className="h-4 w-4" />
                                        <span>{Math.floor(Math.random() * 1000)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="sm">
                                            <Edit2 className="h-4 w-4 text-slate-500" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(property.id)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
