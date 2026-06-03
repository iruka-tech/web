'use client';

import { motion } from 'framer-motion';
import { SectionTag } from './ui/SectionTag';

const storyRows = [
  {
    label: 'Before',
    title: 'Every agent rebuilds the same monitoring loop.',
    content: 'Schedules, RPC reads, event backfills, repeat rules, and notification routing get buried inside local scripts.',
  },
  {
    label: 'Iruka',
    title: 'The wake-up rule becomes a shared contract.',
    content: 'Triggers, definitions, delivery, and metadata stay visible as one saved signal that humans can inspect and agents can reuse.',
  },
  {
    label: 'After',
    title: 'Agents receive the matched reason instead of a stream.',
    content: 'The notification includes context about what changed, so the next action starts from evidence rather than polling.',
  },
];

export function Story() {
  return (
    <section id="story" className="story-section relative py-16 md:py-24">
      <div className="page-gutter">
        <div className="story-intro">
          <SectionTag>Why it exists</SectionTag>
          <h2 className="ui-section-title mt-5">Monitoring belongs in a contract, not in every agent runtime.</h2>
        </div>

        <div className="story-timeline mt-12">
          {storyRows.map((row, index) => (
            <motion.article
              key={row.label}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="story-row"
            >
              <div className="story-row-label">{row.label}</div>
              <div>
                <h3>{row.title}</h3>
                <p>{row.content}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
