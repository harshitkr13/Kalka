import { Router } from 'express';
import { getGallery } from './gallery.controller';
import { validateRequest } from '../../middleware/validate';
import { galleryQuerySchema } from './gallery.schema';

const router = Router();

router.get('/', validateRequest({ query: galleryQuerySchema }), getGallery);

export const galleryRoutes = router;
