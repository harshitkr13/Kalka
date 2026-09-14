export interface AwardData {
  id: string;
  name: string;
  organization: string;
  year: string;
  category: string;
  description: string;
}

export const awardsData: AwardData[] = [
  {
    id: 'a1',
    name: 'Strategic Communications Consultancy of the Year [SAMPLE RECOGNITION]',
    organization: 'Corporate Media & Communications Association [DEMO ORG]',
    year: '2026',
    category: 'Firm Excellence',
    description: 'Awarded for benchmark excellence in corporate narrative architecture, stakeholder alignment, and tier-1 media relations.',
  },
  {
    id: 'a2',
    name: 'Best Crisis Management Campaign [SAMPLE RECOGNITION]',
    organization: 'National Public Relations Council [DEMO COUNCIL]',
    year: '2025',
    category: 'Crisis Advisory',
    description: 'Commended for outstanding rapid-response reputation defense during complex corporate restructuring.',
  },
  {
    id: 'a3',
    name: 'Distinguished Thought Leadership Initiative [SAMPLE RECOGNITION]',
    organization: 'Global Business Communications Forum [DEMO FORUM]',
    year: '2025',
    category: 'Thought Leadership',
    description: 'Recognized for executive research publications that shaped national debate on infrastructure resilience.',
  },
];
