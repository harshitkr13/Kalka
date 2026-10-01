import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { Radio } from 'lucide-react';
import { FinalCta } from '@/sections/home/FinalCta';
import { getPublicMediaMentions } from '@/lib/api/publicContent';

export const metadata: Metadata = {
  title: 'Media Coverage & Press | Kalka Co. Media Consultancy',
  description: 'Verified media mentions, editorial commentary, and press coverage of Kalka Co. Media Consultancy.',
  alternates: {
    canonical: '/media-mentions',
  },
  openGraph: {
    title: 'Media Coverage & Press | Kalka Co. Media Consultancy',
    description: 'Verified media mentions, editorial commentary, and press coverage of Kalka Co. Media Consultancy.',
    url: 'https://kalka.co/media-mentions',
    siteName: 'Kalka Co. Media Consultancy',
    type: 'website',
    images: ['/assets/social/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Coverage & Press | Kalka Co. Media Consultancy',
    description: 'Verified media mentions, editorial commentary, and press coverage of Kalka Co. Media Consultancy.',
    images: ['/assets/social/og-default.jpg'],
  },
};

export default async function MediaCoveragePage() {
  const mentions = await getPublicMediaMentions();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="bg-navy-deep text-white pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16 border-b border-navy-border text-left relative overflow-hidden">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/25 inline-block font-mono">
              Press & Coverage
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-[1.15]">
              Media Coverage & Commentary
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
              Perspectives, citations, and strategic commentary across news periodicals.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Coverage"
              title="Media Mentions"
              description="Selected media features and commentary across business press."
            />

            {mentions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="font-semibold text-navy uppercase font-mono">{item.publication}</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-navy mb-2">{item.headline}</h3>
                      <p className="text-sm text-slate-600 line-clamp-3 mb-4">{item.quoteExcerpt}</p>
                    </div>
                    {item.urlPlaceholder ? (
                      <a
                        href={item.urlPlaceholder}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-navy hover:text-gold flex items-center gap-1"
                      >
                        Read Publication &rarr;
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 sm:p-16 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center text-navy mx-auto">
                  <Radio className="w-7 h-7 text-gold-dark" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Media Coverage Information Coming Soon
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Verified media features, press mentions, and commentary archives are currently being compiled. For press inquiries, contact{' '}
                  <a href="mailto:kalkacomediaconsultancy@gmail.com" className="text-navy font-semibold underline font-mono break-all">
                    kalkacomediaconsultancy@gmail.com
                  </a>.
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
