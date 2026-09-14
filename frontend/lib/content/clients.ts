export interface ClientCategory {
  sector: string;
  description: string;
  clientCountPlaceholder: string;
  representativeFocus: string;
}

export const clientCategories: ClientCategory[] = [
  {
    sector: 'Real Estate & Institutional Asset Sponsors',
    description: 'Advising major commercial real estate developers, REITs, and infrastructure consortiums on asset milestones and investor confidence.',
    clientCountPlaceholder: '[VERIFIED PORTFOLIO CLIENTS]',
    representativeFocus: 'Master-planned developments, urban infrastructure, commercial leasing PR',
  },
  {
    sector: 'Diversified Corporate Conglomerates',
    description: 'Providing overarching corporate reputation governance and board communications across multi-industry group operations.',
    clientCountPlaceholder: '[VERIFIED PORTFOLIO CLIENTS]',
    representativeFocus: 'Corporate restructurings, annual reports, transaction communications',
  },
  {
    sector: 'High-Growth Tech Pioneers & Venture Leaders',
    description: 'Positioning market-defining enterprise software, fintech, and AI enterprises for institutional capital and tier-1 media presence.',
    clientCountPlaceholder: '[VERIFIED PORTFOLIO CLIENTS]',
    representativeFocus: 'Category creation, funding announcements, executive op-eds',
  },
  {
    sector: 'Healthcare & Life Sciences Systems',
    description: 'Guiding major hospital networks, medical technology pioneers, and research consortiums through sensitive public discourse.',
    clientCountPlaceholder: '[VERIFIED PORTFOLIO CLIENTS]',
    representativeFocus: 'Crisis containment, clinical innovation PR, ethical messaging',
  },
  {
    sector: 'Luxury Hospitality & Marquee Destinations',
    description: 'Crafting aspirational editorial campaigns and private media salons for world-renowned experiential travel brands.',
    clientCountPlaceholder: '[VERIFIED PORTFOLIO CLIENTS]',
    representativeFocus: 'Global destination launches, architectural PR, tastemaker engagement',
  },
];
