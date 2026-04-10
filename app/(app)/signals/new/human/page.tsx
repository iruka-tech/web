import { redirect } from 'next/navigation';
import { HumanSignalBuilder } from '@/components/app/HumanSignalBuilder';
import { getAuthenticatedUser } from '@/lib/auth/session';
import { getTelegramLinkStatus } from '@/lib/telegram/link-state';
import { buildTelegramPath, HUMAN_TEMPLATE_PATH } from '@/lib/telegram/setup-flow';

export default async function HumanSignalPage() {
  const user = await getAuthenticatedUser();
  const telegramStatus = user
    ? await getTelegramLinkStatus()
    : { linked: false, linkedAt: null, appUserId: null, telegramUsername: null };

  if (!telegramStatus.linked) {
    redirect(
      buildTelegramPath({
        status: 'required',
        returnTo: HUMAN_TEMPLATE_PATH,
      })
    );
  }

  return <HumanSignalBuilder />;
}
