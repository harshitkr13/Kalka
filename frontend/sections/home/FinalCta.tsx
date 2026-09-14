import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const FinalCta: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-navy-deep text-white text-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c9a84c_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <span className="text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20 inline-block">
          Confidential Consultation
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Initiate a Strategic Dialogue
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
          Whether you are anticipating a transformative transaction, seeking to establish category thought leadership, or safeguarding your enterprise against emerging narrative risks, Kalka Co. provides discreet, high-caliber counsel.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact">
            <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start a Conversation
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" size="lg" className="border-slate-600 text-slate-200 hover:bg-white/5 hover:text-white">
              Explore Advisory Practices
            </Button>
          </Link>
        </div>

        <div className="pt-8 border-t border-navy-border/60 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
          <span>All initial inquiries handled under strict mutual non-disclosure and executive confidentiality.</span>
        </div>
      </div>
    </section>
  );
};
