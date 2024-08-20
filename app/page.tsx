import HeroSection from '@/components/Hero';
import Features from '@/components/Features';
import Community from '@/components/Community';

export default function Home() {
  return (
    <main className='min-h-screen bg-white dark:bg-gray-900'>
      <HeroSection />
      <Features />
      <Community />
    </main>
  );
}
