export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  permissions: string[];
  lastLoginAt?: string;
}

import { getApiBaseUrl } from './api';

export function getGoogleLoginUrl(): string {
  const base = getApiBaseUrl();
  return `${base}/auth/google`;
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  try {
    const base = getApiBaseUrl();
    const res = await fetch(`${base}/auth/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Sends HttpOnly session cookie
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (json.success && json.data) {
      return json.data as AuthUser;
    }
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch authenticated user profile:', error);
    return null;
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    const base = getApiBaseUrl();
    const res = await fetch(`${base}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    return res.ok;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Logout request failed:', error);
    return false;
  }
}
