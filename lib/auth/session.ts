import 'server-only';

import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/lib/auth/constants';
import type { SentinelAuthenticatedUser } from '@/lib/auth/types';
import { fetchSentinel } from '@/lib/sentinel/server';

export const getWalletAddressFromUser = (user: SentinelAuthenticatedUser): string | null => {
  const walletIdentity = user.identities.find((identity) => identity.provider === 'wallet');
  if (!walletIdentity) {
    return null;
  }

  const metadataAddress = walletIdentity.metadata?.address;
  if (typeof metadataAddress === 'string' && metadataAddress.length > 0) {
    return metadataAddress.toLowerCase();
  }

  return walletIdentity.provider_subject.toLowerCase();
};

export const getAuthenticatedUser = async (): Promise<SentinelAuthenticatedUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  const response = await fetchSentinel('/auth/me');
  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Sentinel auth bootstrap failed (${response.status})`);
  }

  return (await response.json()) as SentinelAuthenticatedUser;
};
