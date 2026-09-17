import React from 'react';
import Image from 'next/image';
import { SectionHeader } from '@/components/editorial/SectionHeader';

export const ApproachSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Diagnostic Intelligence',
      subtitle: 'Market & Perception Audit',
      description: 'We dissect your existing media footprint, stakeholder sentiment, and competitive narrative vulnerabilities using rigorous qualitative and analytical frameworks.',
    },
    {
      number: '02',
      title: 'Narrative Blueprinting',
      subtitle: 'Strategic Position Architecture',
      description: 'Formulating core message pillars, executive verbal identities, and scenario defense books that articulate your defensible market leadership.',
    },
    {
      number: '03',
      title: 'Tier-1 Execution',
      subtitle: 'Editorial Access & Placement',
      description: 'Engaging credentialed journalists, orchestrating high-value broadcast briefings, and placing publishing-grade op-eds that command national attention.',
    },
    {
      number: '04',
      title: 'Continuous Defense',
      subtitle: 'Surveillance & Reputation Shielding',
      description: 'Real-time narrative monitoring and proactive risk mitigation, ensuring corporate goodwill remains fortified through cycles of market scrutiny.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-navy-deep text-white border-b border-navy-border text-left">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Our Methodology"
          title="The Kalka Four-Stage Strategic Framework"
          description="A disciplined, repeatable advisory engagement model ensuring absolute clarity, compliance, and lasting reputation impact."
          className="text-white [&_h2]:text-white [&_p]:text-slate-300"
        />

        {/* Strategic Methodology Visual */}
        <div className="relative h-32 sm:h-40 md:h-44 w-full rounded-lg overflow-hidden border border-navy-border shadow-elevated mb-12 bg-navy-surface">
          <Image
            src="/assets/home/strategic-approach.webp"
            alt="The Kalka Four-Stage Strategic Communications Framework"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-gold block font-semibold">Advisory Methodology</span>
              <span className="text-base sm:text-lg font-serif text-white font-medium">Strategic Architecture & Institutional Precision</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-7 rounded border border-navy-border bg-navy-surface/50 space-y-3 relative flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gold px-2.5 py-0.5 rounded bg-gold/10 border border-gold/20 font-semibold">
                  Stage {step.number}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                {step.title}
              </h3>
              <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                {step.subtitle}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-navy-border/60 flex-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
