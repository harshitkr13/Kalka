import { app } from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';
import { logger } from './utils/logger';

async function startServer(): Promise<void> {
  try {
    // Attempt database connection (does not crash app if offline in dev/test)
    try {
      await connectDatabase();
    } catch (dbErr) {
      logger.warn('Initial MongoDB connection failed. Running in degraded/offline mode.', dbErr);
    }

    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Kalka Co. Backend Server listening on port ${env.PORT} [${env.NODE_ENV}]`);
      logger.info(`📡 API endpoint base: http://localhost:${env.PORT}${env.API_PREFIX}`);
    });

    // Graceful shutdown handlers
    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        logger.info('HTTP server closed.');
        await disconnectDatabase();
        logger.info('Process terminated gracefully.');
        process.exit(0);
      });

      // Force exit if hanging
      setTimeout(() => {
        logger.error('Graceful shutdown timeout exceeded. Forcing exit.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled Promise Rejection:', reason);
    });

    process.on('uncaughtException', (err) => {
      logger.error('Uncaught Exception:', err);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
