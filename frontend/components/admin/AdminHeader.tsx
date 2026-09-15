'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ExternalLink, LogOut, User, Shield, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface AdminHeaderProps {
  onToggleMobileMenu: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleMobileMenu }) => {
  const pathname = usePathname();
  const { user, systemHealth, logout } = useAdminAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Compute contextual breadcrumb title
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Workspace Overview';
    if (pathname === '/admin/settings/profile') return 'Security & Profile Settings';
    if (pathname === '/admin/access-denied') return 'Access Governance';
    return 'Administrative Portal';
  };

  const isHealthy = systemHealth?.status === 'healthy' && systemHealth?.database === 'connected';

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Open mobile navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium">
          <Link
            href="/admin"
            className="text-slate-400 hover:text-slate-200 transition-colors hidden sm:inline"
          >
            Portal
          </Link>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="text-slate-100 font-serif font-semibold text-sm sm:text-base tracking-tight">
            {getPageTitle()}
          </span>
        </div>
      </div>

      {/* Right: Live System Status, Public Site link, User Menu */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Real Live System Status Pill */}
        <div
          className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono border bg-slate-900/60 border-slate-800"
          title={`Backend API: ${systemHealth?.status || 'Active'}, Database: ${systemHealth?.database || 'Connected'}`}
        >
          {isHealthy ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-medium">Systems Operational</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-amber-400 font-medium">Connecting...</span>
            </>
          )}
        </div>

        {/* Public Website Link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
        >
          <span>Public Site</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </Link>

        {/* User Dropdown Menu */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full border border-slate-700 object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-serif font-bold text-xs">
                  {user.name?.charAt(0) || 'A'}
                </div>
              )}
              <span className="text-xs font-medium text-slate-200 hidden md:inline truncate max-w-[120px]">
                {user.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            </button>

            {/* Dropdown Content */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-950 border border-slate-800 shadow-2xl p-2 z-50 animate-fade-in">
                <div className="px-3 py-2.5 border-b border-slate-800/80 mb-1">
                  <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  <div className="mt-1.5 inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                    {user.role}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <Link
                    href="/admin/settings/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Profile & Security</span>
                  </Link>

                  <Link
                    href="/admin/access-denied"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
                  >
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span>Access Governance</span>
                  </Link>
                </div>

                <div className="pt-1 mt-1 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
