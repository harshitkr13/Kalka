import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Briefcase } from 'lucide-react';
import { FinalCta } from '@/sections/home/FinalCta';
import { getPublicCaseStudies } from '@/lib/api/publicContent';

export const metadata: Metadata = {
  title: 'Case Studies & Portfolio | Kalka Co. Media Consultancy',
  description: 'Selected strategic communications and media relations engagements by Kalka Co. Media Consultancy.',
};

export default async function OurWorkPage() {
  const caseStudies = await getPublicCaseStudies();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block font-mono">
              Portfolio
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Case Studies & Advisory Engagements
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Illustrating how strategic narrative alignment, media relations, and reputation management create lasting impact.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Portfolio"
              title="Engagement Dossiers"
              description="Detailed examinations of strategic communications mandates."
            />

            {caseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/case-studies/${item.slug}`}
                    className="group flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-gold transition-colors"
                  >
                    <div className="relative h-48 w-full bg-slate-100">
                      <Image
                        src={item.coverImage || '/assets/case-studies/default-cover.webp'}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-xs font-mono font-semibold uppercase text-gold tracking-wider mb-2">
                        {item.clientIndustry}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold-dark transition-colors mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-3 mb-4">{item.summary}</p>
                      <span className="mt-auto text-xs font-semibold text-navy flex items-center gap-1 group-hover:underline">
                        View Engagement &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 sm:p-16 rounded-xl bg-white border border-slate-200 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center text-navy mx-auto">
                  <Briefcase className="w-7 h-7 text-gold-dark" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Case Studies Coming Soon
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our portfolio of advisory engagements and campaign dossiers is currently being prepared for publication. For specific practice inquiries or capability briefings, please initiate a direct conversation.
                </p>
                <div className="pt-2">
                  <Link href="/contact">
                    <Button variant="gold" size="md">
                      Initiate Consultation
                    </Button>
                  </Link>
                </div>
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
