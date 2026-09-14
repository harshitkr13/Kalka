import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { mediaMentionsData } from '@/lib/content/mediaMentions';
import { FinalCta } from '@/sections/home/FinalCta';
import { Quote, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Media Mentions & Press Coverage | Kalka Co.',
  description: 'Review national and international media coverage, journalist citations, and thought leadership commentary from Kalka Co.',
};

export default function MediaMentionsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              Editorial Coverage [DEMO ARCHIVE]
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Media Mentions & Journalistic Commentary
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Illustrative analytical commentary for business and financial publications on corporate reputation and media crises.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Press Features [SAMPLE ARCHIVE]"
              title="Sample Publication Clippings & Quotations [DEMO COVERAGE]"
              description="An illustrative index of editorial citations across business dailies and broadcast networks."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mediaMentionsData.map((mention) => (
                <div
                  key={mention.id}
                  className="p-8 border border-slate-200 rounded bg-white shadow-subtle flex flex-col justify-between space-y-6 hover:border-gold transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Quote className="w-7 h-7 text-gold" />
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        [DEMO COVERAGE]
                      </span>
                    </div>
                    <p className="text-base text-slate-700 italic leading-relaxed font-light">
                      &ldquo;{mention.quoteExcerpt}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="font-serif text-base font-semibold text-navy block">
                      {mention.publication}
                    </span>
                    <span className="text-xs text-slate-500 block mt-1">
                      {mention.headline}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      {mention.date} • {mention.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded text-center text-xs text-slate-500">
              * Note: Sample media quotations shown for presentation structure. Original publication links are maintained in accordance with copyright guidelines (05_DATA_SOURCES).
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
