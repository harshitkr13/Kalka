/* eslint-disable no-console */
import { env } from '../config/env';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function sanitize(data: unknown): unknown {
  if (typeof data === 'string') {
    return data.replace(/(password|token|secret|key)=([^&]+)/gi, '$1=*****');
  }
  if (data && typeof data === 'object') {
    const copy = { ...(data as Record<string, unknown>) };
    for (const key of Object.keys(copy)) {
      if (/password|token|secret|key|authorization/i.test(key)) {
        copy[key] = '*****';
      }
    }
    return copy;
  }
  return data;
}

function formatMessage(level: LogLevel, message: string, meta?: unknown): string {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(sanitize(meta))}` : '';
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}${metaStr}`;
}

export const logger = {
  info(message: string, meta?: unknown): void {
    console.log(formatMessage('info', message, meta));
  },
  warn(message: string, meta?: unknown): void {
    console.warn(formatMessage('warn', message, meta));
  },
  error(message: string, error?: unknown): void {
    const errorDetails = error instanceof Error ? { message: error.message, stack: env.NODE_ENV === 'development' ? error.stack : undefined } : error;
    console.error(formatMessage('error', message, errorDetails));
  },
  debug(message: string, meta?: unknown): void {
    if (env.NODE_ENV !== 'production') {
      console.log(formatMessage('debug', message, meta));
    }
  },
};
