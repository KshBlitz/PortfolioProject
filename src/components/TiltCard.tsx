'use client';

import { useRef, useCallback, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
}

export default function TiltCard({ children, className = '', tiltAmount = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [hovered, setHovered] = useState(false);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [tiltAmount, -tiltAmount]),
    { stiffness: 250, damping: 25 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-tiltAmount, tiltAmount]),
    { stiffness: 250, damping: 25 }
  );

  const spotX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const spotY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
      }}
      className={`relative ${className}`}
    >
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] transition-opacity duration-300 z-10"
        style={{
          opacity: hovered ? 1 : 0,
          background: useTransform(
            [spotX, spotY],
            ([x, y]) =>
              `radial-gradient(400px circle at ${x} ${y}, oklch(0.65 0.12 180 / 0.07) 0%, transparent 60%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}
