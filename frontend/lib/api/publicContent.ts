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
import { associatedClients } from '@/lib/content/clients';
import { mediaMentionsData, MediaMention } from '@/lib/content/mediaMentions';
import { awardsData, AwardData } from '@/lib/content/awards';
import { teamData, TeamMember } from '@/lib/content/team';
import { careersData, CareerRole } from '@/lib/content/careers';
import { getApiBaseUrl } from '../api';

const getApiBase = () => getApiBaseUrl();


/**
 * Fetch published services
 */
export async function getPublicServices(): Promise<ServiceData[]> {
  try {
    const res = await fetch(`${getApiBase()}/services`, {
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
    const res = await fetch(`${getApiBase()}/services/${slug}`, {
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
    const res = await fetch(`${getApiBase()}/industries`, {
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
    const res = await fetch(`${getApiBase()}/industries/${slug}`, {
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
    const res = await fetch(`${getApiBase()}/case-studies`, {
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
          coverImage: item.coverImage || undefined,
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
    const res = await fetch(`${getApiBase()}/case-studies/${slug}`, {
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
          metrics: Array.isArray(item.metrics)
            ? item.metrics
                .map((m: any) => ({
                  label: typeof m?.label === 'string' ? m.label : '',
                  value: typeof m?.value === 'string' ? m.value : '',
                }))
                .filter((m: { label: string; value: string }) => m.label || m.value)
            : [],
          featured: Boolean(item.featured),
          coverImage: typeof item.coverImage === 'string' && item.coverImage.trim().length > 0 ? item.coverImage.trim() : undefined,
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
    const res = await fetch(`${getApiBase()}/blogs`, {
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
    const res = await fetch(`${getApiBase()}/blogs/${slug}`, {
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

export interface PublicClientData {
  name: string;
  slug?: string;
  industry?: string;
  shortDescription?: string;
  approvalStatus?: string;
  logo?: string;
  logoAsset?: string;
}

/**
 * Fetch published clients with approval status enforcement
 */
export async function getPublicClients(): Promise<PublicClientData[]> {
  try {
    const res = await fetch(`${getApiBase()}/clients`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && Array.isArray(body.data) && body.data.length > 0) {
        return body.data
          .filter((item: any) => item.approvalStatus === 'APPROVED')
          .map((item: any): PublicClientData => ({
            name: item.name,
            slug: item.slug,
            industry: item.industry,
            shortDescription: item.shortDescription || '',
            approvalStatus: 'APPROVED',
            logo: item.logo,
            logoAsset: item.logoAsset,
          }));
      }
    }
  } catch {
    // Graceful fallback
  }
  return associatedClients.map((c) => ({
    name: c.name,
    industry: c.industry,
    approvalStatus: 'APPROVED',
  }));
}

/**
 * Fetch published media mentions
 */
export async function getPublicMediaMentions(): Promise<MediaMention[]> {
  try {
    const res = await fetch(`${getApiBase()}/media-mentions`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && Array.isArray(body.data) && body.data.length > 0) {
        return body.data.map((item: any): MediaMention => ({
          id: item._id,
          publication: item.publication,
          headline: item.title,
          date: item.date,
          category: item.type || 'Media Coverage',
          quoteExcerpt: item.excerpt,
          urlPlaceholder: item.url || '',
        }));
      }
    }
  } catch {
    // Fallback
  }
  return mediaMentionsData;
}

/**
 * Fetch published awards
 */
export async function getPublicAwards(): Promise<AwardData[]> {
  try {
    const res = await fetch(`${getApiBase()}/awards`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && Array.isArray(body.data) && body.data.length > 0) {
        return body.data.map((item: any): AwardData => ({
          id: item._id,
          name: item.name,
          organization: item.organization,
          year: String(item.year),
          category: item.category,
          description: item.description,
        }));
      }
    }
  } catch {
    // Fallback
  }
  return awardsData;
}

/**
 * Fetch published team members
 */
export async function getPublicTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetch(`${getApiBase()}/team`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && Array.isArray(body.data) && body.data.length > 0) {
        return body.data.map((item: any): TeamMember => ({
          id: item._id,
          name: item.name,
          designation: item.designation,
          practiceArea: item.expertise?.[0] || 'Leadership Advisory',
          bio: item.bio,
          expertise: Array.isArray(item.expertise) ? item.expertise : [],
        }));
      }
    }
  } catch {
    // Fallback
  }
  return teamData;
}

/**
 * Fetch published career postings
 */
export async function getPublicCareers(): Promise<CareerRole[]> {
  try {
    const res = await fetch(`${getApiBase()}/careers`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && Array.isArray(body.data) && body.data.length > 0) {
        return body.data.map((item: any): CareerRole => ({
          slug: item.slug,
          title: item.title,
          department: item.department,
          location: item.location,
          employmentType: item.employmentType,
          experience: item.experience,
          description: item.description,
          responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities : [],
          requirements: Array.isArray(item.requirements) ? item.requirements : [],
          niceToHave: [],
        }));
      }
    }
  } catch {
    // Fallback
  }
  return careersData;
}

/**
 * Fetch single career posting by slug
 */
export async function getPublicCareerBySlug(slug: string): Promise<CareerRole | null> {
  try {
    const res = await fetch(`${getApiBase()}/careers/${slug}`, {
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
          department: item.department,
          location: item.location,
          employmentType: item.employmentType,
          experience: item.experience,
          description: item.description,
          responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities : [],
          requirements: Array.isArray(item.requirements) ? item.requirements : [],
          niceToHave: [],
        };
      }
    }
  } catch {
    // Fallback
  }
  return careersData.find((c) => c.slug === slug) || null;
}

export interface PublicGalleryItem {
  id: string;
  title: string;
  caption?: string;
  category: string;
  imageUrl: string;
  filename?: string;
  altText?: string;
}

/**
 * Fetch published gallery/media assets
 */
export async function getPublicGalleryItems(): Promise<PublicGalleryItem[]> {
  try {
    const res = await fetch(`${getApiBase()}/gallery`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const body = await res.json();
      if (body.success && Array.isArray(body.data) && body.data.length > 0) {
        return body.data.map((item: any): PublicGalleryItem => ({
          id: item._id,
          title: item.title,
          caption: item.caption,
          category: item.category,
          imageUrl: item.imageUrl,
          filename: item.filename,
          altText: item.altText,
        }));
      }
    }
  } catch {
    // Fallback
  }
  return [];
}

