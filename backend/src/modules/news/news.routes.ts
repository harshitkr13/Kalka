import { Router } from 'express';
import { getNews, getNewsBySlug } from './news.controller';
import { validateRequest } from '../../middleware/validate';
import { newsQuerySchema, newsParamsSchema } from './news.schema';

const router = Router();

router.get('/', validateRequest({ query: newsQuerySchema }), getNews);
router.get('/:slug', validateRequest({ params: newsParamsSchema }), getNewsBySlug);

export const newsRoutes = router;
