import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | Kalka Co. Media Consultancy',
  description: 'Enterprise privacy, client confidentiality, and data protection policy of Kalka Co. Media Consultancy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-navy-deep">
      {/* Header */}
      <section className="bg-navy py-16 text-white border-b border-navy-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy' },
            ]}
            className="mb-8 text-slate-400"
          />

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Governance & Confidentiality
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Privacy Policy & Client Data Protection
            </h1>
            <p className="text-slate-300 text-sm sm:text-base">
              Last Updated: January 2026 | Effective for all global advisory engagements and digital touchpoints.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded border border-slate-200 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            <div className="p-4 rounded bg-gold/5 border border-gold/30 text-xs text-slate-600">
              <strong className="text-navy font-semibold block mb-1">Confidentiality Commitment:</strong>
              Kalka Co. Media Consultancy operates under the highest institutional confidentiality protocols. We never monetize, broker, or disclose client communication metadata, consultation inquiries, or proprietary narrative materials.
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                1. Scope & Application
              </h2>
              <p>
                This Privacy Policy outlines how Kalka Co. Media Consultancy (&quot;Kalka Co.&quot;, &quot;the Firm&quot;, &quot;we&quot;, &quot;us&quot;) collects, maintains, safeguards, and utilizes information acquired through our digital platforms, executive inquiry portals, consultation interactions, and public communications.
              </p>
              <p>
                Formal advisory engagements with clients are additionally governed by customized Master Services Agreements (MSAs) and bilateral Non-Disclosure Agreements (NDAs), which supersede this general policy with respect to covered trade secrets and proprietary materials.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                2. Information We Collect
              </h2>
              <p>We may collect information directly from you or through automated technical interactions:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Voluntary Executive Inquiries:</strong> Name, business email, organization name, phone number, executive title, and narrative context submitted via consultation forms.</li>
                <li><strong>Candidate Submissions:</strong> Resumes, employment history, portfolios, and references submitted through our career portal.</li>
                <li><strong>Technical & Analytical Telemetry:</strong> Anonymized IP addresses, browser specifications, page access timestamps, and referrer URLs used strictly for platform security and uptime monitoring.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                3. Purpose of Processing
              </h2>
              <p>Collected information is processed exclusively for bona fide institutional purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Evaluating advisory fit and conflict check clearances prior to client onboarding.</li>
                <li>Transmitting requested strategic briefing materials and corporate analyses.</li>
                <li>Executing rapid-response triage for clients facing active media or crisis situations.</li>
                <li>Complying with regulatory obligations, anti-fraud audits, and court orders.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                4. Confidentiality & Third-Party Non-Disclosure
              </h2>
              <p>
                We do not sell, rent, license, or trade any personal or enterprise data. Information is only shared with authorized sub-processors under legally binding data processing agreements containing strict confidentiality warranties (e.g., enterprise hosting infrastructure and secure email gateways).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                5. Security Safeguards & Retention
              </h2>
              <p>
                Kalka Co. implements industry-standard encryption protocols (TLS 1.3 in transit and AES-256 at rest) for all stored communication records. Data submitted through inquiry channels is retained only as long as necessary to facilitate ongoing advisory discussions or fulfill statutory retention requirements.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy">
                6. Individual Rights
              </h2>
              <p>
                Under applicable Indian and international data protection frameworks, you have the right to request access to, rectification of, or erasure of your personal data held by the Firm.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-8">
              <h2 className="font-serif text-2xl font-bold text-navy">
                7. Contact Our Privacy Officer
              </h2>
              <p>
                For questions regarding this policy or to exercise data rights, contact our Data Governance Officer:
              </p>
              <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                <p><strong>Office:</strong> Data Protection & Compliance Cell</p>
                <p><strong>Entity:</strong> Kalka Co. Media Consultancy</p>
                <p><strong>Email:</strong> privacy@kalka.co.in</p>
                <p><strong>Address:</strong> [OFFICE PLACEHOLDER: Registered Address Pending Formal Filing, New Delhi 110001]</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
