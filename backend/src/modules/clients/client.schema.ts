import { z } from 'zod';

export const clientQuerySchema = z.object({
  featured: z.enum(['true', 'false']).optional(),
  industry: z.string().optional(),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
});

export const clientParamsSchema = z.object({
  slug: z.string().min(1),
});

