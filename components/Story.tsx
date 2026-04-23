'use client';

import { motion } from 'framer-motion';
import { SectionTag } from './ui/SectionTag';

const storyBeats = [
  {
    id: 'problem',
    tag: 'Problem',
    title: 'Agents are good at decisions, not long-running monitoring infrastructure.',
    content:
      'The brittle part is operational: source routing, windows, retries, deduplication, and controlled delivery behavior over time.',
  },
  {
    id: 'contract',
    tag: 'Contract',
    title: 'Iruka exposes one public signal envelope.',
    content:
      'Author with version, name, triggers, definition, delivery, and metadata. The shape stays compact while still covering serious monitoring use cases.',
  },
  {
    id: 'runtime',
    tag: 'Runtime',
    title: 'The platform handles evaluation and repeat behavior.',
    content:
      'Signals run on schedule or upstream signal triggers, then produce delivery-ready notifications with condition context.',
  },
];

export function Story() {
  return (
    <section id="story" className="relative py-16 md:py-24">
      <div className="page-gutter">
        <div className="mb-10 max-w-3xl">
          <SectionTag>First Principles</SectionTag>
          <h2 className="ui-section-title mt-5">A dependable trigger contract beats another raw feed.</h2>
          <p className="ui-copy mt-4">
            Iruka is the stable layer between open chain data and agent actions.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {storyBeats.map((beat, index) => (
            <motion.div
              key={beat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="ui-panel px-5 py-5"
            >
              <div className="ui-kicker">{beat.tag}</div>
              <h3 className="mt-4 font-display text-[1.45rem] leading-none text-foreground">{beat.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-secondary">{beat.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
