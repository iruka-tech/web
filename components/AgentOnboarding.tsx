'use client';

import { motion } from 'framer-motion';
import { RiRobot2Line } from 'react-icons/ri';
import { CodeBlock } from './ui/CodeBlock';
import { IRUKA_DOCS_WRITING_SIGNALS_URL } from '@/lib/iruka-links';

const agentPrompt = `Write one Iruka signal request using this public envelope:
- version, name, triggers, definition, delivery, metadata
- use metadata.description and metadata.repeat_policy
- use delivery: [{ "type": "telegram" }]
- choose a schedule trigger (interval or cron)

Do not use top-level description, cooldown_minutes, webhook_url, or delivery.provider.`;

export function AgentOnboarding() {
  return (
    <section id="onboarding" className="relative py-16 md:py-24">
      <div className="page-gutter">
        <div className="mx-auto max-w-5xl ui-panel p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="ui-kicker">Agent Integration</div>
              <h2 className="ui-section-title mt-5">Keep the handoff contract short and explicit.</h2>
              <p className="ui-copy mt-4">
                Give your agent one prompt for the public schema, then let the builder or API handle the rest.
              </p>
            </div>
            <span className="ui-chip" data-tone="accent">
              <RiRobot2Line className="h-4 w-4" />
              Prompt
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <CodeBlock code={agentPrompt} language="markdown" filename="agent-handoff.md" tone="light" />
          </motion.div>

          <div className="mt-6">
            <a href={IRUKA_DOCS_WRITING_SIGNALS_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
              <span className="ui-button px-4 py-3" data-variant="secondary">
                Read Writing Signals
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
