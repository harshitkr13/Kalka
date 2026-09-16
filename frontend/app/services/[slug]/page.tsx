import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FinalCta } from '@/sections/home/FinalCta';
import { servicesData } from '@/lib/content/services';
import { ArrowRight, CheckCircle2, Layers, Compass } from 'lucide-react';

const serviceImageMap: Record<string, string> = {
  'public-relations': '/assets/work/newsroom.webp',
  'media-relations': '/assets/work/media-interview.webp',
  'corporate-communications': '/assets/work/corporate-event.webp',
  'thought-leadership': '/assets/work/thought-leadership.webp',
  'crisis-communications': '/assets/work/crisis-communication.webp',
  'brand-positioning': '/assets/work/brand-positioning.webp',
  'reputation-management': '/assets/work/crisis-communication.webp',
  'content-development': '/assets/work/newsroom.webp',
  'digital-communications': '/assets/work/thought-leadership.webp',
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found | Kalka Co.' };

  const canonicalUrl = `/services/${slug}`;
  const imageUrl = serviceImageMap[slug] || '/assets/social/og-default.jpg';

  return {
    title: `${service.name} — Advisory Practice | Kalka Co.`,
    description: service.shortDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.name} — Advisory Practice | Kalka Co.`,
      description: service.shortDescription,
      url: `https://kalka.co${canonicalUrl}`,
      images: [
        {
          url: imageUrl,
          alt: `${service.name} Practice at Kalka Co. Media Consultancy`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} — Advisory Practice | Kalka Co.`,
      description: service.shortDescription,
      images: [imageUrl],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Service Hero */}
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Breadcrumbs
              items={[
                { label: 'Services', href: '/services' },
                { label: service.name },
              ]}
              className="[&_a]:text-slate-400 [&_span]:text-gold"
            />

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20">
                {service.category}
              </span>
              {service.badge && <Badge variant="gold">{service.badge}</Badge>}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              {service.name}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              {service.tagline}
            </p>
          </div>
        </section>

        {/* Overview & Capabilities */}
        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Overview */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block">
                  Practice Overview
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy leading-tight">
                  Strategic Scope & Narrative Impact
                </h2>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-light">
                  {service.fullDescription}
                </p>

                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Core Practice Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start gap-2.5 p-3 rounded bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-5 space-y-6">
                {serviceImageMap[slug] && (
                  <div className="relative h-56 w-full rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                    <Image
                      src={serviceImageMap[slug]}
                      alt={`${service.name} practice at Kalka Co.`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 400px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold block font-semibold">Advisory Practice</span>
                      <span className="text-sm font-serif font-semibold">{service.name}</span>
                    </div>
                  </div>
                )}

                <div className="p-8 rounded bg-slate-50 border border-slate-200 space-y-6">
                  <h3 className="font-serif text-xl font-semibold text-navy">
                    Related Sector Practices
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    This advisory capability is frequently deployed across our marquee sector practices:
                  </p>
                  <div className="space-y-2">
                    {service.relatedIndustries.map((ind) => (
                      <div key={ind} className="p-3 bg-white border border-slate-200 rounded text-xs font-semibold text-navy">
                        {ind}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.slug)}&serviceName=${encodeURIComponent(service.name)}`}
                      className="block w-full"
                    >
                      <Button variant="gold" size="md" className="w-full justify-center">
                        Consult with Practice Lead
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Four-Stage Process */}
        <section className="py-20 lg:py-28 bg-slate-50/60 border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block mb-2">
                Execution Methodology
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy">
                How We Deliver {service.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step) => (
                <div key={step.step} className="p-6 bg-white border border-slate-200 rounded space-y-3">
                  <span className="font-serif text-2xl font-bold text-gold-dark">
                    {step.step}
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-navy">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
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
