import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

export async function connectDatabase(): Promise<typeof mongoose> {
  try {
    // Mask sensitive credentials if any exist in the URI for logging
    const sanitizedUri = env.MONGODB_URI.replace(
      /(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/,
      '$1*****$3'
    );
    logger.info(`Connecting to MongoDB at: ${sanitizedUri}`);

    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    logger.info('MongoDB connected successfully');
    return conn;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected');
  } catch (error) {
    logger.error('Error during MongoDB disconnection:', error);
  }
}

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB connection lost. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB runtime error:', err);
});
