import { Router } from 'express';
import { getServices, getServiceBySlug } from './service.controller';
import { validateRequest } from '../../middleware/validate';
import { serviceQuerySchema, serviceParamsSchema } from './service.schema';

const router = Router();

router.get('/', validateRequest({ query: serviceQuerySchema }), getServices);
router.get('/:slug', validateRequest({ params: serviceParamsSchema }), getServiceBySlug);

export const serviceRoutes = router;
