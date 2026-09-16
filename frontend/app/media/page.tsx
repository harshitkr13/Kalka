import type { Metadata } from 'next';
import MediaCoveragePage, { metadata as mediaCoverageMetadata } from '../media-mentions/page';

export const metadata: Metadata = {
  ...mediaCoverageMetadata,
  title: 'Media Coverage & Press | Kalka Co. Media Consultancy',
  alternates: {
    canonical: '/media-mentions',
  },
};

export default MediaCoveragePage;
