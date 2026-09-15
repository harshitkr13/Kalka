'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminLoadingSkeleton } from '@/components/admin/AdminLoadingSkeleton';

function AdminContentGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAdminAuth();

  // If on the login gateway, render directly without the authenticated shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If loading session, render inside AdminShell with polished loading skeleton
  if (loading) {
    return (
      <AdminShell>
        <AdminLoadingSkeleton />
      </AdminShell>
    );
  }

  // If not authenticated, context will redirect to /admin/login
  if (!user) {
    return (
      <AdminShell>
        <AdminLoadingSkeleton />
      </AdminShell>
    );
  }

  // Authenticated user: render requested admin page inside shell
  return <AdminShell>{children}</AdminShell>;
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminContentGuard>{children}</AdminContentGuard>
    </AdminAuthProvider>
  );
}
