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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Safe fetch wrapper for administrative requests ensuring HttpOnly cookies
 * are transmitted and JSON responses are handled uniformly.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    const data = await res.json();
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
    const res = await fetch(`${API_BASE_URL}/health`, {
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
