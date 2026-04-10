import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AGENT_GUIDE_RESOURCES,
  ASSISTED_PROTOCOL_EXAMPLES,
  ASSISTED_VAULT_EXAMPLES,
  CREATE_SIGNAL_PERSONAS,
  HUMAN_SIGNAL_CATEGORIES,
} from './create-flow-catalog.ts';

test('create-flow personas stay explicit and ordered', () => {
  assert.deepEqual(
    CREATE_SIGNAL_PERSONAS.map((option) => option.id),
    ['human', 'agent']
  );
});

test('human categories stay split between vaults and protocols', () => {
  assert.deepEqual(
    HUMAN_SIGNAL_CATEGORIES.map((option) => option.id),
    ['vaults', 'protocols']
  );
});

test('vault examples keep Morpho and Euler live while Aave remains staged', () => {
  const liveVaults = ASSISTED_VAULT_EXAMPLES.filter((option) => option.status === 'live').map((option) => option.id);
  const stagedVaults = ASSISTED_VAULT_EXAMPLES.filter((option) => option.status === 'coming-soon').map((option) => option.id);

  assert.deepEqual(liveVaults, ['morpho', 'euler']);
  assert.deepEqual(stagedVaults, ['aave-v3']);
});

test('protocol examples stay anchored on Morpho markets for now', () => {
  assert.equal(ASSISTED_PROTOCOL_EXAMPLES.length, 1);
  assert.equal(ASSISTED_PROTOCOL_EXAMPLES[0]?.id, 'morpho-markets');
});

test('agent route keeps docs resources available', () => {
  assert.equal(AGENT_GUIDE_RESOURCES.length, 3);
  assert.ok(AGENT_GUIDE_RESOURCES.every((resource) => resource.href.length > 0));
});
