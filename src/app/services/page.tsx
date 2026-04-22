import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Kalash Mahajan',
  description:
    'SOC setup, security assessment, cybersecurity trainings, and study material creation. Professional services by Kalash Mahajan.',
};

import ServicesPage from '@/components/ServicesPage';

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <ServicesPage />
    </div>
  );
}
