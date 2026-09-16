import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { Award } from 'lucide-react';
import { FinalCta } from '@/sections/home/FinalCta';
import { getPublicAwards } from '@/lib/api/publicContent';

export const metadata: Metadata = {
  title: 'Awards & Recognition | Kalka Co. Media Consultancy',
  description: 'Industry commendations and institutional recognition for Kalka Co. Media Consultancy.',
};

export default async function AwardsPage() {
  const awards = await getPublicAwards();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block font-mono">
              Recognition
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Awards & Recognition
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Commendations for excellence in corporate communication and strategic advisory.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Honors"
              title="Industry Recognition"
              description="Commendations across communications practices."
            />

            {awards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {awards.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-semibold uppercase text-gold tracking-wider mb-2 block">
                        {item.year}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-navy mb-2">{item.name}</h3>
                      <p className="text-xs text-slate-500 font-semibold mb-3">
                        {item.organization} &bull; {item.category}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 sm:p-16 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center text-navy mx-auto">
                  <Award className="w-7 h-7 text-gold-dark" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Awards & Recognition Information Coming Soon
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Industry commendations and institutional recognition archives are being curated.
                </p>
              </div>
            )}
          </div>
        </section>


        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
