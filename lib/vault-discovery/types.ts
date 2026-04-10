export type SupportedVaultProtocolId = 'morpho' | 'euler';
export type VaultPreviewProtocolId = SupportedVaultProtocolId | 'aave-v3';

export interface VaultSummary {
  protocol: SupportedVaultProtocolId;
  address: string;
  name: string;
  symbol: string;
  chainId: number;
  assetSymbol: string | null;
  assetAddress: string | null;
  totalAssets: string;
  totalAssetsUsd: number | null;
  sourceLabel: string;
}

export interface VaultHolder {
  address: string;
  shares: string;
}
