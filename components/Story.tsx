'use client';

import { motion } from 'framer-motion';
import { SectionTag } from './ui/SectionTag';

const storyBeats = [
  {
    id: 'problem',
    tag: '01',
    title: 'Watcher code keeps recreating the same fragile loop.',
    content:
      'Every alert needs scheduling, data reads, repeat control, and delivery routing before it can say anything useful.',
  },
  {
    id: 'contract',
    tag: '02',
    title: 'Iruka makes the wake-up contract explicit.',
    content:
      'Triggers wake the signal. Definitions check the condition. Delivery routes the reason. Each part can change without hiding intent in glue code.',
  },
  {
    id: 'result',
    tag: '03',
    title: 'Agents receive a reason, not a stream of chores.',
    content:
      'The rule stays readable enough for humans to edit and stable enough for agents to build on.',
  },
];

export function Story() {
  return (
    <section id="story" className="story-band relative py-18 md:py-28">
      <div className="page-gutter">
        <div className="story-band-header grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end">
          <div>
            <SectionTag>First principles</SectionTag>
            <p className="ui-kicker mt-5">The hidden cost of alerts</p>
          </div>
          <div>
            <h2 className="ui-section-title">Define the trigger contract instead of wiring another watcher.</h2>
            <p className="ui-copy mt-5">
              The product value is not more backend plumbing. It is one visible rule that names when it wakes, what it checks, and where the result goes.
            </p>
          </div>
        </div>

        <div className="story-ladder mt-12 grid gap-4 lg:grid-cols-3">
          {storyBeats.map((beat, index) => (
            <motion.div
              key={beat.id}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="ui-panel story-card px-5 py-5"
            >
              <div className="story-card-index">{beat.tag}</div>
              <h3 className="mt-5 font-display text-[1.55rem] leading-tight text-foreground">{beat.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-secondary">{beat.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
