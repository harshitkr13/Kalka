import { connectDatabase, disconnectDatabase } from '../config/database';
import { logger } from './logger';
import { Service } from '../models/Service';
import { Industry } from '../models/Industry';
import { Client } from '../models/Client';
import { Office } from '../models/Office';
import { Settings } from '../models/Settings';

export async function seedDatabase(): Promise<void> {
  logger.info('Starting database seeding with official Kalka Co. records...');

  // 1. Official 9 Services
  const servicesData = [
    {
      name: 'Public Relations',
      slug: 'public-relations',
      shortDescription: 'Strategic communications campaigns, narrative architecture, and institutional reputation building.',
      description: 'Strategic public relations advisory designed for corporate institutions, brands, and leadership teams navigating dynamic stakeholder environments.',
      capabilities: ['Narrative Architecture', 'Institutional PR', 'Stakeholder Communications'],
      process: [
        { step: 1, title: 'Discovery & Audit', description: 'Comprehensive footprint and stakeholder perception analysis.' },
        { step: 2, title: 'Strategic Architecture', description: 'Formulation of core narrative pillars.' },
        { step: 3, title: 'Execution & Distribution', description: 'Engagement across key public touchpoints.' },
      ],
      relatedIndustries: ['corporate-organizations', 'real-estate', 'infrastructure'],
      featured: true,
      displayOrder: 1,
      status: 'published' as const,
    },
    {
      name: 'Media Relations',
      slug: 'media-relations',
      shortDescription: 'Targeted editorial positioning, press interactions, and proactive narrative management across tier-one media.',
      description: 'Disciplined media engagement connecting organizational milestones with national and global business press.',
      capabilities: ['Editorial Placement', 'Press Interactions', 'Media Briefings'],
      process: [
        { step: 1, title: 'Target Mapping', description: 'Identifying key editorial beats and journalists.' },
        { step: 2, title: 'Angle Formulation', description: 'Developing data-backed, newsworthy narratives.' },
        { step: 3, title: 'Briefing Facilitation', description: 'Coordinating high-value editorial interactions.' },
      ],
      relatedIndustries: ['corporate-organizations', 'startups', 'hospitality'],
      featured: true,
      displayOrder: 2,
      status: 'published' as const,
    },
    {
      name: 'Corporate Communications',
      slug: 'corporate-communications',
      shortDescription: 'Internal and external messaging alignment, stakeholder engagement, and executive communications.',
      description: 'Rigorous communication frameworks ensuring organizational coherence across internal teams, shareholders, and partners.',
      capabilities: ['Executive Messaging', 'Shareholder Letters', 'Internal Alignment'],
      process: [
        { step: 1, title: 'Alignment Review', description: 'Assessing internal and external communications touchpoints.' },
        { step: 2, title: 'Framework Design', description: 'Establishing consistent messaging standards.' },
        { step: 3, title: 'Operational Rollout', description: 'Deployment across organizational communication channels.' },
      ],
      relatedIndustries: ['corporate-organizations', 'infrastructure', 'healthcare'],
      featured: true,
      displayOrder: 3,
      status: 'published' as const,
    },
    {
      name: 'Reputation Management',
      slug: 'reputation-management',
      shortDescription: 'Long-term corporate standing protection, sentiment tracking, and risk mitigation strategies.',
      description: 'Comprehensive strategies to insulate brand equity and preserve enterprise trust over decades.',
      capabilities: ['Perception Tracking', 'Reputation Audits', 'Stakeholder Trust Restoration'],
      process: [
        { step: 1, title: 'Vulnerability Analysis', description: 'Scanning public and regulatory risk surfaces.' },
        { step: 2, title: 'Governance Protocol', description: 'Implementing proactive narrative safeguards.' },
        { step: 3, title: 'Continuous Review', description: 'Ongoing monitoring and sentiment recalibration.' },
      ],
      relatedIndustries: ['real-estate', 'corporate-organizations', 'education'],
      featured: true,
      displayOrder: 4,
      status: 'published' as const,
    },
    {
      name: 'Thought Leadership',
      slug: 'thought-leadership',
      shortDescription: 'C-suite positioning, strategic op-eds, white papers, and keynote speaking management.',
      description: 'Transforming executive knowledge and organizational breakthroughs into industry-shaping insights.',
      capabilities: ['Op-Ed Development', 'Keynote Placement', 'Industry Commentary'],
      process: [
        { step: 1, title: 'Executive Voice Discovery', description: 'Extracting differentiated viewpoints and expertise.' },
        { step: 2, title: 'Content Crafting', description: 'Drafting authoritative essays and papers.' },
        { step: 3, title: 'Platform Distribution', description: 'Placing commentary in leading publications.' },
      ],
      relatedIndustries: ['professional-services', 'startups', 'corporate-organizations'],
      featured: true,
      displayOrder: 5,
      status: 'published' as const,
    },
    {
      name: 'Content Development',
      slug: 'content-development',
      shortDescription: 'High-impact press releases, company profiles, briefing books, and corporate narratives.',
      description: 'Publishing-grade corporate content drafted with editorial rigor and clear positioning.',
      capabilities: ['Press Releases', 'Corporate Dossiers', 'Briefing Books'],
      process: [
        { step: 1, title: 'Information Extraction', description: 'Gathering verifiable data and milestones.' },
        { step: 2, title: 'Editorial Drafting', description: 'Precision writing adhering to journalistic standards.' },
        { step: 3, title: 'Quality Assurance', description: 'Rigorous fact-checking and executive sign-off.' },
      ],
      relatedIndustries: ['retail', 'hospitality', 'corporate-organizations'],
      featured: false,
      displayOrder: 6,
      status: 'published' as const,
    },
    {
      name: 'Crisis Communications',
      slug: 'crisis-communications',
      shortDescription: 'Immediate crisis response protocols, issue containment, media management, and narrative restoration.',
      description: 'Critical communications management during regulatory probes, legal proceedings, and public crises.',
      capabilities: ['Rapid Response Unit', 'Incident Moratoriums', 'Stakeholder Briefings'],
      process: [
        { step: 1, title: 'Containment', description: 'Immediate situational evaluation and protocol initiation.' },
        { step: 2, title: 'Statement Architecture', description: 'Evidence-backed factual framing.' },
        { step: 3, title: 'Restoration', description: 'Long-term reputation stabilization.' },
      ],
      relatedIndustries: ['real-estate', 'infrastructure', 'healthcare'],
      featured: true,
      displayOrder: 7,
      status: 'published' as const,
    },
    {
      name: 'Brand Positioning',
      slug: 'brand-positioning',
      shortDescription: 'Market differentiation, brand identity narrative development, and competitive repositioning.',
      description: 'Distilling complex value propositions into compelling, memorable market identities.',
      capabilities: ['Brand Differentiation', 'Competitive Audits', 'Value Proposition Architecture'],
      process: [
        { step: 1, title: 'Competitive Mapping', description: 'Analyzing market landscape and positioning whitespace.' },
        { step: 2, title: 'Core Framing', description: 'Crafting brand pillars and distinct value propositions.' },
        { step: 3, title: 'Go-to-Market Rollout', description: 'Deploying updated positioning across all touchpoints.' },
      ],
      relatedIndustries: ['retail', 'hospitality', 'startups'],
      featured: false,
      displayOrder: 8,
      status: 'published' as const,
    },
    {
      name: 'Digital Communications',
      slug: 'digital-communications',
      shortDescription: 'Online presence management, digital PR strategies, and digital reputation protection.',
      description: 'Strategic digital narrative alignment across professional networks, knowledge graphs, and digital media.',
      capabilities: ['Digital PR', 'Executive Social Governance', 'Search & Knowledge Alignment'],
      process: [
        { step: 1, title: 'Digital Audit', description: 'Assessing search results and digital footprint.' },
        { step: 2, title: 'Channel Optimization', description: 'Aligning digital channels with core messaging.' },
        { step: 3, title: 'Distribution', description: 'Syndicating strategic announcements across digital ecosystems.' },
      ],
      relatedIndustries: ['startups', 'retail', 'education'],
      featured: false,
      displayOrder: 9,
      status: 'published' as const,
    },
  ];

  for (const item of servicesData) {
    await Service.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, new: true });
  }
  logger.info(`Seeded ${servicesData.length} official services`);

  // 2. Official 10 Industries
  const industriesData = [
    {
      name: 'Real Estate',
      slug: 'real-estate',
      description: 'High-stakes positioning for developers, commercial property portfolios, and residential masterminds.',
      relatedServices: ['public-relations', 'crisis-communications', 'reputation-management'],
      caseStudies: [],
      featured: true,
      displayOrder: 1,
      status: 'published' as const,
    },
    {
      name: 'Infrastructure',
      slug: 'infrastructure',
      description: 'Strategic communications for large-scale engineering, logistics, transport, and capital infrastructure projects.',
      relatedServices: ['corporate-communications', 'public-relations', 'crisis-communications'],
      caseStudies: [],
      featured: true,
      displayOrder: 2,
      status: 'published' as const,
    },
    {
      name: 'Corporate Organizations',
      slug: 'corporate-organizations',
      description: 'Institutional narrative architecture for conglomerates, multinational divisions, and enterprise holding companies.',
      relatedServices: ['corporate-communications', 'media-relations', 'thought-leadership'],
      caseStudies: [],
      featured: true,
      displayOrder: 3,
      status: 'published' as const,
    },
    {
      name: 'Startups',
      slug: 'startups',
      description: 'Growth-stage narrative building, milestone communications, and founder profiling for venture-backed disruptors.',
      relatedServices: ['media-relations', 'brand-positioning', 'digital-communications'],
      caseStudies: [],
      featured: true,
      displayOrder: 4,
      status: 'published' as const,
    },
    {
      name: 'Hospitality',
      slug: 'hospitality',
      description: 'Brand equity elevation and guest-sentiment management for luxury hotels, dining groups, and leisure destinations.',
      relatedServices: ['public-relations', 'brand-positioning', 'content-development'],
      caseStudies: [],
      featured: false,
      displayOrder: 5,
      status: 'published' as const,
    },
    {
      name: 'Education',
      slug: 'education',
      description: 'Institutional reputation management and stakeholder alignment for universities, academies, and ed-tech leaders.',
      relatedServices: ['reputation-management', 'corporate-communications', 'digital-communications'],
      caseStudies: [],
      featured: false,
      displayOrder: 6,
      status: 'published' as const,
    },
    {
      name: 'Retail',
      slug: 'retail',
      description: 'Consumer brand storytelling, retail network expansion announcements, and public relations for lifestyle brands.',
      relatedServices: ['brand-positioning', 'content-development', 'media-relations'],
      caseStudies: [],
      featured: false,
      displayOrder: 7,
      status: 'published' as const,
    },
    {
      name: 'Healthcare',
      slug: 'healthcare',
      description: 'Nuanced communications for hospitals, pharmaceutical groups, and diagnostic networks.',
      relatedServices: ['crisis-communications', 'corporate-communications', 'public-relations'],
      caseStudies: [],
      featured: true,
      displayOrder: 8,
      status: 'published' as const,
    },
    {
      name: 'Public Affairs',
      slug: 'public-affairs',
      description: 'Policy stakeholder alignment, public advocacy communications, and regulatory narrative framing.',
      relatedServices: ['thought-leadership', 'corporate-communications', 'crisis-communications'],
      caseStudies: [],
      featured: false,
      displayOrder: 9,
      status: 'published' as const,
    },
    {
      name: 'Professional Services',
      slug: 'professional-services',
      description: 'Credibility architecture and executive thought leadership for legal, advisory, and financial consultancies.',
      relatedServices: ['thought-leadership', 'reputation-management', 'media-relations'],
      caseStudies: [],
      featured: false,
      displayOrder: 10,
      status: 'published' as const,
    },
  ];

  for (const item of industriesData) {
    await Industry.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, new: true });
  }
  logger.info(`Seeded ${industriesData.length} official industries`);

  // 3. Official 8 Clients (Pending Approval)
  const clientsData = [
    {
      name: 'Keventers',
      industry: 'Retail & Hospitality',
      description: 'Associated client — pending formal public disclosure approval.',
      featured: true,
      displayOrder: 1,
      status: 'published' as const,
    },
    {
      name: 'SS Group',
      industry: 'Real Estate',
      description: 'Associated client — pending formal public disclosure approval.',
      featured: true,
      displayOrder: 2,
      status: 'published' as const,
    },
    {
      name: 'VVIP Group',
      industry: 'Real Estate & Infrastructure',
      description: 'Associated client — pending formal public disclosure approval.',
      featured: true,
      displayOrder: 3,
      status: 'published' as const,
    },
    {
      name: 'Jiaara Jewellery',
      industry: 'Luxury & Retail',
      description: 'Associated client — pending formal public disclosure approval.',
      featured: true,
      displayOrder: 4,
      status: 'published' as const,
    },
    {
      name: 'Basic Alliance',
      industry: 'Corporate Organizations',
      description: 'Associated client — pending formal public disclosure approval.',
      featured: true,
      displayOrder: 5,
      status: 'published' as const,
    },
    {
      name: 'Bhaarat Wealth Group',
      industry: 'Financial Services',
      description: 'Associated client — pending formal public disclosure approval.',
      featured: true,
      displayOrder: 6,
      status: 'published' as const,
    },
    {
      name: 'CARESY',
      industry: 'Healthcare',
      description: 'Associated client — pending formal public disclosure approval.',
      featured: true,
      displayOrder: 7,
      status: 'published' as const,
    },
    {
      name: 'The Chambers of Bharat Chugh',
      industry: 'Legal & Professional Services',
      description: 'Associated client — pending formal public disclosure approval.',
      featured: true,
      displayOrder: 8,
      status: 'published' as const,
    },
  ];

  for (const item of clientsData) {
    await Client.findOneAndUpdate({ name: item.name }, item, { upsert: true, new: true });
  }
  logger.info(`Seeded ${clientsData.length} official clients`);

  // 4. Official Headquarters Office
  const officesData = [
    {
      name: 'Faridabad Headquarters',
      city: 'Faridabad',
      country: 'India',
      address: 'Faridabad, Haryana 121003',
      phone: '+91 87450 01570 / +91 76830 15257',
      email: 'djdurgesh8@gmail.com',
      isHeadquarters: true,
      displayOrder: 1,
      status: 'published' as const,
    },
  ];

  for (const item of officesData) {
    await Office.findOneAndUpdate({ name: item.name }, item, { upsert: true, new: true });
  }
  logger.info(`Seeded ${officesData.length} official offices`);

  // 5. Official Settings
  await Settings.findOneAndUpdate(
    {},
    {
      siteName: 'Kalka Co. Media Consultancy',
      siteTagline: 'Strategic Communication. Lasting Impact.',
      contactEmail: 'djdurgesh8@gmail.com',
      contactPhone: '+91 87450 01570 / +91 76830 15257',
      primaryOffice: 'Faridabad, Haryana 121003',
      socialLinks: {},
      seoDefaults: {
        title: 'Kalka Co. Media Consultancy — Strategic Communication. Lasting Impact.',
        description:
          'Kalka Co. Media Consultancy is a strategic communications and public relations consultancy focused on helping businesses, brands, organizations and industry leaders build visibility, strengthen reputation and create meaningful engagement through strategic communication, media relations and reputation management.',
      },
      isMaintenanceMode: false,
    },
    { upsert: true, new: true }
  );
  logger.info('Seeded official company settings');

  logger.info('Official database seeding completed successfully.');
}

if (require.main === module) {
  (async () => {
    try {
      await connectDatabase();
      await seedDatabase();
      await disconnectDatabase();
      process.exit(0);
    } catch (err) {
      logger.error('Seeding script failed:', err);
      process.exit(1);
    }
  })();
}
