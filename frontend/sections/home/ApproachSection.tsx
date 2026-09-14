import React from 'react';
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-7 rounded border border-navy-border bg-navy-surface/50 space-y-4 relative"
            >
              <span className="font-serif text-3xl font-bold text-gold/80 block">
                {step.number}
              </span>
              <h3 className="font-serif text-xl font-semibold text-white">
                {step.title}
              </h3>
              <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                {step.subtitle}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-navy-border/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
