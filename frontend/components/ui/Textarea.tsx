'use client';

import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  helperText,
  error,
  className,
  id,
  required,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          {label} {required && <span className="text-status-error">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        className={cn(
          'w-full px-3.5 py-2.5 bg-white text-slate-900 border rounded text-sm placeholder:text-slate-400 transition-colors',
          'border-slate-300 hover:border-slate-400 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none',
          'disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed resize-y',
          error && 'border-status-error focus:border-status-error focus:ring-status-error',
          className
        )}
        {...props}
      />
      {error ? (
        <p id={`${textareaId}-error`} className="text-xs text-status-error font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${textareaId}-helper`} className="text-xs text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Textarea.displayName = 'Textarea';
