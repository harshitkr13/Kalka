import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { IndustryCard } from '@/components/cards/IndustryCard';
import { industriesData } from '@/lib/content/industries';
import { FinalCta } from '@/sections/home/FinalCta';

export const metadata: Metadata = {
  title: 'Industry Practices & Sectors | Kalka Co. Media Consultancy',
  description: 'Sector-specific public relations, communications governance, and crisis advisory for real estate, corporate, technology, and healthcare institutions.',
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="bg-navy-deep text-white pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16 border-b border-navy-border text-left relative overflow-hidden">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/25 inline-block font-mono">
              Sector Practices
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-[1.15]">
              Specialized Industry Knowledge for High-Stakes Environments
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
              Effective corporate communications requires deep fluency in sector regulatory frameworks, investor expectations, and media beats.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-slate-50/50 border-b border-slate-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              overline="Core Sectors"
              title="Dedicated Sector Practices Commanded by Veteran Counselors"
              description="Explore how Kalka Co. tailors narrative positioning and reputation insulation to the distinct demands of your market."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industriesData.map((ind) => (
                <IndustryCard
                  key={ind.slug}
                  title={ind.name}
                  sectorTag={ind.sectorTag}
                  description={ind.heroExcerpt}
                  featured={ind.featured}
                  href={`/industries/${ind.slug}`}
                />
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
