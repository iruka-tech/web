import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

interface AuthOptionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}

export function AuthOptionCard({
  title,
  description,
  icon,
  children,
  footer,
}: AuthOptionCardProps) {
  return (
    <Card className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[0.45rem] border border-border bg-[color:color-mix(in_oklch,var(--signal-copper)_10%,var(--surface-inset))] text-[color:var(--signal-copper)]">
            {icon}
          </div>
          <div>
            <h3 className="font-display text-[1.35rem] leading-none text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{description}</p>
          </div>
        </div>
      </div>
      {children ? <div className="ui-panel-ghost p-4">{children}</div> : null}
      {footer ? <div className="border-t border-border pt-2">{footer}</div> : null}
    </Card>
  );
}
