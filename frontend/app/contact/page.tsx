import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactFormSection } from './ContactFormSection';

export const metadata: Metadata = {
  title: 'Contact & Advisory Consultation | Kalka Co. Media Consultancy',
  description: 'Initiate a confidential strategic communications dialogue with Kalka Co. Media Consultancy.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Page Header */}
      <section className="bg-navy py-16 lg:py-24 text-white border-b border-navy-border relative overflow-hidden">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact' },
            ]}
            className="mb-8 text-slate-400"
          />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider font-mono">
              <span>Strategic Counsel Desk</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Initiate a Strategic Dialogue
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              We counsel enterprise boards, managing partners, and brand leaders on high-stakes communications, media relations, and reputation management.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Contact Hub */}
      <Suspense fallback={<div className="py-24 text-center text-slate-500 font-mono text-xs">Loading consultation desk...</div>}>
        <ContactFormSection />
      </Suspense>
    </div>
  );
}
