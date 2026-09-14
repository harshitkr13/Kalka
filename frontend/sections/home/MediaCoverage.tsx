import React from 'react';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { mediaMentionsData } from '@/lib/content/mediaMentions';

export const MediaCoverage: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200 text-left">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Media Mentions & Features"
          title="Shaping the Industry Discourse Across Premier Publications"
          description="Our perspective and strategic counsel cited across recognized business and financial periodicals."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mediaMentionsData.map((item) => (
            <div
              key={item.id}
              className="p-7 bg-white border border-slate-200 rounded shadow-subtle flex flex-col justify-between space-y-6 hover:border-gold transition-colors"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-gold-dark/60" />
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{item.quoteExcerpt}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-navy block font-serif">
                  {item.publication}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {item.headline} • {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/media-mentions" className="text-xs font-semibold uppercase tracking-wider text-navy hover:text-gold-dark inline-flex items-center gap-1 transition-colors">
            <span>View All Media Features</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
