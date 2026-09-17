export interface AssociatedClient {
  name: string;
  industry?: string;
}

export const associatedClients: AssociatedClient[] = [
  { name: 'Keventers', industry: 'Retail & Hospitality' },
  { name: 'SS Group', industry: 'Real Estate' },
  { name: 'VVIP Group', industry: 'Real Estate & Infrastructure' },
  { name: 'Jiaara Jewellery', industry: 'Luxury & Retail' },
  { name: 'Basic Alliance', industry: 'Corporate Organizations' },
  { name: 'Bhaarat Wealth Group', industry: 'Financial Services' },
  { name: 'CARESY', industry: 'Healthcare' },
  { name: 'The Chambers of Bharat Chugh', industry: 'Legal & Professional Services' },
];

export interface ClientCategory {
  sector: string;
  description: string;
  clientCountPlaceholder: string;
  representativeFocus: string;
}

export const clientCategories: ClientCategory[] = [
  {
    sector: 'Real Estate & Infrastructure',
    description: 'Advising commercial developers, infrastructure consortiums, and urban sponsors on project milestones and stakeholder confidence.',
    clientCountPlaceholder: 'SECTOR PRACTICE',
    representativeFocus: 'Master-planned developments, urban infrastructure, commercial leasing PR',
  },
  {
    sector: 'Corporate Organizations & Conglomerates',
    description: 'Providing corporate reputation governance and strategic communications across multi-industry group operations.',
    clientCountPlaceholder: 'SECTOR PRACTICE',
    representativeFocus: 'Corporate restructurings, annual reports, transaction communications',
  },
  {
    sector: 'Startups & Emerging Ventures',
    description: 'Positioning software, technology, and emerging enterprise ventures for visibility and stakeholder trust.',
    clientCountPlaceholder: 'SECTOR PRACTICE',
    representativeFocus: 'Category creation, growth announcements, executive commentary',
  },
  {
    sector: 'Healthcare & Life Sciences',
    description: 'Guiding healthcare systems, research groups, and medical organizations through public communications.',
    clientCountPlaceholder: 'SECTOR PRACTICE',
    representativeFocus: 'Crisis readiness, clinical innovation communication, ethical messaging',
  },
  {
    sector: 'Hospitality & Consumer Brands',
    description: 'Crafting editorial campaigns and brand positioning for hospitality, retail, and lifestyle brands.',
    clientCountPlaceholder: 'SECTOR PRACTICE',
    representativeFocus: 'Brand launches, media relations, customer engagement',
  },
];
