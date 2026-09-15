import React from 'react';
import { LogoCloud } from '@/components/editorial/LogoCloud';

export const TrustSection: React.FC = () => {
  return (
    <section aria-label="Institutional Trust" className="border-b border-slate-200">
      <LogoCloud
        title="Associated Brands & Organizations"
      />
    </section>
  );
};
