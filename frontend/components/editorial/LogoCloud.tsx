import React from 'react';
import { cn } from '@/lib/utils';
import { associatedClients } from '@/lib/content/clients';

export interface LogoItem {
  name: string;
  category?: string;
  approvalStatus?: string;
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
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-8">
            {title}
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {associatedClients.map((client, idx) => (
            <div
              key={idx}
              className="p-5 border border-slate-200/80 bg-white rounded-lg flex flex-col items-center justify-center min-h-[90px] shadow-sm hover:border-gold/50 transition-colors"
            >
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 border border-amber-500/20 font-semibold uppercase tracking-wider mb-2">
                PENDING APPROVAL
              </span>
              <span className="font-serif text-sm sm:text-base font-bold text-navy text-center">
                {client.name}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-6 italic">
          * Note: Public display marked as Pending Approval in accordance with firm advisory governance.
        </p>
      </div>
    </div>
  );
};
