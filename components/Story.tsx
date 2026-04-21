'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from './ui/CodeBlock';
import { SectionTag } from './ui/SectionTag';

const storyBeats = [
  {
    id: 'problem',
    tag: 'Hard Part',
    title: 'Agents are bad at long-running chain vigilance.',
    content:
      'An agent can write scripts, but keeping them reliable is the painful part: archive RPC reads, indexed history, raw log scans, window state, retries, duplicate suppression, and explainable alerts all become infrastructure.',
    code: `rpc.read("balanceOf", owner)
index.query("ProtocolEvent", window)
events.scan("Transfer", filters)
cron.retryUntilHealthy()

// The agent is now maintaining infra.
// It still needs a trustworthy trigger.`,
  },
  {
    id: 'insight',
    tag: 'Abstraction',
    title: 'Iruka gives the agent one numeric-block model.',
    content:
      'The current backend accepts source blocks for state, indexed events, raw events, and expressions. Your agent describes the number it wants watched, then compares it with threshold, change, aggregate, or group logic.',
    code: `{
  "scope": { "chains": [1], "protocol": "all" },
  "window": { "duration": "2h" },
  "conditions": [
    {
      "type": "threshold",
      "source": {
        "kind": "raw_event",
        "aggregation": "sum",
        "field": "value",
        "event": { "kind": "erc20_transfer" }
      },
      "operator": ">",
      "value": 1000000
    }
  ]
}`,
  },
  {
    id: 'runtime',
    tag: 'Runtime',
    title: 'The backend owns evaluation and handoff.',
    content:
      'Iruka stores the rule, checks source-family capability before accepting it, simulates and finds first trigger points, applies repeat policy, and delivers conditions_met so agents can act without re-interpreting a raw event stream.',
    code: `POST /api/v1/signals
{
  "name": "Vault withdrawal cluster",
  "definition": { "...": "..." },
  "delivery": { "provider": "telegram" },
  "cooldown_minutes": 60,
  "repeat_policy": { "mode": "until_resolved" }
}`,
  },
];

export function Story() {
  return (
    <section id="story" className="relative py-16 md:py-24">
      <div className="page-gutter">
        <div className="mb-10 max-w-3xl">
          <SectionTag>First Principles</SectionTag>
          <h2 className="ui-section-title mt-5">The thing your agent needs is not another feed. It needs a dependable trigger.</h2>
          <p className="ui-copy mt-4">
            Iruka is for the jobs that are tedious to keep correct in agent code: source routing,
            rolling windows, grouped targets, event aggregation, historical simulation, and delivery state.
          </p>
        </div>

        <div className="space-y-6">
          {storyBeats.map((beat, index) => (
            <motion.div
              key={beat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="ui-panel grid gap-6 px-6 py-6 sm:px-7 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start"
            >
              <div className="relative z-10">
                <div className="ui-kicker">{beat.tag}</div>
                <h3 className="mt-4 font-display text-[2rem] leading-none text-foreground">{beat.title}</h3>
                <p className="ui-copy mt-4">{beat.content}</p>
              </div>

              <div className="relative z-10">
                <CodeBlock code={beat.code} tone="light" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
