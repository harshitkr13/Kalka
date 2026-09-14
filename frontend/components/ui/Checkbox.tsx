'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  helperText?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  helperText,
  error,
  className,
  id,
  checked,
  ...props
}, ref) => {
  const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex items-start gap-3">
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          checked={checked}
          className={cn(
            'peer h-4 w-4 shrink-0 rounded border border-slate-300 bg-white text-navy focus:ring-2 focus:ring-gold focus:outline-none transition-colors cursor-pointer',
            'checked:bg-navy checked:border-navy',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-status-error',
            className
          )}
          {...props}
        />
        <Check className="pointer-events-none absolute w-3 h-3 text-white hidden peer-checked:block" />
      </div>
      <div className="text-left select-none">
        <label htmlFor={checkboxId} className="text-sm font-medium text-slate-800 cursor-pointer">
          {label}
        </label>
        {helperText && <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>}
        {error && <p className="text-xs text-status-error font-medium mt-0.5">{error}</p>}
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
