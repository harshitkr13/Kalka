import { z } from 'zod';

export const mediaMentionQuerySchema = z.object({
  featured: z.enum(['true', 'false']).optional(),
  type: z.enum(['quote', 'feature', 'interview', 'mention']).optional(),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : undefined)),
});
