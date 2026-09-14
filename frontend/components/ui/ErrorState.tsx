import React, { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  action?: ReactNode;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Load Content',
  message,
  onRetry,
  action,
  className,
}) => {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center p-10 text-center bg-status-error/5 border border-status-error/20 rounded',
        className
      )}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-status-error/10 text-status-error mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-navy">{title}</h3>
      <p className="text-sm text-slate-600 max-w-sm mt-1">{message}</p>
      <div className="mt-5 flex gap-3">
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Retry Request
          </Button>
        )}
        {action}
      </div>
    </div>
  );
};
