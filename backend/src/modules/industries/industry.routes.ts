import { Router } from 'express';
import { getIndustries, getIndustryBySlug } from './industry.controller';
import { validateRequest } from '../../middleware/validate';
import { industryQuerySchema, industryParamsSchema } from './industry.schema';

const router = Router();

router.get('/', validateRequest({ query: industryQuerySchema }), getIndustries);
router.get('/:slug', validateRequest({ params: industryParamsSchema }), getIndustryBySlug);

export const industryRoutes = router;
