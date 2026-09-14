import { Router } from 'express';
import { getCaseStudies, getCaseStudyBySlug } from './caseStudy.controller';
import { validateRequest } from '../../middleware/validate';
import { caseStudyQuerySchema, caseStudyParamsSchema } from './caseStudy.schema';

const router = Router();

router.get('/', validateRequest({ query: caseStudyQuerySchema }), getCaseStudies);
router.get('/:slug', validateRequest({ params: caseStudyParamsSchema }), getCaseStudyBySlug);

export const caseStudyRoutes = router;
