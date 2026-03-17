import { proxyRequestToSentinel } from '@/lib/sentinel/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  return proxyRequestToSentinel(request, '/auth/siwe/nonce');
}
