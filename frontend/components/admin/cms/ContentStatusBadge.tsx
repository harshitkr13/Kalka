import React from 'react';

export interface ContentStatusBadgeProps {
  status: 'published' | 'draft' | 'archived' | string;
  size?: 'sm' | 'md';
}

export const ContentStatusBadge: React.FC<ContentStatusBadgeProps> = ({
  status,
  size = 'md',
}) => {
  const normalized = status?.toLowerCase() || 'draft';

  const styles = {
    published: {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      dot: 'bg-emerald-400',
      label: 'Published',
    },
    draft: {
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      dot: 'bg-amber-400',
      label: 'Draft',
    },
    archived: {
      bg: 'bg-slate-800 text-slate-400 border-slate-700',
      dot: 'bg-slate-500',
      label: 'Archived',
    },
  }[normalized] || {
    bg: 'bg-slate-800 text-slate-400 border-slate-700',
    dot: 'bg-slate-500',
    label: status,
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider font-semibold rounded-full border select-none ${sizeClasses} ${styles.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      <span>{styles.label}</span>
    </span>
  );
};
