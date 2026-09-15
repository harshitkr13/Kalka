'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { MotionFade } from '@/components/motion/MotionFade';

export interface HeroProps {
  badge?: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel?: string;
  primaryCtaAction?: () => void;
  secondaryCtaLabel?: string;
  secondaryCtaAction?: () => void;
  trustText?: string;
  mediaSlot?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  badge = 'Strategic Communication. Lasting Impact.',
  headline,
  subheadline,
  primaryCtaLabel = 'Start a Conversation',
  primaryCtaAction,
  secondaryCtaLabel = 'Explore Our Work',
  secondaryCtaAction,
  trustText = 'Trusted strategic advisor to leadership across high-stakes industries',
  mediaSlot,
  imageSrc,
  imageAlt,
  className,
}) => {
  return (
    <section
      className={cn(
        'relative bg-navy-deep text-white overflow-hidden py-20 lg:py-32 border-b border-navy-border',
        className
      )}
    >
      {/* Subtle architectural background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c9a84c_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none overflow-hidden" aria-hidden="true">
        <Image
          src="/assets/backgrounds/abstract-editorial.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-8 space-y-6">
            <MotionFade delay={0.05} direction="up">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold py-1 px-3 rounded-full bg-gold/10 border border-gold/20">
                <span>{badge}</span>
              </span>
            </MotionFade>

            <MotionFade delay={0.15} direction="up">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                {headline}
              </h1>
            </MotionFade>

            <MotionFade delay={0.25} direction="up">
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
                {subheadline}
              </p>
            </MotionFade>

            <MotionFade delay={0.35} direction="up">
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={primaryCtaAction}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {primaryCtaLabel}
                </Button>
                {secondaryCtaLabel && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-600 text-slate-200 hover:bg-white/5 hover:text-white"
                    onClick={secondaryCtaAction}
                  >
                    {secondaryCtaLabel}
                  </Button>
                )}
              </div>
            </MotionFade>

            {trustText && (
              <MotionFade delay={0.45} direction="up">
                <div className="pt-6 border-t border-navy-border/60 flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  <span>{trustText}</span>
                </div>
              </MotionFade>
            )}
          </div>

          {/* Right Column: Visual / Graphic Slot */}
          <div className="lg:col-span-4">
            <MotionFade delay={0.3} direction="left">
              {mediaSlot ? (
                mediaSlot
              ) : imageSrc ? (
                <div className="relative rounded-lg overflow-hidden border border-navy-border shadow-elevated group aspect-[4/3] lg:aspect-auto lg:h-[380px] w-full bg-navy-surface">
                  <Image
                    src={imageSrc}
                    alt={imageAlt || 'Strategic communications and public relations'}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 380px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded bg-navy-deep/90 backdrop-blur-md border border-navy-border/60 text-xs">
                    <span className="text-gold font-mono uppercase tracking-widest text-[10px] block font-semibold">Strategic Advisory</span>
                    <span className="text-slate-200 font-serif">Kalka Co. Media Consultancy</span>
                  </div>
                </div>
              ) : (
                <div className="border border-navy-border rounded bg-navy-surface/60 p-6 sm:p-8 backdrop-blur-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-navy-border/80 pb-3">
                    <span className="text-[11px] uppercase tracking-widest text-gold font-semibold">
                      Consultancy Scope
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Strategic Counsel</span>
                  </div>
                  <p className="text-sm text-slate-300 font-serif leading-relaxed">
                    Elevating corporate reputation, orchestrating strategic media relations, and navigating high-stakes crisis communications.
                  </p>
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Advisory Model</span>
                      <span className="text-slate-200">Retainer & Campaign</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Practice Depth</span>
                      <span className="text-slate-200">Multi-Sector PR</span>
                    </div>
                  </div>
                </div>
              )}
            </MotionFade>
          </div>
        </div>
      </div>
    </section>
  );
};
