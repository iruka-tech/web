'use client';

import { cn } from '@/lib/utils';

type SectionTagProps = {
  children: string;
  className?: string;
};

export function SectionTag({ children, className }: SectionTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-[0.45rem] border px-3 py-1.5',
        'border-[color:color-mix(in_oklch,var(--signal-copper)_34%,var(--stroke-soft))]',
        'bg-[color:color-mix(in_oklch,var(--signal-copper)_8%,var(--surface-inset))]',
        'font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--ink-secondary)]',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--signal-copper)]" />
      {children}
    </span>
  );
}
