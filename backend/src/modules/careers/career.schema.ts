import { z } from 'zod';

export const careerQuerySchema = z.object({
  department: z.string().optional(),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
});

export const careerParamsSchema = z.object({
  slug: z.string().min(1, 'Slug is required').trim(),
});
