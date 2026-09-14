import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className,
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
  };

  return (
    <div
      aria-hidden="true"
      className={cn('bg-slate-200 animate-pulse', variantStyles[variant], className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('p-6 bg-white border border-slate-200 rounded space-y-4', className)}>
      <Skeleton variant="text" className="w-1/4 h-3 bg-gold/20" />
      <Skeleton variant="text" className="w-3/4 h-6" />
      <div className="space-y-2 pt-2">
        <Skeleton variant="text" className="w-full h-3" />
        <Skeleton variant="text" className="w-5/6 h-3" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton variant="rectangular" className="w-16 h-5 rounded" />
        <Skeleton variant="rectangular" className="w-16 h-5 rounded" />
      </div>
    </div>
  );
};
