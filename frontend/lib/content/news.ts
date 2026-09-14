export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

export const newsData: NewsItem[] = [
  {
    id: 'n1',
    title: 'Kalka Co. Expands Strategic Infrastructure & Built-Environment Practice',
    date: 'September 2026',
    category: 'Practice Expansion',
    excerpt: 'Deepening advisory capabilities for monumental commercial developments and national transit consortiums.',
    content: 'In response to surging capital allocation across regional infrastructure corridors, Kalka Co. has expanded its dedicated Infrastructure Practice, providing comprehensive narrative positioning, civic dialogue, and capital market communications for premier built-environment sponsors.',
  },
  {
    id: 'n2',
    title: 'Kalka Co. Issues Annual Corporate Narrative Integrity Report [SAMPLE BRIEFING]',
    date: 'August 2026',
    category: 'Thought Leadership',
    excerpt: 'Examining the impact of regulatory scrutiny and algorithmic news indexing on corporate brand equity.',
    content: 'Our latest research benchmark analyzes over 250 enterprise communications deployments, identifying key patterns in executive credibility, crisis containment velocity, and earned media resonance.',
  },
  {
    id: 'n3',
    title: 'Executive Appointments: Welcoming Senior Advisors to Crisis & Tech Desks',
    date: 'July 2026',
    category: 'Firm News',
    excerpt: 'Adding seasoned media relations veterans and former financial broadsheet editors to our leadership team.',
    content: 'Kalka Co. continues to bolster its senior advisory bench with seasoned communications leaders who bring decades of high-stakes media relations and crisis management experience to our institutional client portfolio.',
  },
];
