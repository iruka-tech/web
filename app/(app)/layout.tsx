import { ReactNode } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/app/AppShell';
import { getAuthenticatedUser } from '@/lib/auth/session';
import { buildLoginHref } from '@/lib/auth/redirect';
import { getTelegramLinkStatus } from '@/lib/telegram/link-state';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getAuthenticatedUser();
  if (!user) {
    const requestHeaders = await headers();
    redirect(buildLoginHref(requestHeaders.get('next-url')));
  }

  let telegramLinked = false;

  try {
    telegramLinked = (await getTelegramLinkStatus()).linked;
  } catch {
    telegramLinked = false;
  }

  return <AppShell telegramLinked={telegramLinked}>{children}</AppShell>;
}
