import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { CaseStudyCard } from '@/components/cards/CaseStudyCard';
import { caseStudiesData } from '@/lib/content/caseStudies';
import { Button } from '@/components/ui/Button';

export const SelectedWork: React.FC = () => {
  const featured = caseStudiesData[0];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Selected Strategic Work [SAMPLE CASE STUDY]"
          title="Case Studies in High-Impact Reputation Engineering [SAMPLE]"
          description="Demonstrated outcomes where strategic narrative alignment preserved enterprise valuation and created market-defining prominence [SAMPLE DATA]."
        />

        {featured && (
          <CaseStudyCard
            title={featured.title}
            clientIndustry={featured.clientIndustry}
            challengeBrief={featured.summary}
            metricPlaceholder={featured.metrics[1]?.value || '340%+'}
            metricLabel={featured.metrics[1]?.label || 'Share of Voice Gain [SAMPLE]'}
            href={`/case-studies/${featured.slug}`}
          />
        )}

        <div className="mt-14 text-center">
          <Link href="/case-studies">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Full Case Study Archive
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
