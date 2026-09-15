'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, LogOut, UserCog } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export default function AdminAccessDeniedPage() {
  const { user, logout } = useAdminAuth();

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md text-center">
        {/* Shield Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Security Badge */}
        <span className="inline-block px-3 py-1 mb-3 text-[10px] font-mono tracking-widest uppercase font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-full">
          HTTP 403 &bull; Authorization Restricted
        </span>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mb-3">
          Access Policy Restriction
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto mb-6">
          Your authenticated profile does not hold the necessary role permissions to access this administrative section. All sensitive resources are governed under zero-trust authorization protocols.
        </p>

        {/* Current Identity Snapshot */}
        {user && (
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-8 max-w-md mx-auto text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
              Authenticated Session Credentials
            </span>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-semibold">
                {user.role}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/admin"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>

          <Link
            href="/admin/settings/profile"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            <UserCog className="w-4 h-4 text-slate-400" />
            <span>View My Permissions</span>
          </Link>

          <button
            onClick={() => logout()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-900/60 text-xs font-medium text-slate-400 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Help text */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <p className="text-xs text-slate-500">
            If your operational mandate requires access to this workspace, please request authorization from a Super Administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
