import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { requestLogger } from './middleware/requestLogger';
import { apiLimiter } from './middleware/rateLimiter';
import { notFoundHandler } from './middleware/notFoundHandler';
import { errorHandler } from './middleware/errorHandler';
import { sendSuccess } from './utils/apiResponse';
import { logger } from './utils/logger';

import session from 'express-session';
import MongoStore from 'connect-mongo';

// Module routes
import { healthRoutes } from './modules/health/health.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { serviceRoutes } from './modules/services/service.routes';
import { industryRoutes } from './modules/industries/industry.routes';
import { clientRoutes } from './modules/clients/client.routes';
import { caseStudyRoutes } from './modules/caseStudies/caseStudy.routes';
import { blogRoutes } from './modules/blogs/blog.routes';
import { newsRoutes } from './modules/news/news.routes';
import { mediaMentionRoutes } from './modules/mediaMentions/mediaMention.routes';
import { awardRoutes } from './modules/awards/award.routes';
import { galleryRoutes } from './modules/gallery/gallery.routes';
import { careerRoutes } from './modules/careers/career.routes';
import { officeRoutes } from './modules/offices/office.routes';
import { settingsRoutes } from './modules/settings/settings.routes';
import { adminRoutes } from './modules/admin/admin.routes';

export function createApp(): Express {
  const app = express();

  // Security Headers
  app.use(helmet());

  // CORS Configuration
  const allowedOrigins = [env.CORS_ORIGIN, env.FRONTEND_URL]
    .flatMap((o) => o.split(','))
    .map((o) => o.trim())
    .filter(Boolean);
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS origin '${origin}' not permitted`));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );

  // Body Parsing with size limits
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Logging middleware
  app.use(requestLogger);

  // Secure Server-Side Sessions
  const sessionStore =
    env.NODE_ENV === 'test'
      ? undefined
      : MongoStore.create({
          mongoUrl: env.MONGODB_URI,
          collectionName: 'sessions',
          ttl: 14 * 24 * 60 * 60, // 14 days
          autoRemove: 'native',
          mongoOptions: {
            serverSelectionTimeoutMS: 15000,
          },
        });

  if (sessionStore) {
    sessionStore.on('error', (err: Error) => {
      logger.warn(`Session store communication warning: ${err?.message || 'Store error'}`);
    });
    ((sessionStore as unknown) as { clientP?: Promise<unknown> }).clientP?.catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : 'Initialization error';
      logger.warn(`Session store client initialization warning: ${msg}`);
    });
  }

  app.use(
    session({
      name: 'kalka.sid',
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
        path: '/',
      },
    })
  );

  // Rate limiting on API routes
  app.use(env.API_PREFIX, apiLimiter);

  // Base API Info
  app.get('/', (_req: Request, res: Response) => {
    sendSuccess(
      res,
      {
        name: 'Kalka Co. Media Consultancy API',
        version: '1.0.0',
        documentation: '/api/health',
      },
      'Welcome to Kalka Co. Media Consultancy API Service'
    );
  });

  // Mount API module routes under API_PREFIX
  const prefix = env.API_PREFIX;
  app.use(`${prefix}/health`, healthRoutes);
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/services`, serviceRoutes);
  app.use(`${prefix}/industries`, industryRoutes);
  app.use(`${prefix}/clients`, clientRoutes);
  app.use(`${prefix}/case-studies`, caseStudyRoutes);
  app.use(`${prefix}/blogs`, blogRoutes);
  app.use(`${prefix}/news`, newsRoutes);
  app.use(`${prefix}/media-mentions`, mediaMentionRoutes);
  app.use(`${prefix}/awards`, awardRoutes);
  app.use(`${prefix}/gallery`, galleryRoutes);
  app.use(`${prefix}/careers`, careerRoutes);
  app.use(`${prefix}/offices`, officeRoutes);
  app.use(`${prefix}/settings`, settingsRoutes);
  app.use(`${prefix}/admin`, adminRoutes);

  // 404 handler
  app.use(notFoundHandler);

  // Centralized Error handler
  app.use(errorHandler);

  return app;
}

export const app = createApp();
