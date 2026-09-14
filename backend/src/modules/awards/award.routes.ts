import { Router } from 'express';
import { getAwards } from './award.controller';
import { validateRequest } from '../../middleware/validate';
import { awardQuerySchema } from './award.schema';

const router = Router();

router.get('/', validateRequest({ query: awardQuerySchema }), getAwards);

export const awardRoutes = router;
