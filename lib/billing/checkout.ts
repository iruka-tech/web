export type BillingPlanKey = 'pro_monthly';
export type BillingProvider = 'x402' | 'mpp';

const BILLING_PROVIDERS = new Set<BillingProvider>(['x402', 'mpp']);

export interface X402PaymentRequirements {
  scheme: 'exact';
  network: string;
  asset: string;
  amount?: string;
  maxAmountRequired?: string;
  resource?: string;
  description?: string;
  mimeType?: string;
  outputSchema?: Record<string, unknown>;
  payTo: string;
  maxTimeoutSeconds: number;
  extra: Record<string, unknown>;
}

export interface X402PaymentRequired {
  x402Version: 1 | 2;
  resource?: {
    url: string;
    description?: string;
    mimeType?: string;
  };
  accepts: X402PaymentRequirements[];
}

export interface X402PaymentPayload {
  x402Version: 1 | 2;
  resource?: X402PaymentRequired['resource'];
  accepted?: X402PaymentRequirements;
  scheme?: string;
  network?: string;
  payload: Record<string, unknown>;
  extensions?: Record<string, unknown>;
}

export interface BillingCheckoutSession {
  checkoutId: string;
  provider: BillingProvider;
  sessionId: string;
  status: string;
  expiresAt: string | null;
  clientSecret: string | null;
  x402PaymentRequirements: X402PaymentRequired | null;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const optionalStringOrNull = (value: unknown) =>
  typeof value === 'string' || value === null || value === undefined;

export const getX402RequirementAmount = (requirement: X402PaymentRequirements | undefined) =>
  requirement?.amount ?? requirement?.maxAmountRequired ?? '';

const normalizeX402Requirement = (value: unknown): X402PaymentRequirements | null => {
  if (!isRecord(value)) {
    return null;
  }
  const amount = typeof value.amount === 'string' ? value.amount : typeof value.maxAmountRequired === 'string' ? value.maxAmountRequired : '';
  if (
    value.scheme !== 'exact' ||
    typeof value.network !== 'string' ||
    typeof value.asset !== 'string' ||
    !amount ||
    typeof value.payTo !== 'string' ||
    typeof value.maxTimeoutSeconds !== 'number' ||
    !isRecord(value.extra)
  ) {
    return null;
  }

  return {
    scheme: 'exact',
    network: value.network,
    asset: value.asset,
    amount: typeof value.amount === 'string' ? value.amount : undefined,
    maxAmountRequired: typeof value.maxAmountRequired === 'string' ? value.maxAmountRequired : undefined,
    resource: typeof value.resource === 'string' ? value.resource : undefined,
    description: typeof value.description === 'string' ? value.description : undefined,
    mimeType: typeof value.mimeType === 'string' ? value.mimeType : undefined,
    outputSchema: isRecord(value.outputSchema) ? value.outputSchema : undefined,
    payTo: value.payTo,
    maxTimeoutSeconds: value.maxTimeoutSeconds,
    extra: value.extra,
  };
};

const normalizeX402PaymentRequirements = (value: unknown): X402PaymentRequired | null => {
  if (value === null || value === undefined) {
    return null;
  }
  if (!isRecord(value) || (value.x402Version !== 1 && value.x402Version !== 2)) {
    return null;
  }

  const { accepts } = value;
  if (!Array.isArray(accepts) || accepts.length === 0) {
    return null;
  }
  const normalizedAccepts = accepts.map(normalizeX402Requirement);
  if (normalizedAccepts.some((requirement) => requirement === null)) {
    return null;
  }

  const resource = isRecord(value.resource)
    ? {
        url: typeof value.resource.url === 'string' ? value.resource.url : '',
        description: typeof value.resource.description === 'string' ? value.resource.description : undefined,
        mimeType: typeof value.resource.mimeType === 'string' ? value.resource.mimeType : undefined,
      }
    : undefined;

  return {
    x402Version: value.x402Version,
    resource,
    accepts: normalizedAccepts as X402PaymentRequirements[],
  };
};

export function normalizeBillingCheckoutSession(payload: unknown): BillingCheckoutSession | null {
  if (!isRecord(payload)) {
    return null;
  }

  const { checkout_id, provider, session_id, status, expires_at, client_secret, payment_requirements } = payload;
  const x402PaymentRequirements = normalizeX402PaymentRequirements(payment_requirements);
  if (
    typeof checkout_id !== 'string' ||
    typeof provider !== 'string' ||
    !BILLING_PROVIDERS.has(provider as BillingProvider) ||
    typeof session_id !== 'string' ||
    typeof status !== 'string' ||
    !optionalStringOrNull(expires_at) ||
    !optionalStringOrNull(client_secret) ||
    (payment_requirements !== undefined && payment_requirements !== null && !x402PaymentRequirements)
  ) {
    return null;
  }

  return {
    checkoutId: checkout_id,
    provider: provider as BillingProvider,
    sessionId: session_id,
    status,
    expiresAt: typeof expires_at === 'string' ? expires_at : null,
    clientSecret: typeof client_secret === 'string' ? client_secret : null,
    x402PaymentRequirements,
  };
}
