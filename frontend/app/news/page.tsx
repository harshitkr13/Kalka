import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { newsData } from '@/lib/content/news';
import { FinalCta } from '@/sections/home/FinalCta';
import { Calendar, Newspaper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Firm News & Public Announcements | Kalka Co.',
  description: 'Official corporate announcements, practice expansion briefings, and media updates from Kalka Co.',
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              Press Room [SAMPLE RELEASES]
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Firm Announcements & Practice Developments
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Illustrative press notes, strategic expansion disclosures, and leadership developments from Kalka Co.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Corporate Bulletins [SAMPLE ARCHIVE]"
              title="Sample Communications & Practice Archive"
              align="left"
            />

            <div className="divide-y divide-slate-200">
              {newsData.map((item) => (
                <article key={item.id} className="py-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                      [SAMPLE RELEASE]
                    </span>
                    <span className="text-gold-dark font-semibold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-navy hover:text-gold-dark transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.content}
                  </p>
                </article>
              ))}
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded text-center text-xs text-slate-500">
              * Note: Sample announcements shown for design verification. Live company releases are managed in accordance with 05_DATA_SOURCES.
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
