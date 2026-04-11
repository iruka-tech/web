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
        className="inline-flex h-5 w-5 items-center justify-center rounded-sm border border-border bg-background text-secondary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35]/20"
      >
        <RiQuestionLine className="h-3.5 w-3.5" />
      </button>
      <span
        className={cn(
          'pointer-events-none absolute top-full z-20 mt-2 hidden w-64 rounded-sm border border-border bg-[#1f2328] px-3 py-2 text-xs leading-relaxed text-white shadow-lg group-hover:block group-focus-within:block',
          align === 'right' ? 'right-0' : 'left-0'
        )}
      >
        {text}
      </span>
    </span>
  );
}
