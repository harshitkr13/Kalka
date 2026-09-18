import crypto from 'crypto';
import { logger } from '../../utils/logger';

declare module 'express-session' {
  interface SessionData {
    oauthNonce?: string;
  }
}

export const OAUTH_STATE_MAX_AGE_MS = 10 * 60 * 1000; // 10 minutes
const CLOCK_SKEW_TOLERANCE_MS = 60 * 1000; // 60 seconds

export interface GeneratedOAuthState {
  state: string;
  nonce: string;
}

export interface OAuthStateVerificationResult {
  valid: boolean;
  nonce?: string;
  error?: string;
}

/**
 * Generates a cryptographically tamper-proof, timestamp-bounded OAuth state parameter
 * along with a 32-byte (64-char hex) random nonce.
 *
 * Format: `${nonce}.${timestamp}.${hmacSignature}`
 * - nonce: 32 cryptographically secure random bytes in hex (64 chars)
 * - timestamp: Date.now() millisecond string
 * - hmacSignature: HMAC-SHA256 of `${nonce}:${timestamp}` keyed by secret
 */
export function generateOAuthState(secret: string): GeneratedOAuthState {
  if (!secret || typeof secret !== 'string' || secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters long');
  }

  const nonce = crypto.randomBytes(32).toString('hex');
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${nonce}:${timestamp}`)
    .digest('hex');

  const state = `${nonce}.${timestamp}.${signature}`;
  return { state, nonce };
}

/**
 * Validates the cryptographic integrity, authenticity, and freshness of an OAuth state string.
 *
 * Verifies:
 * 1. Well-formedness and expected string length / hex representations.
 * 2. Timestamp freshness (within maxAgeMs, not in the future beyond tolerance).
 * 3. Constant-time timing-safe HMAC-SHA256 signature verification.
 *
 * NOTE: This validates the state token's integrity. It returns the embedded nonce
 * which MUST subsequently be verified against the initiating browser's bound nonce.
 */
export function verifyOAuthState(
  state: unknown,
  secret: string,
  maxAgeMs = OAUTH_STATE_MAX_AGE_MS
): OAuthStateVerificationResult {
  if (!state || typeof state !== 'string') {
    return { valid: false, error: 'STATE_EMPTY_OR_INVALID_TYPE' };
  }

  if (!secret || typeof secret !== 'string' || secret.length < 32) {
    return { valid: false, error: 'INVALID_SECRET' };
  }

  const parts = state.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'STATE_MALFORMED_FORMAT' };
  }

  const [nonce, timestampStr, signature] = parts;

  // Validate nonce format: exactly 64 hex characters (32 bytes)
  if (!nonce || nonce.length !== 64 || !/^[0-9a-fA-F]{64}$/.test(nonce)) {
    return { valid: false, error: 'INVALID_NONCE_FORMAT' };
  }

  // Validate signature format: exactly 64 hex characters (SHA-256)
  if (!signature || signature.length !== 64 || !/^[0-9a-fA-F]{64}$/.test(signature)) {
    return { valid: false, error: 'INVALID_SIGNATURE_FORMAT' };
  }

  // Validate timestamp
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp) || !/^\d+$/.test(timestampStr)) {
    return { valid: false, error: 'INVALID_TIMESTAMP_FORMAT' };
  }

  const now = Date.now();
  // Check if expired
  if (now - timestamp > maxAgeMs) {
    logger.warn(`OAuth state expired: age=${Math.round((now - timestamp) / 1000)}s, maxAllowed=${maxAgeMs / 1000}s`);
    return { valid: false, error: 'STATE_EXPIRED' };
  }

  // Check if future timestamp beyond clock skew tolerance
  if (timestamp > now + CLOCK_SKEW_TOLERANCE_MS) {
    logger.warn(`OAuth state rejected: timestamp in future (offset=${Math.round((timestamp - now) / 1000)}s)`);
    return { valid: false, error: 'STATE_TIMESTAMP_FUTURE' };
  }

  // Recalculate HMAC signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${nonce}:${timestampStr}`)
    .digest('hex');

  const sigBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');

  if (sigBuffer.length !== expectedBuffer.length) {
    return { valid: false, error: 'SIGNATURE_MISMATCH' };
  }

  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { valid: false, error: 'SIGNATURE_MISMATCH' };
  }

  return { valid: true, nonce };
}

/**
 * Validates that a state-embedded nonce strictly matches a browser-bound nonce in constant time.
 */
export function verifyBrowserNonceBinding(
  stateNonce: unknown,
  browserNonce: unknown
): boolean {
  if (
    !stateNonce ||
    !browserNonce ||
    typeof stateNonce !== 'string' ||
    typeof browserNonce !== 'string'
  ) {
    return false;
  }

  const stateBuffer = Buffer.from(stateNonce, 'utf-8');
  const browserBuffer = Buffer.from(browserNonce, 'utf-8');

  if (stateBuffer.length !== browserBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(stateBuffer, browserBuffer);
}
