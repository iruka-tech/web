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
    title: 'Grouped state change',
    description: 'Detect when enough tracked vault owners unwind in one window.',
    filename: 'grouped-state-change.json',
    code: `{
  "name": "Holder exit cluster",
  "definition": {
    "scope": { "chains": [1], "protocol": "all" },
    "window": { "duration": "7d" },
    "conditions": [
      {
        "type": "group",
        "addresses": ["0xA", "0xB", "0xC"],
        "requirement": { "count": 2, "of": 3 },
        "conditions": [
          {
            "type": "change",
            "source": { "kind": "alias", "name": "ERC4626.Position.shares" },
            "direction": "decrease",
            "by": { "percent": 20 },
            "contract_address": "0xVault"
          }
        ]
      }
    ]
  }
}`,
  },
  {
    id: 'utilization',
    icon: RiShieldLine,
    title: 'State alias threshold',
    description: 'Compare one protocol-aware state block to a target.',
    filename: 'utilization-alert.json',
    code: `{
  "name": "High Utilization Warning",
  "definition": {
    "scope": { "chains": [1], "markets": ["0xMarket"], "protocol": "morpho" },
    "window": { "duration": "1h" },
    "conditions": [
      {
        "type": "threshold",
        "source": { "kind": "alias", "name": "Morpho.Market.utilization" },
        "operator": ">",
        "value": 0.9,
        "market_id": "0xMarket"
      }
    ]
  }
}`,
  },
  {
    id: 'raw-events',
    icon: RiStackLine,
    title: 'Input-triggered check',
    description: 'Save a rule that another system can wake up through the trigger endpoint.',
    filename: 'raw-events-alert.json',
    code: `{
  "name": "Agent requested review",
  "definition": {
    "trigger": { "type": "input" },
    "scope": { "chains": [1], "protocol": "all" },
    "window": { "duration": "30m" },
    "conditions": [
      {
        "type": "threshold",
        "source": {
          "kind": "raw_event",
          "aggregation": "count",
          "event": { "kind": "swap", "protocols": ["uniswap_v3"] }
        },
        "operator": ">",
        "value": 25
      }
    ]
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
          <div className="ui-kicker justify-center">Payloads</div>
          <h2 className="ui-section-title mt-5">Examples your agent can emit directly.</h2>
          <p className="ui-copy mx-auto mt-4">
            These use the current backend direction: source blocks first, compatibility sugar only when useful.
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
