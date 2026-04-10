import { NextResponse } from 'next/server';
import { listVaults } from '@/lib/vault-discovery/server';
import type { SupportedVaultProtocolId } from '@/lib/vault-discovery/types';

const isSupportedVaultProtocol = (value: string): value is SupportedVaultProtocolId =>
  value === 'morpho' || value === 'euler';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') ?? '';
  const limit = Number(searchParams.get('limit') ?? '20');
  const chainId = Number(searchParams.get('chainId') ?? '1');
  const protocolParam = searchParams.get('protocol') ?? 'morpho';

  if (!isSupportedVaultProtocol(protocolParam)) {
    return NextResponse.json(
      {
        error: 'unsupported_vault_protocol',
        details: `Unsupported vault protocol: ${protocolParam}`,
      },
      { status: 400 }
    );
  }

  try {
    const items = await listVaults({
      protocol: protocolParam,
      search,
      limit,
      chainId,
    });

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'vaults_fetch_failed',
        details: error instanceof Error ? error.message : 'unknown_error',
      },
      { status: 502 }
    );
  }
}
