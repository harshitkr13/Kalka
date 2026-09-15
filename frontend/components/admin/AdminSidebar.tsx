'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Building2,
  Briefcase,
  Users2,
  UserCheck,
  Newspaper,
  BookOpen,
  Radio,
  Image as ImageIcon,
  Trophy,
  Inbox,
  UserCog,
  ShieldAlert,
  LogOut,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  name: string;
  href?: string;
  icon: React.ElementType;
  phase?: string;
  disabled?: boolean;
  requiredRoles?: string[];
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  mobileOpen = false,
  onCloseMobile,
}) => {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  const navGroups: NavGroup[] = [
    {
      group: 'OVERVIEW',
      items: [
        {
          name: 'Dashboard',
          href: '/admin',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      group: 'CONTENT MANAGEMENT',
      items: [
        {
          name: 'Services',
          href: '/admin/services',
          icon: FileText,
          requiredRoles: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'EDITOR'],
        },
        {
          name: 'Industries',
          href: '/admin/industries',
          icon: Building2,
          requiredRoles: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'EDITOR'],
        },
        {
          name: 'Case Studies',
          href: '/admin/case-studies',
          icon: Briefcase,
          requiredRoles: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'EDITOR'],
        },
        {
          name: 'Clients Roster',
          icon: Users2,
          phase: 'Phase 7',
          disabled: true,
          requiredRoles: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'EDITOR'],
        },
        {
          name: 'Team Profiles',
          icon: UserCheck,
          phase: 'Phase 7',
          disabled: true,
          requiredRoles: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'EDITOR'],
        },
      ],
    },
    {
      group: 'INSIGHTS & MEDIA',
      items: [
        {
          name: 'Articles & Insights',
          href: '/admin/insights',
          icon: BookOpen,
          requiredRoles: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'EDITOR'],
        },
        {
          name: 'Categories',
          href: '/admin/insights/categories',
          icon: Newspaper,
          requiredRoles: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'EDITOR'],
        },
        {
          name: 'Press & News',
          icon: Newspaper,
          phase: 'Phase 8',
          disabled: true,
          requiredRoles: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'EDITOR'],
        },
        {
          name: 'Media Mentions',
          icon: Radio,
          phase: 'Phase 8',
          disabled: true,
          requiredRoles: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'EDITOR'],
        },
        {
          name: 'Media Gallery',
          icon: ImageIcon,
          phase: 'Phase 8',
          disabled: true,
          requiredRoles: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'EDITOR'],
        },
        {
          name: 'Awards & Honors',
          icon: Trophy,
          phase: 'Phase 8',
          disabled: true,
          requiredRoles: ['SUPER_ADMIN', 'CONTENT_MANAGER', 'EDITOR'],
        },
      ],
    },
    {
      group: 'OPERATIONS',
      items: [
        {
          name: 'Inquiries & Leads',
          icon: Inbox,
          phase: 'Phase 7',
          disabled: true,
          requiredRoles: ['SUPER_ADMIN', 'LEAD_MANAGER'],
        },
        {
          name: 'Careers & Hiring',
          icon: Briefcase,
          phase: 'Phase 7',
          disabled: true,
          requiredRoles: ['SUPER_ADMIN', 'HR_MANAGER'],
        },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        {
          name: 'Profile & Security',
          href: '/admin/settings/profile',
          icon: UserCog,
        },
        {
          name: 'Access Policy',
          href: '/admin/access-denied',
          icon: ShieldAlert,
        },
      ],
    },
  ];

  const canViewItem = (item: NavItem): boolean => {
    if (!item.requiredRoles || !user) return true;
    return item.requiredRoles.includes(user.role);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link
          href="/admin"
          onClick={onCloseMobile}
          className="flex flex-col focus:outline-none focus:ring-1 focus:ring-amber-500 rounded px-1"
        >
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-lg text-slate-100 tracking-wider">
              KALKA CO.
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-amber-400 font-semibold uppercase">
            Administrative Portal
          </span>
        </Link>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close administrative navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
        {navGroups.map((group) => {
          const visibleItems = group.items.filter(canViewItem);
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.group}>
              <h4 className="px-3 mb-2 text-[10px] font-mono tracking-widest uppercase font-semibold text-slate-500">
                {group.group}
              </h4>
              <ul className="space-y-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.href
                    ? item.href === '/admin'
                      ? pathname === '/admin'
                      : pathname === item.href || pathname.startsWith(`${item.href}/`)
                    : false;

                  if (item.disabled) {
                    return (
                      <li key={item.name}>
                        <div
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-500 cursor-not-allowed opacity-60 hover:opacity-75 transition-opacity"
                          title={`${item.name} (${item.phase})`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-slate-600" />
                            <span>{item.name}</span>
                          </div>
                          {item.phase && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                              {item.phase}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href || '#'}
                        onClick={onCloseMobile}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 ${
                              isActive ? 'text-amber-400' : 'text-slate-400'
                            }`}
                          />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* User Footer Profile & Sign Out */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full border border-slate-700 object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-serif font-bold text-sm">
                  {user.name?.charAt(0) || 'A'}
                </div>
              )}
              <div className="overflow-hidden flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
                <span className="inline-block text-[10px] font-mono font-medium text-amber-400">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-[11px] text-slate-300 hover:text-white transition-colors"
              >
                <span>Site</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>
              <button
                onClick={() => logout()}
                className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md bg-slate-800/80 hover:bg-rose-950/40 border border-slate-700/60 hover:border-rose-900/60 text-[11px] text-slate-300 hover:text-rose-300 transition-colors"
                title="Sign out of administrative session"
              >
                <LogOut className="w-3 h-3" />
                <span>Exit</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500 text-center py-2">
            Verifying security credentials...
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 flex-shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-950 shadow-2xl z-10 animate-fade-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
