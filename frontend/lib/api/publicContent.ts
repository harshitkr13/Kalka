/**
 * Public Content API Adapter
 * 
 * Provides unified, resilient data access for public-facing views.
 * Queries live published CMS data from the Express backend with automatic
 * graceful fallback to static content if backend is offline or unseeded.
 */

import { servicesData, ServiceData } from '@/lib/content/services';
import { industriesData, IndustryData } from '@/lib/content/industries';
import { caseStudiesData, CaseStudyData } from '@/lib/content/caseStudies';
import { insightsData, InsightData } from '@/lib/content/insights';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Fetch published services
 */
export async function getPublicServices(): Promise<ServiceData[]> {
  try {
    const res = await fetch(`${API_BASE}/services`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && Array.isArray(body.data) && body.data.length > 0) {
        return body.data.map((item: any): ServiceData => ({
          slug: item.slug,
          name: item.name,
          category: item.category || 'Practice Area',
          tagline: item.shortDescription || '',
          shortDescription: item.shortDescription || '',
          fullDescription: item.description || '',
          capabilities: Array.isArray(item.capabilities) ? item.capabilities : [],
          process: Array.isArray(item.process)
            ? item.process.map((p: any, idx: number) => ({
                step: String(p.step || idx + 1).padStart(2, '0'),
                title: p.title || '',
                description: p.description || '',
              }))
            : [],
          relatedIndustries: Array.isArray(item.relatedIndustries) ? item.relatedIndustries : [],
          badge: item.featured ? 'Featured Practice' : undefined,
        }));
      }
    }
  } catch {
    // Graceful fallback to static data
  }
  return servicesData;
}

/**
 * Fetch a single service by slug
 */
export async function getPublicServiceBySlug(slug: string): Promise<ServiceData | null> {
  try {
    const res = await fetch(`${API_BASE}/services/${slug}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && body.data) {
        const item = body.data;
        return {
          slug: item.slug,
          name: item.name,
          category: item.category || 'Practice Area',
          tagline: item.shortDescription || '',
          shortDescription: item.shortDescription || '',
          fullDescription: item.description || '',
          capabilities: Array.isArray(item.capabilities) ? item.capabilities : [],
          process: Array.isArray(item.process)
            ? item.process.map((p: any, idx: number) => ({
                step: String(p.step || idx + 1).padStart(2, '0'),
                title: p.title || '',
                description: p.description || '',
              }))
            : [],
          relatedIndustries: Array.isArray(item.relatedIndustries) ? item.relatedIndustries : [],
          badge: item.featured ? 'Featured Practice' : undefined,
        };
      }
    }
  } catch {
    // Fallback
  }
  return servicesData.find((s) => s.slug === slug) || null;
}

/**
 * Fetch published industries
 */
export async function getPublicIndustries(): Promise<IndustryData[]> {
  try {
    const res = await fetch(`${API_BASE}/industries`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && Array.isArray(body.data) && body.data.length > 0) {
        return body.data.map((item: any): IndustryData => ({
          slug: item.slug,
          name: item.name,
          sectorTag: item.sectorTag || 'Industry Sector',
          heroExcerpt: item.description?.slice(0, 150) || '',
          overview: item.description || '',
          keyChallenges: Array.isArray(item.keyChallenges) ? item.keyChallenges : [],
          strategicApproach: item.strategicApproach || item.description || '',
          relevantServices: Array.isArray(item.relatedServices) ? item.relatedServices : [],
          featured: Boolean(item.featured),
        }));
      }
    }
  } catch {
    // Fallback
  }
  return industriesData;
}

/**
 * Fetch single industry by slug
 */
export async function getPublicIndustryBySlug(slug: string): Promise<IndustryData | null> {
  try {
    const res = await fetch(`${API_BASE}/industries/${slug}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && body.data) {
        const item = body.data;
        return {
          slug: item.slug,
          name: item.name,
          sectorTag: item.sectorTag || 'Industry Sector',
          heroExcerpt: item.description?.slice(0, 150) || '',
          overview: item.description || '',
          keyChallenges: Array.isArray(item.keyChallenges) ? item.keyChallenges : [],
          strategicApproach: item.strategicApproach || item.description || '',
          relevantServices: Array.isArray(item.relatedServices) ? item.relatedServices : [],
          featured: Boolean(item.featured),
        };
      }
    }
  } catch {
    // Fallback
  }
  return industriesData.find((i) => i.slug === slug) || null;
}

/**
 * Fetch published case studies
 */
export async function getPublicCaseStudies(): Promise<CaseStudyData[]> {
  try {
    const res = await fetch(`${API_BASE}/case-studies`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && Array.isArray(body.data) && body.data.length > 0) {
        return body.data.map((item: any): CaseStudyData => ({
          slug: item.slug,
          title: item.title,
          clientIndustry: item.industry || 'Enterprise',
          engagementType: item.engagementType || 'Strategic Communications',
          summary: item.summary || '',
          challenge: item.challenge || '',
          strategy: item.strategy || '',
          execution: item.execution || '',
          outcome: item.results || '',
          metrics: Array.isArray(item.metrics) ? item.metrics : [],
          featured: Boolean(item.featured),
        }));
      }
    }
  } catch {
    // Fallback
  }
  return caseStudiesData;
}

/**
 * Fetch single case study by slug
 */
export async function getPublicCaseStudyBySlug(slug: string): Promise<CaseStudyData | null> {
  try {
    const res = await fetch(`${API_BASE}/case-studies/${slug}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && body.data) {
        const item = body.data;
        return {
          slug: item.slug,
          title: item.title,
          clientIndustry: item.industry || 'Enterprise',
          engagementType: item.engagementType || 'Strategic Communications',
          summary: item.summary || '',
          challenge: item.challenge || '',
          strategy: item.strategy || '',
          execution: item.execution || '',
          outcome: item.results || '',
          metrics: Array.isArray(item.metrics) ? item.metrics : [],
          featured: Boolean(item.featured),
        };
      }
    }
  } catch {
    // Fallback
  }
  return caseStudiesData.find((c) => c.slug === slug) || null;
}

/**
 * Fetch published insights / articles
 */
export async function getPublicInsights(): Promise<InsightData[]> {
  try {
    const res = await fetch(`${API_BASE}/blogs`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && Array.isArray(body.data) && body.data.length > 0) {
        return body.data.map((item: any): InsightData => ({
          slug: item.slug,
          title: item.title,
          subtitle: item.subtitle || '',
          category: item.category || 'Strategic Perspective',
          author: item.author?.name || 'Editorial Advisory Desk',
          authorRole: item.author?.role || 'Senior Strategic Advisory',
          publishedDate: item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })
            : 'Recent',
          readTime: `${Math.max(1, Math.round((item.content?.length || 500) / 500))} min read`,
          summary: item.excerpt || '',
          content: [
            {
              heading: 'Strategic Assessment',
              paragraphs: item.content ? item.content.split('\n\n').filter(Boolean) : [],
            },
          ],
          tags: Array.isArray(item.tags) ? item.tags : [],
          featured: Boolean(item.featured),
        }));
      }
    }
  } catch {
    // Fallback
  }
  return insightsData;
}

/**
 * Fetch single insight by slug
 */
export async function getPublicInsightBySlug(slug: string): Promise<InsightData | null> {
  try {
    const res = await fetch(`${API_BASE}/blogs/${slug}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && body.data) {
        const item = body.data;
        return {
          slug: item.slug,
          title: item.title,
          subtitle: item.subtitle || '',
          category: item.category || 'Strategic Perspective',
          author: item.author?.name || 'Editorial Advisory Desk',
          authorRole: item.author?.role || 'Senior Strategic Advisory',
          publishedDate: item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })
            : 'Recent',
          readTime: `${Math.max(1, Math.round((item.content?.length || 500) / 500))} min read`,
          summary: item.excerpt || '',
          content: [
            {
              heading: 'Strategic Assessment',
              paragraphs: item.content ? item.content.split('\n\n').filter(Boolean) : [],
            },
          ],
          tags: Array.isArray(item.tags) ? item.tags : [],
          featured: Boolean(item.featured),
        };
      }
    }
  } catch {
    // Fallback
  }
  return insightsData.find((i) => i.slug === slug) || null;
}
