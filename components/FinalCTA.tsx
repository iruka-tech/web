'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { RiArrowRightLine, RiBookOpenLine } from 'react-icons/ri';
import { IRUKA_DOCS_OVERVIEW_URL } from '@/lib/iruka-links';

export function FinalCTA() {
  return (
    <section className="final-section relative py-16 md:py-24">
      <div className="page-gutter">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="final-panel"
        >
          <div>
            <span className="final-label">Ready signal</span>
            <h2>Save the rule once. Let the next agent start from evidence.</h2>
          </div>
          <div className="final-actions">
            <Link href="/login" className="no-underline">
              <span className="ui-button px-5 py-3.5" data-variant="primary">
                Open console
                <RiArrowRightLine className="h-4 w-4" />
              </span>
            </Link>
            <a href={IRUKA_DOCS_OVERVIEW_URL} target="_blank" rel="noopener noreferrer" className="no-underline">
              <span className="ui-button px-5 py-3.5" data-variant="ghost">
                <RiBookOpenLine className="h-4 w-4" />
                Read docs
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
