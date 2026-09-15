import React from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { Button } from '@/components/ui/Button';

export const SelectedWork: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Case Studies"
          title="Case Studies & Impact"
          description="Detailed portfolio examinations of strategic narrative alignment and public communications."
        />

        <div className="p-10 sm:p-12 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center text-navy mx-auto">
            <Briefcase className="w-6 h-6 text-gold-dark" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy">
            Case Studies Coming Soon
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our portfolio of advisory engagements and campaign dossiers is currently being prepared for publication. For specific practice inquiries or credential briefings, please initiate a direct conversation.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button variant="gold" size="md">
                Initiate Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
