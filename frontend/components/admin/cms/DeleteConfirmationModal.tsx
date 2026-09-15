'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  itemName: string;
  itemType?: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  itemName,
  itemType = 'item',
  isDeleting = false,
  onConfirm,
  onClose,
}) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && !isDeleting) {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={!isDeleting ? onClose : undefined}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-10 animate-fade-in space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-white">
              Confirm {itemType} Deletion
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <span className="text-white font-semibold">&ldquo;{itemName}&rdquo;</span>? This action cannot be reversed.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wide transition-colors shadow-md disabled:opacity-50"
          >
            {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{isDeleting ? 'Deleting...' : `Delete ${itemType}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
