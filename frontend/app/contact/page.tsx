import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactFormSection } from './ContactFormSection';

export const metadata: Metadata = {
  title: 'Contact & Advisory Consultation | Kalka Co. Media Consultancy',
  description: 'Initiate a confidential strategic communications dialogue with Kalka Co. Media Consultancy.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact & Advisory Consultation | Kalka Co. Media Consultancy',
    description: 'Initiate a confidential strategic communications dialogue with Kalka Co. Media Consultancy.',
    url: 'https://kalka.co/contact',
    siteName: 'Kalka Co. Media Consultancy',
    type: 'website',
    images: ['/assets/social/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Advisory Consultation | Kalka Co. Media Consultancy',
    description: 'Initiate a confidential strategic communications dialogue with Kalka Co. Media Consultancy.',
    images: ['/assets/social/og-default.jpg'],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Page Header */}
      <section className="bg-navy pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 text-white border-b border-navy-border relative overflow-hidden">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact' },
            ]}
            className="mb-6 text-slate-400"
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-wide font-mono">
              <span>Strategic Counsel Desk</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Initiate a Strategic Dialogue
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              We counsel enterprise boards, managing partners, and brand leaders on high-stakes communications, media relations, and reputation management.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Contact Hub */}
      <Suspense fallback={<div className="py-24 text-center text-slate-500 font-mono text-xs">Loading consultation desk...</div>}>
        <ContactFormSection />
      </Suspense>
    </main>

    <Footer />
  </div>
);
}
