'use client';

import { motion } from 'framer-motion';
import { RiRobot2Line } from 'react-icons/ri';
import { SectionTag } from './ui/SectionTag';
import { CodeBlock } from './ui/CodeBlock';

const agentCode = `app.post('/iruka-webhook', async (req, res) => {
  const { signal_id, context, conditions_met, trigger_input } = req.body;

  await agent.enqueue({
    task: 'investigate-iruka-signal',
    signalId: signal_id,
    chainId: context?.chain_id,
    why: conditions_met?.map((condition) => condition.summary),
    input: trigger_input
  });

  res.status(200).send('OK');
});`;

const agentNotes = [
  'Use one authoring model for state, indexed history, raw events, and arithmetic expressions.',
  'Simulate rules and search for first trigger points before trusting production alerts.',
  'Receive condition summaries, scope context, and optional trigger input instead of raw log noise.',
];

export function ForAgents() {
  return (
    <section id="for-agents" className="relative py-16 md:py-24">
      <div className="page-gutter">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="ui-panel p-6 sm:p-7"
          >
            <SectionTag>For Autonomous Agents</SectionTag>
            <h2 className="ui-section-title mt-5">Let the agent reason about the response, not the watch loop.</h2>
            <p className="ui-copy mt-4">
              The hard part is not writing one RPC call. It is keeping that call meaningful across windows,
              sources, retries, and delivery state. Iruka turns that into a saved backend rule.
            </p>

            <div className="mt-8 space-y-3">
              {agentNotes.map((note) => (
                <div key={note} className="ui-panel-ghost flex items-start gap-3 px-4 py-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-[0.45rem] border border-border bg-[color:color-mix(in_oklch,var(--signal-copper)_10%,var(--surface-inset))] text-[color:var(--signal-copper)]">
                    <RiRobot2Line className="h-4 w-4" />
                  </span>
                  <p className="text-sm leading-relaxed text-secondary">{note}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="ui-panel p-6 sm:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="ui-kicker">Agent Runtime</div>
                <h3 className="mt-3 font-display text-[1.8rem] leading-none text-foreground">Route the reason, not the raw feed.</h3>
              </div>
              <span className="ui-chip" data-tone="accent">
                Webhook
              </span>
            </div>

            <div className="mt-6">
              <CodeBlock code={agentCode} language="javascript" filename="webhook-handler.js" tone="light" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
