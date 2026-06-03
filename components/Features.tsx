'use client';

import { motion } from 'framer-motion';
import { RiDatabase2Line, RiGitBranchLine, RiHistoryLine, RiPulseLine, RiShieldCheckLine, RiTimeLine } from 'react-icons/ri';
import { Card } from './ui/Card';

const features = [
  {
    icon: RiGitBranchLine,
    title: 'One rule can wake from more than one path',
    description: 'A signal can start from an interval, a UTC cron schedule, or another Iruka signal. The condition stays intact while the wake-up path changes.',
    featured: true,
  },
  {
    icon: RiTimeLine,
    title: 'Repeat behavior lives with the rule',
    description: 'Rolling windows, cooldowns, snoozes, and until-resolved incidents stay out of agent code.',
  },
  {
    icon: RiDatabase2Line,
    title: 'Sources stay behind the condition',
    description: 'State reads, indexed events, raw logs, and expressions become inputs your agent can compare.',
  },
  {
    icon: RiShieldCheckLine,
    title: 'Delivery carries the reason',
    description: 'Telegram payloads include condition context so an agent can act on the trigger, not guess why it fired.',
  },
  {
    icon: RiPulseLine,
    title: 'Signal-to-signal wake-ups',
    description: 'Saved signals can become upstream triggers for higher-order monitoring workflows.',
  },
  {
    icon: RiHistoryLine,
    title: 'Intent remains readable',
    description: 'A saved signal shows when it wakes, what it checks, and where it notifies without spreading logic across scripts.',
  },
];

export function Features() {
  return (
    <section id="features" className="feature-field relative py-18 md:py-28">
      <div className="page-gutter">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div className="ui-kicker">What agents get</div>
          <div>
            <h2 className="ui-section-title">The reliability layer your agent should not keep rebuilding.</h2>
            <p className="ui-copy mt-5">
              These are the hard pieces of onchain automation that look simple until they have to run every hour.
            </p>
          </div>
        </div>

        <motion.div
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial={false}
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
              className={feature.featured ? 'md:col-span-2 lg:col-span-2' : undefined}
            >
              <Card className={feature.featured ? 'feature-card-featured h-full' : 'h-full'}>
                <div className="flex items-start gap-4">
                  <div className="feature-icon flex h-11 w-11 items-center justify-center rounded-[0.45rem] border border-border bg-[color:color-mix(in_oklch,var(--signal-copper)_10%,var(--surface-inset))] text-[color:var(--signal-copper)]">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-[1.35rem] leading-tight text-foreground">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-secondary">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
