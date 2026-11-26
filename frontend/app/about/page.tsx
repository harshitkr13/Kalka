import type { Metadata } from 'next';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FinalCta } from '@/sections/home/FinalCta';
import { MissionVisionSection } from '@/sections/about/MissionVisionSection';
import { companyConfig } from '@/lib/config/company';
import { Compass, Target, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
  description: 'Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
    description: 'Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement.',
    url: 'https://kalka.co/about',
    siteName: 'Kalka Co. Media Consultancy',
    type: 'website',
    images: ['/assets/social/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
    description: 'Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement.',
    images: ['/assets/social/og-default.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Page Hero */}
        <section className="bg-navy pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 text-white border-b border-navy-border text-left relative overflow-hidden">
          {/* Subtle architectural background texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c9a84c_1px,transparent_1px)] [background-size:24px_24px]"
            aria-hidden="true"
          />

          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'About' },
              ]}
              className="mb-4 text-slate-400"
            />

            <span className="text-xs font-semibold tracking-wider uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/25 inline-block font-mono">
              About the Firm
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-[1.15]">
              Strategic Communication. Lasting Impact.
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
              Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement through strategic communication, media relations and reputation management.
            </p>
          </div>
        </section>

        {/* Narrative Principles */}
        <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-ink block font-mono">
                  Our Focus & Approach
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy leading-tight">
                  Building Visibility & Strengthening Reputation
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base sm:text-lg font-light">
                  <p>
                    Effective corporate and brand communications requires strategic discipline, nuanced media relationships, and an unwavering commitment to authenticity.
                  </p>
                  <p>
                    We partner with enterprise leadership, founders, and institutions to articulate narratives that resonate with stakeholders, withstand media scrutiny, and create lasting public trust.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-elevated aspect-[16/10] bg-slate-100 group">
                  <Image
                    src="/assets/home/about.webp"
                    alt="Kalka Co. Media Consultancy strategic counsel and communications"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 600px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 p-3 rounded bg-navy-deep/90 backdrop-blur-md border border-navy-border/60 text-xs text-white">
                    <span className="text-gold font-mono uppercase tracking-wider text-[11px] block font-semibold">
                      Advisory Leadership
                    </span>
                    <span className="text-slate-200 font-serif">
                      Strategic Communications & Public Relations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision (hidden automatically until client-approved content is configured) */}
        <MissionVisionSection
          mission={companyConfig.mission}
          vision={companyConfig.vision}
        />

        {/* Core Values Section */}
        <section className="py-14 sm:py-20 lg:py-24 bg-slate-50/50 border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-ink block font-mono">
                  Core Principles
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy">
                  The Values That Guide Our Counsel
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="p-7 border border-slate-200 rounded-lg bg-slate-50/50 hover:border-gold/50 hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-navy text-gold flex items-center justify-center">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-navy">Strategic Precision</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      Every advisory memo, briefing, and statement is anchored in thorough research, clear positioning, and verifiable facts.
                    </p>
                  </div>
                </div>

                <div className="p-7 border border-slate-200 rounded-lg bg-slate-50/50 hover:border-gold/50 hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-navy text-gold flex items-center justify-center">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-navy">Professional Discretion</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      We operate with confidentiality, protecting proprietary organizational data and strategic plans under strict non-disclosure.
                    </p>
                  </div>
                </div>

                <div className="p-7 border border-slate-200 rounded-lg bg-slate-50/50 hover:border-gold/50 hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-navy text-gold flex items-center justify-center">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-navy">Reputational Defense</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      Insulating enterprise brand equity through proactive stakeholder alignment, media readiness, and crisis containment.
                    </p>
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
