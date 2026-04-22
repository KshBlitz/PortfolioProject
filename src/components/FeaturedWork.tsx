'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TiltCard from '@/components/TiltCard';

const projects = [
  {
    tag: 'CyArt Tech LLP | Product Development',
    title: 'Chain Discovery',
    problem:
      'Pentest outputs lack structure — events are disconnected, making it hard to trace how an attack actually progressed and where it led.',
    built: 'An attack chain intelligence platform that transforms flat pentest output into structured, interactive, MITRE-mapped attack chain views.',
    outcomes: [
    'Combines AI-driven interpretation with deterministic flow and validation logic',
    'Reconstructs attack sequence, context, and privilege evolution across events',
    'Bridges fragmented outputs into a unified, dependency-aware attack understanding',
    'Flags inconsistencies, invalid transitions, and incomplete attack paths',
    'Designed as a scalable system for real-time ingestion and analysis',
    ],
    tech: ['React Flow', 'MITRE ATT&CK v3.0', 'SLM', 'REST APIs', 'MongoDB']
  },
  {
    tag: 'Published Research | IJCRT',
    title: 'VerbaSafe',
    problem:
      'AI-generated voices make it increasingly difficult to trust voice-based interactions, enabling high-impact vishing and impersonation attacks.',
    built: 'A real-time voice analysis system designed to identify synthetic and manipulated speech in live and recorded scenarios.',
    outcomes: [
      'Converts audio signals into frequency-domain representations for pattern analysis',
    'Trained ML models (CNN/LSTM) on extracted audio features to distinguish real vs synthetic speech',
    'Evaluates temporal and spectral characteristics to detect inconsistencies in generated voices',
    'Research-backed system with focus on practical detection of voice-based attacks',
    ],
    tech: ['Python', 'PyTorch', 'CNN/LSTM', 'Audio Processing', 'Deep Learning']
  },
];

export default function FeaturedWork() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Featured Work
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Two projects that represent my best work — one in product engineering,
            one in research.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <TiltCard className="h-full" tiltAmount={4}>
        <Card className="h-full hover:shadow-lg hover:shadow-accent-teal/5 transition-all duration-300">
          <CardHeader>
            <Badge
              variant="secondary"
              className="mb-2 w-fit text-xs"
            >
              {project.tag}
            </Badge>
            <CardTitle className="text-xl">{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1.5">Problem</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1.5">What was built</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.built}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1.5">Key outcomes</h4>
              <ul className="space-y-1.5">
                {project.outcomes.map((outcome, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-accent-teal shrink-0 text-[10px] mt-[7px] leading-none">&#9679;</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="text-xs font-normal">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </TiltCard>
    </motion.div>
  );
}
