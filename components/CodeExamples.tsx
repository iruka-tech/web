'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiFlashlightLine, RiShieldLine, RiStackLine } from 'react-icons/ri';
import { cn } from '@/lib/utils';
import { CodeBlock } from './ui/CodeBlock';

const examples = [
  {
    id: 'whale-exit',
    icon: RiFlashlightLine,
    title: 'Whale exit alert',
    description: 'A coordinated supplier exit over seven days.',
    filename: 'whale-alert.json',
    code: `{
  "name": "Whale Exit Alert",
  "definition": {
    "scope": { "chains": [1], "markets": ["0xMarket"], "protocol": "morpho" },
    "window": { "duration": "7d" },
    "conditions": [{ "...": "..." }]
  }
}`,
  },
  {
    id: 'utilization',
    icon: RiShieldLine,
    title: 'Utilization spike',
    description: 'A threshold on a stable market state alias.',
    filename: 'utilization-alert.json',
    code: `{
  "name": "High Utilization Warning",
  "definition": {
    "scope": { "chains": [1], "markets": ["0xMarket"], "protocol": "morpho" },
    "conditions": [{ "type": "threshold", "metric": "Morpho.Market.utilization" }]
  }
}`,
  },
  {
    id: 'raw-events',
    icon: RiStackLine,
    title: 'Raw swap scan',
    description: 'A raw-events preset that watches DEX movement directly.',
    filename: 'raw-events-alert.json',
    code: `{
  "name": "Swap Volume Burst",
  "definition": {
    "scope": { "chains": [1], "protocol": "all" },
    "conditions": [{ "type": "raw-events", "event": { "kind": "swap" } }]
  }
}`,
  },
];

export function CodeExamples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExample = examples[activeIndex];

  return (
    <section id="examples" className="relative py-16 md:py-24">
      <div className="page-gutter">
        <div className="mx-auto max-w-3xl text-center">
          <div className="ui-kicker justify-center">Examples</div>
          <h2 className="ui-section-title mt-5">Real payloads, restrained presentation.</h2>
          <p className="ui-copy mx-auto mt-4">
            Code should feel like part of the product system, not a disconnected GitHub widget dropped into the page.
          </p>
        </div>

        <div className="mt-10 ui-panel p-6 sm:p-7">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {examples.map((example, index) => (
              <button
                key={example.id}
                type="button"
                data-active={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                className={cn('ui-option flex items-center gap-2 px-4 py-2.5 text-sm whitespace-nowrap', activeIndex === index && 'text-foreground')}
              >
                <example.icon className="h-4 w-4 text-[color:var(--signal-copper)]" />
                {example.title}
              </button>
            ))}
          </div>

          <motion.div
            key={activeExample.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)]"
          >
            <div className="ui-panel-ghost p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-[0.45rem] border border-border bg-[color:color-mix(in_oklch,var(--signal-copper)_10%,var(--surface-inset))] text-[color:var(--signal-copper)]">
                <activeExample.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-[1.55rem] leading-none text-foreground">{activeExample.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">{activeExample.description}</p>
            </div>

            <CodeBlock code={activeExample.code} language="json" filename={activeExample.filename} tone="light" showLineNumbers />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
