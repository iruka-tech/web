import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Story } from '@/components/Story';
import { HowItWorks } from '@/components/HowItWorks';
import { Features } from '@/components/Features';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

export default function MarketingHome() {
  return (
    <div className="marketing-redesign relative min-h-screen overflow-hidden">
      <Header />
      <main className="relative z-10">
        <Hero />
        <Story />
        <HowItWorks />
        <Features />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
