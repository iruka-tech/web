import { proxyRequestToSentinel } from '@/lib/sentinel/server';

export async function POST(request: Request) {
  return proxyRequestToSentinel(request, '/auth/logout');
}
