import { z } from 'zod';

export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const paginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Math.max(1, parseInt(val, 10)) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val, 10))) : 20)),
  search: z.string().optional(),
  status: z.enum(['all', 'published', 'draft', 'archived']).optional().default('all'),
  sort: z.string().optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
  category: z.string().optional(),
  industry: z.string().optional(),
});

// Service Validation
export const createServiceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  slug: z.string().regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters').max(300),
  description: z.string().min(20, 'Full description must be at least 20 characters'),
  heroImage: z.string().optional(),
  capabilities: z.array(z.string().trim().min(1)).optional().default([]),
  process: z
    .array(
      z.object({
        step: z.number(),
        title: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .optional()
    .default([]),
  relatedIndustries: z.array(z.string().trim().min(1)).optional().default([]),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().optional().default(0),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  status: z.enum(['published', 'draft', 'archived']).optional().default('draft'),
});

export const updateServiceSchema = createServiceSchema.partial();

// Industry Validation
export const createIndustrySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  slug: z.string().regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  heroImage: z.string().optional(),
  relatedServices: z.array(z.string().trim().min(1)).optional().default([]),
  caseStudies: z.array(z.string().trim().min(1)).optional().default([]),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().optional().default(0),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  status: z.enum(['published', 'draft', 'archived']).optional().default('draft'),
});

export const updateIndustrySchema = createIndustrySchema.partial();

// Case Study Validation
export const createCaseStudySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(150),
  slug: z.string().regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  clientName: z.string().min(2, 'Client name must be at least 2 characters'),
  industry: z.string().min(2, 'Industry is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  challenge: z.string().min(10, 'Challenge must be at least 10 characters'),
  strategy: z.string().min(10, 'Strategy must be at least 10 characters'),
  execution: z.string().min(10, 'Execution must be at least 10 characters'),
  results: z.string().min(10, 'Results must be at least 10 characters'),
  metrics: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      })
    )
    .optional()
    .default([]),
  coverImage: z.string().optional(),
  gallery: z.array(z.string()).optional().default([]),
  mediaCoverage: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  status: z.enum(['published', 'draft', 'archived']).optional().default('draft'),
});

export const updateCaseStudySchema = createCaseStudySchema.partial();

// Blog Validation
export const createBlogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(150),
  slug: z.string().regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  subtitle: z.string().optional(),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(400),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  author: z.object({
    name: z.string().min(2, 'Author name is required'),
    role: z.string().min(2, 'Author role is required'),
    avatar: z.string().optional(),
  }),
  category: z.string().min(2, 'Category is required'),
  tags: z.array(z.string().trim().min(1)).optional().default([]),
  featured: z.boolean().optional().default(false),
  publishedAt: z.string().datetime({ offset: true }).optional().or(z.string().optional()),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  status: z.enum(['published', 'draft', 'archived']).optional().default('draft'),
});

export const updateBlogSchema = createBlogSchema.partial();

// Category Validation
export const createCategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters').max(50),
  slug: z.string().regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

// Client Validation
export const createClientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  slug: z.string().regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  industry: z.string().min(2, 'Industry is required'),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  services: z.array(z.string().trim().min(1)).optional().default([]),
  website: z.string().optional(),
  logo: z.string().optional(),
  logoAsset: z.string().optional(),
  logoAlt: z.string().optional(),
  confidentiality: z.string().optional(),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().optional().default(0),
  approvalStatus: z
    .enum(['PENDING_APPROVAL', 'APPROVED', 'RESTRICTED'])
    .optional()
    .default('PENDING_APPROVAL'),
  status: z.enum(['published', 'draft', 'archived']).optional().default('draft'),
});

export const updateClientSchema = createClientSchema.partial();

export const clientApprovalSchema = z.object({
  approvalStatus: z.enum(['PENDING_APPROVAL', 'APPROVED', 'RESTRICTED']),
});

// Media Mention Validation
export const createMediaMentionSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(200),
  publication: z.string().min(2, 'Publication name is required').max(100),
  date: z.string().min(2, 'Date is required'),
  url: z.string().optional(),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  coverImage: z.string().optional(),
  type: z.enum(['quote', 'feature', 'interview', 'mention']).optional().default('mention'),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().optional().default(0),
  status: z.enum(['published', 'draft', 'archived']).optional().default('draft'),
});

export const updateMediaMentionSchema = createMediaMentionSchema.partial();

// Award Validation
export const createAwardSchema = z.object({
  name: z.string().min(2, 'Award name must be at least 2 characters').max(200),
  organization: z.string().min(2, 'Awarding organization is required').max(150),
  year: z.number().int().min(1950).max(2100),
  category: z.string().min(2, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().optional(),
  externalUrl: z.string().optional(),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().optional().default(0),
  status: z.enum(['published', 'draft', 'archived']).optional().default('draft'),
});

export const updateAwardSchema = createAwardSchema.partial();

// Team Member Validation
export const createTeamMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  slug: z.string().regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  designation: z.string().min(2, 'Designation is required').max(100),
  bio: z.string().min(10, 'Biography must be at least 10 characters'),
  photo: z.string().optional(),
  expertise: z.array(z.string().trim().min(1)).optional().default([]),
  linkedinUrl: z.string().optional(),
  email: z.string().optional(),
  displayOrder: z.number().optional().default(0),
  featured: z.boolean().optional().default(false),
  status: z.enum(['published', 'draft', 'archived']).optional().default('draft'),
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial();

// Career Validation
export const createCareerSchema = z.object({
  title: z.string().min(2, 'Job title must be at least 2 characters').max(150),
  slug: z.string().regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  department: z.string().min(2, 'Department is required'),
  location: z.string().min(2, 'Location is required'),
  employmentType: z
    .enum(['Full-time', 'Part-time', 'Contract', 'Internship'])
    .optional()
    .default('Full-time'),
  experience: z.string().min(1, 'Experience level is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requirements: z.array(z.string().trim().min(1)).optional().default([]),
  responsibilities: z.array(z.string().trim().min(1)).optional().default([]),
  deadline: z.string().optional(),
  applicationEmail: z.string().email().optional().default('djdurgesh8@gmail.com'),
  applicationUrl: z.string().optional(),
  displayOrder: z.number().optional().default(0),
  featured: z.boolean().optional().default(false),
  active: z.boolean().optional().default(true),
  status: z.enum(['published', 'draft', 'closed', 'archived']).optional().default('draft'),
});

export const updateCareerSchema = createCareerSchema.partial();

// Gallery / Media Asset Validation
export const createGallerySchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(150),
  caption: z.string().optional(),
  category: z.string().min(2, 'Category is required'),
  imageUrl: z.string().min(1, 'Image URL or path is required'),
  filename: z.string().optional(),
  altText: z.string().optional(),
  fileSize: z.number().optional(),
  mimeType: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  aspectRatio: z.enum(['landscape', 'portrait', 'square']).optional().default('landscape'),
  tags: z.array(z.string().trim().min(1)).optional().default([]),
  featured: z.boolean().optional().default(false),
  displayOrder: z.number().optional().default(0),
  status: z.enum(['published', 'draft', 'archived']).optional().default('draft'),
});

export const updateGallerySchema = createGallerySchema.partial();

