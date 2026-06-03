'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CodeBlock } from './ui/CodeBlock';
import { SectionTag } from './ui/SectionTag';

const editFrames = [
  {
    label: 'Schedule',
    note: 'Wake on interval or UTC cron.',
    code: `"triggers": [{
  "type": "schedule",
  "schedule": { "kind": "cron", "expression": "0 8 * * *" }
}]`,
  },
  {
    label: 'Compose',
    note: 'Let one signal wake another.',
    code: `"triggers": [
  { "type": "schedule", "schedule": { "kind": "interval", "interval_seconds": 300 } },
  { "type": "iruka_signal", "id": "sig_upstream_abc123" }
]`,
  },
  {
    label: 'Route',
    note: 'Keep delivery separate from the condition.',
    code: `"delivery": [
  { "type": "telegram" }
]`,
  },
  {
    label: 'Repeat',
    note: 'Control repeats in metadata.',
    code: `"metadata": {
  "description": "Watch coordinated supplier exits.",
  "repeat_policy": { "mode": "cooldown", "cooldown_minutes": 60 }
}`,
  },
];

function TypingCode() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const frame = editFrames[frameIndex];

  useEffect(() => {
    if (visibleChars < frame.code.length) {
      const timeout = window.setTimeout(() => setVisibleChars((value) => value + 4), 16);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setFrameIndex((value) => (value + 1) % editFrames.length);
      setVisibleChars(0);
    }, 1400);
    return () => window.clearTimeout(timeout);
  }, [frame.code.length, visibleChars]);

  const typedCode = useMemo(() => frame.code.slice(0, visibleChars), [frame.code, visibleChars]);

  return (
    <div className="schema-workbench">
      <div>
        <div className="schema-frame-label">{frame.label}</div>
        <h3>{frame.note}</h3>
      </div>
      <CodeBlock code={typedCode || ' '} language="json" filename="signal.patch.json" tone="light" showLineNumbers={false} />
    </div>
  );
}

const boundaries = [
  ['triggers[]', 'when the signal wakes'],
  ['definition', 'what condition must match'],
  ['delivery[]', 'where the reason lands'],
  ['metadata', 'how repeats and descriptions behave'],
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="schema-section relative py-16 md:py-24">
      <div className="page-gutter">
        <div className="schema-layout">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="schema-copy"
          >
            <SectionTag>Public schema</SectionTag>
            <h2 className="ui-section-title mt-5">Change the wake-up path without rewriting the condition.</h2>
            <p className="ui-copy mt-5">
              The schema is small on purpose. Triggers decide when to run, the definition decides what to inspect, and delivery decides where the matched reason goes.
            </p>
            <div className="boundary-list mt-8">
              {boundaries.map(([name, description]) => (
                <div key={name} className="boundary-row">
                  <span>{name}</span>
                  <strong>{description}</strong>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.06 }}
          >
            <TypingCode />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
