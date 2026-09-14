import { Router } from 'express';
import { getMediaMentions } from './mediaMention.controller';
import { validateRequest } from '../../middleware/validate';
import { mediaMentionQuerySchema } from './mediaMention.schema';

const router = Router();

router.get('/', validateRequest({ query: mediaMentionQuerySchema }), getMediaMentions);

export const mediaMentionRoutes = router;
