export interface IndustryData {
  slug: string;
  name: string;
  sectorTag: string;
  heroExcerpt: string;
  overview: string;
  keyChallenges: string[];
  strategicApproach: string;
  relevantServices: string[];
  featured?: boolean;
}

export const industriesData: IndustryData[] = [
  {
    slug: 'real-estate-infrastructure',
    name: 'Real Estate & Infrastructure',
    sectorTag: 'Built Environment',
    featured: true,
    heroExcerpt: 'Shaping monumental narratives for iconic developments, urban infrastructure, and institutional assets.',
    overview: 'From billion-dollar mixed-use developments to national transit infrastructure, built-environment initiatives require multi-tiered communication that engages civic authorities, institutional investors, and local communities with transparency.',
    keyChallenges: [
      'Navigating regulatory and environmental scrutiny',
      'Maintaining stakeholder confidence through multi-year construction lifecycles',
      'Articulating transformative societal and economic value to skeptical public audiences',
      'Positioning marquee commercial assets for institutional tenant leasing',
    ],
    strategicApproach: 'We develop overarching master-planned communication blueprints. By uniting architectural vision, economic impact data, and civic dialogue, we turn complex developments into celebrated civic milestones.',
    relevantServices: ['Public Relations', 'Corporate Communications', 'Crisis Communications', 'Content Development'],
  },
  {
    slug: 'corporate-conglomerates',
    name: 'Corporate & Conglomerates',
    sectorTag: 'Enterprise',
    featured: true,
    heroExcerpt: 'Unified narrative stewardship for complex, multi-sector parent companies.',
    overview: 'Conglomerates face the unique challenge of communicating cohesive group values while allowing individual business units the autonomy to dominate their respective markets.',
    keyChallenges: [
      'Preventing reputational contagion across diverse subsidiary entities',
      'Communicating corporate restructuring, divestitures, and strategic acquisitions',
      'Balancing traditional industrial heritage with modern digital and ESG demands',
      'Engaging sovereign wealth funds and international institutional investors',
    ],
    strategicApproach: 'We implement disciplined narrative governance that anchors all business divisions to a central institutional purpose, ensuring resilience under regulatory and macroeconomic shifts.',
    relevantServices: ['Corporate Communications', 'Reputation Management', 'Crisis Communications', 'Media Relations'],
  },
  {
    slug: 'technology-startups',
    name: 'Technology & Startups',
    sectorTag: 'Innovation',
    featured: true,
    heroExcerpt: 'Positioning transformative tech enterprises for capital, talent, and market dominance.',
    overview: 'In high-velocity tech ecosystems, PR must move beyond product announcements to institutional category creation, establishing founders as visionary voices capable of attracting venture capital and enterprise clients.',
    keyChallenges: [
      'Differentiating in crowded categories dominated by venture-backed incumbents',
      'Translating deep proprietary technical architecture into lucid business value',
      'Managing the narrative transition from early-stage disruptor to reliable enterprise partner',
      'Orchestrating high-impact funding round announcements (Series A through Pre-IPO)',
    ],
    strategicApproach: 'We combine rigorous category-creation messaging with exclusive tier-1 tech newsroom placements, ensuring technological innovation translates into measurable commercial momentum.',
    relevantServices: ['Public Relations', 'Thought Leadership', 'Brand Positioning', 'Digital Communications'],
  },
  {
    slug: 'healthcare-life-sciences',
    name: 'Healthcare & Life Sciences',
    sectorTag: 'Life Sciences',
    heroExcerpt: 'Ethical, evidence-based narrative guidance for medical institutions and biotech pioneers.',
    overview: 'Few sectors operate under greater regulatory scrutiny or emotional weight. Communications must balance scientific rigor with empathetic, accessible patient and investor messaging.',
    keyChallenges: [
      'Communicating clinical trial readouts and regulatory milestones with strict compliance',
      'Addressing public health misconceptions and high-profile medical litigation risks',
      'Educating clinical professionals and institutional payers simultaneously',
      'Defending pharmaceutical pricing and supply chain integrity under media scrutiny',
    ],
    strategicApproach: 'We bridge scientific complexity and public comprehension, working with medical directors and legal counsel to craft bulletproof messaging that builds deep institutional trust.',
    relevantServices: ['Crisis Communications', 'Reputation Management', 'Media Relations', 'Thought Leadership'],
  },
  {
    slug: 'luxury-hospitality',
    name: 'Luxury Hospitality & Travel',
    sectorTag: 'Lifestyle & Hospitality',
    heroExcerpt: 'Curating world-class experiential storytelling for marquee destinations and lifestyle brands.',
    overview: 'Luxury hospitality relies on emotional transcendence, heritage, and unmatched service perception. Our communications create bespoke cultural prestige that resonates with global high-net-worth travelers.',
    keyChallenges: [
      'Maintaining distinct heritage narratives amidst aggressive global brand expansions',
      'Engaging discerning ultra-high-net-worth travelers and cultural tastemakers',
      'Managing online guest review crises and high-profile security/service lapses',
      'Positioning experiential food & beverage offerings in competitive culinary capitals',
    ],
    strategicApproach: 'We craft aspirational, evocative storytelling placed across premier international luxury, architectural, and lifestyle publications, driving enduring global reservation prestige.',
    relevantServices: ['Brand Positioning', 'Media Relations', 'Content Development', 'Digital Communications'],
  },
  {
    slug: 'financial-services',
    name: 'Financial Services & Private Capital',
    sectorTag: 'Finance & Capital',
    heroExcerpt: 'Strategic communications for private equity, asset managers, and advisory firms.',
    overview: 'In private equity, wealth advisory, and investment banking, confidentiality and credibility are paramount. We manage discreet positioning that inspires LP confidence and deal flow.',
    keyChallenges: [
      'Communicating complex deal structures, fund closes, and portfolio turnarounds',
      'Operating under strict financial regulatory disclosure regimes',
      'Differentiating fund thesis in saturated private capital markets',
      'Mitigating reputational blowback during portfolio corporate reorganizations',
    ],
    strategicApproach: 'We orchestrate discreet, high-credibility media strategies that spotlight analytical acumen, fund performance, and stewardship without breaching regulatory boundaries.',
    relevantServices: ['Media Relations', 'Thought Leadership', 'Corporate Communications', 'Reputation Management'],
  },
];
