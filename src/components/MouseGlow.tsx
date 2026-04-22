'use client';

import { useEffect, useRef, useState } from 'react';

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setPos({ ...posRef.current });
          rafRef.current = 0;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Main glow - dark: subtle teal, light: warm white */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.65 0.15 180 / 0.025) 0%, transparent 60%)',
          opacity: 1,
          transform: `translate(${pos.x - 250}px, ${pos.y - 250}px)`,
          willChange: 'transform',
        }}
      />
      {/* Tight core - dark: teal, light: warm white */}
      <div
        className="absolute w-[160px] h-[160px] rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.65 0.12 180 / 0.045) 0%, transparent 65%)',
          opacity: 1,
          transform: `translate(${pos.x - 80}px, ${pos.y - 80}px)`,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
