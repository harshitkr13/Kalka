import { Router } from 'express';
import { getOffices } from './office.controller';

const router = Router();

router.get('/', getOffices);

export const officeRoutes = router;
