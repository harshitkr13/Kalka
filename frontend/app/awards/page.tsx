import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { awardsData } from '@/lib/content/awards';
import { FinalCta } from '@/sections/home/FinalCta';
import { Award, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Awards & Industry Commendations | Kalka Co.',
  description: 'Review formal honors, peer commendations, and industry recognitions bestowed on Kalka Co.',
};

export default function AwardsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              Honors & Accolades [SAMPLE RECOGNITIONS]
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Industry Commendations for Strategic Advisory Excellence
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Illustrative recognitions by corporate communications councils and editorial bodies for reputation defense and narrative architecture.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Accolade Archive [SAMPLE ARCHIVE]"
              title="Demonstration Accolades & Practice Recognition [SAMPLE RECOGNITIONS]"
              description="A sample record of honors evaluating campaign impact, crisis containment velocity, and thought leadership influence."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {awardsData.map((award) => (
                <div
                  key={award.id}
                  className="p-8 border border-slate-200 rounded bg-slate-50/40 space-y-4 hover:border-gold transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-gold/10 text-gold-dark text-[10px] font-bold uppercase tracking-wider">
                      [SAMPLE RECOGNITION]
                    </span>
                    <Award className="w-6 h-6 text-gold" />
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-navy">
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

            <div className="p-6 bg-slate-50 border border-slate-200 rounded text-center text-xs text-slate-500">
              * Note: Sample recognitions demonstrated in adherence to strict data verification rules (05_DATA_SOURCES).
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
