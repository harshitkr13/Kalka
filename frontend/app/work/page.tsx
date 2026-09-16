import type { Metadata } from 'next';
import CaseStudiesPage, { metadata as caseStudiesMetadata } from '../case-studies/page';

export const metadata: Metadata = {
  ...caseStudiesMetadata,
  title: 'Our Work & Case Studies | Kalka Co. Media Consultancy',
  alternates: {
    canonical: '/case-studies',
  },
};

export default CaseStudiesPage;
