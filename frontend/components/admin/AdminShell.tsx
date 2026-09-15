'use client';

import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export const AdminShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Sidebar (Desktop Persistent & Mobile Drawer) */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-slate-950">
        <AdminHeader onToggleMobileMenu={() => setMobileOpen(true)} />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Admin Footer Governance Stamp */}
        <footer className="border-t border-slate-900 px-4 sm:px-6 py-4 text-center">
          <p className="text-[11px] font-mono text-slate-600">
            Kalka Co. Media Consultancy &bull; Administrative Systems v1.0 &bull; Confidential & Audited
          </p>
        </footer>
      </div>
    </div>
  );
};
