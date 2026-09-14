import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IndustryCardProps } from '@/types';

export const IndustryCard: React.FC<IndustryCardProps & { className?: string }> = ({
  title,
  description,
  sectorTag,
  featured = false,
  href = '#',
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative p-7 bg-white border border-slate-200 rounded text-left transition-all duration-300',
        'hover:border-navy hover:shadow-elevated',
        featured && 'border-gold/60 bg-gold/[0.02]',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          {sectorTag}
        </span>
        {featured && (
          <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-dark">
            Key Practice
          </span>
        )}
      </div>

      <h3 className="font-serif text-xl font-semibold text-navy group-hover:text-gold-dark transition-colors mb-2.5">
        {title}
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed mb-5">
        {description}
      </p>

      <Link
        href={href}
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-navy group-hover:text-gold-dark transition-colors"
      >
        <span>Sector Overview</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};
