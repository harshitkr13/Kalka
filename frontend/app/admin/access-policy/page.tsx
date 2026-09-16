'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  ShieldCheck,
  Check,
  Minus,
  Key,
  Lock,
  ArrowLeft,
  CheckCircle2,
  User,
  FileText,
  Inbox,
  Briefcase,
  Sliders,
  AlertCircle,
} from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface PermissionDefinition {
  id: string;
  name: string;
  description: string;
  category: 'Content' | 'Leads' | 'Careers' | 'Administration';
  roles: {
    SUPER_ADMIN: boolean;
    CONTENT_MANAGER: boolean;
    EDITOR: boolean;
    LEAD_MANAGER: boolean;
    HR_MANAGER: boolean;
  };
}

// Authoritative RBAC Matrix defined strictly from backend/src/modules/auth/permissions.ts
const PERMISSION_DEFINITIONS: PermissionDefinition[] = [
  // Content Management
  {
    id: 'content:view',
    name: 'View Content',
    description: 'Read-only access to browse CMS drafts, published services, case studies, industries, and insights.',
    category: 'Content',
    roles: {
      SUPER_ADMIN: true,
      CONTENT_MANAGER: true,
      EDITOR: true,
      LEAD_MANAGER: false,
      HR_MANAGER: false,
    },
  },
  {
    id: 'content:edit',
    name: 'Edit Content',
    description: 'Drafting, modifying, and updating content records across public editorial collections.',
    category: 'Content',
    roles: {
      SUPER_ADMIN: true,
      CONTENT_MANAGER: true,
      EDITOR: true,
      LEAD_MANAGER: false,
      HR_MANAGER: false,
    },
  },
  {
    id: 'content:publish',
    name: 'Publish & Delete Content',
    description: 'Elevated editorial authority to transition records to published status or archive/delete items.',
    category: 'Content',
    roles: {
      SUPER_ADMIN: true,
      CONTENT_MANAGER: true,
      EDITOR: false,
      LEAD_MANAGER: false,
      HR_MANAGER: false,
    },
  },

  // Leads & Inquiries
  {
    id: 'leads:view',
    name: 'View Leads & Inquiries',
    description: 'Access to inbound prospective client briefs, service consultation forms, and contact records.',
    category: 'Leads',
    roles: {
      SUPER_ADMIN: true,
      CONTENT_MANAGER: true,
      EDITOR: false,
      LEAD_MANAGER: true,
      HR_MANAGER: false,
    },
  },
  {
    id: 'leads:manage',
    name: 'Manage Leads & Workflow',
    description: 'Authority to change lead triage status, append internal advisory notes, or manage inquiries.',
    category: 'Leads',
    roles: {
      SUPER_ADMIN: true,
      CONTENT_MANAGER: false,
      EDITOR: false,
      LEAD_MANAGER: true,
      HR_MANAGER: false,
    },
  },

  // Careers & Recruitment
  {
    id: 'careers:view',
    name: 'View Career Postings',
    description: 'Read access to institutional job listings, department requisitions, and position drafts.',
    category: 'Careers',
    roles: {
      SUPER_ADMIN: true,
      CONTENT_MANAGER: true,
      EDITOR: true,
      LEAD_MANAGER: false,
      HR_MANAGER: true,
    },
  },
  {
    id: 'careers:manage',
    name: 'Manage Career Listings',
    description: 'Creation, editing, publication, and closure of firm talent acquisition postings.',
    category: 'Careers',
    roles: {
      SUPER_ADMIN: true,
      CONTENT_MANAGER: false,
      EDITOR: false,
      LEAD_MANAGER: false,
      HR_MANAGER: true,
    },
  },

  // System Administration
  {
    id: 'users:manage',
    name: 'Manage Users & Roles',
    description: 'Governance over administrative accounts, credential validation, and role assignment.',
    category: 'Administration',
    roles: {
      SUPER_ADMIN: true,
      CONTENT_MANAGER: false,
      EDITOR: false,
      LEAD_MANAGER: false,
      HR_MANAGER: false,
    },
  },
  {
    id: 'settings:manage',
    name: 'Manage System Settings',
    description: 'Top-level governance over portal configuration, security policies, and environment parameters.',
    category: 'Administration',
    roles: {
      SUPER_ADMIN: true,
      CONTENT_MANAGER: false,
      EDITOR: false,
      LEAD_MANAGER: false,
      HR_MANAGER: false,
    },
  },
];

const ROLES_LIST = [
  { key: 'SUPER_ADMIN' as const, label: 'Super Admin', short: 'SUPER_ADMIN', badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { key: 'CONTENT_MANAGER' as const, label: 'Content Mgr', short: 'CONTENT_MGR', badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { key: 'EDITOR' as const, label: 'Editor', short: 'EDITOR', badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { key: 'LEAD_MANAGER' as const, label: 'Lead Mgr', short: 'LEAD_MGR', badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  { key: 'HR_MANAGER' as const, label: 'HR Mgr', short: 'HR_MGR', badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
];

export default function AdminAccessPolicyPage() {
  const { user } = useAdminAuth();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link href="/admin" className="hover:text-white transition-colors">
            Portal
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200">Access Governance</span>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>

      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-amber-400">
          Security Architecture
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mt-1">
          Access Policy & Governance
        </h1>
        <p className="text-sm text-slate-400 mt-1 font-sans max-w-3xl">
          Review administrative roles, permissions, and the security controls governing access to the Kalka Co. administrative portal.
        </p>
      </div>

      {/* Section B: Current Session Clearance */}
      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Current Session Clearance</h2>
              <p className="text-xs text-slate-400">Verified institutional security clearance for the active session.</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Authenticated Session
          </span>
        </div>

        {user ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/60">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                Authenticated Operator
              </span>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{user.name}</span>
              </div>
              <span className="text-[11px] text-slate-400 truncate block mt-0.5">{user.email}</span>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/60">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                Assigned Role Scope
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2.5 py-1 rounded text-xs font-mono uppercase font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/60">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                Active Authorization Mode
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium mt-1">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero-Trust Backend Enforcement</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {user.role === 'SUPER_ADMIN' ? 'Full administrative authority (9/9 permissions)' : `${user.permissions?.length || 0} permissions active`}
              </span>
            </div>
          </div>
        ) : (
          <div className="pt-4 text-xs text-slate-500">Verifying session credentials...</div>
        )}
      </div>

      {/* Section E: Permission Groups Overview */}
      <div>
        <div className="mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
            Functional Scopes
          </span>
          <h2 className="text-lg font-serif font-bold text-white mt-0.5">
            Administrative Permission Groups
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase font-mono">
              <FileText className="w-4 h-4" />
              <span>Content</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Public communications, case studies, industries, client rosters, and media archives.
            </p>
            <div className="pt-2 border-t border-slate-800/60 space-y-1 font-mono text-[10px] text-slate-300">
              <div className="flex items-center gap-1.5"><Key className="w-3 h-3 text-slate-500" /> content:view</div>
              <div className="flex items-center gap-1.5"><Key className="w-3 h-3 text-slate-500" /> content:edit</div>
              <div className="flex items-center gap-1.5"><Key className="w-3 h-3 text-slate-500" /> content:publish</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase font-mono">
              <Inbox className="w-4 h-4" />
              <span>Leads</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Inbound client inquiries, consultation requests, and pipeline coordination.
            </p>
            <div className="pt-2 border-t border-slate-800/60 space-y-1 font-mono text-[10px] text-slate-300">
              <div className="flex items-center gap-1.5"><Key className="w-3 h-3 text-slate-500" /> leads:view</div>
              <div className="flex items-center gap-1.5"><Key className="w-3 h-3 text-slate-500" /> leads:manage</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase font-mono">
              <Briefcase className="w-4 h-4" />
              <span>Careers</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Talent requisitions, job descriptions, open listings, and applicant workflows.
            </p>
            <div className="pt-2 border-t border-slate-800/60 space-y-1 font-mono text-[10px] text-slate-300">
              <div className="flex items-center gap-1.5"><Key className="w-3 h-3 text-slate-500" /> careers:view</div>
              <div className="flex items-center gap-1.5"><Key className="w-3 h-3 text-slate-500" /> careers:manage</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase font-mono">
              <Sliders className="w-4 h-4" />
              <span>Administration</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Identity lifecycle, operator authorization, policy governance, and platform controls.
            </p>
            <div className="pt-2 border-t border-slate-800/60 space-y-1 font-mono text-[10px] text-slate-300">
              <div className="flex items-center gap-1.5"><Key className="w-3 h-3 text-slate-500" /> users:manage</div>
              <div className="flex items-center gap-1.5"><Key className="w-3 h-3 text-slate-500" /> settings:manage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section C: Role-Based Access Control Matrix */}
      <div className="rounded-xl bg-slate-900/60 border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
              Authorization Spec
            </span>
            <h2 className="text-lg font-serif font-bold text-white mt-0.5">
              Role-Based Access Control Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Authoritative mapping of backend permission grants across the 5 official administrative roles.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                <Check className="w-3 h-3" />
              </span>
              <span>Granted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-slate-800 text-slate-500 flex items-center justify-center text-[10px]">
                <Minus className="w-3 h-3" />
              </span>
              <span>Restricted</span>
            </div>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 font-semibold">Permission / Scope</th>
                <th className="py-3.5 px-4 font-semibold hidden md:table-cell">Category</th>
                {ROLES_LIST.map((r) => (
                  <th key={r.key} className="py-3.5 px-3 text-center font-semibold">
                    <span className={`px-2 py-0.5 rounded border text-[9px] ${r.badgeColor}`}>
                      {r.short}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {PERMISSION_DEFINITIONS.map((perm) => (
                <tr key={perm.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-mono text-xs text-slate-200 font-medium">{perm.id}</div>
                    <div className="text-[11px] text-slate-400 max-w-sm">{perm.description}</div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300">
                      {perm.category}
                    </span>
                  </td>
                  {ROLES_LIST.map((r) => {
                    const isGranted = perm.roles[r.key];
                    return (
                      <td key={r.key} className="py-3 px-3 text-center">
                        {isGranted ? (
                          <span
                            className="inline-flex items-center justify-center w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                            title={`${perm.id} granted to ${r.label}`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-950 border border-slate-800 text-slate-600"
                            title={`${perm.id} restricted for ${r.label}`}
                          >
                            <Minus className="w-3 h-3" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="font-mono text-slate-400">
            Total permissions defined: 9 &bull; Super Administrator possesses 100% universal clearance.
          </span>
        </div>
      </div>

      {/* Section D: Governance Principles */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
            Institutional Standards
          </span>
          <h2 className="text-lg font-serif font-bold text-white mt-0.5">
            Security & Governance Architecture
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Core security controls and protocols enforced across the Kalka Co. operational portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Google OAuth Identity Assertion</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Administrative access is gated behind Google OAuth 2.0 with institutional email allowlists. Password authentication is disabled across all operational environments.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Server-Managed Sessions & Cookies</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Sessions are maintained server-side with MongoDB storage. Session credentials utilize HttpOnly, Secure, and SameSite cookie policies to prevent client-side script inspection.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <Key className="w-4 h-4 text-amber-400" />
              <span>Backend-Enforced Authorization</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              UI component hiding is cosmetic; all administrative operations are strictly enforced at the backend middleware boundary using explicit role and permission validation checks.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Least-Privilege Principle</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Administrative operators receive only the precise permission scopes required for their active institutional mandate, isolating content, operational leads, and system controls.
            </p>
          </div>
        </div>
      </div>

      {/* Section F: Access Denied Relationship Notice */}
      <div className="p-5 rounded-xl bg-slate-900/40 border border-dashed border-slate-800/80 flex items-start gap-3.5 text-xs">
        <AlertCircle className="w-5 h-5 text-amber-400/90 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-200">
            Access Policy & Restriction Protocol
          </p>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Unauthorized administrative requests are routed to the Access Denied view. Access Policy defines the permissions governing administrative resources; it does not bypass those controls.
          </p>
        </div>
      </div>
    </div>
  );
}
