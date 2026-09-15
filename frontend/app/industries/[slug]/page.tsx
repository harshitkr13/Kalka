import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { FinalCta } from '@/sections/home/FinalCta';
import { industriesData } from '@/lib/content/industries';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const industryImageMap: Record<string, string> = {
  'real-estate': '/assets/industries/real-estate.webp',
  'infrastructure': '/assets/industries/infrastructure.webp',
  'corporate-organizations': '/assets/industries/corporate.webp',
  'startups': '/assets/industries/startups.webp',
  'hospitality': '/assets/industries/hospitality.webp',
  'education': '/assets/industries/education.webp',
  'retail': '/assets/industries/retail.webp',
  'healthcare': '/assets/industries/healthcare.webp',
  'public-affairs': '/assets/industries/public-affairs.webp',
  'professional-services': '/assets/industries/professional-services.webp',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industriesData.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) return { title: 'Industry Not Found | Kalka Co.' };

  return {
    title: `${industry.name} — Sector Practice | Kalka Co.`,
    description: industry.heroExcerpt,
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Breadcrumbs
              items={[
                { label: 'Industries', href: '/industries' },
                { label: industry.name },
              ]}
              className="[&_a]:text-slate-400 [&_span]:text-gold"
            />

            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              {industry.sectorTag}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              {industry.name}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              {industry.heroExcerpt}
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Overview */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block mb-2">
                    Sector Dynamics
                  </span>
                  <h2 className="font-serif text-3xl font-semibold text-navy leading-tight mb-4">
                    Navigating Scrutiny, Regulation & Valuation
                  </h2>
                  <p className="text-base text-slate-700 leading-relaxed">
                    {industry.overview}
                  </p>
                </div>

                {/* Challenges */}
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Key Sector Communications Challenges
                  </h3>
                  <div className="space-y-3">
                    {industry.keyChallenges.map((ch) => (
                      <div key={ch} className="flex items-start gap-3 p-4 rounded bg-slate-50 border border-slate-200 text-sm text-slate-700">
                        <AlertCircle className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Approach */}
                <div className="pt-6 border-t border-slate-200">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block mb-2">
                    The Kalka Approach
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-navy mb-3">
                    Strategic Execution Framework
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {industry.strategicApproach}
                  </p>
                </div>
              </div>

              {/* Sidebar: Tailored Practices */}
              <div className="lg:col-span-5 space-y-6">
                {industryImageMap[slug] && (
                  <div className="relative h-56 w-full rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                    <Image
                      src={industryImageMap[slug]}
                      alt={industry.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold block font-semibold">Sector Focus</span>
                      <span className="text-sm font-serif font-semibold">{industry.name}</span>
                    </div>
                  </div>
                )}

                <div className="p-8 rounded bg-slate-50 border border-slate-200 space-y-6">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Tailored Practice Capabilities
                  </h3>
                  <p className="text-xs text-slate-500">
                    Core communications practices frequently engaged for {industry.name} leadership:
                  </p>
                  <div className="space-y-2">
                    {industry.relevantServices.map((svc) => (
                      <div key={svc} className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded text-xs font-semibold text-navy">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                        <span>{svc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <Link href="/contact" className="block w-full">
                      <Button variant="gold" size="md" className="w-full justify-center">
                        Consult Sector Practice Lead
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
