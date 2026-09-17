import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Cookie Policy | Kalka Co. Media Consultancy',
  description: 'Learn how Kalka Co. uses essential and functional cookies to deliver an optimal browsing experience.',
  alternates: {
    canonical: '/cookie-policy',
  },
  openGraph: {
    title: 'Cookie Policy | Kalka Co. Media Consultancy',
    description: 'Learn how Kalka Co. uses essential and functional cookies to deliver an optimal browsing experience.',
    url: 'https://kalka.co/cookie-policy',
    siteName: 'Kalka Co. Media Consultancy',
    type: 'website',
    images: ['/assets/social/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy | Kalka Co. Media Consultancy',
    description: 'Learn how Kalka Co. uses essential and functional cookies to deliver an optimal browsing experience.',
    images: ['/assets/social/og-default.jpg'],
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-navy-deep">
      {/* Header */}
      <section className="bg-navy py-16 text-white border-b border-navy-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Cookie Policy' },
            ]}
            className="mb-8 text-slate-400"
          />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Digital Standards
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Cookie Policy & Tracking Disclosure
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Last Updated: January 2026 | Transparent disclosure of digital state retention.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded border border-slate-200 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small, cryptographically signed text fragments saved on your device when you visit web properties. They enable platforms to remember session states, preserve client preferences, and verify secure transmission of consultation forms.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                2. Categories of Cookies We Deploy
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-serif text-base font-bold text-navy">
                    Strictly Necessary Cookies
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Essential for navigation, anti-CSRF token verification, and secure inquiry routing. These cannot be disabled as the platform cannot function safely without them.
                  </p>
                </div>

                <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-serif text-base font-bold text-navy">
                    Functional & Preference Cookies
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Remember UI preferences (such as filter selections or accessibility preferences) across page transitions.
                  </p>
                </div>

                <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-serif text-base font-bold text-navy">
                    Performance & Aggregated Telemetry
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Collect aggregated, anonymized statistics on page load latency, network response times, and general reading engagement. No personal profiling or ad-tracking scripts are executed.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                3. Cookie Governance & Browser Controls
              </h2>
              <p>
                Most modern web browsers allow you to manage or block cookies through browser settings. Disabling all cookies may affect the interactive functionality of inquiry submission forms.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-8">
              <h2 className="font-serif text-2xl font-bold text-navy">
                4. Inquiries Regarding Cookies
              </h2>
              <p className="text-xs text-slate-600">
                For questions regarding cookie deployment, contact: <strong>kalkacomediaconsultancy@gmail.com</strong>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
