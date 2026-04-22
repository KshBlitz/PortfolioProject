'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const experiences = [
  {
    role: 'SOC Analyst',
    company: 'CyArt Tech LLP',
    period: 'Jan 2026 – Present',
    points: [
      'Deployed and operated SOC workflows across detection, investigation, and response',
      'Build and refine detection logic based on real attack patterns and observed behavior',
      'Handle end-to-end attack scenarios — from simulation to analysis and containment',
      'Contributing to development of an attack intelligence system (Chain Discovery)',
    ],
    current: true,
  },
  {
    role: 'Infrastructure Security',
    company: 'Fibmesh',
    period: 'Aug 2025 – Dec 2025',
    points: [
      'Designed and validated secure access architectures for remote connectivity use cases',
      'Built production-like deployments with controlled exposure and access restrictions',
      'Documented deployment guides and recorded demo videos',
    ],
    current: false,
  },
  {
    role: 'Cyber Security Associate',
    company: 'InfoSoft Computers',
    period: 'May 2024 – Present',
    points: [
      'Design and structure learning modules focused on practical security concepts and tool usage',
      'Support participants in setting up environments, troubleshooting and understanding real-world scenarios',
      'Contribute to cybersecurity training programs through workshop delivery and hands-on lab support',
    ],
    current: false,
  },
];

const education = {
  degree: 'B.E. Information Technology (Honors in Cyber Security & Privacy)',
  school: 'Savitribai Phule Pune University',
  period: '2021 – 2025',
  gpa: 'CGPA: 7.83',
};

const certifications = [
  { name: 'CEH (EC-Council)', icon: Award },
  { name: 'NPTEL Cyber Security', icon: BookOpen },
  { name: 'Cisco Networking', icon: Award },
];

export default function Experience() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Experience
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            My professional journey in security operations and detection
            engineering.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <TimelineItem key={exp.company} experience={exp} index={index} />
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent-teal/10 flex items-center justify-center shrink-0">
              <GraduationCap className="size-5 text-accent-teal" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{education.degree}</h3>
              <p className="text-muted-foreground text-sm">
                {education.school} | {education.period} | {education.gpa}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <Badge
                key={cert.name}
                variant="outline"
                className="py-1.5 px-3 text-sm gap-1.5"
              >
                <cert.icon className="size-3.5 text-accent-teal" />
                {cert.name}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Publication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Publication
          </h3>
          <a
            href="https://www.ijcrt.org/papers/IJCRT25A5633.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Card className="inline-block hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
              <CardContent className="p-4">
                <p className="text-sm flex items-center gap-2">
                  <BookOpen className="size-4 text-accent-teal shrink-0" />
                  <span>
                    <span className="font-medium">VerbaSafe:</span>{' '}
                    Innovations in AI-Powered Voice Authentication — IJCRT
                  </span>
                </p>
              </CardContent>
            </Card>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-12 md:pl-20"
    >
      {/* Timeline dot */}
      <div className="absolute left-2.5 md:left-6.5 top-1.5 w-3 h-3 rounded-full border-2 border-accent-teal bg-background" />

      <div className="flex items-center gap-3 mb-1">
        <Briefcase className="size-4 text-accent-teal shrink-0" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <h3 className="font-semibold text-lg">{experience.role}</h3>
          <span className="text-muted-foreground text-sm">
            — {experience.company}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-3 ml-7">
        {experience.period}
        {experience.current && (
          <Badge
            variant="secondary"
            className="ml-2 text-xs bg-accent-teal/10 text-accent-teal"
          >
            Current
          </Badge>
        )}
      </p>

      <ul className="space-y-1.5 ml-7">
        {experience.points.map((point, i) => (
          <li
            key={i}
            className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed"
          >
            <span className="text-accent-teal shrink-0 text-[10px] mt-[7px] leading-none">&#9679;</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
