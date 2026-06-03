'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { RiArrowRightLine, RiArrowRightUpLine, RiPulseLine } from 'react-icons/ri';
import { SectionTag } from './ui/SectionTag';
import { IRUKA_DOCS_OVERVIEW_URL } from '@/lib/iruka-links';

const traceSteps = [
  { label: 'Trigger', value: 'cron, interval, or upstream signal' },
  { label: 'Condition', value: 'state, history, event, expression' },
  { label: 'Delivery', value: 'Telegram payload with reason' },
] as const;

const ledgerRows = [
  ['08:00 UTC', 'wake scheduled'],
  ['USDL vault', 'supplier exit threshold crossed'],
  ['agent inbox', 'reason delivered with context'],
] as const;

export function Hero() {
  return (
    <section className="hero-stage relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="page-gutter relative z-10">
        <div className="hero-shell">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="hero-copy"
          >
            <SectionTag>Iruka signal layer</SectionTag>
            <h1 className="ui-display mt-6">Give agents one clean reason to wake up.</h1>
            <p className="ui-copy mt-7 text-base sm:text-lg">
              Iruka turns public data into saved signal contracts. Define when to wake, what to check, and where the result should land without asking every agent to run its own watcher.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="no-underline">
                <span className="ui-button px-5 py-3.5" data-variant="primary">
                  Open console
                  <RiArrowRightLine className="h-4 w-4" />
                </span>
              </Link>
              <a href={IRUKA_DOCS_OVERVIEW_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
                <span className="ui-button px-5 py-3.5" data-variant="secondary">
                  Read docs
                  <RiArrowRightUpLine className="h-4 w-4" />
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="signal-map"
            aria-label="Iruka signal contract diagram"
          >
            <div className="signal-map-topline">
              <span>contract</span>
              <strong>sig_vault_exits</strong>
            </div>

            <div className="signal-path" aria-hidden="true">
              {traceSteps.map((step, index) => (
                <div key={step.label} className="signal-node" data-active={index === 1 ? 'true' : undefined}>
                  <span>{step.label}</span>
                  <strong>{step.value}</strong>
                </div>
              ))}
            </div>

            <div className="signal-ledger">
              <div className="signal-ledger-header">
                <RiPulseLine className="h-4 w-4" />
                <span>latest run</span>
              </div>
              {ledgerRows.map(([time, event]) => (
                <div key={event} className="signal-ledger-row">
                  <span>{time}</span>
                  <strong>{event}</strong>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
