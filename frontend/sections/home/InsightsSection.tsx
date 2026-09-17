import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { BlogCard } from '@/components/cards/BlogCard';
import { insightsData } from '@/lib/content/insights';
import { Button } from '@/components/ui/Button';

export const InsightsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Intelligence & Perspectives"
          title="Thought Leadership on the Frontiers of Corporate Media"
          description="Analytical essays and strategic frameworks authored by Kalka Co. advisory directors on reputation, policy, and media architecture."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insightsData.map((item) => (
            <BlogCard
              key={item.slug}
              title={item.title}
              subtitle={item.subtitle}
              category={item.category}
              datePlaceholder={item.publishedDate}
              readTime={item.readTime}
              href={`/insights/${item.slug}`}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/insights">
            <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore All Strategic Insights
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
