import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

// OAuth initiation & callback
router.get('/google', authController.initiateGoogleAuth);
router.get('/google/callback', authController.handleGoogleCallback);

// Authenticated session check
router.get('/me', authenticate, authController.getCurrentUser);

// Invalidate session
router.post('/logout', authController.logout);

export const authRoutes = router;
