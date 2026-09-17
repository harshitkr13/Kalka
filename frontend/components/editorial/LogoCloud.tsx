import React from 'react';
import { cn } from '@/lib/utils';
import { associatedClients } from '@/lib/content/clients';

export interface LogoItem {
  name: string;
  category?: string;
}

export interface LogoCloudProps {
  title?: string;
  className?: string;
}

export const LogoCloud: React.FC<LogoCloudProps> = ({
  title = 'Associated Brands & Organizations',
  className,
}) => {
  return (
    <div className={cn('py-12 border-y border-slate-200 bg-slate-50/60', className)}>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <p className="text-xs font-semibold tracking-wider text-slate-500 mb-8">
            {title}
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {associatedClients.map((client, idx) => (
            <div
              key={idx}
              className="p-5 border border-slate-200/80 bg-white rounded-lg flex flex-col items-center justify-center min-h-[90px] shadow-sm hover:border-gold/50 transition-colors"
            >
              <span className="font-serif text-sm sm:text-base font-bold text-navy text-center">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
