import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { servicesData } from '@/lib/content/services';
import { FinalCta } from '@/sections/home/FinalCta';

export const metadata: Metadata = {
  title: 'Advisory Practices & Services | Kalka Co. Media Consultancy',
  description: 'Explore the 9 core strategic communications, media relations, and reputation management practices of Kalka Co.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Advisory Practices & Services | Kalka Co. Media Consultancy',
    description: 'Explore the 9 core strategic communications, media relations, and reputation management practices of Kalka Co.',
    url: 'https://kalka.co/services',
    siteName: 'Kalka Co. Media Consultancy',
    type: 'website',
    images: ['/assets/social/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advisory Practices & Services | Kalka Co. Media Consultancy',
    description: 'Explore the 9 core strategic communications, media relations, and reputation management practices of Kalka Co.',
    images: ['/assets/social/og-default.jpg'],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="bg-navy-deep text-white pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16 border-b border-navy-border text-left relative overflow-hidden">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/25 inline-block font-mono">
              Core Advisory Practices
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-[1.15]">
              Strategic Communications Solutions for High-Stakes Moments
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
              We provide end-to-end narrative architecture, tier-1 media relations, and crisis insulation designed to establish and defend market leadership.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-slate-50/50 border-b border-slate-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              overline="Practice Portfolio"
              title="Nine Core Practices Engineered for Institutional Impact"
              description="From proactive media authority to 24/7 crisis response, our integrated practices ensure strategic message discipline across every channel."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service) => (
                <ServiceCard
                  key={service.slug}
                  title={service.name}
                  category={service.category}
                  description={service.shortDescription}
                  capabilities={service.capabilities}
                  badge={service.badge}
                  href={`/services/${service.slug}`}
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
