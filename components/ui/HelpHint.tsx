import { RiQuestionLine } from 'react-icons/ri';
import { cn } from '@/lib/utils';

interface HelpHintProps {
  text: string;
  align?: 'left' | 'right';
  className?: string;
}

export function HelpHint({ text, align = 'left', className }: HelpHintProps) {
  return (
    <span className={cn('group relative inline-flex', className)}>
      <button
        type="button"
        aria-label={text}
        className="inline-flex h-5 w-5 items-center justify-center rounded-[0.35rem] border border-border bg-background text-secondary transition-colors hover:border-[color:var(--stroke-strong)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_oklch,var(--signal-copper)_18%,transparent)]"
      >
        <RiQuestionLine className="h-3.5 w-3.5" />
      </button>
      <span
        className={cn(
          'pointer-events-none absolute top-full z-20 mt-2 hidden w-64 rounded-[0.45rem] border border-border bg-[color:var(--surface-panel)] px-3 py-2.5 text-xs leading-relaxed text-[color:var(--ink-secondary)] shadow-[0_14px_28px_-20px_rgba(57,42,28,0.18)] group-hover:block group-focus-within:block',
          align === 'right' ? 'right-0' : 'left-0'
        )}
      >
        {text}
      </span>
    </span>
  );
}
