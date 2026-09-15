import React from 'react';
import { Radio } from 'lucide-react';
import { SectionHeader } from '@/components/editorial/SectionHeader';

export const MediaCoverage: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200 text-left">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Media & Press"
          title="Media Coverage & Press Mentions"
          description="Perspectives, commentary, and media features across publications."
        />

        <div className="p-10 sm:p-12 rounded-xl bg-white border border-slate-200 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center text-navy mx-auto">
            <Radio className="w-6 h-6 text-gold-dark" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy">
            Media Coverage Information Coming Soon
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Verified media features, press mentions, and commentary archives are currently being compiled. For press inquiries, contact{' '}
            <a href="mailto:djdurgesh8@gmail.com" className="text-navy font-semibold underline">
              djdurgesh8@gmail.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};
