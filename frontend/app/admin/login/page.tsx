'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getGoogleLoginUrl } from '@/lib/auth';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

function LoginContent() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  const { user } = useAdminAuth();

  const errorMessages: Record<string, string> = {
    unauthorized: 'Access Denied: Your Google account is not on the approved administrator roster.',
    disabled: 'Account Suspended: Your administrative profile has been deactivated.',
    invalid_state: 'Security Verification Failed: OAuth state mismatch or expired session. Please retry.',
    missing_credentials: 'Authentication Error: Incomplete credentials returned from identity provider.',
    access_denied: 'Identity Request Cancelled: Google authentication was not completed.',
    auth_failed: 'Authentication Failure: Unable to establish session with administrative services.',
    session_error: 'Session Initialization Error: Could not generate a secure server-side session.',
  };

  const errorMessage = errorParam ? errorMessages[errorParam] || 'An unexpected authentication error occurred.' : null;

  return (
    <div className="w-full max-w-md p-8 sm:p-10 bg-slate-900/80 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-md">
      {/* Brand & Emblem */}
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 mb-3 text-xs tracking-widest uppercase font-semibold text-amber-500/90 bg-amber-500/10 rounded-full border border-amber-500/20">
          Kalka Co. Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif tracking-tight text-slate-100 mb-2">
          Administrative Gateway
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Restricted access for authorized leadership and editorial personnel.
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs sm:text-sm leading-relaxed">
          <p className="font-semibold mb-1">Authentication Notice</p>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Active Session Notice */}
      {user && !errorMessage && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm leading-relaxed">
          <p className="font-semibold mb-1">Active Session Detected</p>
          <p className="text-xs text-slate-300 mb-3">
            You are signed in as <span className="text-white font-medium">{user.name}</span> ({user.role}).
          </p>
          <Link
            href="/admin"
            className="inline-block px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
          >
            Continue to Dashboard &rarr;
          </Link>
        </div>
      )}

      {/* Sign in with Google Button */}
      <div className="space-y-4">
        <a
          href={getGoogleLoginUrl()}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium text-sm rounded-lg border border-slate-700 hover:border-slate-600 transition-all shadow-sm group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Authenticate with Google</span>
        </a>
      </div>

      {/* Footer Security Notice & Return Link */}
      <div className="mt-8 pt-6 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-500 mb-3">
          All administrative operations are encrypted and audited under zero-trust governance.
        </p>
        <Link
          href="/"
          className="text-xs text-amber-500/80 hover:text-amber-400 hover:underline transition-colors"
        >
          &larr; Return to Public Website
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 sm:px-6">
      <Suspense fallback={<div className="text-slate-400 text-sm">Loading security gateway...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
