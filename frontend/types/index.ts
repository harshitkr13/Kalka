import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export type BadgeVariant = 'neutral' | 'gold' | 'navy' | 'success' | 'warning' | 'error';
export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export interface ServiceCardProps {
  title: string;
  category: string;
  description: string;
  capabilities?: string[];
  href?: string;
  badge?: string;
}

export interface IndustryCardProps {
  title: string;
  description: string;
  sectorTag: string;
  featured?: boolean;
  href?: string;
}

export interface BlogCardProps {
  title: string;
  subtitle?: string;
  category: string;
  datePlaceholder: string;
  readTime: string;
  href?: string;
  imageUrl?: string;
}

export interface CaseStudyCardProps {
  title: string;
  clientIndustry: string;
  challengeBrief: string;
  metricPlaceholder: string;
  metricLabel: string;
  href?: string;
  imageUrl?: string;
}
