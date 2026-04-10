export type CreateSignalPersonaId = 'human' | 'agent';
export type HumanSignalCategoryId = 'vaults' | 'protocols';
export type AssistedVaultExampleId = 'morpho' | 'euler' | 'aave-v3';
export type AssistedProtocolExampleId = 'morpho-markets';

export interface CreateSignalPersonaOption {
  id: CreateSignalPersonaId;
  title: string;
  description: string;
  eyebrow: string;
  cta: string;
}

export interface HumanSignalCategoryOption {
  id: HumanSignalCategoryId;
  title: string;
  description: string;
}

export interface AssistedExampleOption<TId extends string> {
  id: TId;
  title: string;
  description: string;
  badge: string;
  status: 'live' | 'coming-soon';
}

export interface AgentGuideResource {
  title: string;
  description: string;
  href: string;
}

export const CREATE_SIGNAL_PERSONAS: CreateSignalPersonaOption[] = [
  {
    id: 'human',
    eyebrow: "I'm a human",
    title: 'Start from guided use cases',
    description:
      'Pick a known surface, click through examples, and let Sentinel build the watch definition around real vaults or protocol entities.',
    cta: 'Open human builder',
  },
  {
    id: 'agent',
    eyebrow: "I'm an agent",
    title: 'Point an agent at the docs',
    description:
      'Use the docs and API references to let an agent author any signal you need. Agent-native in-app creation can expand later without changing the human flow.',
    cta: 'Open agent guide',
  },
];

export const HUMAN_SIGNAL_CATEGORIES: HumanSignalCategoryOption[] = [
  {
    id: 'vaults',
    title: 'Vaults',
    description:
      'ERC-4626-style vault watchers. Start from known vault registries, choose holders, and generate a withdrawal watch.',
  },
  {
    id: 'protocols',
    title: 'Protocols',
    description:
      'Protocol-specific indexed datasets. Today that means Morpho markets, with room for more protocol surfaces later.',
  },
];

export const ASSISTED_VAULT_EXAMPLES: AssistedExampleOption<AssistedVaultExampleId>[] = [
  {
    id: 'morpho',
    title: 'Morpho vaults',
    description: 'Search official Morpho vault data, pull current holders, and build a 4626 share-withdraw watch.',
    badge: 'Live now',
    status: 'live',
  },
  {
    id: 'euler',
    title: 'Euler Earn vaults',
    description: 'Search Euler Earn vaults from Euler’s official subgraph and select top vault balances.',
    badge: 'Live now',
    status: 'live',
  },
  {
    id: 'aave-v3',
    title: 'Aave V3 vault flows',
    description: 'Reserved as a future assisted surface so vault-style examples stay visible in the app hierarchy.',
    badge: 'Coming soon',
    status: 'coming-soon',
  },
];

export const ASSISTED_PROTOCOL_EXAMPLES: AssistedExampleOption<AssistedProtocolExampleId>[] = [
  {
    id: 'morpho-markets',
    title: 'Morpho markets',
    description:
      'Use backend-indexed Morpho markets to select suppliers and generate supplier-exit signals from the protocol metric layer.',
    badge: 'Live now',
    status: 'live',
  },
];

export const CUSTOM_SIGNAL_FALLBACK = {
  title: 'Customize your own vault watch DSL',
  description:
    "Use this when the assisted flow doesn't expose the vault, market, or address set you care about yet. You can still fill the exact inputs yourself.",
  cta: 'Open custom builder',
};

export const AGENT_GUIDE_RESOURCES: AgentGuideResource[] = [
  {
    title: 'App docs',
    description: 'Structured docs for state metrics, raw events, delivery, and route shapes.',
    href: '/docs',
  },
  {
    title: 'DSL reference',
    description: 'Canonical DSL syntax and condition structure for agent-authored signals.',
    href: 'https://github.com/monarch-xyz/sentinel/blob/main/docs/DSL.md',
  },
  {
    title: 'API reference',
    description: 'Signal creation payloads, auth, and delivery behavior for direct agent integration.',
    href: 'https://github.com/monarch-xyz/sentinel/blob/main/docs/API.md',
  },
];
