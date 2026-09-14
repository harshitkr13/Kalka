export interface CareerRole {
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

export const careersData: CareerRole[] = [
  {
    slug: 'senior-director-corporate-media-relations',
    title: 'Senior Director, Corporate & Media Relations',
    department: 'Media Relations Practice',
    location: 'Corporate Office / Hybrid',
    employmentType: 'Full-Time',
    experience: '8-12 Years',
    description: 'We are seeking an exceptional communications strategist with deep established relationships across tier-1 national financial and business newsrooms to lead marquee client engagements.',
    responsibilities: [
      'Lead strategic narrative formulation and client executive positioning for Fortune 500 and enterprise clients.',
      'Maintain continuous personal relationships with senior editors, bureau chiefs, and broadcast producers.',
      'Direct account teams in executing proactive pitch cycles, press conferences, and executive media briefings.',
      'Serve as a trusted advisor to c-suite clients during quarterly earnings, transactions, and major corporate milestones.',
    ],
    requirements: [
      'Demonstrated track record of securing premier coverage across national business and financial periodicals.',
      'Exceptional editorial writing and speechwriting acumen under demanding deadlines.',
      'Strong understanding of capital markets, corporate governance, and macroeconomic policy.',
      'Bachelor’s or Master’s degree in Journalism, Communications, Public Affairs, or related field.',
    ],
    niceToHave: [
      'Prior experience as an active business or financial journalist at a recognized publication.',
      'Experience managing complex multi-state infrastructure or real estate accounts.',
    ],
  },
  {
    slug: 'crisis-communications-associate-director',
    title: 'Associate Director, Crisis & Risk Advisory',
    department: 'Reputation Defense Practice',
    location: 'Corporate Office / On-Call',
    employmentType: 'Full-Time',
    experience: '5-8 Years',
    description: 'Join our Rapid Response Crisis Command Cell, guiding corporate leadership through regulatory investigations, hostile inquiries, and acute reputational challenges.',
    responsibilities: [
      'Activate and coordinate real-time crisis response protocols within minutes of incident notification.',
      'Draft legally sound, empathetic holding statements, executive Q&As, and stakeholder briefing memos.',
      'Monitor real-time digital and broadcast sentiment to evaluate narrative contamination.',
      'Conduct crisis simulation workshops and spokesperson media preparation for leadership teams.',
    ],
    requirements: [
      'Direct hands-on experience handling acute corporate crises, regulatory matters, or litigation communications.',
      'Unshakeable composure, analytical speed, and impeccable written judgment under pressure.',
      'Deep understanding of defamation law, regulatory disclosure rules, and digital media dynamics.',
    ],
    niceToHave: [
      'Background in public affairs, legal communications, or government press operations.',
    ],
  },
  {
    slug: 'editorial-content-strategist',
    title: 'Senior Editorial Content Strategist',
    department: 'Thought Leadership Practice',
    location: 'Corporate Office / Flexible',
    employmentType: 'Full-Time',
    experience: '4-7 Years',
    description: 'Partner with industry-leading chairpersons and founders to craft publishing-grade op-eds, corporate whitepapers, and thought leadership research dispatches.',
    responsibilities: [
      'Conduct in-depth intellectual interviews with executive leaders to extract original industry viewpoints.',
      'Write analytical essays, whitepapers, and op-eds for submission to premier national and international publications.',
      'Collaborate with design teams to produce sophisticated corporate impact reports and brand books.',
      'Curate thematic executive newsletters and editorial series on macro industry developments.',
    ],
    requirements: [
      'Portfolio demonstrating high-caliber published articles, op-eds, or analytical research papers.',
      'Ability to translate complex technical, real estate, and financial concepts into compelling prose.',
      'Relentless attention to factual accuracy, nuance, and structural storytelling.',
    ],
    niceToHave: [
      'Experience in long-form journalism or corporate publishing.',
    ],
  },
];
