'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhatIDo from '@/components/WhatIDo';
import FeaturedWork from '@/components/FeaturedWork';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhatIDo />
        <FeaturedWork />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
