import Link from 'next/link';
import { TelegramConnectPanel } from '@/components/app/TelegramConnectPanel';
import { TelegramSetupGuide } from '@/components/app/TelegramSetupGuide';
import { Button } from '@/components/ui/Button';
import { getAuthenticatedUser } from '@/lib/auth/session';
import { telegramBotLabel } from '@/lib/telegram/config';
import { getTelegramLinkStatus } from '@/lib/telegram/link-state';
import { buildTelegramStartPath, DEFAULT_TEMPLATE_PATH, resolveTelegramReturnTo } from '@/lib/telegram/setup-flow';

interface TelegramPageProps {
  searchParams?: Promise<{ telegram?: string; returnTo?: string }> | { telegram?: string; returnTo?: string };
}

const telegramNotice = (value: string | undefined) => {
  switch (value) {
    case 'required':
      return {
        tone: 'info' as const,
        message: 'Connect Telegram before you open a signal template.',
      };
    case 'linked':
      return {
        tone: 'success' as const,
        message: 'Telegram is now connected to this account.',
      };
    case 'expired':
      return {
        tone: 'error' as const,
        message: 'That Telegram link has expired. Open the bot again to create a fresh one.',
      };
    case 'missing-token':
      return {
        tone: 'error' as const,
        message: 'The Telegram handoff was missing its token. Open the bot again and use the latest connect button.',
      };
    case 'failed':
      return {
        tone: 'error' as const,
        message: 'Telegram could not be linked right now. Try the bot again in a moment.',
      };
    default:
      return null;
  }
};

export default async function TelegramPage({ searchParams }: TelegramPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const user = await getAuthenticatedUser();
  const telegramStatus = user
    ? await getTelegramLinkStatus()
    : { linked: false, linkedAt: null, appUserId: null, telegramUsername: null };
  const notice = telegramNotice(resolvedSearchParams?.telegram);
  const returnTo = resolveTelegramReturnTo(resolvedSearchParams?.returnTo);
  const openTelegramHref = buildTelegramStartPath(returnTo);
  const continueHref = returnTo ?? DEFAULT_TEMPLATE_PATH;
  const isTemplateFlow = Boolean(returnTo?.startsWith(DEFAULT_TEMPLATE_PATH));
  const heading = telegramStatus.linked
    ? 'Telegram settings'
    : isTemplateFlow
      ? 'Set up Telegram first'
      : 'Telegram settings';
  const description = telegramStatus.linked
    ? isTemplateFlow
      ? 'Telegram is linked. Continue to the signal builder when you are ready.'
      : 'Telegram is linked for this account.'
    : isTemplateFlow
      ? 'Template signals deliver through Telegram. Finish this step once before you open the builder.'
      : 'Open the bot once and complete the connect step there.';
  const primaryLabel = telegramStatus.linked
    ? isTemplateFlow
      ? 'Continue to signal builder'
      : 'Create signal'
    : `Open ${telegramBotLabel}`;
  const showSecondaryCreateButton = telegramStatus.linked && isTemplateFlow;

  return (
    <div className="space-y-6">
      {notice ? (
        <div
          className={`rounded-sm border px-4 py-3 text-sm ${
            notice.tone === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-700'
              : notice.tone === 'info'
                ? 'border-border bg-surface text-foreground'
              : 'border-amber-500/30 bg-amber-500/5 text-foreground'
          }`}
        >
          {notice.message}
        </div>
      ) : null}

      <section className="rounded-[16px] border border-border bg-surface p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Telegram</p>
          <h1 className="mt-3 font-zen text-3xl sm:text-4xl">{heading}</h1>
          <p className="mt-3 text-secondary">{description}</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div
            className={`inline-flex items-center rounded-sm border px-3 py-1.5 text-sm ${
              telegramStatus.linked
                ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-700'
                : 'border-border bg-background text-secondary'
            }`}
          >
            {telegramStatus.linked ? 'Telegram connected' : 'Not connected yet'}
          </div>
          {telegramStatus.linked ? (
            <Link href={continueHref} className="no-underline">
              <Button size="lg">{primaryLabel}</Button>
            </Link>
          ) : (
            <Link href={openTelegramHref} className="no-underline">
              <Button size="lg">{primaryLabel}</Button>
            </Link>
          )}
          {showSecondaryCreateButton ? (
            <Link href={DEFAULT_TEMPLATE_PATH} className="no-underline">
              <Button size="lg" variant="secondary">
                Create signal
              </Button>
            </Link>
          ) : (
            <TelegramSetupGuide triggerLabel="Need help" triggerVariant="ghost" triggerSize="lg" returnTo={returnTo} />
          )}
        </div>
      </section>

      <TelegramConnectPanel
        initialStatus={{
          linked: telegramStatus.linked,
          linkedAt: telegramStatus.linkedAt,
          telegramUsername: telegramStatus.telegramUsername,
        }}
        returnTo={returnTo}
      />
    </div>
  );
}
