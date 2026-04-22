'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, Send, Loader2, ArrowLeft, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import TiltCard from '@/components/TiltCard';

export default function ContactPage() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: '-80px' });
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Message sent!', {
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        formRef.current?.reset();
      } else {
        toast.error('Failed to send message', {
          description: data.error || 'Please try again.',
        });
      }
    } catch {
      toast.error('Something went wrong', {
        description: 'Please check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        {/* Page hero */}
        <section className="py-16 md:py-20 section-grid">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              ref={headingRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="size-4" />
                Back to Home
              </Link>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Let&apos;s Work Together
              </h1>
              <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                If you need someone who understands security operations from the ground up — detection rules, SOC workflows, and real incident response — let&apos;s talk.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact form + info */}
        <section className="pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Left: Info (2 cols) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 flex flex-col gap-8"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-3">Reach out directly</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you need to build a detection engineering program, set up a SIEM pipeline, or need help with security assessments — I&apos;m happy to discuss how I can contribute to your team.
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href="mailto:mahajankalash8@gmail.com"
                    className="flex items-center gap-4 text-sm text-muted-foreground hover:text-foreground transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center group-hover:bg-accent-teal/20 group-hover:scale-105 transition-all">
                      <Mail className="size-4 text-accent-teal" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">Email</p>
                      <p>mahajankalash8@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/kalashmahajan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-sm text-muted-foreground hover:text-foreground transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center group-hover:bg-accent-teal/20 group-hover:scale-105 transition-all">
                      <Linkedin className="size-4 text-accent-teal" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">LinkedIn</p>
                      <p>linkedin.com/in/kalashmahajan</p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/KshBlitz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-sm text-muted-foreground hover:text-foreground transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center group-hover:bg-accent-teal/20 group-hover:scale-105 transition-all">
                      <Github className="size-4 text-accent-teal" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">GitHub</p>
                      <p>github.com/KshBlitz</p>
                    </div>
                  </a>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-accent-teal shrink-0" />
                  <span>Pune, Maharashtra, India</span>
                </div>
              </motion.div>

              {/* Right: Form (3 cols) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-3"
              >
                <TiltCard className="lg:col-span-3" tiltAmount={3}>
                  <Card className="glow-teal">
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-lg font-semibold mb-6">Send a message</h3>
                      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Your name"
                              required
                              disabled={loading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@company.com"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your project or how I can help..."
                          rows={6}
                          required
                          disabled={loading}
                          className="resize-none"
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-accent-teal hover:bg-accent-teal/90 text-white gap-2"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="size-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="size-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
