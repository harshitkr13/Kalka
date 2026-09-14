import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { clientCategories } from '@/lib/content/clients';
import { FinalCta } from '@/sections/home/FinalCta';
import { ShieldCheck, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Client Sectors & Portfolio | Kalka Co. Media Consultancy',
  description: 'Learn about the corporate sectors, institutional asset sponsors, and market pioneers advised by Kalka Co.',
};

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              Client Portfolio
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Trusted Advisor to Market Leaders Across Critical Sectors
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              We operate under mutual non-disclosure and strict executive confidentiality, stewarding narrative governance for institutional sponsors.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Sectors Advised"
              title="Institutional Partnerships Across Key Economic Domains"
              description="A breakdown of client categories where Kalka Co. maintains continuous reputation and strategic media advisory."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {clientCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-8 border border-slate-200 rounded bg-slate-50/40 space-y-4 hover:border-gold transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                      {cat.clientCountPlaceholder}
                    </span>
                    <Building2 className="w-5 h-5 text-slate-400" />
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-navy">
                    {cat.sector}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-4 border-t border-slate-200">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Representative Mandates:
                    </span>
                    <span className="text-xs text-navy font-medium">
                      {cat.representativeFocus}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded text-center text-xs text-slate-500">
              * Note: In compliance with data integrity policies (05_DATA_SOURCES), client marks and formal credentials are maintained under NDA and demonstrated as sector practice groupings during active development.
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
