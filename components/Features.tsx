'use client';

import { motion } from 'framer-motion';
import { RiDatabase2Line, RiGitBranchLine, RiHistoryLine, RiPulseLine, RiShieldCheckLine, RiTimeLine } from 'react-icons/ri';
import { Card } from './ui/Card';

const features = [
  {
    icon: RiGitBranchLine,
    title: 'One numeric-block model',
    description: 'State reads, indexed events, raw logs, and expressions all become sources your agent can compare.',
  },
  {
    icon: RiTimeLine,
    title: 'Window and repeat state',
    description: 'Iruka keeps rolling windows, cooldowns, post-first-alert snoozes, and until-resolved incidents out of agent code.',
  },
  {
    icon: RiDatabase2Line,
    title: 'Provider routing and gating',
    description: 'RPC, indexed reads, and HyperSync raw scans stay behind the API, with health and capability checks before runtime failure.',
  },
  {
    icon: RiShieldCheckLine,
    title: 'Explainable delivery',
    description: 'Delivery payloads include condition context so an agent can act on clear trigger reasons.',
  },
  {
    icon: RiPulseLine,
    title: 'Scheduled and signal-chained',
    description: 'Use schedule and iruka_signal trigger types now; external trigger support is in the target schema.',
  },
  {
    icon: RiHistoryLine,
    title: 'Simulation before activation',
    description: 'Use simulation and first-trigger search to test a rule over a range before trusting it in production.',
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-16 md:py-24">
      <div className="page-gutter">
        <div className="mx-auto max-w-3xl text-center">
          <div className="ui-kicker justify-center">What Agents Get</div>
          <h2 className="ui-section-title mt-5">The boring reliability layer your agent should not rewrite.</h2>
          <p className="ui-copy mx-auto mt-4">
            These are the hard pieces of onchain automation that look simple until they have to run every hour.
          </p>
        </div>

        <motion.div
          className="mt-10 grid gap-4 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
            >
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[0.45rem] border border-border bg-[color:color-mix(in_oklch,var(--signal-copper)_10%,var(--surface-inset))] text-[color:var(--signal-copper)]">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-[1.35rem] leading-none text-foreground">{feature.title}</h3>
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
