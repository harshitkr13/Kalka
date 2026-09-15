'use client';

import React from 'react';
import Link from 'next/link';
import {
  User,
  Shield,
  Key,
  Clock,
  CheckCircle2,
  Lock,
  ArrowLeft,
  LogOut,
  Mail,
  Fingerprint,
} from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export default function AdminProfilePage() {
  const { user, logout } = useAdminAuth();

  if (!user) {
    return null;
  }

  const roleDescriptions: Record<string, string> = {
    SUPER_ADMIN: 'Complete administrative authority across system infrastructure, user governance, content lifecycle, and operational leads.',
    CONTENT_MANAGER: 'Full editorial authority to author, review, publish, and archive public corporate communications, case studies, and insights.',
    EDITOR: 'Editorial workspace access to compose drafts and submit revisions for review across content modules.',
    LEAD_MANAGER: 'Operational access to review and manage inbound client inquiries, consulting briefs, and lead pipeline.',
    HR_MANAGER: 'Human resources access to create and manage job postings, career requisitions, and applicant inquiries.',
  };

  const formattedLastLogin = user.lastLoginAt
    ? new Date(user.lastLoginAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Active Session (Current)';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>

        <button
          onClick={() => logout()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-900/60 text-xs font-medium text-slate-300 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-amber-400">
          Account & Governance
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mt-1">
          Profile & Security Credentials
        </h1>
        <p className="text-sm text-slate-400 mt-1 font-sans">
          Review your authenticated identity profile, role privileges, and active backend permissions.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full border-2 border-amber-500/40 object-cover shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-2xl shadow-md">
              {user.name?.charAt(0) || 'A'}
            </div>
          )}

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-serif font-bold text-white truncate">
                {user.name}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                Active Account
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Last Login: {formattedLastLogin}
              </span>
            </div>
          </div>
        </div>

        {/* Identity Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 mt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
              Identity Provider
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span>Google OAuth 2.0 (Verified Roster)</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
              Internal Profile ID
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 truncate">
              <Fingerprint className="w-4 h-4 text-slate-500" />
              <span className="truncate">{user.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role & Access Privileges */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-amber-400">
              Role-Based Access Control
            </span>
            <h2 className="text-lg font-serif font-bold text-white mt-1">
              Assigned Security Role
            </h2>
          </div>
          <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            {user.role}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-slate-800/80">
          {roleDescriptions[user.role] || 'Standard administrative profile access.'}
        </p>

        {/* Granted Backend Permissions List */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Granted Backend Permissions ({user.permissions?.length || 0})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {user.permissions?.map((perm) => (
              <div
                key={perm}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-300"
              >
                <Key className="w-3.5 h-3.5 text-amber-400/80" />
                <span>{perm}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Governance Notice */}
      <div className="p-6 rounded-xl bg-slate-900/40 border border-dashed border-slate-800/80 flex items-start gap-4">
        <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-amber-400 flex-shrink-0">
          <Lock className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-xs">
          <p className="font-semibold text-slate-200">
            Administrative Access Governance Policy
          </p>
          <p className="text-slate-400 leading-relaxed">
            Role allocations, backend permission scopes, and account activations are governed strictly via server-side policy and Super Administrator oversight. Profile modifications cannot be executed from client sessions.
          </p>
        </div>
      </div>
    </div>
  );
}
