import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface StatusCardProps {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  status: 'healthy' | 'active' | 'warning' | 'neutral';
}

export const StatusCard: React.FC<StatusCardProps> = ({
  label,
  value,
  detail,
  icon: Icon,
  status,
}) => {
  const statusStyles = {
    healthy: {
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      dotBg: 'bg-emerald-400',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    active: {
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      dotBg: 'bg-amber-400',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
    warning: {
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      dotBg: 'bg-rose-400',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    },
    neutral: {
      badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
      dotBg: 'bg-slate-400',
      iconBg: 'bg-slate-800 text-slate-300 border-slate-700',
    },
  };

  const style = statusStyles[status];

  return (
    <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
          {label}
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${style.iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`w-2 h-2 rounded-full ${style.dotBg} animate-pulse`} />
          <h3 className="text-lg font-serif font-semibold text-slate-100 tracking-tight">
            {value}
          </h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">{detail}</p>
      </div>
    </div>
  );
};
