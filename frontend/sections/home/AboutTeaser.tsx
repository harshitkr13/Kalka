import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AboutTeaser: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block">
              About Kalka Co. Media Consultancy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy leading-tight">
              We operate at the critical intersection of corporate narrative, market perception, and enterprise valuation.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
              Kalka Co. is an elite media consultancy and public relations advisory firm. We counsel corporate boards, managing directors, and visionary founders through complex milestones, acute media scrutiny, and long-term reputation architecture.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our seasoned counselors do not rely on automated distribution or superficial spin. We combine senior newsroom instincts with rigorous corporate strategy, ensuring your voice commands authority across the institutions that matter most.
            </p>

            <div className="pt-2">
              <Link href="/about">
                <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Our Philosophy & Counsel
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5 bg-navy-deep text-white p-8 sm:p-10 rounded border border-navy-border shadow-elevated space-y-6">
            <div className="border-b border-navy-border pb-4">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
                The Kalka Standard
              </span>
              <h3 className="font-serif text-xl font-semibold text-white mt-1">
                Strategic Discipline in Every Word
              </h3>
            </div>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span><strong>Tier-1 Newsroom Access:</strong> Decades of direct relationships with senior editors and correspondents.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span><strong>Crisis Readiness:</strong> 24/7 dedicated rapid command cell defending reputations under acute public scrutiny.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span><strong>Data Integrity:</strong> Strict governance protecting client confidences and verified milestones.</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-navy-border text-xs text-slate-400">
              [SAMPLE STRATEGIC FOUNDATION BENCHMARK]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
