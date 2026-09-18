export interface SystemHealth {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  database: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Resolves the API base URL:
 * - In production browser environments, uses relative same-origin `/api` to route
 *   all requests through the Vercel reverse proxy, preventing third-party cookie blocking.
 * - In local development browser environments, points directly to http://localhost:5000/api.
 * - In server-side / build-time Node.js execution, requires an absolute URL.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const isLocalDev =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (isLocalDev && process.env.NEXT_PUBLIC_API_URL?.includes('localhost')) {
      return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
    }

    // In production browser environments, always use relative '/api'
    return '/api';
  }

  // Server-side / static build execution requires an absolute URL
  return (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');
}

/**
 * Safe fetch wrapper for administrative requests ensuring HttpOnly cookies
 * are transmitted and JSON responses are handled uniformly.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const base = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith('http') ? endpoint : `${base}${cleanEndpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    const data = await res.json().catch(() => null);
    if (!res.ok || !data || !data.success) {
      let errorMsg =
        typeof data?.error === 'string'
          ? data.error
          : data?.error && typeof data.error === 'object' && 'message' in data.error && typeof data.error.message === 'string'
          ? data.error.message
          : data?.error && typeof data.error === 'object' && 'code' in data.error && typeof data.error.code === 'string'
          ? data.error.code
          : typeof data?.message === 'string'
          ? data.message
          : `Request failed with status ${res.status}`;

      if (
        data?.error &&
        typeof data.error === 'object' &&
        'details' in data.error &&
        Array.isArray(data.error.details) &&
        data.error.details.length > 0
      ) {
        const detailMsgs = data.error.details
          .map((d: unknown) =>
            d && typeof d === 'object' && 'message' in d && typeof (d as any).message === 'string'
              ? (d as any).message
              : null
          )
          .filter(Boolean);
        if (detailMsgs.length > 0) {
          errorMsg = `${errorMsg}: ${detailMsgs.join(', ')}`;
        }
      }

      return {
        success: false,
        error: errorMsg,
        data: undefined,
      };
    }
    return data;
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network communication error',
    };
  }
}

/**
 * Fetch real system health status from backend /api/health.
 * Returns null gracefully if backend is unreachable.
 */
export async function fetchSystemHealth(): Promise<SystemHealth | null> {
  try {
    const base = getApiBaseUrl();
    const res = await fetch(`${base}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (json.success && json.data) {
      return json.data as SystemHealth;
    }
    return null;
  } catch {
    return null;
  }
}
