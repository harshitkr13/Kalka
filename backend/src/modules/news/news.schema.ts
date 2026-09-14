import { z } from 'zod';

export const newsQuerySchema = z.object({
  featured: z.enum(['true', 'false']).optional(),
  category: z.string().optional(),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
});

export const newsParamsSchema = z.object({
  slug: z.string().min(1, 'Slug is required').trim(),
});
