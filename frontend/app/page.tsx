import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/sections/Hero';
import { TrustSection } from '@/sections/home/TrustSection';
import { AboutTeaser } from '@/sections/home/AboutTeaser';
import { ServicesGrid } from '@/sections/home/ServicesGrid';
import { WhyKalka } from '@/sections/home/WhyKalka';
import { IndustriesScroll } from '@/sections/home/IndustriesScroll';
import { ApproachSection } from '@/sections/home/ApproachSection';
import { SelectedWork } from '@/sections/home/SelectedWork';
import { MediaCoverage } from '@/sections/home/MediaCoverage';
import { AwardsSection } from '@/sections/home/AwardsSection';
import { InsightsSection } from '@/sections/home/InsightsSection';
import { TeamSection } from '@/sections/home/TeamSection';
import { FinalCta } from '@/sections/home/FinalCta';

export const metadata: Metadata = {
  title: 'Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
  description: 'Advising market leaders, corporate boards, and transformative organizations on high-stakes narrative positioning, crisis communications, and media impact.',
  openGraph: {
    title: 'Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
    description: 'Premier media relations, corporate narrative governance, and executive thought leadership consultancy.',
    url: 'https://kalka.co',
    siteName: 'Kalka Co. Media Consultancy',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* 1. Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero */}
        <Hero
          badge="Strategic Communication. Lasting Impact."
          headline="We engineer authority and insulate corporate reputation in pivotal moments."
          subheadline="Kalka Co. provides high-stakes media relations, executive thought leadership, and 24/7 crisis containment to institutional market leaders."
          primaryCtaLabel="Start a Conversation"
          secondaryCtaLabel="Explore Case Studies"
        />

        {/* 3. Trust / Client Logos */}
        <TrustSection />

        {/* 4. About Kalka Co. */}
        <AboutTeaser />

        {/* 5. Services */}
        <ServicesGrid />

        {/* 6. Why Kalka */}
        <WhyKalka />

        {/* 7. Industries */}
        <IndustriesScroll />

        {/* 8. Approach / Methodology */}
        <ApproachSection />

        {/* 9. Selected Work */}
        <SelectedWork />

        {/* 10. Media Coverage */}
        <MediaCoverage />

        {/* 11. Awards / Recognition */}
        <AwardsSection />

        {/* 12. Insights */}
        <InsightsSection />

        {/* 13. Team */}
        <TeamSection />

        {/* 14. Final CTA */}
        <FinalCta />
      </main>

      {/* 15. Footer */}
      <Footer />
    </div>
  );
}
