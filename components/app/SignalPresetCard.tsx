import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

interface SignalPresetCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

export function SignalPresetCard({ title, description, icon, children }: SignalPresetCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[0.45rem] border border-border bg-[color:color-mix(in_oklch,var(--signal-copper)_10%,var(--surface-inset))] text-[color:var(--signal-copper)]">
          {icon}
        </div>
        <div>
          <h3 className="font-display text-[1.35rem] leading-none text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">{description}</p>
        </div>
      </div>
      {children}
    </Card>
  );
}
