import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { awardsData } from '@/lib/content/awards';

export const AwardsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Recognition & Honors [SAMPLE ARCHIVE]"
          title="Industry Commendations for Strategic Excellence [SAMPLE]"
          description="Honored by peer organizations and industry bodies for benchmark excellence in corporate communication and crisis advisory."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awardsData.map((award) => (
            <div
              key={award.id}
              className="p-7 border border-slate-200 rounded bg-slate-50/40 space-y-4 hover:border-gold transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-gold/10 text-gold-dark text-[10px] font-bold uppercase tracking-wider">
                  [SAMPLE RECOGNITION]
                </span>
                <Award className="w-5 h-5 text-gold" />
              </div>

              <h3 className="font-serif text-lg font-semibold text-navy">
                {award.name}
              </h3>

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {award.organization}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                {award.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/awards" className="text-xs font-semibold uppercase tracking-wider text-navy hover:text-gold-dark inline-flex items-center gap-1 transition-colors">
            <span>View Full Honors & Accolades</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
