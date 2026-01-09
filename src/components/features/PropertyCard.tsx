import { MapPin, Bed, Bath, Square, Star, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Property } from '../../utils/mockData';
import { formatIDR } from '../../utils/formatters';

interface PropertyCardProps {
    property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    return (
        <Card className="group h-full cursor-pointer hover:-translate-y-1 transition-all duration-500 border-none bg-white shadow-premium">
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute left-4 top-4">
                    <Badge className="bg-white/95 backdrop-blur-md text-[#123C69] border-none shadow-sm font-semibold tracking-wide px-3">{property.type}</Badge>
                </div>
                <div className="absolute right-4 top-4">
                    <div className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#123C69] backdrop-blur-md shadow-sm">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        {property.rating}
                    </div>
                </div>
            </div>
            <CardContent className="p-5">
                <div className="mb-2 flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#CBA135]" />
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider line-clamp-1">{property.location}</p>
                </div>
                <h3 className="mb-2 text-xl font-bold font-display text-[#123C69] line-clamp-2 min-h-[56px] leading-tight group-hover:text-[#CBA135] transition-colors">{property.title}</h3>
                {property.description ? (
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2 min-h-[40px]">
                        {property.description.length > 50
                            ? `${property.description.substring(0, 50)}....`
                            : property.description}
                    </p>
                ) : (
                    <div className="min-h-[40px] mb-4"></div>
                )}

                <div className="flex items-center gap-2 mb-4">
                    <img src={property.seller.avatar} alt={property.seller.name} className="w-6 h-6 rounded-full object-cover" />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-700">{property.seller.name}</span>
                            {property.seller.verified && (
                                <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />
                            )}
                        </div>
                        <span className="text-[10px] text-slate-400">Trusted Seller</span>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5" title="Kamar Tidur">
                            <Bed className="h-4 w-4 text-slate-400" />
                            <span className="font-medium">{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Kamar Mandi">
                            <Bath className="h-4 w-4 text-slate-400" />
                            <span className="font-medium">{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Luas Tanah">
                            <Square className="h-4 w-4 text-slate-400" />
                            <span className="font-medium">{property.area} m²</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-slate-50 bg-white p-5 pt-2">
                <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Mulai Dari</p>
                    <p className="text-xl font-bold text-[#CBA135] font-display">{formatIDR(property.price)}</p>
                </div>
                <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity border-[#123C69] hover:bg-[#123C69] hover:text-white">
                    Detail
                </Button>
            </CardFooter>
        </Card>
    );
};
