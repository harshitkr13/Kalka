'use client';

import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  MotionStyle,
  SpringOptions,
} from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type TiltProps = {
  children: React.ReactNode;
  className?: string;
  style?: MotionStyle;
  rotationFactor?: number;
  isRevese?: boolean;
  isReverse?: boolean;
  springOptions?: SpringOptions;
};

/**
 * Reusable 3D Tilt component based on the Motion-Primitives pattern.
 * Creates a subtle, physics-based 3D perspective tilt following the cursor.
 */
export function Tilt({
  children,
  className,
  style,
  rotationFactor = 8,
  isRevese = false,
  isReverse = false,
  springOptions = {
    stiffness: 200,
    damping: 20,
  },
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const reverse = isReverse || isRevese;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, springOptions);
  const ySpring = useSpring(y, springOptions);

  const rotateX = useTransform(
    ySpring,
    [-0.5, 0.5],
    reverse
      ? [rotationFactor, -rotationFactor]
      : [-rotationFactor, rotationFactor]
  );
  const rotateY = useTransform(
    xSpring,
    [-0.5, 0.5],
    reverse
      ? [-rotationFactor, rotationFactor]
      : [rotationFactor, -rotationFactor]
  );

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPos = mouseX / width - 0.5;
    const yPos = mouseY / height - 0.5;

    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} style={style as React.CSSProperties}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
        transform,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default Tilt;
