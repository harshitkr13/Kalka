import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { careersData } from '@/lib/content/careers';
import { 
  ArrowRight, 
  Briefcase, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Compass, 
  Award, 
  Users, 
  Sparkles,
  BookOpen,
  HeartHandshake
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | Kalka Co. Media Consultancy',
  description: 'Join an elite cohort of strategic media advisors, narrative architects, and crisis counselors shaping discourse for premier enterprises.',
};

const culturePillars = [
  {
    icon: Compass,
    title: 'Intellectual Rigor',
    description: 'We treat media communications as an analytical discipline. Every pitch, narrative arc, and crisis strategy is rooted in deep policy and market understanding.',
  },
  {
    icon: ShieldCheck,
    title: 'Absolute Discretion',
    description: 'Our advisors are entrusted with sensitive transactions, corporate transformations, and regulatory inquiries where confidentiality is unconditional.',
  },
  {
    icon: Sparkles,
    title: 'Journalistic Empathy',
    description: 'We respect the craft of journalism. We do not blast generic releases; we provide editors and correspondents with substantiated, publishing-grade insights.',
  },
  {
    icon: Users,
    title: 'High-Agency Cohort',
    description: 'A flat advisory hierarchy where curiosity, strategic conviction, and editorial excellence outshine bureaucracy. Senior partners mentor every engagement.',
  },
];

const benefits = [
  {
    title: 'Premier Compensation & Performance Incentives',
    desc: 'Market-leading advisory remuneration with transparent performance bonuses reflecting client retention and impact.',
  },
  {
    title: 'Executive C-Suite Exposure',
    desc: 'Partner directly with Fortune 500 board chairs, enterprise founders, and tier-1 bureau chiefs from day one.',
  },
  {
    title: 'Pressroom & Research Sabbaticals',
    desc: 'Dedicated quarterly stipends and protected study periods for investigative research, authoring whitepapers, and media fellowships.',
  },
  {
    title: 'Comprehensive Health & Executive Well-Being',
    desc: 'Holistic health, mental well-being support, and tailored medical coverage for you and your dependents.',
  },
];

export default function CareersPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider">
              <span>Join Kalka Co. Advisory</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300">[SAMPLE / DEMO / PLACEHOLDER]</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Shaping the Discourse with Uncompromising Precision
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              We recruit former investigative journalists, public affairs specialists, and strategic communications directors who relish complex narrative challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Culture & Ethos */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            overline="Our Advisory Ethos"
            title="The Standards We Uphold"
            description="Working at Kalka Co. means counseling market leaders during defining corporate moments. Our culture reflects the gravity of that responsibility."
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

      {/* Workplace & Benefits */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
                Firm Environment
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                Investing in Intellectual Capital & Autonomous Growth
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Strategic advisory requires clarity of mind, constant intellectual nourishment, and the institutional freedom to do deep, meaningful work.
              </p>
              <div className="p-4 rounded border border-gold/30 bg-gold/5">
                <p className="text-xs text-slate-600">
                  <strong className="text-navy">Editorial Rigor:</strong> Every team member at Kalka Co. is supported with publishing resources and direct mentorship from veterans of national newsrooms.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="p-6 bg-white rounded border border-slate-200 shadow-sm">
                  <h4 className="font-serif text-base font-bold text-navy mb-2">
                    {b.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            overline="Open Engagements"
            title="Current Advisory Opportunities"
            description="Explore active roles across our media relations, crisis advisory, and corporate practice groups."
            className="mb-12"
          />

          <div className="space-y-6">
            {careersData.map((role) => (
              <div
                key={role.slug}
                className="p-8 rounded border border-slate-200 bg-white hover:border-gold/60 hover:shadow-elevated transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="navy">{role.department}</Badge>
                    <Badge variant="neutral">{role.experience}</Badge>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {role.location}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {role.employmentType}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-navy">
                    {role.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <Link href={`/careers/${role.slug}`}>
                    <Button variant="primary" size="md" className="w-full sm:w-auto">
                      View Position
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* General Inquiries Box */}
          <div className="mt-16 p-8 lg:p-12 rounded bg-navy text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 border border-navy-border">
            <div className="space-y-3 max-w-2xl">
              <h3 className="font-serif text-2xl font-bold text-white">
                Unsolicited Portfolios & Senior Counselor Inquiries
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                If your credentials include premier investigative reporting, high-stakes regulatory defense, or international financial communications, we welcome confidential inquiries.
              </p>
            </div>
            <Link href="/contact">
              <Button variant="gold" size="lg" className="whitespace-nowrap">
                Confidential Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
