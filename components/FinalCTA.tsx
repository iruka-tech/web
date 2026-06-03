'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { RiBookOpenLine, RiLoginCircleLine } from 'react-icons/ri';
import { IRUKA_DOCS_OVERVIEW_URL } from '@/lib/iruka-links';

export function FinalCTA() {
  return (
    <section className="relative py-18 md:py-28">
      <div className="page-gutter">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="final-signal ui-hero px-6 py-10 sm:px-8 sm:py-12 lg:px-12"
        >
          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
            <div>
              <div className="ui-kicker">Start building</div>
              <h2 className="ui-section-title mt-5">Save the condition once. Let agents act when it matters.</h2>
            </div>
            <div>
              <p className="ui-copy">
                Define when a signal should wake, what it should check, and where the notification should go. Keep monitoring intent readable instead of spreading it across scripts.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/login" className="no-underline">
                  <span className="ui-button px-5 py-3.5" data-variant="primary">
                    <RiLoginCircleLine className="h-4 w-4" />
                    Open console
                  </span>
                </Link>
                <a href={IRUKA_DOCS_OVERVIEW_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
                  <span className="ui-button px-5 py-3.5" data-variant="ghost">
                    <RiBookOpenLine className="h-4 w-4" />
                    Read docs
                  </span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
