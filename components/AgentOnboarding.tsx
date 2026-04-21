'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiCheckLine, RiFileCopyLine, RiRobot2Line } from 'react-icons/ri';
import { CodeBlock } from './ui/CodeBlock';
import { IRUKA_DOCS_WRITING_SIGNALS_URL } from '@/lib/iruka-links';

const steps = [
  {
    number: 1,
    title: 'Give the agent the contract',
    description: 'Tell it the public shape: scope, window, source blocks, conditions, delivery, repeat policy.',
    code: `## Capabilities
- Use source.kind = alias | state | indexed_event | raw_event | expression
- Compare with threshold, change, aggregate, or group
- Test with simulation before activation
- Receive conditions_met in webhook and history payloads`,
    language: 'markdown',
    filename: 'iruka-skill.md',
  },
  {
    number: 2,
    title: 'Let it register durable intent',
    description: 'The agent posts one saved rule instead of maintaining a cron job and event decoder.',
    code: `curl -X POST https://api.iruka.tech/api/v1/signals \\
  -H "X-API-Key: $IRUKA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d @signal.json`,
    language: 'bash',
    filename: 'create-signal.sh',
  },
  {
    number: 3,
    title: 'Route the explained trigger',
    description: 'Use the webhook or history payload to decide the next autonomous action.',
    code: `{
  "signal_id": "sig_abc123",
  "conditions_met": [{ "summary": "100 > 50" }],
  "context": { "chain_id": 1 },
  "trigger_input": null
}`,
    language: 'json',
    filename: 'webhook-response.json',
  },
];

export function AgentOnboarding() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <section id="onboarding" className="relative py-16 md:py-24">
      <div className="page-gutter">
        <div className="mx-auto max-w-3xl text-center">
          <div className="ui-kicker justify-center">Agent Integration</div>
          <h2 className="ui-section-title mt-5">A simple handoff contract for autonomous builders.</h2>
          <p className="ui-copy mx-auto mt-4">
            Your agent needs a contract it can keep using without re-learning the backend every task.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="ui-panel grid gap-5 px-5 py-5 lg:grid-cols-[84px_minmax(0,0.72fr)_minmax(0,1fr)] lg:items-start"
            >
              <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                <span className="ui-chip" data-tone="accent">
                  0{step.number}
                </span>
                <RiRobot2Line className="h-5 w-5 text-[color:var(--signal-copper)]" />
              </div>

              <div>
                <h3 className="font-display text-[1.5rem] leading-none text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{step.description}</p>
              </div>

              <div className="relative">
                <button
                  onClick={() => copyToClipboard(step.code, step.number)}
                  className="ui-button absolute right-3 top-3 z-10 px-3 py-2"
                  data-variant="secondary"
                  aria-label="Copy code"
                  type="button"
                >
                  {copiedStep === step.number ? <RiCheckLine className="h-4 w-4" /> : <RiFileCopyLine className="h-4 w-4" />}
                </button>
                <CodeBlock code={step.code} language={step.language} filename={step.filename} tone="light" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href={IRUKA_DOCS_WRITING_SIGNALS_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
            <span className="ui-button px-5 py-3.5" data-variant="primary">
              <RiRobot2Line className="h-5 w-5" />
              Read Writing Signals
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
