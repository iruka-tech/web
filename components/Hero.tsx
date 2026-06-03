'use client';

import { motion } from 'framer-motion';
import { RiArrowDownLine, RiArrowRightUpLine } from 'react-icons/ri';
import { CodeBlock } from './ui/CodeBlock';
import { SectionTag } from './ui/SectionTag';
import { IRUKA_DOCS_OVERVIEW_URL } from '@/lib/iruka-links';

const previewSignals = [
  { label: 'Envelope', value: 'version, name, triggers, definition, delivery, metadata', tone: 'accent' },
  { label: 'Wake', value: 'Use a schedule, a cron entry, or another Iruka signal without rewriting the condition.', tone: 'default' },
  { label: 'Route', value: 'Send the matched signal to Telegram with the reason attached.', tone: 'telegram' },
] as const;

const proofLine = [
  ['Wake', 'schedule + signal triggers'],
  ['Check', 'state, history, raw events'],
  ['Deliver', 'Telegram with context'],
] as const;

const previewCode = `{
  "version": "1",
  "name": "Vault exits",
  "triggers": [
    { "type": "schedule", "schedule": { "kind": "interval", "interval_seconds": 300 } },
    { "type": "iruka_signal", "id": "sig_upstream_abc123" }
  ],
  "definition": {
    "metric": "ERC4626.Position.shares",
    "direction": "decrease"
  },
  "delivery": [{ "type": "telegram" }],
  "metadata": {
    "repeat_policy": { "mode": "until_resolved" }
  }
}`;

export function Hero() {
  const scrollToSection = () => {
    const element = document.getElementById('story');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-stage relative overflow-hidden pt-24 pb-18 md:pt-32 md:pb-28">
      <div className="page-gutter relative z-10">
        <div className="px-1 py-7 sm:px-2 sm:py-10 lg:py-14">
          <div className="relative z-10 grid items-start gap-10 xl:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <SectionTag>For agent builders</SectionTag>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="mt-6 ui-kicker"
              >
                Stop making agents maintain data plumbing
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.14 }}
                className="ui-display mt-5"
              >
                A signal layer for agents that should not wake up for noise.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="ui-copy mt-7 text-base sm:text-lg"
              >
                Iruka turns open data into saved trigger contracts: when to wake, what to check, and where the reason should land.
                Agents get one reliable signal instead of another watcher script.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.26 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <button onClick={scrollToSection} className="w-fit">
                  <span className="ui-button px-5 py-3.5" data-variant="primary">
                    See the contract
                    <RiArrowDownLine className="h-4 w-4" />
                  </span>
                </button>
                <a href={IRUKA_DOCS_OVERVIEW_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
                  <span className="ui-button px-5 py-3.5" data-variant="secondary">
                    Read the docs
                    <RiArrowRightUpLine className="h-4 w-4" />
                  </span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.32 }}
                className="signal-proofline mt-10"
              >
                {proofLine.map(([label, value]) => (
                  <div key={label} className="signal-proofline-item">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="signal-console ui-panel space-y-6 p-5 sm:p-6 lg:p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="ui-kicker">Signal contract</div>
                  <h2 className="mt-4 font-display text-[1.7rem] leading-tight text-foreground">
                    The contract is the interface.
                  </h2>
                </div>
                <span className="ui-chip" data-tone="accent">
                  API
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
                {previewSignals.map((signal, index) => (
                  <motion.div
                    key={signal.value}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.32, delay: 0.34 + index * 0.08 }}
                    className="ui-panel-ghost px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="ui-chip" data-tone={signal.tone}>
                        {signal.label}
                      </span>
                      <span className="signal-console-status">built in</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-secondary">{signal.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="ui-panel-ghost p-4">
                <div className="ui-kicker">Runnable shape</div>
                <div className="mt-4">
                  <CodeBlock code={previewCode} language="json" showHeader={false} tone="light" className="ui-code-preview" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
