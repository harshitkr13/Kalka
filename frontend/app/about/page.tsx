import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/sections/home/FinalCta';
import { Compass, Target, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
  description: 'Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-navy-deep text-white py-20 lg:py-28 border-b border-navy-border text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block font-mono">
              About the Firm
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
              Strategic Communication. Lasting Impact.
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
              Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement through strategic communication, media relations and reputation management.
            </p>
          </div>
        </section>

        {/* Narrative Principles */}
        <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block mb-2 font-mono">
                  Our Focus & Approach
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy leading-tight">
                  Building Visibility & Strengthening Reputation
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-5 text-slate-600 leading-relaxed text-base sm:text-lg font-light">
                <p>
                  Effective corporate and brand communications requires strategic discipline, nuanced media relationships, and an unwavering commitment to authenticity.
                </p>
                <p>
                  We partner with enterprise leadership, founders, and institutions to articulate narratives that resonate with stakeholders, withstand media scrutiny, and create lasting public trust.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
              <div className="p-7 border border-slate-200 rounded bg-slate-50/40 space-y-3">
                <div className="w-10 h-10 rounded bg-navy text-gold flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy">Strategic Precision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every advisory memo, briefing, and statement is anchored in thorough research, clear positioning, and verifiable facts.
                </p>
              </div>

              <div className="p-7 border border-slate-200 rounded bg-slate-50/40 space-y-3">
                <div className="w-10 h-10 rounded bg-navy text-gold flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy">Professional Discretion</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We operate with confidentiality, protecting proprietary organizational data and strategic plans under strict non-disclosure.
                </p>
              </div>

              <div className="p-7 border border-slate-200 rounded bg-slate-50/40 space-y-3">
                <div className="w-10 h-10 rounded bg-navy text-gold flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy">Reputational Defense</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Insulating enterprise brand equity through proactive stakeholder alignment, media readiness, and crisis containment.
                </p>
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
