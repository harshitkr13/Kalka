import { Router } from 'express';
import { getCareers, getCareerBySlug } from './career.controller';
import { validateRequest } from '../../middleware/validate';
import { careerQuerySchema, careerParamsSchema } from './career.schema';

const router = Router();

router.get('/', validateRequest({ query: careerQuerySchema }), getCareers);
router.get('/:slug', validateRequest({ params: careerParamsSchema }), getCareerBySlug);

export const careerRoutes = router;
