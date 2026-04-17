import type { Metadata } from 'next';
import { DocsExplorer } from '@/components/docs/DocsExplorer';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Docs',
  description:
    'Customer-facing Megabat docs: raw state via state_ref, metric sugar, indexed metrics, raw-event presets, repeat policy, history, auth, delivery, and routes.',
};

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pb-16 pt-28 md:pt-32">
        <div className="page-gutter">
          <DocsExplorer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
