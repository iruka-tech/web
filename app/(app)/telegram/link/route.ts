import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/auth/constants';
import { buildLoginHref } from '@/lib/auth/redirect';
import { buildRequestUrl } from '@/lib/http/origin';
import { fetchSentinel } from '@/lib/sentinel/server';

const redirectTo = (request: NextRequest, location: string) =>
  NextResponse.redirect(buildRequestUrl(request, location));

const buildTelegramSettingsPath = (status?: string) => {
  const params = new URLSearchParams();
  if (status) {
    params.set('telegram', status);
  }
  const search = params.toString();
  return search ? `/telegram?${search}` : '/telegram';
};

const buildLoginPath = (request: NextRequest) => {
  const returnTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  return buildLoginHref(returnTo);
};

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')?.trim();
  if (!token) {
    return redirectTo(request, buildTelegramSettingsPath('missing-token'));
  }

  if (!request.cookies.get(SESSION_COOKIE)?.value) {
    return redirectTo(request, buildLoginPath(request));
  }

  const response = await fetchSentinel('/me/integrations/telegram/link', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  if (response.ok) {
    return redirectTo(request, buildTelegramSettingsPath('linked'));
  }

  if (response.status === 401) {
    return redirectTo(request, buildLoginPath(request));
  }

  if (response.status === 404) {
    return redirectTo(request, buildTelegramSettingsPath('expired'));
  }

  return redirectTo(request, buildTelegramSettingsPath('failed'));
}
