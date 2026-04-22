'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Shield, ScanSearch, GraduationCap, BookOpen, Workflow } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TiltCard from '@/components/TiltCard';

const services = [
  {
    icon: Shield,
    title: 'SOC Setup',
    description: 'End-to-end SOC infrastructure deployment — from SIEM installation to detection rule creation and operational workflows.',
    points: [
      'Deploy and configure SIEM infrastructure (Wazuh, ELK Stack, Microsoft Sentinel)',
      'Build and tune detection rules tailored to your environment',
      'Set up log ingestion pipelines and alert triage workflows',
      'Reduce false positives while maintaining detection coverage',
    ],
  },
  {
    icon: ScanSearch,
    title: 'Security Assessment',
    description: 'Structured vulnerability analysis and attack simulation to identify gaps in your security posture.',
    points: [
      'Vulnerability scanning and severity-based analysis',
      'Attack simulation with detection validation',
      'Detection gap analysis mapped to MITRE ATT&CK',
      'Actionable remediation guidance with prioritized recommendations',
    ],
  },
  {
    icon: Workflow,
    title: 'Automation & Intelligence Systems',
    description:
      'Design pipelines that convert raw data and events into structured, actionable insights aligned with business decisions.',
    points: [
      'Ingest and monitor data from multiple sources (logs, alerts, external feeds)',
      'Process and filter signals using structured logic and contextual mapping',
      'Deliver actionable outputs via alerts, reports, or dashboards',
      'Reduce manual effort by automating recurring analysis and workflows',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Cybersecurity Trainings',
    description: 'Hands-on workshops and training sessions designed for teams, students, and professionals entering the security field.',
    points: [
      'Workshops on network security, SIEM operations, and incident response',
      'Hands-on lab environments with real tools (Nmap, Wireshark, Wazuh)',
      'Customized curriculum for beginner to intermediate audiences',
      'Post-session mentorship and learning path guidance',
    ],
  },
  {
    icon: BookOpen,
    title: 'Module & Study Material Creation',
    description: 'Structured, practical course content and study modules for cybersecurity education programs.',
    points: [
      'Beginner-friendly module structure with progressive difficulty',
      'Practice exercises and demo scenarios with real tools',
      'Lab guides and setup documentation for self-paced learning',
      'Content aligned with industry frameworks and certifications',
    ],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const goToContact = () => {
    window.location.href = '/contact';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard className="h-full" tiltAmount={4}>
        <Card className="h-full hover:shadow-lg hover:shadow-accent-teal/5 transition-all duration-300 flex flex-col">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-accent-teal/10 flex items-center justify-center mb-2">
              <service.icon className="size-5 text-accent-teal" />
            </div>
            <CardTitle className="text-lg">{service.title}</CardTitle>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 justify-between gap-6">
            <ul className="space-y-2">
              {service.points.map((point, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed"
                >
                  <span className="text-accent-teal shrink-0 text-[10px] mt-[7px] leading-none">&#9679;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="ghost"
              className="w-fit text-accent-teal hover:text-accent-teal hover:bg-accent-teal/10 gap-1.5 p-0 h-auto"
              onClick={goToContact}
            >
              Discuss
              <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </TiltCard>
    </motion.div>
  );
}

export default function ServicesPage() {
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
                Services
              </h1>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
                How I can help your team — from setting up detection infrastructure to building training programs and educational content.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                />
              ))}
            </div>
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
                Have a project in mind?
              </h2>
              <p className="text-muted-foreground max-w-lg leading-relaxed">
                Whether it&apos;s SOC setup, a security assessment, or a training program — I&apos;d be happy to discuss how I can help.
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
