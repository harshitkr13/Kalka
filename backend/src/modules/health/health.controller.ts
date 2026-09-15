import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { sendSuccess } from '../../utils/apiResponse';
import { env } from '../../config/env';

export function getHealth(_req: Request, res: Response): Response {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const isDbConnected = dbState === 1;
  const isHealthy = env.NODE_ENV === 'test' || isDbConnected;
  const status = isHealthy ? 'healthy' : 'degraded';

  return sendSuccess(
    res,
    {
      status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
      database: dbStatusMap[dbState] || 'unknown',
    },
    isDbConnected
      ? 'Kalka Co. API service operational'
      : 'Kalka Co. API operational in degraded mode (database unavailable)'
  );
}
