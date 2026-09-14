import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { CaseStudyCard } from '@/components/cards/CaseStudyCard';
import { caseStudiesData } from '@/lib/content/caseStudies';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { FinalCta } from '@/sections/home/FinalCta';

export const metadata: Metadata = {
  title: 'Our Work & Case Studies | Kalka Co. Media Consultancy',
  description: 'Explore selected strategic communications, tier-1 media relations, and crisis advisory engagements by Kalka Co.',
};

export default function OurWorkPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              Strategic Portfolio [SAMPLE CASE STUDIES]
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Selected Strategic Communications Case Studies [SAMPLE PORTFOLIO]
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Illustrating how strategic narrative alignment, media discipline, and crisis readiness navigate critical market milestones.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeader
              overline="Strategic Engagements [SAMPLE ARCHIVE]"
              title="Selected Case Studies & Impact Demonstrations [SAMPLE]"
              description="Detailed demonstration examinations of complex narrative pivots, acute crisis defense, and category definition."
            />

            <div className="space-y-8">
              {caseStudiesData.map((study) => (
                <CaseStudyCard
                  key={study.slug}
                  title={study.title}
                  clientIndustry={study.clientIndustry}
                  challengeBrief={study.summary}
                  metricPlaceholder={study.metrics[1]?.value || '340%+'}
                  metricLabel={study.metrics[1]?.label || 'Share of Voice Gain [SAMPLE]'}
                  href={`/case-studies/${study.slug}`}
                />
              ))}
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded text-center text-xs text-slate-500">
              * Note: In compliance with data integrity policies (05_DATA_SOURCES), client identities and specific metrics are presented under confidentiality protections and designated sample benchmarks.
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
