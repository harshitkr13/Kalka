'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterBarProps {
  options: FilterOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  options,
  selectedId,
  onSelect,
  className,
}) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {options.map((opt) => {
        const isSelected = selectedId === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all select-none',
              isSelected
                ? 'bg-navy text-white shadow-subtle'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            )}
          >
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span
                className={cn(
                  'ml-1.5 text-[10px] px-1 rounded-full',
                  isSelected ? 'bg-navy-surface text-gold' : 'bg-slate-200 text-slate-600'
                )}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
