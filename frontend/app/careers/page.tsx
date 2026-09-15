import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Mail, Compass, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { getPublicCareers } from '@/lib/api/publicContent';

export const metadata: Metadata = {
  title: 'Careers | Kalka Co. Media Consultancy',
  description: 'Career opportunities at Kalka Co. Media Consultancy.',
};

const culturePillars = [
  {
    icon: Compass,
    title: 'Strategic Discipline',
    description: 'We treat media communications as an analytical discipline rooted in policy and market understanding.',
  },
  {
    icon: ShieldCheck,
    title: 'Absolute Discretion',
    description: 'Our advisors are entrusted with sensitive transactions, corporate transformations, and reputation defense.',
  },
  {
    icon: Sparkles,
    title: 'Journalistic Insight',
    description: 'We respect the craft of journalism, providing editors and correspondents with substantiated, publishing-grade insights.',
  },
  {
    icon: Users,
    title: 'High-Agency Collaboration',
    description: 'A culture where curiosity, strategic conviction, and editorial excellence drive client impact.',
  },
];

export default async function CareersPage() {
  const careers = await getPublicCareers();

  return (
    <div className="bg-slate-50 min-h-screen text-navy-deep">
      {/* Hero */}
      <section className="bg-navy py-16 lg:py-24 text-white border-b border-navy-border relative overflow-hidden">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Careers' },
            ]}
            className="mb-8 text-slate-400"
          />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider font-mono">
              <span>Careers at Kalka Co.</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Career Opportunities
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              We look for dedicated strategic communications and public relations professionals who value intellectual rigor and editorial precision.
            </p>
          </div>
        </div>
      </section>

      {/* Ethos */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            overline="Our Ethos"
            title="The Standards We Uphold"
            description="Working at Kalka Co. means counseling market leaders during defining corporate moments."
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culturePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-8 rounded border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-card transition-all"
                >
                  <div className="w-12 h-12 rounded bg-navy/5 border border-navy/10 flex items-center justify-center text-navy mb-6">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Openings if any */}
      {careers.length > 0 && (
        <section className="py-20 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              overline="Openings"
              title="Active Practice Opportunities"
              description="Explore currently open positions within our advisory and media practices."
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careers.map((career, idx) => (
                <div
                  key={idx}
                  className="p-8 border border-slate-200 rounded-lg bg-white shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="font-semibold text-gold uppercase font-mono">{career.department}</span>
                      <span>{career.employmentType} &bull; {career.location}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-navy mb-3">{career.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-6 leading-relaxed">{career.description}</p>
                  </div>
                  <a
                    href={`mailto:djdurgesh8@gmail.com?subject=Application for ${encodeURIComponent(career.title)}`}
                    className="text-xs font-semibold text-navy hover:text-gold flex items-center gap-1 mt-auto"
                  >
                    Apply via Email &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Opportunities Box */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 sm:p-16 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center text-navy mx-auto">
              <Mail className="w-7 h-7 text-gold-dark" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-navy">
              Career Inquiries
            </h3>
            <p className="text-base text-slate-700 leading-relaxed font-sans">
              For career opportunities, contact:<br />
              <a
                href="mailto:djdurgesh8@gmail.com"
                className="text-navy font-bold font-mono text-lg hover:underline inline-block mt-2"
              >
                djdurgesh8@gmail.com
              </a>
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="gold" size="md">
                  Contact Counsel Desk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

