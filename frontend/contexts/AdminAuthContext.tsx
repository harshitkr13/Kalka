'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthUser, fetchCurrentUser, logoutUser } from '@/lib/auth';
import { fetchSystemHealth, SystemHealth } from '@/lib/api';

interface AdminAuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  systemHealth: SystemHealth | null;
  refreshUser: () => Promise<void>;
  refreshHealth: () => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const initializedRef = useRef(false);

  const refreshUser = useCallback(async () => {
    try {
      setError(null);
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
    } catch {
      setError('Unable to authenticate administrative session.');
      setUser(null);
    }
  }, []);

  const refreshHealth = useCallback(async () => {
    const health = await fetchSystemHealth();
    setSystemHealth(health);
  }, []);

  // Initial load on mount
  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      try {
        const [currentUser, health] = await Promise.all([
          fetchCurrentUser(),
          fetchSystemHealth(),
        ]);

        if (!isMounted) return;

        setUser(currentUser);
        setSystemHealth(health);
        setLoading(false);
        initializedRef.current = true;

        if (!currentUser && pathname !== '/admin/login') {
          router.replace('/admin/login');
        }
      } catch {
        if (!isMounted) return;
        setUser(null);
        setLoading(false);
        initializedRef.current = true;
        if (pathname !== '/admin/login') {
          router.replace('/admin/login');
        }
      }
    }

    initialize();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Protect routes on subsequent pathname changes without flashing loading state
  useEffect(() => {
    if (!initializedRef.current || loading) return;

    if (!user && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [pathname, user, loading, router]);

  const logout = useCallback(async () => {
    setLoading(true);
    await logoutUser();
    setUser(null);
    setLoading(false);
    router.replace('/admin/login');
  }, [router]);

  const hasRole = useCallback(
    (roles: string[]): boolean => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user]
  );

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) return false;
      if (user.role === 'SUPER_ADMIN') return true;
      return user.permissions?.includes(permission) ?? false;
    },
    [user]
  );

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        error,
        systemHealth,
        refreshUser,
        refreshHealth,
        logout,
        hasRole,
        hasPermission,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
