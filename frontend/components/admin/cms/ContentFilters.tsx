'use client';

import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export interface ContentFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
  extraFilterLabel?: string;
  extraFilterValue?: string;
  extraFilterOptions?: { label: string; value: string }[];
  onExtraFilterChange?: (value: string) => void;
  onReset?: () => void;
}

export const ContentFilters: React.FC<ContentFiltersProps> = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  extraFilterLabel,
  extraFilterValue,
  extraFilterOptions,
  onExtraFilterChange,
  onReset,
}) => {
  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Published', value: 'published' },
    { label: 'Draft', value: 'draft' },
    { label: 'Archived', value: 'archived' },
  ];

  const hasActiveFilters = Boolean(
    search.trim() ||
      (status && status !== 'all') ||
      (extraFilterValue && extraFilterValue !== 'all')
  );

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-6">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, name, or slug..."
          className="w-full pl-10 pr-9 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Extra Filter (e.g. Category or Industry) */}
        {extraFilterOptions && onExtraFilterChange && (
          <select
            value={extraFilterValue || 'all'}
            onChange={(e) => onExtraFilterChange(e.target.value)}
            className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
          >
            <option value="all">All {extraFilterLabel || 'Categories'}</option>
            {extraFilterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Reset Button */}
        {hasActiveFilters && onReset && (
          <button
            onClick={onReset}
            className="px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};
