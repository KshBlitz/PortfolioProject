'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Search, Server, FileCode2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TiltCard from '@/components/TiltCard';

const skills = [
  {
    icon: Shield,
    title: 'Security Operations',
    points: [
      'Deployed end-to-end SOC pipelines - From log ingestion to alert generation',
      'Performed alert triage and incident investigation',
      'Correlated multi-source logs to reconstruct attack chains and identify detection gaps',
    ],
  },
  {
    icon: Search,
    title: 'Detection Engineering',
    points: [
      'Developed KQL-based detection rules for brute-force, privilege escalation, and reconnaissance',
      'Tune and validate signals to reduce noise and improve reliability',
      'Mapped detections to MITRE ATT&CK for structured coverage analysis',
    ],
  },
  {
    icon: Server,
    title: 'Secure System Design',
    points: [
      'Design systems with controlled access and clearly defined security boundaries',
      'Validate how systems behave under realistic usage and threat conditions',
      'Documented deployment architectures for production use cases',
    ],
  },
  {
    icon: FileCode2,
    title: 'Research & Automation',
    points: [
      'Published research on AI-powered deepfake voice detection',
      'Built Python automation pipelines for security workflows',
      'Develop internal tools and workflows to improve visibility and analysis',
    ],
  },
];

function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard className="h-full">
        <Card className="h-full hover:shadow-lg hover:shadow-accent-teal/5 transition-all duration-300 group">
          <CardHeader>
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center mb-2 group-hover:bg-accent-teal/20 transition-colors"
            >
              <skill.icon className="size-5 text-accent-teal" />
            </motion.div>
            <CardTitle className="text-lg">{skill.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {skill.points.map((point, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed"
                >
                  <span className="text-accent-teal shrink-0 text-[10px] mt-[7px] leading-none">&#9679;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TiltCard>
    </motion.div>
  );
}

export default function WhatIDo() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <section id="what-i-do" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            What I Do
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            From building detection rules to deploying full SOC pipelines, I focus on
            practical, hands-on security engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
