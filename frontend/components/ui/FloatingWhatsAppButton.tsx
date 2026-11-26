'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { companyConfig } from '@/lib/config/company';
import { trackWhatsAppClick } from '@/lib/analytics';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * Persistent floating WhatsApp contact button for public-facing pages.
 * Automatically hidden inside `/admin` routes and when printing.
 */
export const FloatingWhatsAppButton: React.FC = () => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (pathname === '/admin' || pathname?.startsWith('/admin/')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 print:hidden">
      <a
        href={companyConfig.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating_button')}
        aria-label="Chat with Kalka Co. Media Consultancy on WhatsApp (opens in a new tab)"
        className={cn(
          'group relative inline-flex items-center justify-center',
          'w-12 h-12 sm:w-14 sm:h-14 rounded-full',
          'bg-navy text-white border border-gold/50 shadow-premium',
          'hover:bg-navy-surface hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
          !shouldReduceMotion && 'transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0'
        )}
      >
        {/* Subtle visual tooltip on desktop hover/focus (label provided via aria-label) */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none hidden sm:flex items-center gap-1.5 whitespace-nowrap',
            'absolute right-full mr-3 px-3 py-1.5 rounded-md',
            'bg-navy-deep text-white border border-navy-border shadow-elevated',
            'text-xs font-medium tracking-wide opacity-0 translate-x-1',
            'group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0',
            !shouldReduceMotion && 'transition-all duration-200'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
          <span>WhatsApp Desk</span>
        </span>

        <Image
          src="/icons/whatsapp.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
        />
      </a>
    </div>
  );
};
