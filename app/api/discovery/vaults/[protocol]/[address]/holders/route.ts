import { NextResponse } from 'next/server';
import { listVaultHolders } from '@/lib/vault-discovery/server';
import type { SupportedVaultProtocolId } from '@/lib/vault-discovery/types';

interface RouteContext {
  params:
    | Promise<{
        protocol: string;
        address: string;
      }>
    | {
        protocol: string;
        address: string;
      };
}

const isSupportedVaultProtocol = (value: string): value is SupportedVaultProtocolId =>
  value === 'morpho' || value === 'euler';

export async function GET(request: Request, context: RouteContext) {
  const { searchParams } = new URL(request.url);
  const params = await context.params;
  const limit = Number(searchParams.get('limit') ?? '20');
  const chainId = Number(searchParams.get('chainId') ?? '1');

  if (!isSupportedVaultProtocol(params.protocol)) {
    return NextResponse.json(
      {
        error: 'unsupported_vault_protocol',
        details: `Unsupported vault protocol: ${params.protocol}`,
      },
      { status: 400 }
    );
  }

  try {
    const items = await listVaultHolders({
      protocol: params.protocol,
      vaultAddress: params.address,
      limit,
      chainId,
    });

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'vault_holders_fetch_failed',
        details: error instanceof Error ? error.message : 'unknown_error',
      },
      { status: 502 }
    );
  }
}
