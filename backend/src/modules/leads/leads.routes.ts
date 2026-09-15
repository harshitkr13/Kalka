import { Router } from 'express';
import { submitContactEnquiry } from './leads.controller';
import { contactSubmissionLimiter } from '../../middleware/rateLimiter';

const router = Router();

// Public contact & inquiry ingestion endpoint with rate limiting
router.post('/', contactSubmissionLimiter, submitContactEnquiry);

export const leadsPublicRoutes = router;
