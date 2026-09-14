import { connectDatabase, disconnectDatabase } from '../config/database';
import { logger } from './logger';
import { Service } from '../models/Service';
import { Industry } from '../models/Industry';
import { Client } from '../models/Client';
import { Office } from '../models/Office';
import { Settings } from '../models/Settings';

export async function seedDatabase(): Promise<void> {
  logger.info('Starting database seeding with compliant sample records...');

  // 1. Services
  const servicesData = [
    {
      name: 'Strategic Communications [SAMPLE / DEMO]',
      slug: 'strategic-communications',
      shortDescription: 'High-stakes narrative architecture and executive positioning for enterprise leadership.',
      description: 'End-to-end strategic advisory designed for leadership teams navigating complex media ecosystems and public scrutiny.',
      capabilities: ['Executive Media Training', 'Narrative Architecture', 'Thought Leadership Campaigns'],
      process: [
        { step: 1, title: 'Discovery & Audit', description: 'Comprehensive media footprint and stakeholder perception analysis.' },
        { step: 2, title: 'Positioning Architecture', description: 'Formulation of core pillars and executive narrative framing.' },
        { step: 3, title: 'Execution & Distribution', description: 'Tier-1 editorial engagement and strategic positioning.' },
      ],
      relatedIndustries: ['technology', 'finance-banking'],
      featured: true,
      displayOrder: 1,
      status: 'published' as const,
    },
    {
      name: 'Crisis Advisory & Reputation [SAMPLE / DEMO]',
      slug: 'crisis-advisory-reputation',
      shortDescription: 'Rapid-response reputation shielding, counter-narrative deployment, and mitigation.',
      description: 'Immediate strategic guidance during sensitive scenarios, regulatory investigations, and public scrutiny.',
      capabilities: ['Rapid Response War Room', 'Stakeholder Alignment', 'Damage Mitigation'],
      process: [
        { step: 1, title: 'Containment', description: 'Immediate threat assessment and communication moratorium protocols.' },
        { step: 2, title: 'Counter-Narrative', description: 'Evidence-backed factual framing and stakeholder briefings.' },
        { step: 3, title: 'Restoration', description: 'Long-term reputation rebuilding and governance alignment.' },
      ],
      relatedIndustries: ['healthcare-pharma', 'energy-infrastructure'],
      featured: true,
      displayOrder: 2,
      status: 'published' as const,
    },
  ];

  for (const item of servicesData) {
    await Service.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, new: true });
  }
  logger.info(`Seeded ${servicesData.length} sample services`);

  // 2. Industries
  const industriesData = [
    {
      name: 'Technology & Enterprise SaaS [SAMPLE / DEMO]',
      slug: 'technology',
      description: 'Media advisory tailored for venture-backed disruptors and global enterprise software providers.',
      relatedServices: ['strategic-communications'],
      caseStudies: [],
      featured: true,
      displayOrder: 1,
      status: 'published' as const,
    },
    {
      name: 'Finance & Capital Markets [SAMPLE / DEMO]',
      slug: 'finance-banking',
      description: 'Precision advisory for investment institutions, fin-tech pioneers, and banking corporations.',
      relatedServices: ['crisis-advisory-reputation'],
      caseStudies: [],
      featured: true,
      displayOrder: 2,
      status: 'published' as const,
    },
  ];

  for (const item of industriesData) {
    await Industry.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, new: true });
  }
  logger.info(`Seeded ${industriesData.length} sample industries`);

  // 3. Clients
  const clientsData = [
    {
      name: 'Apex Horizon Ventures [SAMPLE / DEMO]',
      industry: 'Technology',
      description: 'Sample enterprise technology client for demonstration purposes.',
      featured: true,
      displayOrder: 1,
      status: 'published' as const,
    },
    {
      name: 'Meridian Capital Partners [SAMPLE / DEMO]',
      industry: 'Finance',
      description: 'Sample private equity institution for demonstration purposes.',
      featured: true,
      displayOrder: 2,
      status: 'published' as const,
    },
  ];

  for (const item of clientsData) {
    await Client.findOneAndUpdate({ name: item.name }, item, { upsert: true, new: true });
  }
  logger.info(`Seeded ${clientsData.length} sample clients`);

  // 4. Offices
  const officesData = [
    {
      name: 'New Delhi Headquarters [SAMPLE / DEMO]',
      city: 'New Delhi',
      country: 'India',
      address: 'Barakhamba Road, Connaught Place, New Delhi 110001',
      phone: '+91 11 0000 0000',
      email: 'delhi@kalka.co',
      isHeadquarters: true,
      displayOrder: 1,
      status: 'published' as const,
    },
    {
      name: 'Mumbai Bureau [SAMPLE / DEMO]',
      city: 'Mumbai',
      country: 'India',
      address: 'Bandra Kurla Complex, Bandra East, Mumbai 400051',
      phone: '+91 22 0000 0000',
      email: 'mumbai@kalka.co',
      isHeadquarters: false,
      displayOrder: 2,
      status: 'published' as const,
    },
  ];

  for (const item of officesData) {
    await Office.findOneAndUpdate({ name: item.name }, item, { upsert: true, new: true });
  }
  logger.info(`Seeded ${officesData.length} sample offices`);

  // 5. Settings
  await Settings.findOneAndUpdate(
    {},
    {
      siteName: 'Kalka Co. Media Consultancy',
      siteTagline: 'Strategic Media Consultancy & Executive Advisory',
      contactEmail: 'contact@kalka.co',
      contactPhone: '+91 11 0000 0000',
      primaryOffice: 'New Delhi',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        youtube: 'https://youtube.com',
      },
      seoDefaults: {
        title: 'Kalka Co. — Strategic Media Consultancy',
        description: 'High-stakes media consultancy and strategic communications advisory.',
      },
      isMaintenanceMode: false,
    },
    { upsert: true, new: true }
  );
  logger.info('Seeded default settings');

  logger.info('Database seeding completed successfully.');
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
