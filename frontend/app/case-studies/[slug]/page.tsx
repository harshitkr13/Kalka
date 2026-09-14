import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FinalCta } from '@/sections/home/FinalCta';
import { caseStudiesData } from '@/lib/content/caseStudies';
import { ArrowRight, CheckCircle2, ShieldCheck, Quote } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudiesData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudiesData.find((c) => c.slug === slug);
  if (!study) return { title: 'Case Study Not Found | Kalka Co.' };

  return {
    title: `${study.title} — Case Study | Kalka Co.`,
    description: study.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudiesData.find((c) => c.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Breadcrumbs
              items={[
                { label: 'Our Work', href: '/case-studies' },
                { label: study.title },
              ]}
              className="[&_a]:text-slate-400 [&_span]:text-gold"
            />

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20">
                {study.clientIndustry}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                {study.engagementType}
              </span>
              <span className="px-2.5 py-1 rounded bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider">
                [SAMPLE CASE STUDY]
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
              {study.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
              {study.summary}
            </p>
          </div>
        </section>

        {/* Metrics Banner */}
        <section className="bg-navy border-b border-navy-border py-10 text-white">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {study.metrics.map((m, idx) => (
                <div key={idx} className="p-4 border border-navy-border rounded bg-navy-surface/40">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                    [DEMO METRIC]
                  </span>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-gold">
                    {m.value}
                  </p>
                  <p className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-medium">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Breakdown: Challenge, Strategy, Execution, Outcome */}
        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-16">
            {/* The Challenge */}
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block">
                01 • Strategic Friction
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">
                The Core Reputational Challenge
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
                {study.challenge}
              </p>
            </div>

            {/* The Strategy */}
            <div className="space-y-4 pt-8 border-t border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block">
                02 • Advisory Architecture
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">
                Strategic Narrative Blueprint
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
                {study.strategy}
              </p>
            </div>

            {/* The Execution */}
            <div className="space-y-4 pt-8 border-t border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block">
                03 • Tier-1 Execution
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">
                Media & Stakeholder Deployment
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
                {study.execution}
              </p>
            </div>

            {/* The Outcome */}
            <div className="space-y-4 pt-8 border-t border-slate-200 p-8 bg-slate-50 border border-slate-200 rounded">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block">
                04 • Strategic Outcome [SAMPLE OUTCOME]
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">
                Measurable Strategic Outcome [DEMO]
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                {study.outcome}
              </p>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
