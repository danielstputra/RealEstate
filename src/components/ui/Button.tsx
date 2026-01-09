import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        const variants = {
            primary: 'bg-[#123C69] text-white hover:bg-[#0f2a50] active:bg-[#0a1e35] shadow-lg shadow-blue-900/10 tracking-wide',
            secondary: 'bg-white text-[#123C69] hover:bg-slate-50 active:bg-slate-100 border border-slate-200 shadow-sm',
            outline: 'border border-[#123C69] bg-transparent text-[#123C69] hover:bg-blue-50',
            ghost: 'bg-transparent text-slate-700 hover:bg-slate-50 hover:text-[#123C69]',
            danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-md shadow-rose-500/20',
        };

        const sizes = {
            sm: 'h-9 px-4 text-xs font-semibold uppercase tracking-wider',
            md: 'h-11 px-6 text-sm font-semibold',
            lg: 'h-14 px-8 text-base font-bold',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#123C69] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none hover:-translate-y-0.5 active:translate-y-0',
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
