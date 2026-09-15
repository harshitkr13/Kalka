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
    slug: 'real-estate',
    name: 'Real Estate',
    sectorTag: 'Built Environment',
    featured: true,
    heroExcerpt: 'Strategic communications for residential, commercial, and master-planned developments.',
    overview: 'In the real estate sector, brand reputation, buyer trust, and regulatory transparency are central to project success. We provide structured communications that articulate architectural vision, project milestones, and developer credibility.',
    keyChallenges: [
      'Maintaining buyer and investor confidence throughout construction and delivery cycles',
      'Communicating compliance, RERA guidelines, and statutory approvals clearly',
      'Managing media narratives around market trends and pricing milestones',
      'Positioning marquee commercial and residential developments to premier audiences',
    ],
    strategicApproach: 'We formulate proactive communications plans highlighting development milestones, architectural leadership, and transparent stakeholder engagement.',
    relevantServices: ['Public Relations', 'Media Relations', 'Content Development', 'Brand Positioning'],
  },
  {
    slug: 'infrastructure',
    name: 'Infrastructure',
    sectorTag: 'Core Development',
    featured: true,
    heroExcerpt: 'Communications advisory for major civic, logistics, and capital infrastructure initiatives.',
    overview: 'Infrastructure projects engage civic bodies, public institutions, and multi-tier stakeholders. We build communications frameworks that emphasize economic progress, long-term public value, and operational transparency.',
    keyChallenges: [
      'Engaging civic authorities, community stakeholders, and media simultaneously',
      'Communicating multi-year delivery timelines and environmental stewardship',
      'Managing public narratives during engineering and regulatory transitions',
      'Highlighting national and regional socio-economic impact',
    ],
    strategicApproach: 'We craft comprehensive communications strategies that highlight nation-building value, engineering excellence, and transparent progress updates.',
    relevantServices: ['Corporate Communications', 'Public Relations', 'Crisis Communications'],
  },
  {
    slug: 'corporate-organizations',
    name: 'Corporate Organizations',
    sectorTag: 'Enterprise',
    featured: true,
    heroExcerpt: 'Unified narrative stewardship for multi-sector corporate enterprises.',
    overview: 'Corporate organizations must communicate consistent values and business performance across subsidiaries, investors, partners, and media.',
    keyChallenges: [
      'Maintaining consistent corporate messaging across diverse operational divisions',
      'Navigating organizational restructuring, leadership changes, and strategic pivots',
      'Communicating governance, ethics, and sustainability priorities',
      'Balancing commercial goals with public stakeholder scrutiny',
    ],
    strategicApproach: 'We implement disciplined corporate narrative governance anchoring all divisions to a unified corporate reputation.',
    relevantServices: ['Corporate Communications', 'Reputation Management', 'Thought Leadership', 'Crisis Communications'],
  },
  {
    slug: 'startups',
    name: 'Startups',
    sectorTag: 'Emerging Ventures',
    featured: true,
    heroExcerpt: 'Positioning high-growth ventures and innovators for market visibility and stakeholder trust.',
    overview: 'For startups and high-growth ventures, strategic communications builds early credibility, attracts top talent, engages prospective investors, and establishes brand distinctiveness.',
    keyChallenges: [
      'Establishing category awareness in competitive, fast-moving markets',
      'Communicating business model viability and technology differentiation',
      'Managing funding announcements and growth milestones effectively',
      'Transitioning from early-stage storytelling to established enterprise reliability',
    ],
    strategicApproach: 'We craft focused narrative strategies that highlight founder vision, market problem-solving, and verified traction.',
    relevantServices: ['Public Relations', 'Thought Leadership', 'Brand Positioning', 'Digital Communications'],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    sectorTag: 'Experience & Travel',
    featured: false,
    heroExcerpt: 'Strategic brand storytelling and reputation guidance for hospitality and leisure destinations.',
    overview: 'The hospitality industry relies on consumer trust, service excellence, and evocative storytelling. We curate public communications that highlight exceptional experiences, brand ethos, and operational integrity.',
    keyChallenges: [
      'Building enduring brand prestige in competitive hospitality corridors',
      'Managing online customer feedback, operational incidents, and public reviews',
      'Curating lifestyle and business press interest for properties and culinary concepts',
      'Maintaining consistent messaging across regional and seasonal cycles',
    ],
    strategicApproach: 'We blend lifestyle media relations, destination storytelling, and proactive reputation monitoring to strengthen brand resonance.',
    relevantServices: ['Brand Positioning', 'Media Relations', 'Reputation Management', 'Content Development'],
  },
  {
    slug: 'education',
    name: 'Education',
    sectorTag: 'Academic & Learning',
    featured: false,
    heroExcerpt: 'Reputation and stakeholder communications for educational institutions and learning organizations.',
    overview: 'Educational organizations require communications that balance academic rigor, parental trust, student aspirations, and institutional heritage.',
    keyChallenges: [
      'Building trust with students, parents, faculty, and regulatory bodies',
      'Communicating curriculum innovations, research achievements, and campus developments',
      'Managing sensitive institutional issues with empathy and discretion',
      'Highlighting alumni impact and community engagement',
    ],
    strategicApproach: 'We develop clear institutional narratives that spotlight academic impact, learning innovation, and community trust.',
    relevantServices: ['Public Relations', 'Corporate Communications', 'Digital Communications', 'Content Development'],
  },
  {
    slug: 'retail',
    name: 'Retail',
    sectorTag: 'Consumer Commerce',
    featured: false,
    heroExcerpt: 'Brand communications and consumer visibility for retail networks and consumer brands.',
    overview: 'Retail brands navigate dynamic consumer sentiment, multichannel presence, and rapid media trends. We deliver focused communications that drive visibility and deepen brand loyalty.',
    keyChallenges: [
      'Cutting through consumer market noise with meaningful brand differentiation',
      'Managing product launch communications and regional store expansions',
      'Addressing customer satisfaction and supply chain perceptions proactively',
      'Aligning digital commerce channels with physical brand identity',
    ],
    strategicApproach: 'We craft agile consumer and trade media communications that showcase product excellence and customer commitment.',
    relevantServices: ['Brand Positioning', 'Content Development', 'Public Relations', 'Digital Communications'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    sectorTag: 'Health & Wellness',
    featured: false,
    heroExcerpt: 'Responsible, evidence-based communications for healthcare providers and medical organizations.',
    overview: 'Healthcare communications demand absolute accuracy, sensitivity, and patient-first ethics. We provide structured guidance that reinforces professional credibility and public assurance.',
    keyChallenges: [
      'Communicating medical procedures and clinical expertise responsibly',
      'Navigating public health advisories, regulatory guidelines, and patient privacy',
      'Managing acute operational issues and critical media inquiries',
      'Educating communities on wellness, preventative care, and health infrastructure',
    ],
    strategicApproach: 'We work closely with leadership to develop factual, reassuring, and responsible communications upholding patient trust.',
    relevantServices: ['Crisis Communications', 'Reputation Management', 'Media Relations', 'Public Relations'],
  },
  {
    slug: 'public-affairs',
    name: 'Public Affairs',
    sectorTag: 'Policy & Advocacy',
    featured: false,
    heroExcerpt: 'Strategic communications on policy discourse, civic engagement, and institutional dialogue.',
    overview: 'Navigating public dialogue requires nuanced, fact-driven messaging that aligns organizational objectives with broader public interests and civic discourse.',
    keyChallenges: [
      'Articulating complex organizational positions on policy and economic issues',
      'Fostering constructive dialogue with community stakeholders and civil society',
      'Ensuring transparency and factual precision in all public representations',
      'Managing multi-stakeholder feedback across media and public forums',
    ],
    strategicApproach: 'We craft disciplined communications frameworks that foster informed, constructive engagement on matters of public relevance.',
    relevantServices: ['Corporate Communications', 'Thought Leadership', 'Crisis Communications', 'Public Relations'],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    sectorTag: 'Advisory & Legal',
    featured: false,
    heroExcerpt: 'Thought leadership and credibility building for consulting, legal, and financial practices.',
    overview: 'In professional services, firm reputation and individual practitioner expertise are the primary currencies. We help firms showcase their intellectual depth and advisory excellence.',
    keyChallenges: [
      'Demonstrating distinct expertise in high-trust advisory fields',
      'Packaging complex technical and legal perspectives into accessible commentary',
      'Maintaining client confidentiality while demonstrating domain authority',
      'Positioning partners as sought-after industry commentators',
    ],
    strategicApproach: 'We implement high-impact thought leadership, commentary placement, and executive profiling to establish clear domain authority.',
    relevantServices: ['Thought Leadership', 'Media Relations', 'Content Development', 'Brand Positioning'],
  },
];
