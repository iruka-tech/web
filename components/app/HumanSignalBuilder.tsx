'use client';

import Link from 'next/link';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { MorphoMarketSignalBuilder } from '@/components/app/MorphoMarketSignalBuilder';
import { VaultUseCaseBuilder } from '@/components/app/VaultUseCaseBuilder';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  ASSISTED_PROTOCOL_EXAMPLES,
  ASSISTED_VAULT_EXAMPLES,
  CUSTOM_SIGNAL_FALLBACK,
  HUMAN_SIGNAL_CATEGORIES,
  type HumanSignalCategoryId,
} from '@/lib/signals/create-flow-catalog';
import { CUSTOM_TEMPLATE_PATH } from '@/lib/telegram/setup-flow';
import type { SupportedVaultProtocolId } from '@/lib/vault-discovery/types';

export function HumanSignalBuilder() {
  const [category, setCategory] = useState<HumanSignalCategoryId>('vaults');
  const [selectedVaultProtocol, setSelectedVaultProtocol] = useState<SupportedVaultProtocolId>('morpho');

  return (
    <div className="space-y-6">
      <section className="rounded-[16px] border border-border bg-surface p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Human builder</p>
          <h1 className="mt-3 font-zen text-3xl sm:text-4xl">Start from simple examples</h1>
          <p className="mt-3 text-secondary">
            Choose the operating layer first. Vaults are for ERC-4626-style owner withdrawal watches. Protocols are for indexed, protocol-specific surfaces such as Morpho markets.
          </p>
        </div>
      </section>

      <div className="rounded-md border border-border bg-surface p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">Choose a layer</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {HUMAN_SIGNAL_CATEGORIES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setCategory(option.id)}
              className={`rounded-sm border px-3 py-2 text-sm transition-colors ${
                category === option.id
                  ? 'border-[#1f2328] bg-[#1f2328]/4 text-foreground'
                  : 'border-border text-secondary hover:bg-hovered hover:text-foreground'
              }`}
            >
              {option.title}
            </button>
          ))}
        </div>
        <p className="mt-3 max-w-3xl text-sm text-secondary">
          {HUMAN_SIGNAL_CATEGORIES.find((option) => option.id === category)?.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {category === 'vaults'
          ? ASSISTED_VAULT_EXAMPLES.map((example) => {
              const isActive = example.id === selectedVaultProtocol;
              const isLive = example.status === 'live';

              return (
                <button
                  key={example.id}
                  type="button"
                  disabled={!isLive}
                  onClick={() => {
                    if (isLive) {
                      setSelectedVaultProtocol(example.id as SupportedVaultProtocolId);
                    }
                  }}
                  className={`rounded-md border p-5 text-left transition-colors ${
                    isActive
                      ? 'border-[#1f2328] bg-surface text-foreground'
                      : 'border-border bg-surface text-foreground hover:bg-hovered'
                  } ${!isLive ? 'cursor-not-allowed opacity-65' : ''}`}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-secondary">{example.badge}</p>
                  <h2 className="mt-2 font-zen text-2xl">{example.title}</h2>
                  <p className="mt-2 text-sm text-secondary">{example.description}</p>
                </button>
              );
            })
          : ASSISTED_PROTOCOL_EXAMPLES.map((example) => (
              <div key={example.id} className="rounded-md border border-[#1f2328] bg-surface p-5 text-left">
                <p className="text-xs uppercase tracking-[0.25em] text-secondary">{example.badge}</p>
                <h2 className="mt-2 font-zen text-2xl">{example.title}</h2>
                <p className="mt-2 text-sm text-secondary">{example.description}</p>
              </div>
            ))}
      </div>

      {category === 'vaults' ? (
        <VaultUseCaseBuilder protocol={selectedVaultProtocol} />
      ) : (
        <MorphoMarketSignalBuilder />
      )}

      <Card className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Fallback</p>
          <h2 className="mt-2 font-zen text-2xl">{CUSTOM_SIGNAL_FALLBACK.title}</h2>
          <p className="mt-2 max-w-3xl text-sm text-secondary">{CUSTOM_SIGNAL_FALLBACK.description}</p>
        </div>
        <Link href={CUSTOM_TEMPLATE_PATH} className="no-underline">
          <Button variant="secondary" className="gap-2">
            {CUSTOM_SIGNAL_FALLBACK.cta}
            <RiArrowRightLine className="h-4 w-4" />
          </Button>
        </Link>
      </Card>
    </div>
  );
}
