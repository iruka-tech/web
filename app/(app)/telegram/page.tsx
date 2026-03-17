import Link from 'next/link';
import { TelegramConnectPanel } from '@/components/app/TelegramConnectPanel';
import { TelegramSetupGuide } from '@/components/app/TelegramSetupGuide';
import { Button } from '@/components/ui/Button';
import { getAuthenticatedUser } from '@/lib/auth/session';
import { telegramBotLabel, telegramBotUrl } from '@/lib/telegram/config';
import { getTelegramLinkStatus } from '@/lib/telegram/link-state';

interface TelegramPageProps {
  searchParams?: Promise<{ telegram?: string }> | { telegram?: string };
}

const telegramNotice = (value: string | undefined) => {
  switch (value) {
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

  return (
    <div className="space-y-6">
      {notice ? (
        <div
          className={`rounded-sm border px-4 py-3 text-sm ${
            notice.tone === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-700'
              : 'border-amber-500/30 bg-amber-500/5 text-foreground'
          }`}
        >
          {notice.message}
        </div>
      ) : null}

      <section className="rounded-[16px] border border-border bg-surface p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Telegram</p>
          <h1 className="mt-3 font-zen text-3xl sm:text-4xl">Telegram settings</h1>
          <p className="mt-3 text-secondary">
            {telegramStatus.linked
              ? 'Telegram is linked for this account.'
              : 'Open the bot once and complete the connect step there.'}
          </p>
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
          {!telegramStatus.linked ? (
            <a href={telegramBotUrl} target="_blank" rel="noreferrer" className="no-underline">
              <Button size="lg">Open {telegramBotLabel}</Button>
            </a>
          ) : null}
          <Link href="/signals/new" className="no-underline">
            <Button size="lg" variant="secondary">
              Create signal
            </Button>
          </Link>
          {!telegramStatus.linked ? (
            <TelegramSetupGuide triggerLabel="Need help" triggerVariant="ghost" triggerSize="lg" />
          ) : null}
        </div>
      </section>

      <TelegramConnectPanel
        initialStatus={{
          linked: telegramStatus.linked,
          linkedAt: telegramStatus.linkedAt,
          telegramUsername: telegramStatus.telegramUsername,
        }}
      />
    </div>
  );
}
