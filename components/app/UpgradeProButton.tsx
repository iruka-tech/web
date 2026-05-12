'use client';

import Link from 'next/link';

export function UpgradeProButton() {
  return (
    <Link
      href="/billing/checkout"
      className="ui-button inline-flex h-9 shrink-0 items-center px-3.5 text-[0.82rem] no-underline"
      data-variant="secondary"
      data-size="sm"
    >
      Upgrade
    </Link>
  );
}
