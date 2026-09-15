import React from 'react';

export const AdminLoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Welcome Banner Skeleton */}
      <div className="p-8 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-4">
        <div className="h-4 w-36 bg-slate-800 rounded-full" />
        <div className="h-8 w-72 bg-slate-800 rounded-lg" />
        <div className="h-4 w-96 bg-slate-800/60 rounded" />
      </div>

      {/* Status Cards Grid Skeleton */}
      <div>
        <div className="h-4 w-40 bg-slate-800/80 rounded mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="h-3 w-20 bg-slate-800 rounded" />
                <div className="w-6 h-6 bg-slate-800 rounded-full" />
              </div>
              <div className="h-6 w-28 bg-slate-800 rounded" />
              <div className="h-3 w-36 bg-slate-800/50 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Module Overview Skeleton */}
      <div>
        <div className="h-4 w-48 bg-slate-800/80 rounded mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/60 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 bg-slate-800 rounded" />
                <div className="h-4 w-16 bg-slate-800/60 rounded-full" />
              </div>
              <div className="h-3 w-full bg-slate-800/50 rounded" />
              <div className="h-3 w-3/4 bg-slate-800/40 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
