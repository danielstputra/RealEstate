import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RatingProps {
    rating: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    readonly?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
    rating,
    max = 5,
    size = 'md',
    // readonly = true // TODO: Implement readonly check
}) => {
    const sizes = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
    };

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(max)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        sizes[size],
                        i < Math.floor(rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-slate-200 text-slate-200'
                    )}
                />
            ))}
            <span className="ml-2 text-sm font-medium text-slate-600">
                {rating}
            </span>
        </div>
    );
};
