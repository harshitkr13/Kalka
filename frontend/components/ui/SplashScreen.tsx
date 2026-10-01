'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const SplashScreen: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Initialize state: skip immediately if user prefers reduced motion or has seen it this session
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      // 1. Accessibility check: ALWAYS respect reduced motion first
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
      }
      // 2. Check for explicit force replay query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const forceSplash = urlParams.get('splash') === '1' || urlParams.get('splash') === 'true';
      if (!forceSplash && sessionStorage.getItem('kalka_splash_seen')) {
        return false;
      }
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Accessibility check: ALWAYS honor reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || shouldReduceMotion) {
      setIsVisible(false);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const forceSplash = urlParams.get('splash') === '1' || urlParams.get('splash') === 'true';
    const hasSeen = sessionStorage.getItem('kalka_splash_seen');

    if (!forceSplash && hasSeen) {
      setIsVisible(false);
      return;
    }

    // Immediately record session flag so client-side navigation never triggers replay
    sessionStorage.setItem('kalka_splash_seen', 'true');

    // Lock document scroll during splash presentation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Fallback safety timeout (1.35s) in case animation events do not fire
    const safetyTimer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      setIsVisible(false);
    }, 1350);

    return () => {
      clearTimeout(safetyTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [shouldReduceMotion]);

  const handleAnimationComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('kalka_splash_seen', 'true');
    }
    document.body.style.overflow = '';
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Hide splash screen immediately if JavaScript is disabled or user prefers reduced motion */}
      <noscript>
        <style>{`#kalka-splash-overlay { display: none !important; }`}</style>
      </noscript>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #kalka-splash-overlay {
            display: none !important;
          }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            id="kalka-splash-overlay"
            role="status"
            aria-live="polite"
            aria-label="Kalka Co. Media Consultancy loading screen"
            initial={{ opacity: 1 }}
            animate={{
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 1.25,
              times: [0, 0.64, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={handleAnimationComplete}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-deep select-none overflow-hidden"
          >
            {/* Subtle radial ambient highlight behind brand mark */}
            <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full bg-gold/5 blur-[80px] pointer-events-none" />

            {/* Central Brand Lockup: Animated via opacity, subtle scale and blur */}
            <motion.div
              initial={{
                opacity: 0.85,
                scale: 0.98,
                filter: 'blur(2.5px)',
              }}
              animate={{
                opacity: [0.85, 1, 1, 0],
                scale: [0.98, 1, 1, 0.985],
                filter: ['blur(2.5px)', 'blur(0px)', 'blur(0px)', 'blur(2px)'],
                y: [0, 0, 0, -4],
              }}
              transition={{
                duration: 1.25,
                times: [0, 0.288, 0.64, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 flex flex-col items-center text-center px-6 pointer-events-none"
            >
              {/* Official Brand Emblem */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/assets/brand/kalka-co-logo-white.svg"
                  alt="Kalka Co. Media Consultancy"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              {/* Master Brand Wordmark */}
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.25em] text-white uppercase block leading-none">
                KALKA CO.
              </span>

              {/* Editorial Subtitle with Restrained Gold Accents */}
              <div className="flex items-center gap-2.5 mt-2.5">
                <div className="h-px w-5 sm:w-7 bg-gold/30" />
                <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.3em] text-gold uppercase block">
                  Media Consultancy
                </span>
                <div className="h-px w-5 sm:w-7 bg-gold/30" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
