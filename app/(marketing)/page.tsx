import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Story } from '@/components/Story';
import { Capabilities } from '@/components/Capabilities';
import { ForAgents } from '@/components/ForAgents';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

export default function MarketingHome() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="relative z-10">
        <Hero />
        <Story />
        <Capabilities />
        <ForAgents />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
