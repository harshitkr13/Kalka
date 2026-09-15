import { z } from 'zod';

export const publicContactSubmissionSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(150),
  phone: z.string().trim().min(6, 'Please provide a valid contact number').max(30),
  whatsapp: z.string().trim().max(30).optional(),
  company: z.string().trim().min(2, 'Organization name must be at least 2 characters').max(150),
  designation: z.string().trim().max(100).optional(),
  enquiryType: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 'GENERAL';
      const upper = val.toUpperCase();
      if (['GENERAL', 'SERVICE', 'MEDIA', 'PARTNERSHIP', 'CAREERS', 'OTHER'].includes(upper)) {
        return upper as 'GENERAL' | 'SERVICE' | 'MEDIA' | 'PARTNERSHIP' | 'CAREERS' | 'OTHER';
      }
      // Map frontend tab aliases
      if (val.toLowerCase() === 'corporate') return 'GENERAL';
      if (val.toLowerCase() === 'crisis') return 'SERVICE';
      if (val.toLowerCase() === 'talent') return 'PARTNERSHIP';
      return 'GENERAL';
    }),
  service: z.string().trim().max(100).optional(),
  serviceSlug: z.string().trim().max(100).optional(),
  industry: z.string().trim().max(100).optional(),
  urgency: z
    .enum(['standard', 'priority', 'crisis'])
    .optional()
    .default('standard'),
  message: z.string().trim().min(10, 'Executive brief must be at least 10 characters').max(3000),
  source: z
    .enum(['CONTACT_FORM', 'SERVICE_ENQUIRY', 'WHATSAPP', 'EMAIL_CTA', 'OTHER'])
    .optional()
    .default('CONTACT_FORM'),
  sourcePage: z.string().trim().max(200).optional(),
  consent: z.boolean().optional().default(true),
  // Anti-spam honeypot field. Must be empty in legitimate submissions.
  hp_company_sec: z.string().optional(),
});

export const adminUpdateLeadSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'CLOSED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assignedTo: z.string().nullable().optional(),
});

export const adminAddNoteSchema = z.object({
  content: z.string().trim().min(2, 'Note content must be at least 2 characters').max(2000),
});

export const adminLeadQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Math.max(1, parseInt(val, 10)) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val, 10))) : 20)),
  search: z.string().optional(),
  status: z.enum(['all', 'NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'CLOSED']).optional().default('all'),
  enquiryType: z.string().optional(),
  priority: z.enum(['all', 'LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional().default('all'),
  serviceSlug: z.string().optional(),
  sort: z.string().optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});
