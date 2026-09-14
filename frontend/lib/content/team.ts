export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  practiceArea: string;
  bio: string;
  expertise: string[];
}

export const teamData: TeamMember[] = [
  {
    id: 't1',
    name: 'Partner & Managing Director [SAMPLE PROFILE]',
    designation: 'Managing Partner',
    practiceArea: 'Corporate & Crisis Advisory',
    bio: 'Over two decades advising executive committees and corporate boards on high-stakes narrative positioning, major transactions, and reputation defense.',
    expertise: ['Crisis Command', 'M&A Communications', 'Board Advisory'],
  },
  {
    id: 't2',
    name: 'Senior Director, Media Relations [SAMPLE PROFILE]',
    designation: 'Practice Lead',
    practiceArea: 'Tier-1 Media Relations',
    bio: 'Former financial journalist with deep networks across premier national broadsheets and broadcast networks, orchestrating high-impact editorial placements.',
    expertise: ['Newsroom Strategy', 'Executive Profiles', 'Broadcast Access'],
  },
  {
    id: 't3',
    name: 'Director, Infrastructure & Built Environment [SAMPLE PROFILE]',
    designation: 'Director',
    practiceArea: 'Real Estate & Infrastructure',
    bio: 'Specialist in multi-stakeholder communication frameworks for monumental commercial developments, transit assets, and urban master plans.',
    expertise: ['Civic Engagement', 'Asset Launch PR', 'Investor Relations'],
  },
  {
    id: 't4',
    name: 'Head of Thought Leadership [SAMPLE PROFILE]',
    designation: 'Director',
    practiceArea: 'Executive Positioning',
    bio: 'Partnering with founders and chairpersons to formulate intellectual property, op-eds, and keynote addresses that drive industry consensus.',
    expertise: ['Ghostwriting', 'Keynote Strategy', 'Policy Briefings'],
  },
  {
    id: 't5',
    name: 'Associate Director, Crisis Cell [SAMPLE PROFILE]',
    designation: 'Associate Director',
    practiceArea: 'Rapid Response Operations',
    bio: 'Leading 24/7 monitoring and response protocols, neutralizing misinformation and maintaining clear communications conduits during critical scrutiny.',
    expertise: ['Dark Site Protocols', 'Hostile Inquiries', 'Social Intelligence'],
  },
  {
    id: 't6',
    name: 'Director, Digital Communications [SAMPLE PROFILE]',
    designation: 'Director',
    practiceArea: 'Digital Narrative & Channels',
    bio: 'Architecting executive digital presence and corporate content syndication systems with unwavering editorial discipline.',
    expertise: ['Executive LinkedIn', 'Digital Sentiment', 'Brand Journalism'],
  },
];
