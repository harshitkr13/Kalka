import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoItem {
  name: string;
  category: string;
}

export interface LogoCloudProps {
  title?: string;
  logos?: LogoItem[];
  className?: string;
}

const defaultLogos: LogoItem[] = [
  { name: 'Apex Capital Advisors', category: 'Financial Advisory' },
  { name: 'Vanguard Realty Group', category: 'Real Estate' },
  { name: 'Meridian Health Network', category: 'Healthcare' },
  { name: 'Solaria Infrastructure', category: 'Clean Energy' },
  { name: 'Stratum Global Logistics', category: 'Supply Chain' },
  { name: 'Kalyan Hospitality', category: 'Luxury Travel' },
];

export const LogoCloud: React.FC<LogoCloudProps> = ({
  title = 'Sample Sector Practice Engagements [DEMO CLIENT EXAMPLES]',
  logos = defaultLogos,
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="p-4 border border-slate-200/80 bg-white rounded flex flex-col items-center justify-center min-h-[80px] hover:border-gold/50 transition-colors"
            >
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold uppercase tracking-wider mb-1">
                [DEMO CLIENT]
              </span>
              <span className="font-serif text-sm font-semibold text-navy text-center">
                {logo.name}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                {logo.category}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-6 italic">
          * Note: In accordance with data integrity guidelines (05_DATA_SOURCES), client partner marks will be installed upon formal client approval.
        </p>
      </div>
    </div>
  );
};
