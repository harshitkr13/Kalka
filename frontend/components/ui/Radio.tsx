'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  label?: string;
  name: string;
  options: RadioOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  selectedValue,
  onChange,
  error,
  className,
}) => {
  return (
    <div className={cn('space-y-2 text-left', className)}>
      {label && (
        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          {label}
        </span>
      )}
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                'flex items-start gap-3 p-3 border rounded cursor-pointer transition-colors',
                isSelected
                  ? 'border-gold bg-gold/5 text-slate-900'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange?.(option.value)}
                className="h-4 w-4 mt-0.5 text-navy border-slate-300 focus:ring-gold focus:ring-2 cursor-pointer"
              />
              <div>
                <span className="block text-sm font-medium">{option.label}</span>
                {option.description && (
                  <span className="block text-xs text-slate-500 mt-0.5">{option.description}</span>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {error && <p className="text-xs text-status-error font-medium">{error}</p>}
    </div>
  );
};
