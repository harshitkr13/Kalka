'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  triggerRef,
}) => {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Stabilise onClose callback in a ref to prevent unnecessary focus restorations on parent re-renders
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const triggerRefStable = useRef(triggerRef);
  useEffect(() => {
    triggerRefStable.current = triggerRef;
  });

  // Automatically close drawer when navigating to another route
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (isOpen && pathname !== prevPathnameRef.current) {
      onCloseRef.current();
    }
    prevPathnameRef.current = pathname;
  }, [pathname, isOpen]);

  const isItemActive = (href: string, children?: { href: string }[]) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    if (pathname === href || pathname.startsWith(href + '/')) return true;
    if (href === '/case-studies' && (pathname === '/work' || pathname.startsWith('/work/'))) return true;
    if (children && children.some((child) => pathname === child.href || pathname.startsWith(child.href + '/'))) {
      return true;
    }
    return false;
  };

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Focus trapping, outside focus redirect, Escape key, and focus restoration
  useEffect(() => {
    if (!isOpen) return;

    const triggerElement = triggerRefStable.current?.current;

    // Helper to query all visible, enabled focusable elements inside drawer
    const getFocusableElements = (): HTMLElement[] => {
      if (!drawerRef.current) return [];
      const nodes = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      return Array.from(nodes).filter((el) => {
        return (
          el.tabIndex >= 0 &&
          !el.hasAttribute('disabled') &&
          el.getAttribute('aria-hidden') !== 'true' &&
          (el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0)
        );
      });
    };

    // Focus close button initially when opened
    const timer = setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      } else {
        const focusables = getFocusableElements();
        focusables[0]?.focus();
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        e.preventDefault();
        onCloseRef.current();
        return;
      }

      // Trap focus within drawer on Tab / Shift+Tab
      if (e.key === 'Tab' || e.keyCode === 9) {
        if (!drawerRef.current) return;
        const focusables = getFocusableElements();
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];
        const activeElement = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          // Shift + Tab: backwards
          if (!activeElement || !drawerRef.current.contains(activeElement) || activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: forwards
          if (!activeElement || !drawerRef.current.contains(activeElement) || activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Detect if active element moves outside the drawer and return focus inside
    const handleFocusIn = (e: FocusEvent) => {
      if (!drawerRef.current) return;
      if (e.target && !drawerRef.current.contains(e.target as Node)) {
        const focusables = getFocusableElements();
        if (focusables.length > 0) {
          focusables[0].focus();
        } else if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
      // Restore focus to trigger button upon close
      triggerElement?.focus();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 lg:hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-deep/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Slide Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{
              type: 'tween',
              ease: 'easeInOut',
              duration: shouldReduceMotion ? 0 : 0.2,
            }}
            className="fixed inset-y-0 right-0 w-[85vw] max-w-[320px] bg-navy text-white shadow-premium z-10 text-left flex flex-col justify-between overflow-y-auto overscroll-contain max-h-screen"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-navy-border">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-2.5 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
                    <Image
                      src="/assets/brand/kalka-co-logo-white.svg"
                      alt="Kalka Co. Media Consultancy"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-serif text-base font-bold leading-none block">
                      KALKA CO.
                    </span>
                    <span className="text-[10px] text-gold font-mono block mt-0.5">
                      Media Consultancy
                    </span>
                  </div>
                </Link>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label="Close navigation"
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-4 space-y-1" aria-label="Mobile Navigation Links">
                {navItems.map((item) => {
                  const active = isItemActive(item.href, item.children);
                  return (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'flex items-center min-h-[44px] text-sm font-semibold uppercase tracking-wider py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2',
                          active ? 'text-gold' : 'text-slate-200 hover:text-gold'
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="pl-3 mt-0.5 mb-1 space-y-0.5 border-l border-navy-border/80">
                          {item.children.map((child) => {
                            const childActive = isItemActive(child.href);
                            return (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={onClose}
                                className={cn(
                                  'flex items-center min-h-[44px] text-xs py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2',
                                  childActive ? 'text-gold font-medium' : 'text-slate-400 hover:text-white'
                                )}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom CTA */}
            <div className="p-6 border-t border-navy-border bg-navy-surface/40 mt-auto">
              <Link href="/contact" onClick={onClose} className="block w-full">
                <Button
                  variant="gold"
                  size="md"
                  className="w-full min-h-[44px] justify-center whitespace-nowrap"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Conversation
                </Button>
              </Link>
              <p className="text-[11px] text-slate-400 text-center mt-3 font-serif">
                Strategic Communication. Lasting Impact.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
