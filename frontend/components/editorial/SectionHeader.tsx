import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  overline,
  title,
  description,
  align = 'center',
  className,
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12 md:mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {overline && (
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block mb-3">
          {overline}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy tracking-tight leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
