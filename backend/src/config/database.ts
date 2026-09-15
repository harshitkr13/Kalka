import dns from 'dns';
import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

// When using mongodb+srv://, some Windows/ISP local DNS resolvers fail on SRV queries (querySrv ECONNREFUSED).
// Configure reliable public DNS servers (Google 8.8.8.8, Cloudflare 1.1.1.1) to ensure seamless Atlas SRV resolution.
if (env.MONGODB_URI.startsWith('mongodb+srv://')) {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (dnsErr) {
    logger.debug('Custom DNS configuration skipped:', dnsErr);
  }
}

export async function connectDatabase(): Promise<typeof mongoose> {
  try {
    // Redact host/cluster safely without printing credentials or sensitive query params
    let safeTarget = 'remote cluster';
    try {
      const match = env.MONGODB_URI.match(/@([^/?#]+)/);
      if (match && match[1]) {
        safeTarget = match[1];
      } else {
        safeTarget = 'configured cluster';
      }
    } catch {
      safeTarget = 'configured cluster';
    }

    logger.info(`Connecting to MongoDB (${safeTarget})...`);

    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });

    logger.info('MongoDB connected successfully');
    return conn;
  } catch (error) {
    const errorMsg = error instanceof Error
      ? error.message.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@)/gi, '$1*****$3')
      : 'Unknown database error';
    logger.error(`MongoDB connection error: ${errorMsg}`);
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
