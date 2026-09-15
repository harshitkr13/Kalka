import React from 'react';

export interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  description,
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-200 tracking-wide">
          {label}
          {required && <span className="text-amber-400 ml-1 font-bold">*</span>}
        </label>
        {required && (
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            Required
          </span>
        )}
      </div>

      {description && (
        <p className="text-[11px] text-slate-400 leading-normal">{description}</p>
      )}

      {children}

      {error && (
        <p className="text-[11px] text-rose-400 font-medium leading-tight flex items-center gap-1">
          <span>&bull;</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
