'use client';

import { motion } from 'framer-motion';
import { RiDatabase2Line, RiGitBranchLine, RiHistoryLine, RiShieldCheckLine } from 'react-icons/ri';
import { SectionTag } from './ui/SectionTag';

const capabilities = [
  {
    icon: RiGitBranchLine,
    title: 'Multiple ways to wake',
    description: 'Intervals, cron schedules, external calls, and upstream Iruka signals can sit in the same trigger array.',
  },
  {
    icon: RiDatabase2Line,
    title: 'Data sources stay behind the rule',
    description: 'Onchain state, indexed history, raw events, and expressions are inputs to one readable condition.',
  },
  {
    icon: RiShieldCheckLine,
    title: 'Delivery includes context',
    description: 'Telegram messages carry the matched reason so an agent can decide what to do next.',
  },
  {
    icon: RiHistoryLine,
    title: 'Repeat behavior is explicit',
    description: 'Cooldowns, windows, and until-resolved policies live with the saved signal rather than hidden in glue code.',
  },
];

export function Features() {
  return (
    <section id="features" className="feature-section relative py-16 md:py-24">
      <div className="page-gutter">
        <div className="feature-header">
          <SectionTag>What agents get</SectionTag>
          <h2 className="ui-section-title mt-5">The parts of monitoring that should not live inside agent code.</h2>
        </div>

        <motion.div
          className="capability-grid mt-12"
          initial={false}
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {capabilities.map((item) => (
            <motion.article
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.32 } } }}
              className="capability-item"
            >
              <div className="capability-icon">
                <item.icon className="h-5 w-5" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
