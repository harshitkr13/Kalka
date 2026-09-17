import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IndustryCardProps } from '@/types';

const industryImageMap: Record<string, string> = {
  'real-estate': '/assets/industries/real-estate.webp',
  'infrastructure': '/assets/industries/infrastructure.webp',
  'corporate-organizations': '/assets/industries/corporate.webp',
  'startups': '/assets/industries/startups.webp',
  'hospitality': '/assets/industries/hospitality.webp',
  'education': '/assets/industries/education.webp',
  'retail': '/assets/industries/retail.webp',
  'healthcare': '/assets/industries/healthcare.webp',
  'public-affairs': '/assets/industries/public-affairs.webp',
  'professional-services': '/assets/industries/professional-services.webp',
};

export const IndustryCard: React.FC<IndustryCardProps & { className?: string }> = ({
  title,
  description,
  sectorTag,
  featured = false,
  href = '#',
  imageSrc,
  className,
}) => {
  const resolvedImage =
    imageSrc ||
    (href ? Object.entries(industryImageMap).find(([slug]) => href.includes(slug))?.[1] : undefined);

  return (
    <div
      className={cn(
        'group relative bg-white border border-slate-200 rounded text-left transition-all duration-300 overflow-hidden flex flex-col',
        'hover:border-navy hover:shadow-elevated',
        featured && 'border-gold/60 bg-gold/[0.02]',
        className
      )}
    >
      {resolvedImage && (
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <Image
            src={resolvedImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
      )}

      <div className="p-7 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
            {sectorTag}
          </span>
        </div>

        <h3 className="font-serif text-xl font-semibold text-navy group-hover:text-gold-dark transition-colors mb-2.5">
          {title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1 line-clamp-3 min-h-[4.5rem]">
          {description}
        </p>

        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy group-hover:text-gold-dark transition-colors mt-auto"
        >
          <span>Sector Overview</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
