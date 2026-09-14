import { Router } from 'express';
import { getPublicSettings } from './settings.controller';

const router = Router();

router.get('/', getPublicSettings);

export const settingsRoutes = router;
