import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoadingProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  label = 'Loading...',
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={cn('flex items-center justify-center gap-2.5 p-4 text-slate-600', className)}>
      <Loader2 className={cn('animate-spin text-gold', sizeClasses[size])} />
      {label && <span className="text-xs uppercase tracking-wider font-medium">{label}</span>}
    </div>
  );
};
