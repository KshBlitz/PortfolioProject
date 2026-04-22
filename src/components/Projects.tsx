'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TiltCard from '@/components/TiltCard';

const projects = [
  {
    title: 'SIEM Lab',
    description:
      'Modular SOC Level 1 practice environment built on Wazuh SIEM and open-source tooling.',
    tags: ['Wazuh', 'ELK Stack', 'Sysmon', 'OpenSearch'],
    details: [
      'Four-node lab: SIEM server, monitored endpoint, analyst workstation, attacker machine',
      'Mini-project roadmap: Setup → Log Baseline → Detection Rules → Attack Simulation → IR',
    ],
  },
  {
    title: 'SOC Investigation Case Files',
    description:
      'Structured SOC investigation scenarios simulating real-world attacks across detection, analysis, and response.',
    tags: ['Sentinel', 'Threat Investigation', 'KQL Analysis', 'MITRE ATT&CK'],
    details: [
      'L1–L3 workflow: triage, deep investigation (KQL), and post-incident detection tuning',
      'Reconstructs full attack timeline with MITRE mapping, IOC enrichment, and evidence-driven analysis',
    ],
  },
  {
    title: 'Microsoft Security Stack',
    description:
      '30-day structured deep dive into enterprise SOC operations across the full Microsoft security stack.',
    tags: ['Sentinel', 'Defender', 'KQL', 'Entra ID'],
    details: [
      'Detection rules, investigation reports, SOC runbooks, architecture docs',
      'Full pipeline: Endpoint → MDE → Log Analytics → Sentinel → Alert → Incident → ServiceNow',
    ],
  },
  {
    title: 'Infrastructure Projects (Fibmesh)',
    description:
      '4 validated secure remote access architectures with end-to-end deployment guides.',
    tags: ['WireGuard', 'TLS', 'RDP', 'FTPS', 'Apache'],
    details: [
      'Secure web hosting, Tally remote access, tunnel-restricted RDP, encrypted FTPS',
      'Each with full documentation and demo videos',
    ],
  },
  {
    title: 'JobMate',
    description:
      'Python job aggregation pipeline that filters, deduplicates, and exports cybersecurity roles.',
    tags: ['Python', 'Pandas', 'Regex', 'API Integration'],
    details: [
      'Queries multiple platforms, filters by security keywords, extracts experience via regex',
      'Stage 1 of a three-stage candidate automation stack',
    ],
  },
];

export default function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: '-80px' });

  return (
    <div>
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          All Projects
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          A selection of projects and experiments
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <a
          href="https://github.com/KshBlitz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-accent-teal transition-colors underline underline-offset-4"
        >
          Explore more projects on GitHub →
        </a>
      </div>
    </div>
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
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard className="h-full" tiltAmount={5}>
        <Card className="h-full hover:shadow-lg hover:shadow-accent-teal/5 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
            <ul className="space-y-2">
              {project.details.map((detail, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed"
                >
                  <span className="text-accent-teal shrink-0 text-[10px] mt-[7px] leading-none">&#9679;</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TiltCard>
    </motion.div>
  );
}
