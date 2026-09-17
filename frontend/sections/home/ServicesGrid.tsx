import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { servicesData } from '@/lib/content/services';
import { Button } from '@/components/ui/Button';

export const ServicesGrid: React.FC = () => {
  // Showcase top 6 on homepage
  const featuredServices = servicesData.slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Our Advisory Practices"
          title="Engineered for Impact Across Every High-Stakes Channel"
          description="Comprehensive strategic communication and reputation counsel designed to position market leaders at the forefront of their industries."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.name}
              category={service.category}
              description={service.shortDescription}
              capabilities={service.capabilities.slice(0, 3)}
              badge={service.badge}
              href={`/services/${service.slug}`}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/services">
            <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore All 9 Core Practices
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
