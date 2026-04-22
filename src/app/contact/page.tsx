import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Kalash Mahajan',
  description:
    'Get in touch with Kalash Mahajan for SOC setup, security assessments, cybersecurity trainings, or consulting.',
};

import ContactPage from '@/components/ContactPage';

export default function Contact() {
  return <ContactPage />;
}
