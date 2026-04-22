'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState, useRef } from 'react';

function FloatingOrb({ className, delay = 0, mouseX, mouseY, speed = 1 }: {
  className: string;
  delay?: number;
  mouseX: ReturnType<typeof useMotionValue>;
  mouseY: ReturnType<typeof useMotionValue>;
  speed?: number;
}) {
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40 * speed, 40 * speed]), { stiffness: 40, damping: 20 });
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30 * speed, 30 * speed]), { stiffness: 40, damping: 20 });

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-15 dark:opacity-[0.08] ${className}`}
      style={{ x, y }}
      animate={{
        scale: [1, 1.15, 1],
      }}
      transition={{
        scale: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay },
      }}
    />
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayText}
      {started && displayText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] bg-accent-teal ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springX = useSpring(rawMouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(rawMouseY, { stiffness: 60, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawMouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    rawMouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 hero-pattern" />

      {/* Mouse-following gradient spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useSpring(
            useTransform(
              [rawMouseX, rawMouseY],
              ([x, y]) =>
                `radial-gradient(800px circle at ${50 + x * 30}% ${50 + y * 30}%, oklch(0.65 0.04 30 / 0.04) 0%, transparent 50%)`
            ),
            { stiffness: 40, damping: 25 }
          ),
        }}
      />

      {/* Parallax floating orbs - different speeds */}
      <FloatingOrb className="w-72 h-72 bg-accent-teal top-[15%] -left-16" delay={0} mouseX={rawMouseX} mouseY={rawMouseY} speed={1.2} />
      <FloatingOrb className="w-96 h-96 bg-accent-teal bottom-[20%] -right-24" delay={2} mouseX={rawMouseX} mouseY={rawMouseY} speed={0.6} />
      <FloatingOrb className="w-48 h-48 bg-accent-teal top-[10%] right-[20%]" delay={4} mouseX={rawMouseX} mouseY={rawMouseY} speed={1.8} />
      <FloatingOrb className="w-32 h-32 bg-accent-teal bottom-[40%] left-[15%]" delay={1} mouseX={rawMouseX} mouseY={rawMouseY} speed={0.9} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center gap-6"
          style={{ perspective: 800 }}
        >
          {/* Location badge - subtle parallax */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ x: useSpring(useTransform(rawMouseX, v => v * 8), { stiffness: 60, damping: 20 }) }}
          >
            <Badge
              variant="outline"
              className="px-3 py-1.5 text-sm gap-2 border-accent-teal/30 bg-accent-teal-light backdrop-blur-sm"
            >
              <MapPin className="size-3.5 text-accent-teal" />
              Pune, India 
            </Badge>
          </motion.div>

          {/* Name - parallax */}
          <motion.div
            style={{
              x: springX,
              y: springY,
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              Kalash M.
            </h1>
          </motion.div>

          {/* Role - reverse parallax */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-accent-teal font-medium h-[2em]"
            style={{ x: useSpring(useTransform(rawMouseX, v => v * -12), { stiffness: 60, damping: 20 }) }}
          >
            <TypewriterText text="Security Engineer" delay={0.5} />
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl"
          >
            Build detection pipelines, simulate attacks, and investigate how systems behave under real conditions.
          </motion.p>

          {/* Experience note */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            Cybersecurity Engineer focused on detection, incident response, and attack analysis.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mt-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
              <Link href="/work">
                <Button
                  size="lg"
                  className="bg-accent-teal hover:bg-accent-teal/90 text-white gap-2 glow-teal"
                >
                  View My Work
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
        >
          <motion.div className="w-1 h-2 rounded-full bg-accent-teal" />
        </motion.div>
      </motion.div>
    </section>
  );
}
