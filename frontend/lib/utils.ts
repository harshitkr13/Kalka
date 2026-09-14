import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names with Tailwind conflict resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats numbers into readable counts or placeholders.
 */
export function formatMetric(val: number | string, suffix: string = ''): string {
  return `${val}${suffix}`;
}
