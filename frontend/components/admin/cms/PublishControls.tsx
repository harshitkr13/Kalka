'use client';

import React from 'react';
import Link from 'next/link';
import { Send, Save, ArrowLeft, Loader2, Lock } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export interface PublishControlsProps {
  currentStatus: 'published' | 'draft' | 'archived' | string;
  isSubmitting?: boolean;
  hasUnsavedChanges?: boolean;
  backHref: string;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export const PublishControls: React.FC<PublishControlsProps> = ({
  currentStatus,
  isSubmitting = false,
  hasUnsavedChanges = false,
  backHref,
  onSaveDraft,
  onPublish,
}) => {
  const { hasPermission } = useAdminAuth();
  const canPublish = hasPermission('content:publish');

  const isPublished = currentStatus === 'published';

  return (
    <div className="sticky bottom-0 z-20 py-4 px-6 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 -mx-4 sm:-mx-6 lg:-mx-8 mt-12 shadow-2xl">
      {/* Left: Back link and unsaved changes notice */}
      <div className="flex items-center gap-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Discard & Return</span>
        </Link>

        {hasUnsavedChanges && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full animate-pulse">
            Unsaved Changes
          </span>
        )}
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {/* Save Draft Button */}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSaveDraft}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-medium text-xs transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />
          ) : (
            <Save className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span>Save as Draft</span>
        </button>

        {/* Publish Button */}
        <button
          type="button"
          disabled={isSubmitting || !canPublish}
          onClick={onPublish}
          title={
            !canPublish
              ? 'Publishing requires CONTENT_MANAGER or SUPER_ADMIN authorization'
              : undefined
          }
          className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-semibold text-xs tracking-wide transition-all shadow-md ${
            canPublish
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
          } disabled:opacity-50`}
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : !canPublish ? (
            <Lock className="w-3.5 h-3.5 text-slate-500" />
          ) : (
            <Send className="w-3.5 h-3.5 text-slate-950" />
          )}
          <span>{isPublished ? 'Update Published' : 'Publish to Website'}</span>
        </button>
      </div>
    </div>
  );
};
