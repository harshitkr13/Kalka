'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';

export interface CMSPageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  actionHref?: string;
  actionLabel?: string;
  actionIcon?: React.ElementType;
  secondaryAction?: React.ReactNode;
}

export const CMSPageHeader: React.FC<CMSPageHeaderProps> = ({
  title,
  description,
  backHref,
  backLabel = 'Back',
  actionHref,
  actionLabel,
  actionIcon: ActionIcon = Plus,
  secondaryAction,
}) => {
  return (
    <div className="space-y-4 mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{backLabel}</span>
        </Link>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {secondaryAction}
          {actionHref && actionLabel && (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-md"
            >
              <ActionIcon className="w-4 h-4" />
              <span>{actionLabel}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
