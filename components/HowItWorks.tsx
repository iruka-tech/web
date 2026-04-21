'use client';

import { motion } from 'framer-motion';
import { RiCloudLine, RiCodeSSlashLine, RiNotification3Line } from 'react-icons/ri';
import { CodeBlock } from './ui/CodeBlock';

const steps = [
  {
    icon: RiCodeSSlashLine,
    title: 'Ask for an outcome',
    description: 'Give the agent a goal like “alert me if this vault starts losing tracked holders.”',
    code: `{
  "goal": "watch 3 of 5 vault owners",
  "window": "7d",
  "delivery": "telegram"
}`,
  },
  {
    icon: RiCloudLine,
    title: 'Let it write a signal',
    description: 'The agent emits one Iruka definition with scope, source blocks, condition logic, window, and repeat policy.',
    code: `POST /api/v1/signals
X-API-Key: iruka_...
{ "definition": { "...": "numeric blocks" } }`,
  },
  {
    icon: RiNotification3Line,
    title: 'React to a trigger',
    description: 'Iruka returns matched conditions and context through webhook, Telegram, or history so the agent can act.',
    code: `{
  "triggered": true,
  "conditions_met": [{ "summary": "100 > 50" }],
  "context": { "chain_id": 1 },
  "trigger_input": null
}`,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 md:py-24">
      <div className="page-gutter">
        <div className="mx-auto max-w-3xl text-center">
          <div className="ui-kicker justify-center">Agent Workflow</div>
          <h2 className="ui-section-title mt-5">From natural goal to durable signal trigger.</h2>
          <p className="ui-copy mx-auto mt-4">
            Iruka is the persistent sensing layer your agent can call once and rely on later.
          </p>
        </div>

        <motion.div
          className="mt-10 grid gap-4 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
              className="ui-panel p-5"
            >
              <div className="flex items-center justify-between">
                <span className="ui-chip" data-tone="accent">
                  0{index + 1}
                </span>
                <step.icon className="h-5 w-5 text-[color:var(--signal-copper)]" />
              </div>
              <h3 className="mt-5 font-display text-[1.55rem] leading-none text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">{step.description}</p>
              <div className="mt-5">
                <CodeBlock code={step.code} tone="light" showHeader={false} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
