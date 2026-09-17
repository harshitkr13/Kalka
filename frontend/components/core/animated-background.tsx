'use client';

import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  useId,
  ReactElement,
} from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type AnimatedBackgroundProps = {
  children:
    | ReactElement<{ 'data-id': string; className?: string; [key: string]: any }>[]
    | ReactElement<{ 'data-id': string; className?: string; [key: string]: any }>;
  defaultValue?: string | null;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

/**
 * AnimatedBackground component inspired by the Motion-Primitives pattern.
 * Animates a shared background pill smoothly between child items using Framer Motion's layoutId.
 */
export function AnimatedBackground({
  children,
  defaultValue = null,
  onValueChange,
  className,
  transition = {
    type: 'spring',
    bounce: 0.2,
    duration: 0.3,
  },
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultValue ?? null);
  const uniqueId = useId();
  const prefersReducedMotion = useReducedMotion();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);
    if (onValueChange) {
      onValueChange(id);
    }
  };

  useEffect(() => {
    setActiveId(defaultValue ?? null);
  }, [defaultValue]);

  const effectiveTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : transition;

  return Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;

    const childProps = child.props as {
      'data-id'?: string;
      className?: string;
      children?: React.ReactNode;
      onMouseEnter?: React.MouseEventHandler;
      onMouseLeave?: React.MouseEventHandler;
      onFocus?: React.FocusEventHandler;
      onBlur?: React.FocusEventHandler;
      onClick?: React.MouseEventHandler;
      [key: string]: any;
    };

    const id = childProps['data-id'];

    const interactionProps = enableHover
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            childProps.onMouseEnter?.(e);
            if (id !== undefined) {
              handleSetActiveId(id);
            }
          },
          onMouseLeave: (e: React.MouseEvent) => {
            childProps.onMouseLeave?.(e);
            const currentTarget = e.currentTarget as HTMLElement | null;
            const container = currentTarget?.parentElement;
            const related = e.relatedTarget as Node | null;

            // If pointer left the container / navigation group, restore to active route
            if (!container || !container.contains(related)) {
              handleSetActiveId(defaultValue ?? null);
            }
          },
          onFocus: (e: React.FocusEvent) => {
            childProps.onFocus?.(e);
            if (id !== undefined) {
              handleSetActiveId(id);
            }
          },
          onBlur: (e: React.FocusEvent) => {
            childProps.onBlur?.(e);
            const currentTarget = e.currentTarget as HTMLElement | null;
            const container = currentTarget?.parentElement;
            const related = e.relatedTarget as Node | null;

            // If focus left the navigation group, restore to active route
            if (!container || !container.contains(related)) {
              handleSetActiveId(defaultValue ?? null);
            }
          },
        }
      : {
          onClick: (e: React.MouseEvent) => {
            childProps.onClick?.(e);
            if (id !== undefined) {
              handleSetActiveId(id);
            }
          },
        };

    const isDiv = child.type === 'div';
    const ContentWrapper = isDiv ? 'div' : 'span';

    return cloneElement(
      child,
      {
        key: id || index,
        className: cn('relative inline-flex', childProps.className),
        'data-checked': activeId === id ? 'true' : 'false',
        ...interactionProps,
      },
      <>
        <AnimatePresence initial={false}>
          {id !== undefined && activeId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn('absolute inset-0 z-0 pointer-events-none', className)}
              transition={effectiveTransition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <ContentWrapper className="relative z-10 inline-flex items-center w-full h-full">
          {childProps.children}
        </ContentWrapper>
      </>
    );
  });
}
export default AnimatedBackground;
