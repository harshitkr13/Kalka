import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlogCardProps } from '@/types';
import { Badge } from '@/components/ui/Badge';

export const BlogCard: React.FC<BlogCardProps & { className?: string }> = ({
  title,
  subtitle,
  category,
  datePlaceholder,
  readTime,
  href = '#',
  imageUrl,
  className,
}) => {
  return (
    <article
      className={cn(
        'group flex flex-col bg-white border border-slate-200 rounded overflow-hidden text-left transition-all duration-300',
        'hover:border-slate-400 hover:shadow-elevated',
        className
      )}
    >
      {/* Visual / Image Slot */}
      <div className="relative h-48 bg-slate-100 overflow-hidden flex items-center justify-center border-b border-slate-100">
        {imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="text-center p-6 select-none">
            <span className="text-xs font-serif text-slate-400 tracking-wider uppercase block">
              Editorial Perspective
            </span>
            <span className="text-xs text-slate-400 mt-1 block">
              Kalka Strategic Intelligence
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="gold" size="sm">{category}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {datePlaceholder}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {readTime}
            </span>
          </div>

          <h3 className="font-serif text-lg font-semibold text-navy group-hover:text-gold-dark transition-colors line-clamp-2 mb-2">
            {title}
          </h3>

          {subtitle && (
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
              {subtitle}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-navy group-hover:text-gold-dark transition-colors"
          >
            <span>Read Article</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
