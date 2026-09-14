import React, { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center bg-slate-50/50 border border-dashed border-slate-300 rounded',
        className
      )}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
        {icon || <Inbox className="w-6 h-6" />}
      </div>
      <h3 className="font-serif text-lg font-semibold text-navy">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 max-w-sm mt-1">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};
