import React from 'react';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { Shield, Zap, Award, Compass } from 'lucide-react';

export const WhyKalka: React.FC = () => {
  const pillars = [
    {
      icon: <Compass className="w-6 h-6 text-gold" />,
      title: 'Senior Newsroom DNA',
      description: 'We do not broadcast promotional press releases. Our counsel is formulated by seasoned media veterans who know precisely how tier-1 editors evaluate narrative merit.',
    },
    {
      icon: <Zap className="w-6 h-6 text-gold" />,
      title: 'Unmatched Response Velocity',
      description: 'In modern media environments, silence is fatal. Our rapid-response command protocols evaluate facts, formulate holding lines, and engage reporters in under 60 minutes.',
    },
    {
      icon: <Shield className="w-6 h-6 text-gold" />,
      title: 'Institutional Defense',
      description: 'We insulate our clients against reputational exposure, regulatory cross-examination, and hostile digital sentiment through rigorous multi-stakeholder messaging.',
    },
    {
      icon: <Award className="w-6 h-6 text-gold" />,
      title: 'Measurable Strategic Authority',
      description: 'We replace empty vanity metrics with qualitative sentiment benchmarks, executive thought leadership placements, and verified investor resonance.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200 text-left">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="The Kalka Advantage"
          title="Why Leading Enterprises Entrust Their Reputation to Kalka Co."
          description="We provide the strategic counsel, discreet media alliances, and operational rigor required to navigate high-stakes moments with absolute poise."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-7 border border-slate-200 rounded bg-slate-50/40 hover:border-gold/60 transition-all duration-200 space-y-4"
            >
              <div className="w-12 h-12 rounded bg-navy text-gold flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
