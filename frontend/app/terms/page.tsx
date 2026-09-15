import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service | Kalka Co. Media Consultancy',
  description: 'Terms of engagement, intellectual property rights, and website usage policies of Kalka Co. Media Consultancy.',
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-navy-deep">
      {/* Header */}
      <section className="bg-navy py-16 text-white border-b border-navy-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Terms of Service' },
            ]}
            className="mb-8 text-slate-400"
          />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Legal Terms
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Terms of Engagement & Digital Usage
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Last Updated: January 2026 | Governing all public interactions with Kalka Co. platforms.
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
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or browsing this website (the &quot;Site&quot;), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any part of these terms, you must refrain from utilizing this platform.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                2. Advisory Disclaimer
              </h2>
              <p>
                The materials, perspectives, articles, and whitepapers published on this Site are intended solely for general intellectual and informational discourse. They do not constitute formal legal counsel, investment advice, or guaranteed public relations outcomes.
              </p>
              <p>
                No client-counselor relationship is created solely by virtue of visiting this website or transmitting an inquiry form. Formal representation begins exclusively upon execution of a bilateral Master Services Agreement (MSA) signed by a partner of Kalka Co.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                3. Intellectual Property Rights
              </h2>
              <p>
                All original text, structural frameworks, graphics, typography, and visual assets on this Site are the proprietary intellectual property of Kalka Co. Media Consultancy, protected by Indian and international copyright, trademark, and unfair competition laws.
              </p>
              <p>
                Brief excerpts may be quoted in media coverage or academic citations provided clear attribution is accorded to &quot;Kalka Co. Media Consultancy&quot; along with an active hyperlink to the original source URL.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                4. Prohibited Uses
              </h2>
              <p>Users are expressly prohibited from:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Deploying automated scrapers, bots, or data-extraction tools without express written permission.</li>
                <li>Transmitting malicious payloads, spoofed inquiries, or unlawful communications through contact portals.</li>
                <li>Misrepresenting affiliation with Kalka Co. or its leadership team.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                5. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Kalka Co. Media Consultancy, its partners, directors, and employees shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, materials published on this platform.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                6. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the substantive laws of the Republic of India. Any legal dispute or controversy arising out of these Terms shall be submitted to the exclusive jurisdiction of the competent courts in New Delhi, India.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-8">
              <h2 className="font-serif text-2xl font-bold text-navy">
                7. Legal Inquiries
              </h2>
              <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                <p><strong>Desk:</strong> Office of the General Counsel</p>
                <p><strong>Entity:</strong> Kalka Co. Media Consultancy</p>
                <p><strong>Email:</strong> djdurgesh8@gmail.com</p>
                <p><strong>Jurisdiction:</strong> New Delhi, India</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
