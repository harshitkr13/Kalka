import { Router } from 'express';
import { getClients } from './client.controller';
import { validateRequest } from '../../middleware/validate';
import { clientQuerySchema } from './client.schema';

const router = Router();

router.get('/', validateRequest({ query: clientQuerySchema }), getClients);

export const clientRoutes = router;
