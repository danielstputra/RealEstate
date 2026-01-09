import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'primary', ...props }, ref) => {
        const variants = {
            primary: 'bg-teal-100 text-teal-800',
            secondary: 'bg-slate-100 text-slate-800',
            outline: 'border border-slate-200 text-slate-800',
            danger: 'bg-red-100 text-red-800',
            success: 'bg-green-100 text-green-800',
        };

        return (
            <span
                ref={ref}
                className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    variants[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Badge.displayName = 'Badge';
