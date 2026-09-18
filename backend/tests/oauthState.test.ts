/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'crypto';
import {
  generateOAuthState,
  verifyOAuthState,
  verifyBrowserNonceBinding,
  OAUTH_STATE_MAX_AGE_MS,
} from '../src/modules/auth/oauthState';

describe('OAuth State Cryptographic & Browser Nonce Binding Module', () => {
  const TEST_SECRET = 'KalkaCo-Test-Secret-Key-Must-Be-At-Least-32-Chars!';
  const WRONG_SECRET = 'Different-Test-Secret-Key-Also-Long-Enough-Here!';

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateOAuthState', () => {
    it('should generate a state with format nonce.timestamp.signature', () => {
      const { state, nonce } = generateOAuthState(TEST_SECRET);
      expect(typeof state).toBe('string');
      expect(typeof nonce).toBe('string');

      const parts = state.split('.');
      expect(parts).toHaveLength(3);

      const [pNonce, pTimestamp, pSignature] = parts;
      expect(pNonce).toBe(nonce);
      expect(pNonce).toHaveLength(64); // 32 bytes hex
      expect(/^[0-9a-fA-F]{64}$/.test(pNonce)).toBe(true);

      expect(/^\d+$/.test(pTimestamp)).toBe(true);
      expect(pSignature).toHaveLength(64); // SHA-256 hex
      expect(/^[0-9a-fA-F]{64}$/.test(pSignature)).toBe(true);
    });

    it('should throw if secret is missing or too short (< 32 chars)', () => {
      expect(() => generateOAuthState('')).toThrow(/at least 32 characters/);
      expect(() => generateOAuthState('short-secret')).toThrow(/at least 32 characters/);
    });

    it('should generate unique states on each invocation', () => {
      const state1 = generateOAuthState(TEST_SECRET);
      const state2 = generateOAuthState(TEST_SECRET);
      expect(state1.nonce).not.toBe(state2.nonce);
      expect(state1.state).not.toBe(state2.state);
    });
  });

  describe('verifyOAuthState', () => {
    it('should successfully verify a valid, freshly generated state', () => {
      const { state, nonce } = generateOAuthState(TEST_SECRET);
      const result = verifyOAuthState(state, TEST_SECRET);
      expect(result.valid).toBe(true);
      expect(result.nonce).toBe(nonce);
      expect(result.error).toBeUndefined();
    });

    it('should reject state if signature is invalid/tampered', () => {
      const { state } = generateOAuthState(TEST_SECRET);
      const parts = state.split('.');
      // Tamper last character of signature
      const tamperedSig = parts[2].slice(0, -1) + (parts[2].slice(-1) === 'a' ? 'b' : 'a');
      const tamperedState = `${parts[0]}.${parts[1]}.${tamperedSig}`;

      const result = verifyOAuthState(tamperedState, TEST_SECRET);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('SIGNATURE_MISMATCH');
    });

    it('should reject state if nonce is modified', () => {
      const { state } = generateOAuthState(TEST_SECRET);
      const parts = state.split('.');
      // Flip a character in nonce
      const tamperedNonce = (parts[0][0] === 'a' ? 'b' : 'a') + parts[0].slice(1);
      const tamperedState = `${tamperedNonce}.${parts[1]}.${parts[2]}`;

      const result = verifyOAuthState(tamperedState, TEST_SECRET);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('SIGNATURE_MISMATCH');
    });

    it('should reject state if timestamp is modified', () => {
      const { state } = generateOAuthState(TEST_SECRET);
      const parts = state.split('.');
      const modifiedTimestamp = (parseInt(parts[1], 10) - 1000).toString();
      const tamperedState = `${parts[0]}.${modifiedTimestamp}.${parts[2]}`;

      const result = verifyOAuthState(tamperedState, TEST_SECRET);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('SIGNATURE_MISMATCH');
    });

    it('should reject state if verified with wrong secret', () => {
      const { state } = generateOAuthState(TEST_SECRET);
      const result = verifyOAuthState(state, WRONG_SECRET);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('SIGNATURE_MISMATCH');
    });

    it('should reject expired state (> 10 minutes)', () => {
      const nonce = crypto.randomBytes(32).toString('hex');
      const oldTimestamp = (Date.now() - (OAUTH_STATE_MAX_AGE_MS + 5000)).toString(); // 10 min 5 sec ago
      const signature = crypto
        .createHmac('sha256', TEST_SECRET)
        .update(`${nonce}:${oldTimestamp}`)
        .digest('hex');

      const expiredState = `${nonce}.${oldTimestamp}.${signature}`;
      const result = verifyOAuthState(expiredState, TEST_SECRET);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('STATE_EXPIRED');
    });

    it('should reject future timestamp beyond clock skew tolerance', () => {
      const nonce = crypto.randomBytes(32).toString('hex');
      const futureTimestamp = (Date.now() + 120 * 1000).toString(); // 2 minutes in future
      const signature = crypto
        .createHmac('sha256', TEST_SECRET)
        .update(`${nonce}:${futureTimestamp}`)
        .digest('hex');

      const futureState = `${nonce}.${futureTimestamp}.${signature}`;
      const result = verifyOAuthState(futureState, TEST_SECRET);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('STATE_TIMESTAMP_FUTURE');
    });

    it('should reject malformed state formats', () => {
      expect(verifyOAuthState('', TEST_SECRET).valid).toBe(false);
      expect(verifyOAuthState(null, TEST_SECRET).valid).toBe(false);
      expect(verifyOAuthState(undefined, TEST_SECRET).valid).toBe(false);
      expect(verifyOAuthState('only-one-part', TEST_SECRET).valid).toBe(false);
      expect(verifyOAuthState('part1.part2', TEST_SECRET).valid).toBe(false);
      expect(verifyOAuthState('p1.p2.p3.p4', TEST_SECRET).valid).toBe(false);
      expect(verifyOAuthState('short.12345.signature', TEST_SECRET).valid).toBe(false);
      expect(verifyOAuthState('not_hex_nonce_zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz.12345.sig', TEST_SECRET).valid).toBe(false);
    });
  });

  describe('verifyBrowserNonceBinding (Login CSRF Defense)', () => {
    it('should accept when state nonce strictly matches browser nonce', () => {
      const { nonce } = generateOAuthState(TEST_SECRET);
      const isBound = verifyBrowserNonceBinding(nonce, nonce);
      expect(isBound).toBe(true);
    });

    it('should reject when browser nonce is missing (Login CSRF attack pattern)', () => {
      const { nonce } = generateOAuthState(TEST_SECRET);
      expect(verifyBrowserNonceBinding(nonce, undefined)).toBe(false);
      expect(verifyBrowserNonceBinding(nonce, null)).toBe(false);
      expect(verifyBrowserNonceBinding(nonce, '')).toBe(false);
    });

    it('should reject when state nonce does not match browser nonce (Mismatched transaction)', () => {
      const attackerSession = generateOAuthState(TEST_SECRET);
      const victimSession = generateOAuthState(TEST_SECRET);

      // Attacker tries to submit attackerSession.state to victim's browser (holding victimSession.nonce)
      const isBound = verifyBrowserNonceBinding(attackerSession.nonce, victimSession.nonce);
      expect(isBound).toBe(false);
    });

    it('should reject when lengths differ', () => {
      const { nonce } = generateOAuthState(TEST_SECRET);
      expect(verifyBrowserNonceBinding(nonce, nonce.slice(0, 32))).toBe(false);
      expect(verifyBrowserNonceBinding(nonce, nonce + 'extra')).toBe(false);
    });

    it('should perform comparison in constant time without throwing on invalid buffers', () => {
      expect(() => verifyBrowserNonceBinding(123 as any, 'nonce')).not.toThrow();
      expect(verifyBrowserNonceBinding(123 as any, 'nonce')).toBe(false);
    });
  });

  describe('End-to-End State Lifecycle & Replay Simulation', () => {
    it('should simulate complete lifecycle: generate -> verify state -> bind browser nonce -> consume', () => {
      // 1. Browser initiates OAuth
      const { state, nonce } = generateOAuthState(TEST_SECRET);
      const browserCookieJar = { 'kalka.oauth_nonce': nonce };

      // 2. Google returns with callback
      const callbackState = state;
      const callbackCookie = browserCookieJar['kalka.oauth_nonce'];

      // Step A: Browser nonce must exist
      expect(callbackCookie).toBeDefined();

      // Step B: Cryptographic state check
      const stateResult = verifyOAuthState(callbackState, TEST_SECRET);
      expect(stateResult.valid).toBe(true);
      expect(stateResult.nonce).toBeDefined();

      // Step C: Browser transaction binding
      const isBound = verifyBrowserNonceBinding(stateResult.nonce!, callbackCookie);
      expect(isBound).toBe(true);

      // Step D: Single-use consumption (cookie is cleared)
      delete (browserCookieJar as Record<string, string | undefined>)['kalka.oauth_nonce'];

      // Step E: Replay attack simulation (submitting same state second time)
      const replayCookie = browserCookieJar['kalka.oauth_nonce'];
      expect(replayCookie).toBeUndefined();

      // Since browser nonce is missing upon replay, transaction MUST be rejected
      const replayBound = Boolean(
        replayCookie &&
        stateResult.valid &&
        verifyBrowserNonceBinding(stateResult.nonce!, replayCookie)
      );
      expect(replayBound).toBe(false);
    });
  });
});
