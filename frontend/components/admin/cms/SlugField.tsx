'use client';

import React, { useState } from 'react';
import { Lock, Unlock, RefreshCw, AlertTriangle } from 'lucide-react';
import { FormField } from './FormField';

export interface SlugFieldProps {
  slug: string;
  onChange: (value: string) => void;
  sourceValue?: string;
  error?: string;
  isExistingItem?: boolean;
}

export const SlugField: React.FC<SlugFieldProps> = ({
  slug,
  onChange,
  sourceValue = '',
  error,
  isExistingItem = false,
}) => {
  const [locked, setLocked] = useState(isExistingItem);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleRegenerate = () => {
    if (sourceValue) {
      const generated = generateSlug(sourceValue);
      onChange(generated);
    }
  };

  return (
    <FormField
      label="URL Slug"
      required
      error={error}
      description="URL identifier for public routing (lowercase letters, numbers, and hyphens only)."
    >
      <div className="space-y-2">
        <div className="relative flex items-center">
          <span className="absolute left-3 font-mono text-xs text-slate-500 select-none">
            /
          </span>
          <input
            type="text"
            value={slug}
            readOnly={locked}
            onChange={(e) => onChange(generateSlug(e.target.value))}
            placeholder="e.g. strategic-crisis-communications"
            className={`w-full pl-6 pr-20 py-2 bg-slate-950/80 border rounded-lg font-mono text-xs text-amber-300 placeholder-slate-600 focus:outline-none focus:ring-1 ${
              error
                ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20'
                : 'border-slate-800 focus:border-amber-500/50 focus:ring-amber-500/30'
            } ${locked ? 'cursor-not-allowed opacity-70' : ''}`}
          />

          <div className="absolute right-2 flex items-center gap-1">
            {sourceValue && !locked && (
              <button
                type="button"
                onClick={handleRegenerate}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Regenerate slug from title"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}

            {isExistingItem && (
              <button
                type="button"
                onClick={() => setLocked((prev) => !prev)}
                className={`p-1 rounded transition-colors ${
                  locked ? 'text-amber-400 hover:bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={locked ? 'Unlock to edit slug' : 'Lock slug'}
              >
                {locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {isExistingItem && !locked && (
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-tight">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
            <span>
              Changing the slug of an existing item will alter its public URL. Any external bookmarks or links will require updating.
            </span>
          </div>
        )}
      </div>
    </FormField>
  );
};
