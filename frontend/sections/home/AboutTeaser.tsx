import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AboutTeaser: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark block font-mono">
              About Kalka Co. Media Consultancy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy leading-tight">
              Strategic Communication. Lasting Impact.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
              Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement through strategic communication, media relations and reputation management.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We combine newsroom instincts with structured corporate strategy, ensuring your voice commands authority across the institutions and stakeholder communities that matter most.
            </p>

            <div className="pt-2">
              <Link href="/about">
                <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Our Firm
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-48 sm:h-56 rounded overflow-hidden border border-navy-border shadow-elevated bg-navy-surface">
              <Image
                src="/assets/home/about.webp"
                alt="Kalka Co. Media Consultancy strategic advisory team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-xs font-mono uppercase tracking-wider text-gold block font-semibold">Leadership & Counsel</span>
                <span className="text-xs text-slate-200 font-serif">Kalka Co. Strategic Communications</span>
              </div>
            </div>

            <div className="bg-navy-deep text-white p-6 sm:p-8 rounded border border-navy-border shadow-elevated space-y-4">
              <div className="border-b border-navy-border pb-3">
                <span className="text-xs uppercase tracking-widest text-gold font-semibold block font-mono">
                  The Kalka Standard
                </span>
                <h3 className="font-serif text-lg font-semibold text-white mt-1">
                  Strategic Discipline in Every Engagement
                </h3>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span><strong>Strategic Communication:</strong> Clear, disciplined messaging that positions organizations for enduring visibility.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span><strong>Media Relations:</strong> Direct editorial dialogue with business journalists, editors, and industry publications.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span><strong>Reputation Management:</strong> Protecting institutional goodwill and navigating high-stakes public dialogue.</span>
                </li>
              </ul>

              <div className="pt-3 border-t border-navy-border text-xs text-slate-400 font-mono">
                Faridabad, Haryana • Strategic Counsel Desk
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
