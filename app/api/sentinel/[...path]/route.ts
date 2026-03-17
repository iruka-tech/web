import { proxyRequestToSentinel } from '@/lib/sentinel/server';

interface SentinelRouteContext {
  params: Promise<{ path: string[] }> | { path: string[] };
}

const proxySentinelRequest = async (request: Request, context: SentinelRouteContext) => {
  const routeParams = await context.params;
  const sentinelPath = `/${routeParams.path.join('/')}`;
  const search = new URL(request.url).search;

  return proxyRequestToSentinel(request, sentinelPath, search);
};

export async function GET(request: Request, context: SentinelRouteContext) {
  return proxySentinelRequest(request, context);
}

export async function POST(request: Request, context: SentinelRouteContext) {
  return proxySentinelRequest(request, context);
}

export async function PATCH(request: Request, context: SentinelRouteContext) {
  return proxySentinelRequest(request, context);
}

export async function PUT(request: Request, context: SentinelRouteContext) {
  return proxySentinelRequest(request, context);
}

export async function DELETE(request: Request, context: SentinelRouteContext) {
  return proxySentinelRequest(request, context);
}
