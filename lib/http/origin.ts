import type { NextRequest } from 'next/server';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const getRequestOrigin = (request: Pick<NextRequest, 'headers' | 'nextUrl'>) => {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = forwardedHost ?? request.headers.get('host') ?? request.nextUrl.host;
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const protocol =
    forwardedProto ??
    (host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https');

  return trimTrailingSlash(`${protocol}://${host}`);
};

export const buildRequestUrl = (request: Pick<NextRequest, 'headers' | 'nextUrl'>, path: string) =>
  new URL(path, `${getRequestOrigin(request)}/`);
