
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    label?: string;
    placeholder?: string;
    options: Option[];
    value?: string;
    onChange: (value: string) => void;
    className?: string;
}

export const Select: React.FC<SelectProps> = ({
    label,
    placeholder = 'Select an option',
    options,
    value,
    onChange,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            {label && (
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 group-focus-within:text-[#123C69] transition-colors">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-14 px-5 flex items-center justify-between bg-slate-50 border rounded-xl text-left transition-all duration-200 outline-none
                    ${isOpen
                        ? 'border-[#123C69] ring-2 ring-blue-100 bg-white'
                        : 'border-slate-200 hover:border-slate-300'
                    }
                `}
            >
                <span className={`block truncate ${!selectedOption ? 'text-slate-400' : 'text-slate-900 font-medium'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#123C69]' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-60 overflow-auto py-1 custom-scrollbar">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-5 py-3 flex items-center justify-between text-left transition-colors
                                    ${value === option.value
                                        ? 'bg-blue-50 text-[#123C69] font-medium'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }
                                `}
                            >
                                <span>{option.label}</span>
                                {value === option.value && (
                                    <Check className="w-4 h-4 text-[#123C69]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
