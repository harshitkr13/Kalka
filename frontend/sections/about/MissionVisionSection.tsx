import React from 'react';
import { Flag, Eye } from 'lucide-react';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { cn } from '@/lib/utils';

export interface MissionVisionSectionProps {
  mission?: string | null;
  vision?: string | null;
  className?: string;
}

/**
 * Reusable, responsive Mission and Vision section for Kalka Co. Media Consultancy.
 * Remains completely hidden (`null`) until client-approved statements are provided.
 */
export const MissionVisionSection: React.FC<MissionVisionSectionProps> = ({
  mission,
  vision,
  className,
}) => {
  const approvedMission = mission?.trim() || null;
  const approvedVision = vision?.trim() || null;

  if (!approvedMission && !approvedVision) {
    return null;
  }

  const hasBoth = Boolean(approvedMission && approvedVision);

  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-vision-heading"
      className={cn(
        'py-14 sm:py-20 lg:py-24 bg-slate-50/60 border-b border-slate-200 text-left',
        className
      )}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <SectionHeader
          overline="Institutional Direction"
          title="Mission & Vision"
          description="Foundational direction guiding Kalka Co. Media Consultancy across strategic communication, media relations, and reputation management."
        />

        <div
          className={cn(
            'grid grid-cols-1 gap-6 sm:gap-8',
            hasBoth ? 'md:grid-cols-2' : 'max-w-3xl mx-auto'
          )}
        >
          {approvedMission && (
            <article className="p-7 sm:p-9 rounded-lg border border-slate-200 bg-white shadow-subtle hover:border-gold/60 transition-colors flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-lg bg-navy text-gold flex items-center justify-center shrink-0">
                  <Flag className="w-5 h-5" aria-hidden="true" />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-ink block mb-1.5 font-semibold">
                    01 &bull; Purpose
                  </span>
                  <h2
                    id="mission-vision-heading"
                    className="font-serif text-2xl sm:text-3xl font-semibold text-navy"
                  >
                    Our Mission
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {approvedMission}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-mono">
                Strategic Communication. Lasting Impact.
              </div>
            </article>
          )}

          {approvedVision && (
            <article className="p-7 sm:p-9 rounded-lg border border-navy-border bg-navy text-white shadow-elevated flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-lg bg-navy-surface border border-navy-border text-gold flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5" aria-hidden="true" />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-gold block mb-1.5 font-semibold">
                    02 &bull; Aspiration
                  </span>
                  <h2
                    id={approvedMission ? undefined : 'mission-vision-heading'}
                    className="font-serif text-2xl sm:text-3xl font-semibold text-white"
                  >
                    Our Vision
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  {approvedVision}
                </p>
              </div>

              <div className="pt-4 border-t border-navy-border text-xs text-slate-400 font-mono">
                Kalka Co. Media Consultancy
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};
