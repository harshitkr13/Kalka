import React from 'react';
import { LucideIcon, Lock, Sparkles } from 'lucide-react';

export interface ModulePlaceholderProps {
  title: string;
  description: string;
  phase: string;
  icon: LucideIcon;
  capabilities: string[];
  requiredRole?: string;
}

export const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({
  title,
  description,
  phase,
  icon: Icon,
  capabilities,
  requiredRole,
}) => {
  return (
    <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/60 transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-amber-400 group-hover:border-amber-500/30 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-2.5 h-2.5" />
            {phase}
          </span>
        </div>

        <h3 className="font-serif text-base font-semibold text-slate-100 mb-1.5 group-hover:text-amber-200 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">{description}</p>

        <div className="space-y-1.5 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
            Scheduled Capabilities
          </span>
          <ul className="space-y-1">
            {capabilities.map((cap, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-slate-500" />
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Lock className="w-3 h-3 text-slate-500" />
          {requiredRole ? `Role: ${requiredRole}` : 'Admin Access'}
        </span>
        <span className="font-mono text-slate-400">Roadmap Item</span>
      </div>
    </div>
  );
};
