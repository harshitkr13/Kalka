import { Router } from 'express';
import { getClients, getClientBySlug } from './client.controller';
import { validateRequest } from '../../middleware/validate';
import { clientQuerySchema, clientParamsSchema } from './client.schema';

const router = Router();

router.get('/', validateRequest({ query: clientQuerySchema }), getClients);
router.get('/:slug', validateRequest({ params: clientParamsSchema }), getClientBySlug);

export const clientRoutes = router;

