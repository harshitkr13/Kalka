import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CaseStudyCardProps } from '@/types';
import { Badge } from '@/components/ui/Badge';

export const CaseStudyCard: React.FC<CaseStudyCardProps & { className?: string }> = ({
  title,
  clientIndustry,
  challengeBrief,
  metricPlaceholder,
  metricLabel,
  href = '#',
  imageUrl,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col md:flex-row bg-white border border-slate-200 rounded overflow-hidden text-left transition-all duration-300',
        'hover:border-navy hover:shadow-premium',
        className
      )}
    >
      {/* Metric Callout Panel */}
      <div className="w-full md:w-5/12 bg-navy p-8 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="gold" size="sm">
              {clientIndustry}
            </Badge>
            <span className="text-[10px] px-2 py-0.5 rounded bg-navy-surface border border-navy-border text-slate-300 font-bold uppercase tracking-wider">
              [SAMPLE CASE STUDY]
            </span>
          </div>
          <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
            [DEMO METRIC]
          </p>
          <div className="font-serif text-4xl lg:text-5xl font-bold text-gold mt-2">
            {metricPlaceholder}
          </div>
          <p className="text-xs text-slate-300 mt-2 font-medium">
            {metricLabel}
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-navy-border relative z-10">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">
            [SAMPLE CASE STUDY ARCHIVE]
          </span>
        </div>
      </div>

      {/* Details Panel */}
      <div className="w-full md:w-7/12 p-8 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark block mb-2">
            Strategic Engagement
          </span>
          <h3 className="font-serif text-2xl font-semibold text-navy group-hover:text-gold-dark transition-colors mb-3">
            {title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {challengeBrief}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy group-hover:text-gold-dark transition-colors"
          >
            <span>Read Full Case Study</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
