export interface CaseStudyData {
  slug: string;
  title: string;
  clientIndustry: string;
  engagementType: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  featured?: boolean;
}

export const caseStudiesData: CaseStudyData[] = [
  {
    slug: 'national-logistics-narrative-pivot',
    title: 'Strategic Narrative Pivot for National Logistics Consortium',
    clientIndustry: 'Real Estate & Infrastructure',
    engagementType: 'Strategic Repositioning & Media Relations',
    featured: true,
    summary: 'Orchestrating a unified multi-market communications campaign during a 12-state cold-chain infrastructure expansion, repositioning the client as a national supply chain stabilizer.',
    challenge: 'Following aggressive regional expansion, the client faced fragmented market recognition, regional union inquiries, and skepticism from national financial publications regarding balance sheet leverage.',
    strategy: 'Kalka Co. instituted an executive messaging framework that reframed the expansion from corporate land acquisition to critical national infrastructure resilience, aligning with macroeconomic supply chain priorities.',
    execution: 'Secured deep-dive analytical features in tier-1 business broadsheets, arranged an on-site broadcast tour for key business anchors, and published an executive whitepaper on regional freight efficiency.',
    outcome: 'Shifted editorial consensus from debt-leveraged expansion to essential national supply-chain security, laying a pristine communications foundation for subsequent institutional debt syndication.',
    metrics: [
      { label: 'Tier-1 Editorial Feature Placements [SAMPLE]', value: '28+' },
      { label: 'Share of Voice in National Logistics Coverage [SAMPLE]', value: '340%+' },
      { label: 'Neutral/Positive Coverage Ratio [SAMPLE]', value: '96%' },
    ],
  },
  {
    slug: 'tier-1-medical-network-crisis-containment',
    title: 'Acute Crisis Containment for Premier Healthcare Network',
    clientIndustry: 'Healthcare & Life Sciences',
    engagementType: 'Emergency Crisis Advisory',
    featured: true,
    summary: 'Neutralizing rapid speculative press regarding clinical data discrepancies and restoring patient, board, and regulator trust within 72 hours.',
    challenge: 'A rogue whistleblower allegation leaked to regional investigative journalists alleging systemic diagnostic reporting delays across eight regional hospitals, threatening acute reputational collapse.',
    strategy: 'Activated our 24/7 Crisis Command Cell within 45 minutes. Implemented strict holding statement discipline, verified medical record data alongside legal counsel, and established a dedicated briefing conduit for beat reporters.',
    execution: 'Issued a transparent, data-supported clinical audit within 18 hours, hosted an embargoed technical briefing for health editors, and facilitated an on-record interview with the Chief Medical Officer.',
    outcome: "Halted speculative broadcast coverage within 24 hours. The state health authority commended the network's voluntary transparency, preventing regulatory penalties and restoring patient booking volumes.",
    metrics: [
      { label: 'Response Deployment Time [SAMPLE]', value: '45 mins' },
      { label: 'Speculative Broadcast Cycle Halted [SAMPLE]', value: '< 24 hrs' },
      { label: 'Patient Retention Rate Maintained [SAMPLE]', value: '99.2%' },
    ],
  },
  {
    slug: 'fintech-series-c-announcement',
    title: 'Global Category Definition & Series C Announcement',
    clientIndustry: 'Technology & Startups',
    engagementType: 'Category Creation & Thought Leadership',
    featured: true,
    summary: 'Transforming an enterprise cross-border treasury platform into the recognized global pioneer of real-time multi-currency settlement.',
    challenge: 'Despite closing a substantial Series C funding round, the client was consistently pigeonholed as a low-margin payments processor by enterprise analysts and tech journalists.',
    strategy: 'Developed the proprietary category narrative of "Autonomous Treasury Liquidity", separating the client completely from commodity merchant payment gateways and highlighting institutional bank partnerships.',
    execution: 'Executed a synchronized global exclusive with premier international financial media, placed three op-eds by the founder on central bank digital currency transitions, and scheduled 14 analyst briefings.',
    outcome: 'The client was formally recognized as a Category Leader by two premier global technology research firms, directly driving a 180% surge in inbound enterprise tier-1 bank procurement discussions.',
    metrics: [
      { label: 'Global Media Impressions [SAMPLE]', value: '42M+' },
      { label: 'Enterprise Inbound RFP Inquiries [SAMPLE]', value: '+180%' },
      { label: 'Op-Ed Publications in Premier Dailies [SAMPLE]', value: '4' },
    ],
  },
  {
    slug: 'heritage-hospitality-rebranding',
    title: 'Heritage Brand Revitalization for Luxury Hospitality Group',
    clientIndustry: 'Luxury Hospitality & Travel',
    engagementType: 'Brand Positioning & Editorial PR',
    featured: false,
    summary: 'Re-energizing a 50-year-old hospitality brand to capture discerning next-generation luxury travelers without alienating loyal legacy patrons.',
    challenge: 'Perceived as nostalgic and dated by younger travelers, the group risked losing market share to design-forward boutique hotel operators.',
    strategy: 'Crafted a narrative centered on "Timeless Craftsmanship Re-imagined", highlighting artisanal restoration, contemporary culinary collaborations, and sustainability stewardship.',
    execution: 'Curated exclusive preview weekends for leading architecture and luxury travel editors, orchestrated private salon dinners with cultural luminaries, and launched an editorial print journal.',
    outcome: 'Achieved complete repositioning across travel and design press, resulting in historic occupancy highs across renovated properties within four months of re-launch.',
    metrics: [
      { label: 'Luxury & Design Covers Secured [SAMPLE]', value: '12' },
      { label: 'Direct Booking Revenue Growth [SAMPLE]', value: '+65%' },
      { label: 'Average Daily Rate Expansion [SAMPLE]', value: '+42%' },
    ],
  },
];
