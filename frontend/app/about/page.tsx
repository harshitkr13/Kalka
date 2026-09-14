import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { FinalCta } from '@/sections/home/FinalCta';
import { ShieldCheck, Compass, Target, Scale, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Kalka Co. — Philosophy, Counsel & Strategic Heritage',
  description: 'Learn about Kalka Co. Media Consultancy, our core principles, newsroom heritage, and multi-stakeholder reputation advisory model.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
              About the Firm
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Strategic Communication. Lasting Impact.
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
              Kalka Co. was established on a fundamental conviction: in an increasingly scrutinizing world, corporate goodwill is an organization’s most valuable and vulnerable asset.
            </p>
          </div>
        </section>

        {/* Narrative Principles */}
        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block mb-2">
                  Our Founding Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy leading-tight">
                  Moving Beyond the Noise to Earn Genuine Authority
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-5 text-slate-600 leading-relaxed text-base sm:text-lg font-light">
                <p>
                  Modern public discourse has fundamentally evolved. Broadcasters and investigative broadsheets no longer publish promotional spin; they cross-examine corporate claims against balance sheets, regulatory filings, and cultural expectations.
                </p>
                <p>
                  Kalka Co. replaces superficial publicity with rigorous reputation architecture. We work alongside chairpersons, managing partners, and senior communications officers to articulate truths that withstand intense scrutiny.
                </p>
              </div>
            </div>

            {/* Core Values / Standard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
              <div className="p-7 border border-slate-200 rounded bg-slate-50/40 space-y-3">
                <div className="w-10 h-10 rounded bg-navy text-gold flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy">Intellectual Rigor</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every strategic advisory memo, op-ed, and statement is anchored in macroeconomic research and verifiable operational facts.
                </p>
              </div>

              <div className="p-7 border border-slate-200 rounded bg-slate-50/40 space-y-3">
                <div className="w-10 h-10 rounded bg-navy text-gold flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy">Absolute Discretion</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We operate behind the scenes of monumental transactions, sensitive restructurings, and acute crises under strict mutual confidentiality.
                </p>
              </div>

              <div className="p-7 border border-slate-200 rounded bg-slate-50/40 space-y-3">
                <div className="w-10 h-10 rounded bg-navy text-gold flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy">Institutional Defense</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Protecting long-term enterprise valuation and public trust through coordinated multi-stakeholder narrative governance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advisory Approach Banner */}
        <section className="py-16 bg-slate-50 border-b border-slate-200 text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block">
              Advisory Governance
            </span>
            <h3 className="font-serif text-2xl font-semibold text-navy">
              Retainer Partnerships & Milestone Interventions
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We structure our practice around dedicated senior partner engagements, ensuring every client receives direct strategic counsel from seasoned communications leaders.
            </p>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
