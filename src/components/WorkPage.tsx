'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FeaturedWork from '@/components/FeaturedWork';
import Projects from '@/components/Projects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WorkPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Work
              </h1>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
                Projects and experiments — from product engineering to research.
                Each one represents a real problem I identified and solved.
              </p>
            </motion.div>
          </div>
        </section>

        <FeaturedWork />

        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Projects />
          </div>
        </section>

        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center gap-6"
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Interested in working together?
              </h2>
              <p className="text-muted-foreground max-w-lg leading-relaxed">
                I&apos;m open to freelance engagements, contract work, and full-time opportunities in security operations and detection engineering.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-accent-teal hover:bg-accent-teal/90 text-white gap-2"
                >
                  Get in Touch
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
