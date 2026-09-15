'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render: (item: T) => React.ReactNode;
}

export interface ContentTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  page?: number;
  totalPages?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}

export function ContentTable<T extends { _id?: string; id?: string }>({
  columns,
  data,
  loading = false,
  emptyTitle = 'No content found',
  emptyDescription = 'There are no items matching your criteria.',
  emptyAction,
  page = 1,
  totalPages = 1,
  total = 0,
  onPageChange,
}: ContentTableProps<T>) {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="divide-y divide-slate-800/80">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between animate-pulse">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-800 rounded w-1/3" />
                <div className="h-3 bg-slate-800/60 rounded w-1/4" />
              </div>
              <div className="h-6 w-20 bg-slate-800 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-500 mx-auto mb-4">
          <Inbox className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-base font-semibold text-slate-200 mb-1">
          {emptyTitle}
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
          {emptyDescription}
        </p>
        {emptyAction && <div>{emptyAction}</div>}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] font-mono uppercase tracking-widest text-slate-400">
              {columns.map((col) => (
                <th key={col.key} className={`px-4 sm:px-6 py-3.5 font-semibold ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
            {data.map((item, index) => {
              const key = item._id || item.id || String(index);
              return (
                <tr
                  key={key}
                  className="hover:bg-slate-800/30 transition-colors group"
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 sm:px-6 py-4 ${col.className || ''}`}>
                      {col.render(item)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && onPageChange && (
        <div className="px-4 sm:px-6 py-3.5 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px]">
            Showing page <span className="text-white font-medium">{page}</span> of{' '}
            <span className="text-white font-medium">{totalPages}</span> ({total} total)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
