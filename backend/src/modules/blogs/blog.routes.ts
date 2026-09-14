import { Router } from 'express';
import { getBlogs, getBlogBySlug } from './blog.controller';
import { validateRequest } from '../../middleware/validate';
import { blogQuerySchema, blogParamsSchema } from './blog.schema';

const router = Router();

router.get('/', validateRequest({ query: blogQuerySchema }), getBlogs);
router.get('/:slug', validateRequest({ params: blogParamsSchema }), getBlogBySlug);

export const blogRoutes = router;
