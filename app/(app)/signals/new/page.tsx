import Link from 'next/link';
import { redirect } from 'next/navigation';
import { RiArrowRightLine, RiRobot2Line, RiUser3Line } from 'react-icons/ri';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getAuthenticatedUser } from '@/lib/auth/session';
import {
  AGENT_TEMPLATE_PATH,
  HUMAN_TEMPLATE_PATH,
  buildTemplateEntryPath,
  buildTemplatePath,
} from '@/lib/telegram/setup-flow';
import { getTelegramLinkStatus } from '@/lib/telegram/link-state';
import { CREATE_SIGNAL_PERSONAS } from '@/lib/signals/create-flow-catalog';

interface NewSignalPageProps {
  searchParams?: Promise<{ preset?: string }> | { preset?: string };
}

export default async function NewSignalPage({ searchParams }: NewSignalPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const presetParam = resolvedSearchParams?.preset;

  if (typeof presetParam === 'string' && presetParam.trim()) {
    redirect(buildTemplatePath(presetParam));
  }

  const user = await getAuthenticatedUser();
  const telegramStatus = user
    ? await getTelegramLinkStatus()
    : { linked: false, linkedAt: null, appUserId: null, telegramUsername: null };

  return (
    <div className="space-y-6">
      <section className="rounded-[16px] border border-border bg-surface p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Create</p>
          <h1 className="mt-3 font-zen text-3xl sm:text-4xl">Choose who is creating the signal</h1>
          <p className="mt-3 text-secondary">
            Keep the top level clean: human users start from guided vault and protocol use cases, while agent users get pointed at the docs for open-ended signal authoring.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#ff6b35]/10 text-[#ff6b35]">
              <RiUser3Line className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-secondary">
                {CREATE_SIGNAL_PERSONAS[0]?.eyebrow}
              </p>
              <h2 className="mt-1 font-zen text-2xl">{CREATE_SIGNAL_PERSONAS[0]?.title}</h2>
            </div>
          </div>
          <p className="text-sm text-secondary">
            {CREATE_SIGNAL_PERSONAS[0]?.description}
          </p>
          <div className="space-y-2 text-sm text-secondary">
            <p>Supports today:</p>
            <p>Vault examples for Morpho and Euler</p>
            <p>Protocol example for Morpho markets</p>
            <p>Custom vault watch fallback when assisted search cannot find what you need</p>
          </div>
          {!telegramStatus.linked ? (
            <p className="text-sm text-secondary">
              Telegram is still required for human-created managed alerts. The CTA below will route through Telegram setup first.
            </p>
          ) : null}
          <Link href={buildTemplateEntryPath(telegramStatus.linked, HUMAN_TEMPLATE_PATH)} className="no-underline">
            <Button className="gap-2">
              {CREATE_SIGNAL_PERSONAS[0]?.cta}
              <RiArrowRightLine className="h-4 w-4" />
            </Button>
          </Link>
        </Card>

        <Card className="space-y-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#ff6b35]/10 text-[#ff6b35]">
              <RiRobot2Line className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-secondary">
                {CREATE_SIGNAL_PERSONAS[1]?.eyebrow}
              </p>
              <h2 className="mt-1 font-zen text-2xl">{CREATE_SIGNAL_PERSONAS[1]?.title}</h2>
            </div>
          </div>
          <p className="text-sm text-secondary">
            {CREATE_SIGNAL_PERSONAS[1]?.description}
          </p>
          <div className="space-y-2 text-sm text-secondary">
            <p>Includes today:</p>
            <p>Docs links for DSL and API references</p>
            <p>Starter prompt for user-provided agents</p>
            <p>Room for a fuller agent-native builder later</p>
          </div>
          <Link href={AGENT_TEMPLATE_PATH} className="no-underline">
            <Button variant="secondary" className="gap-2">
              {CREATE_SIGNAL_PERSONAS[1]?.cta}
              <RiArrowRightLine className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
