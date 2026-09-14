export interface MediaMention {
  id: string;
  publication: string;
  headline: string;
  date: string;
  category: string;
  quoteExcerpt: string;
  urlPlaceholder: string;
}

export const mediaMentionsData: MediaMention[] = [
  {
    id: 'm1',
    publication: 'National Financial Daily [DEMO OUTLET]',
    headline: 'The New Rules of Crisis Containment for Multi-Jurisdiction Enterprises',
    date: 'September 2026',
    category: 'Crisis Advisory',
    quoteExcerpt: 'Advisory firms like Kalka Co. emphasize that the traditional 48-hour crisis buffer has collapsed into minutes, forcing c-suites to adopt real-time narrative command.',
    urlPlaceholder: '#',
  },
  {
    id: 'm2',
    publication: 'Pan-Asian Business Review [DEMO OUTLET]',
    headline: 'Real Estate Developers Turn to Strategic Communications Amid Urban Scrutiny',
    date: 'August 2026',
    category: 'Real Estate PR',
    quoteExcerpt: 'Marquee infrastructure consortia are prioritizing structured narrative governance to navigate civic and investor expectations.',
    urlPlaceholder: '#',
  },
  {
    id: 'm3',
    publication: 'Global Markets Dispatch [DEMO OUTLET]',
    headline: 'Why Tech IPO Candidates Are Re-evaluating Category Creation Early',
    date: 'July 2026',
    category: 'Capital Markets',
    quoteExcerpt: 'Kalka Co. strategists note that public market investors reward companies that define defensible intellectual categories well ahead of formal roadshows.',
    urlPlaceholder: '#',
  },
];
