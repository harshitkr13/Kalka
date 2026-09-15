'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchCurrentUser, logoutUser, AuthUser } from '@/lib/auth';

export default function AdminProtectedShellPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadAuth() {
      const currentUser = await fetchCurrentUser();
      if (!isMounted) return;

      if (!currentUser) {
        router.push('/admin/login');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    }

    loadAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    await logoutUser();
    router.push('/admin/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 text-sm font-sans tracking-wide">
          Verifying security credentials...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Admin Shell Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-slate-100 tracking-tight">
                KALKA CO.
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider font-semibold">
                Admin Shell
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors hidden sm:inline"
            >
              Public Website &rarr;
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white transition-all disabled:opacity-50"
            >
              {loggingOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Foundation Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="inline-block px-3 py-1 mb-2 text-xs font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            Authenticated Session Active
          </div>
          <h1 className="text-3xl font-serif font-medium text-white mb-2">
            Welcome, {user.name}
          </h1>
          <p className="text-sm text-slate-400">
            Authenticated via Google OAuth 2.0 with server-side HttpOnly session.
          </p>
        </div>

        {/* Security & Identity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Identity Card */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Identity Profile
            </h3>
            <div className="flex items-center gap-3 mb-4">
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border border-slate-700"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-serif font-bold">
                  {user.name.charAt(0)}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-500">
              User ID: <span className="font-mono text-slate-400">{user.id}</span>
            </div>
          </div>

          {/* Role & Access Card */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Assigned Role
            </h3>
            <div className="mb-4">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-sm font-semibold">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Role permissions are verified on every backend API request via server-side RBAC middleware.
            </p>
          </div>

          {/* Phase 4 Governance Status Card */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Phase 4 Security State
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> HttpOnly session cookie
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> MongoDB-backed session store
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Zero browser token storage
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Server-side RBAC enforced
              </li>
            </ul>
          </div>
        </div>

        {/* Granted Permissions List */}
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 mb-10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Granted Role Permissions ({user.permissions.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.permissions.map((perm) => (
              <span
                key={perm}
                className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300"
              >
                {perm}
              </span>
            ))}
          </div>
        </div>

        {/* Scope Notice */}
        <div className="p-6 rounded-xl bg-slate-900/40 border border-dashed border-slate-800 text-center">
          <p className="text-sm font-serif text-slate-300 mb-1">
            Phase 4 Security Foundation Established
          </p>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Full admin dashboard management, CMS editing controls, and lead tracking will be implemented in Phases 5, 6, and 7.
          </p>
        </div>
      </main>
    </div>
  );
}
