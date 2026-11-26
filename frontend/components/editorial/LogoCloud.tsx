'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { associatedClients } from '@/lib/content/clients';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface LogoItem {
  name: string;
  industry?: string;
  category?: string;
  logo?: string;
  logoAsset?: string;
}

export interface LogoCloudProps {
  title?: string;
  items?: LogoItem[];
  className?: string;
}

interface ClientTileProps {
  client: LogoItem;
  isDuplicate?: boolean;
}

const ClientTile: React.FC<ClientTileProps> = ({ client, isDuplicate = false }) => {
  const logoUrl = client.logoAsset || client.logo;

  return (
    <Link
      href="/clients"
      tabIndex={isDuplicate ? -1 : undefined}
      aria-label={isDuplicate ? undefined : `${client.name} — View client portfolio`}
      className={cn(
        'group/card flex flex-col items-center justify-center px-5 py-4',
        'border border-slate-200/90 bg-white rounded-lg shadow-subtle',
        'hover:border-gold/70 hover:shadow-elevated transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
        'h-[96px] select-none'
      )}
    >
      {logoUrl ? (
        <div className="relative h-10 w-36 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt={isDuplicate ? '' : client.name}
            className="max-h-10 max-w-full w-auto h-auto object-contain"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="text-center space-y-1">
          <span className="font-serif text-sm sm:text-base font-bold text-navy group-hover/card:text-gold-ink transition-colors block leading-snug line-clamp-2">
            {client.name}
          </span>
          {(client.industry || client.category) && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block truncate max-w-[190px]">
              {client.industry || client.category}
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

export const LogoCloud: React.FC<LogoCloudProps> = ({
  title = 'Associated Brands & Organizations',
  items,
  className,
}) => {
  const clients = items && items.length > 0 ? items : associatedClients;
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className={cn('py-10 sm:py-12 border-y border-slate-200 bg-slate-50/60 overflow-hidden', className)}>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8">
          {title ? (
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 font-mono text-center sm:text-left">
              {title}
            </p>
          ) : (
            <span />
          )}

          {!shouldReduceMotion && (
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-pressed={isPaused}
              aria-label={isPaused ? 'Resume client showcase animation' : 'Pause client showcase animation'}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[44px] min-w-[44px] rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:text-navy hover:border-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-gold-ink" aria-hidden="true" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                  <span>Pause</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Reduced motion fallback: static responsive grid */}
        {shouldReduceMotion ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {clients.map((client) => (
              <ClientTile key={client.name} client={client} />
            ))}
          </div>
        ) : (
          /* Smooth accessible horizontal marquee with edge fade masks */
          <div
            className="kalka-marquee-viewport relative overflow-hidden -mx-1 px-1"
            role="region"
            aria-roledescription="carousel"
            aria-label={title || 'Associated Brands & Organizations'}
          >
            {/* Subtle edge gradients */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-14 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-14 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10"
              aria-hidden="true"
            />

            <div
              className="kalka-marquee-track py-1"
              data-paused={isPaused ? 'true' : 'false'}
            >
              {/* Primary accessible track */}
              <ul className="flex items-stretch gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0 list-none m-0 p-0">
                {clients.map((client) => (
                  <li key={`primary-${client.name}`} className="w-[210px] sm:w-[240px] shrink-0">
                    <ClientTile client={client} />
                  </li>
                ))}
              </ul>

              {/* Duplicate track for seamless loop (hidden from assistive tech & tab order) */}
              <ul
                aria-hidden="true"
                className="flex items-stretch gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0 list-none m-0 p-0"
              >
                {clients.map((client) => (
                  <li key={`dup-${client.name}`} className="w-[210px] sm:w-[240px] shrink-0">
                    <ClientTile client={client} isDuplicate />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
