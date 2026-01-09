import React, { useState } from 'react';
import { Upload, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

export default function CreateListing() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Kembali
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Tambah Properti Baru</h1>
                    <p className="text-slate-500">Isi detail properti yang ingin anda jual.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Main Info */}
                    <Card className="md:col-span-2">
                        <CardContent className="space-y-4 p-6">
                            <h3 className="text-lg font-semibold text-slate-900">Informasi Utama</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Input label="Judul Iklan" placeholder="Contoh: Rumah Minimalis Modern di Pusat Kota" className="md:col-span-2" required />
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Tipe Properti</label>
                                    <select className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                        <option>Rumah</option>
                                        <option>Apartemen</option>
                                        <option>Ruko</option>
                                        <option>Tanah</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Sertifikat</label>
                                    <select className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                        <option>SHM - Sertifikat Hak Milik</option>
                                        <option>HGB - Hak Guna Bangunan</option>
                                    </select>
                                </div>
                                <Input label="Harga (IDR)" type="number" placeholder="0" required />
                                <Input label="Luas Tanah (m²)" type="number" placeholder="0" required />
                                <Input label="Luas Bangunan (m²)" type="number" placeholder="0" required />
                                <Input label="Kamar Tidur" type="number" placeholder="0" />
                                <Input label="Kamar Mandi" type="number" placeholder="0" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location & Description */}
                    <Card className="md:col-span-2">
                        <CardContent className="space-y-4 p-6">
                            <h3 className="text-lg font-semibold text-slate-900">Lokasi & Deskripsi</h3>
                            <Input label="Alamat Lengkap" placeholder="Nama jalan, nomor rumah, RT/RW" required />
                            <div className="grid gap-4 md:grid-cols-2">
                                <Input label="Provinsi" placeholder="Pilih Provinsi" />
                                <Input label="Kota/Kabupaten" placeholder="Pilih Kota" />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Deskripsi Lengkap</label>
                                <textarea
                                    rows={6}
                                    className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Jelaskan fasilitas, keunggulan, dan detail lainnya..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Media */}
                    <Card className="md:col-span-2">
                        <CardContent className="space-y-4 p-6">
                            <h3 className="text-lg font-semibold text-slate-900">Foto & Media</h3>
                            <div className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-12 transition-colors hover:bg-slate-100">
                                <div className="text-center">
                                    <Upload className="mx-auto h-12 w-12 text-slate-400" />
                                    <p className="mt-4 text-sm font-medium text-slate-900">Klik untuk upload atau drag and drop</p>
                                    <p className="mt-1 text-xs text-slate-500">PNG, JPG, up to 10MB</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>Batal</Button>
                    <Button type="submit" isLoading={isLoading}>Publikasikan Iklan</Button>
                </div>
            </form>
        </div>
    );
}
