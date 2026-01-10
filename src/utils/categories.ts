import { Home, Building2, Warehouse, Map } from 'lucide-react';

export const CATEGORIES = [
    {
        id: 'rumah',
        label: 'Rumah',
        icon: Home,
        link: '/search?type=rumah',
        description: 'Hunian nyaman untuk keluarga'
    },
    {
        id: 'ruko',
        label: 'Ruko',
        icon: Building2,
        link: '/search?type=ruko',
        description: 'Tempat usaha strategis'
    },
    {
        id: 'gudang',
        label: 'Gudang',
        icon: Warehouse,
        link: '/search?type=gudang',
        description: 'Penyimpanan & logistik'
    },
    {
        id: 'kavling',
        label: 'Kavling',
        icon: Map,
        link: '/search?type=kavling',
        description: 'Tanah siap bangun'
    }
];
