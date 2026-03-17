import { proxyRequestToSentinel } from '@/lib/sentinel/server';

export async function GET(request: Request) {
  return proxyRequestToSentinel(request, '/auth/me');
}
