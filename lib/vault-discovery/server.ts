import 'server-only';

import { listMorphoVaultHolders, listMorphoVaults } from '@/lib/morpho-discovery/server';
import type { VaultHolder, VaultSummary, SupportedVaultProtocolId } from '@/lib/vault-discovery/types';

const EULER_MAINNET_SUBGRAPH_URL =
  'https://api.goldsky.com/api/public/project_cm4iagnemt1wp01xn4gh1agft/subgraphs/euler-v2-mainnet/latest/gn';

class VaultDiscoveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VaultDiscoveryError';
  }
}

const clampLimit = (value: number, max: number) => {
  if (!Number.isInteger(value) || value < 1) {
    return Math.min(20, max);
  }

  return Math.min(value, max);
};

const normalizeSearch = (value: string) => value.trim().toLowerCase();

const toBigIntString = (value: string | number | bigint | null | undefined) => {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(value) : '0';
  }

  if (typeof value === 'bigint') {
    return value.toString();
  }

  return '0';
};

const postEulerGraphql = async <T>(query: string, variables: Record<string, unknown>) => {
  const response = await fetch(EULER_MAINNET_SUBGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new VaultDiscoveryError(`Euler subgraph request failed (${response.status})`);
  }

  const payload = (await response.json()) as {
    data?: T;
    errors?: Array<{ message?: string }>;
  };

  if (payload.errors && payload.errors.length > 0) {
    const message = payload.errors.map((error) => error.message).filter(Boolean).join('; ');
    throw new VaultDiscoveryError(message || 'Euler subgraph query failed.');
  }

  if (!payload.data) {
    throw new VaultDiscoveryError('Euler subgraph returned no data.');
  }

  return payload.data;
};

const listEulerVaults = async ({
  chainId = 1,
  limit = 20,
  search = '',
}: {
  chainId?: number;
  limit?: number;
  search?: string;
} = {}): Promise<VaultSummary[]> => {
  if (chainId !== 1) {
    throw new VaultDiscoveryError('Euler vault discovery is currently enabled for Ethereum mainnet only.');
  }

  const data = await postEulerGraphql<{
    eulerEarnVaults: Array<{
      id: string;
      name: string;
      symbol: string;
      asset: string;
      totalAssets: string | number;
    }>;
  }>(
    `
      query ListEulerEarnVaults {
        eulerEarnVaults(first: 100, orderBy: totalAssets, orderDirection: desc) {
          id
          name
          symbol
          asset
          totalAssets
        }
      }
    `,
    {}
  );

  const normalizedSearch = normalizeSearch(search);
  const filtered = data.eulerEarnVaults.filter((vault) => {
    if (!normalizedSearch) {
      return true;
    }

    return [vault.name, vault.symbol, vault.asset]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalizedSearch));
  });

  return filtered.slice(0, clampLimit(limit, 100)).map((vault) => ({
    protocol: 'euler',
    address: vault.id,
    name: vault.name,
    symbol: vault.symbol,
    chainId,
    assetSymbol: null,
    assetAddress: vault.asset,
    totalAssets: toBigIntString(vault.totalAssets),
    totalAssetsUsd: null,
    sourceLabel: 'Euler subgraph',
  }));
};

const listEulerVaultHolders = async ({
  vaultAddress,
  chainId = 1,
  limit = 20,
}: {
  vaultAddress: string;
  chainId?: number;
  limit?: number;
}): Promise<VaultHolder[]> => {
  if (chainId !== 1) {
    throw new VaultDiscoveryError('Euler vault holder discovery is currently enabled for Ethereum mainnet only.');
  }

  const data = await postEulerGraphql<{
    trackingVaultBalances: Array<{
      account: string;
      balance: string | number;
    }>;
  }>(
    `
      query ListEulerVaultHolders($vault: String!, $first: Int!) {
        trackingVaultBalances(
          first: $first
          orderBy: balance
          orderDirection: desc
          where: { vault: $vault }
        ) {
          account
          balance
        }
      }
    `,
    {
      vault: vaultAddress.toLowerCase(),
      first: clampLimit(limit, 50),
    }
  );

  return data.trackingVaultBalances.map((item) => ({
    address: item.account,
    shares: toBigIntString(item.balance),
  }));
};

export const listVaults = async ({
  protocol,
  chainId = 1,
  limit = 20,
  search = '',
}: {
  protocol: SupportedVaultProtocolId;
  chainId?: number;
  limit?: number;
  search?: string;
}): Promise<VaultSummary[]> => {
  if (protocol === 'morpho') {
    const items = await listMorphoVaults({
      chainId,
      limit,
      search,
    });

    return items.map((vault) => ({
      protocol: 'morpho',
      address: vault.address,
      name: vault.name,
      symbol: vault.symbol,
      chainId: vault.chainId,
      assetSymbol: vault.assetSymbol,
      assetAddress: vault.assetAddress,
      totalAssets: vault.totalAssets,
      totalAssetsUsd: vault.totalAssetsUsd,
      sourceLabel: 'Morpho API',
    }));
  }

  return listEulerVaults({
    chainId,
    limit,
    search,
  });
};

export const listVaultHolders = async ({
  protocol,
  vaultAddress,
  chainId = 1,
  limit = 20,
}: {
  protocol: SupportedVaultProtocolId;
  vaultAddress: string;
  chainId?: number;
  limit?: number;
}): Promise<VaultHolder[]> => {
  if (protocol === 'morpho') {
    return listMorphoVaultHolders({
      vaultAddress,
      chainId,
      limit,
    });
  }

  return listEulerVaultHolders({
    vaultAddress,
    chainId,
    limit,
  });
};
