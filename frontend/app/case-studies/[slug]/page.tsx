import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FinalCta } from '@/sections/home/FinalCta';
import { getPublicCaseStudyBySlug } from '@/lib/api/publicContent';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getPublicCaseStudyBySlug(slug);
  if (!study) return { title: 'Case Study Not Found | Kalka Co.' };

  const canonicalUrl = `/case-studies/${slug}`;
  const imageUrl = study.coverImage?.trim() || '/assets/case-studies/default-cover.webp';

  return {
    title: `${study.title} — Case Study | Kalka Co.`,
    description: study.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${study.title} — Case Study | Kalka Co.`,
      description: study.summary,
      url: `https://kalka.co${canonicalUrl}`,
      images: [
        {
          url: imageUrl,
          alt: study.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${study.title} — Case Study | Kalka Co.`,
      description: study.summary,
      images: [imageUrl],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = await getPublicCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const isExternalImage = study.coverImage?.startsWith('http://') || study.coverImage?.startsWith('https://');

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
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
                {study.clientIndustry || 'Strategic Advisory'}
              </span>
              {study.engagementType && (
                <span className="text-xs text-slate-400 uppercase tracking-wider">
                  {study.engagementType}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
              {study.title}
            </h1>

            {study.summary && (
              <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
                {study.summary}
              </p>
            )}

            {study.coverImage && (
              <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden mt-8 border border-white/10 shadow-2xl">
                <Image
                  src={study.coverImage}
                  alt={study.title}
                  fill
                  unoptimized={isExternalImage}
                  className="object-cover"
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            )}
          </div>
        </section>

        {/* Metrics Banner */}
        {study.metrics && study.metrics.length > 0 && (
          <section className="bg-navy border-b border-navy-border py-10 text-white">
            <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                {study.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 border border-navy-border rounded bg-navy-surface/40">
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
        )}

        {/* Detailed Breakdown: Challenge, Strategy, Execution, Outcome */}
        {(study.challenge || study.strategy || study.execution || study.outcome) && (
          <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
            <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-16">
              {/* The Challenge */}
              {study.challenge && (
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
              )}

              {/* The Strategy */}
              {study.strategy && (
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
              )}

              {/* The Execution */}
              {study.execution && (
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
              )}

              {/* The Outcome */}
              {study.outcome && (
                <div className="space-y-4 pt-8 border-t border-slate-200 p-8 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block">
                    04 • Strategic Outcome
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">
                    Measurable Strategic Impact
                  </h2>
                  <p className="text-base text-slate-700 leading-relaxed">
                    {study.outcome}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
