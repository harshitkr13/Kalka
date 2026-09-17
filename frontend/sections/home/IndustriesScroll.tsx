import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { IndustryCard } from '@/components/cards/IndustryCard';
import { industriesData } from '@/lib/content/industries';
import { Button } from '@/components/ui/Button';

export const IndustriesScroll: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Sector Expertise"
          title="Tailored Strategic Communications for Marquee Industries"
          description="Each sector possesses unique regulatory dynamics, media rhythms, and stakeholder vulnerabilities. We deliver bespoke, domain-specific counsel."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {industriesData.map((ind, idx) => (
            <div
              key={ind.slug}
              className={idx === 9 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : undefined}
            >
              <IndustryCard
                title={ind.name}
                sectorTag={ind.sectorTag}
                description={ind.heroExcerpt}
                featured={ind.featured}
                href={`/industries/${ind.slug}`}
                className="h-full"
              />
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/industries">
            <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore All Industry Practices
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
