import React from 'react';
import { Users } from 'lucide-react';
import { SectionHeader } from '@/components/editorial/SectionHeader';

export const TeamSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Advisory Team"
          title="Advisory Leadership"
          description="Strategic communications counselors guiding high-stakes mandates."
        />

        <div className="p-10 sm:p-12 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center text-navy mx-auto">
            <Users className="w-6 h-6 text-gold-dark" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy">
            Leadership Information Coming Soon
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Advisory leadership and practice counselor profiles are currently being updated. For practice leads and consultations, please initiate an inquiry through our contact desk.
          </p>
        </div>
      </div>
    </section>
  );
};
