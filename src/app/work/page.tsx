import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work — Kalash Mahajan',
  description:
    'Projects, experiments, and featured work by Kalash Mahajan — from attack chain intelligence platforms to SIEM labs.',
};

import WorkPage from '@/components/WorkPage';

export default function Work() {
  return (
    <div className="min-h-screen flex flex-col">
      <WorkPage />
    </div>
  );
}
