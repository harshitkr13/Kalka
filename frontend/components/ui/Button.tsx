'use client';

import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ButtonVariant, ButtonSize } from '@/types';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  type = 'button',
  ...props
}, ref) => {
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-navy text-white hover:bg-navy-surface active:bg-navy-deep border border-navy shadow-subtle',
    secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 border border-slate-200',
    outline: 'bg-transparent text-navy hover:bg-slate-100 active:bg-slate-200 border border-slate-300',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 border-transparent',
    gold: 'bg-gold text-navy-deep font-semibold hover:bg-gold-light active:bg-gold-dark border border-gold-dark/40 shadow-subtle',
    danger: 'bg-status-error text-white hover:bg-status-error/90 active:bg-status-error/80 border border-transparent shadow-subtle',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs tracking-wider uppercase font-medium gap-1.5',
    md: 'px-5 py-2.5 text-sm font-medium gap-2',
    lg: 'px-7 py-3.5 text-base font-medium gap-2.5',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded transition-all duration-150',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
