'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RiEyeLine, RiMore2Fill } from 'react-icons/ri';
import { SignalDeleteButton } from '@/components/app/SignalDeleteButton';
import { Button } from '@/components/ui/Button';

interface SignalRowMenuProps {
  signalId: string;
  signalName: string;
}

export function SignalRowMenu({ signalId, signalName }: SignalRowMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuItemClassName = 'flex h-10 items-center gap-2 rounded-[0.45rem] px-3 text-sm transition-colors';

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        aria-label="Open signal actions"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="w-8 px-0"
      >
        <RiMore2Fill className="h-4 w-4" />
      </Button>

      {isOpen ? (
        <div className="ui-menu absolute right-0 top-full z-20 mt-2 min-w-[180px]">
          <Link
            href={`/signals/${signalId}`}
            className={`${menuItemClassName} ui-link no-underline hover:bg-hovered hover:text-foreground`}
            onClick={() => setIsOpen(false)}
          >
            <RiEyeLine className="h-4 w-4 shrink-0" />
            View details
          </Link>
          <SignalDeleteButton
            signalId={signalId}
            signalName={signalName}
            size="sm"
            label="Delete"
            className={`${menuItemClassName} w-full justify-start border-transparent bg-transparent text-[color:color-mix(in_oklch,var(--signal-alert)_80%,white)] hover:border-transparent hover:bg-[color:color-mix(in_oklch,var(--signal-alert)_10%,transparent)]`}
          />
        </div>
      ) : null}
    </div>
  );
}
