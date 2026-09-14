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

      <main className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              Sector Practices
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Specialized Industry Knowledge for High-Stakes Environments
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Effective corporate communications requires deep fluency in sector regulatory frameworks, investor expectations, and media beats.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200">
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
