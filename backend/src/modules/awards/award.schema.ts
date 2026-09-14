import { z } from 'zod';

export const awardQuerySchema = z.object({
  featured: z.enum(['true', 'false']).optional(),
  year: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
});
