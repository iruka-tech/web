import Link from 'next/link';
import { RiArrowRightLine, RiBookOpenLine, RiFileCodeLine } from 'react-icons/ri';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { AGENT_GUIDE_RESOURCES } from '@/lib/signals/create-flow-catalog';

const agentPrompt = `Read the Sentinel docs and create a signal for me.

Goal:
- Watch ERC4626.Position.shares for a vault I specify
- Track multiple owner addresses
- Alert when N owners each reduce shares by at least X% in Y window

Return:
- the final signal JSON
- a short explanation of the scope, condition, and delivery settings`;

export function AgentSignalGuide() {
  return (
    <div className="space-y-6">
      <section className="rounded-[16px] border border-border bg-surface p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Agent guide</p>
          <h1 className="mt-3 font-zen text-3xl sm:text-4xl">Point your agent at the docs</h1>
          <p className="mt-3 text-secondary">
            The agent-native route can stay lightweight for now. Instead of forcing a partial UI, give your agent the Sentinel docs and let it author the signal definition you actually need.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <Card className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-secondary">Resources</p>
            <h2 className="mt-2 font-zen text-2xl">Use these with your agent</h2>
          </div>

          <div className="space-y-3">
            {AGENT_GUIDE_RESOURCES.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="flex items-start justify-between gap-3 rounded-sm border border-border bg-background/50 px-4 py-3 no-underline transition-colors hover:bg-hovered"
              >
                <div>
                  <p className="text-sm text-foreground">{resource.title}</p>
                  <p className="mt-1 text-sm text-secondary">{resource.description}</p>
                </div>
                <RiArrowRightLine className="mt-1 h-4 w-4 text-secondary" />
              </Link>
            ))}
          </div>

          <div className="rounded-sm border border-border/80 bg-background/50 p-4 text-sm text-secondary">
            Agent-native creation inside the app can be expanded later. This route exists now so the app hierarchy clearly separates human guided flows from open-ended agent-authored queries.
          </div>

          <Link href="/docs" className="no-underline">
            <Button className="gap-2">
              Open docs
              <RiBookOpenLine className="h-4 w-4" />
            </Button>
          </Link>
        </Card>

        <Card className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-secondary">Starter prompt</p>
            <h2 className="mt-2 font-zen text-2xl">Minimal handoff</h2>
            <p className="mt-2 text-sm text-secondary">
              If a user brings an agent, this is enough to ground the task without pretending the guided UI can cover every query.
            </p>
          </div>

          <div className="rounded-sm border border-border/80 bg-background/50 p-4">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-secondary">
              <RiFileCodeLine className="h-4 w-4" />
              Agent prompt
            </div>
            <CodeBlock code={agentPrompt} language="text" filename="agent-prompt.txt" tone="dark" />
          </div>
        </Card>
      </div>
    </div>
  );
}
