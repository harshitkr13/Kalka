import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ServiceCardProps } from '@/types';
import { Badge } from '@/components/ui/Badge';

export const ServiceCard: React.FC<ServiceCardProps & { className?: string }> = ({
  title,
  category,
  description,
  capabilities = [],
  href = '#',
  badge,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between p-7 bg-white border border-slate-200 rounded text-left transition-all duration-300',
        'hover:border-gold/80 hover:shadow-elevated hover:-translate-y-1',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-gold-dark">
            {category}
          </span>
          {badge && <Badge variant="gold" size="sm">{badge}</Badge>}
        </div>

        <h3 className="font-serif text-xl font-semibold text-navy group-hover:text-gold-dark transition-colors mb-3">
          {title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {description}
        </p>

        {capabilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {capabilities.map((cap) => (
              <span
                key={cap}
                className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-600 font-medium"
              >
                {cap}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy group-hover:text-gold-dark transition-colors"
        >
          <span>Explore Service</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
};
