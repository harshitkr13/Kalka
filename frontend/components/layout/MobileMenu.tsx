'use client';

import React from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { NavItem } from '@/types';
import { Button } from '@/components/ui/Button';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-navy-deep/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Slide Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-navy p-6 flex flex-col justify-between text-white shadow-premium z-10 text-left">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-navy-border">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-gold flex items-center justify-center font-serif text-navy-deep font-bold text-sm">
                K
              </div>
              <span className="font-serif text-lg font-bold">KALKA CO.</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close navigation"
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="py-6 space-y-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block text-sm font-semibold uppercase tracking-wider text-slate-200 hover:text-gold py-1.5 transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-3 mt-1 space-y-1.5 border-l border-navy-border">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={onClose}
                        className="block text-xs text-slate-400 hover:text-white py-1"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-navy-border">
          <Link href="/contact" onClick={onClose} className="block w-full">
            <Button variant="gold" size="md" className="w-full justify-center">
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <p className="text-[10px] text-slate-400 text-center mt-3">
            Strategic Communication. Lasting Impact.
          </p>
        </div>
      </div>
    </div>
  );
};
