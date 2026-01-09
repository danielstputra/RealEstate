export interface Property {
    id: string;
    title: string;
    description?: string;
    price: number;
    location: string;
    type: 'Rumah' | 'Apartemen' | 'Ruko';
    bedrooms: number;
    bathrooms: number;
    area: number; // m2
    image: string;
    seller: {
        name: string;
        avatar: string;
        verified: boolean;
    };
    rating: number;
}

export const MOCK_PROPERTIES: Property[] = [
    {
        id: '1',
        title: 'Rumah Modern Minimalis di BSD City',
        description: 'Hunian nyaman dengan desain minimalis modern, lingkungan asri, dan keamanan 24 jam. Sangat cocok untuk keluarga muda yang mencari ketenangan.',
        price: 2500000000,
        location: 'BSD City, Tangerang Selatan',
        type: 'Rumah',
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
        seller: {
            name: 'Budi Santoso',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
            verified: true,
        },
        rating: 4.8,
    },
    {
        id: '2',
        title: 'Apartemen Mewah View Kota',
        description: 'Unit apartemen eksklusif dengan pemandangan kota yang menakjubkan. Fasilitas lengkap termasuk kolam renang, gym, dan akses langsung ke mall.',
        price: 1800000000,
        location: 'Sudirman, Jakarta Pusat',
        type: 'Apartemen',
        bedrooms: 2,
        bathrooms: 1,
        area: 65,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
        seller: {
            name: 'Sarah Wijaya',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            verified: true,
        },
        rating: 4.9,
    },
    {
        id: '3',
        title: 'Ruko Strategis Pinggir Jalan Utama',
        description: 'Ruko 3 lantai di lokasi sangat strategis, pinggir jalan raya utama dengan trafik tinggi. Potensi bisnis yang sangat menjanjikan.',
        price: 3500000000,
        location: 'Kelapa Gading, Jakarta Utara',
        type: 'Ruko',
        bedrooms: 2,
        bathrooms: 2,
        area: 150,
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        seller: {
            name: 'Properti Indo',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Indo',
            verified: true,
        },
        rating: 4.5,
    },
    {
        id: '4',
        title: 'Rumah Asri Nuansa Bali',
        description: 'Rumah dengan konsep villa Bali yang menenangkan. Dilengkapi dengan taman tropis dan kolam ikan. Serasa liburan setiap hari.',
        price: 4200000000,
        location: 'Ubud, Gianyar',
        type: 'Rumah',
        bedrooms: 4,
        bathrooms: 3,
        area: 250,
        image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800',
        seller: {
            name: 'Made Artha',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Made',
            verified: true,
        },
        rating: 5.0,
    },
    {
        id: '5',
        title: 'Apartemen Studio Full Furnished',
        description: 'Studio apartemen siap huni, full furnished dengan interior modern. Lokasi dekat kampus, sangat cocok untuk investasi sewa mahasiswa.',
        price: 650000000,
        location: 'Depok, Jawa Barat',
        type: 'Apartemen',
        bedrooms: 1,
        bathrooms: 1,
        area: 32,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
        seller: {
            name: 'Rina Marlina',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rina',
            verified: false,
        },
        rating: 4.6,
    },
    {
        id: '6',
        title: 'Rumah Keluarga Halaman Luas',
        price: 1200000000,
        location: 'Bogor, Jawa Barat',
        type: 'Rumah',
        bedrooms: 3,
        bathrooms: 2,
        area: 100,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
        seller: {
            name: 'Ahmad Dani',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
            verified: true,
        },
        rating: 4.7,
    },
];
