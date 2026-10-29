import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDiscovery } from './discovery.js';

const complete = () => ({
  id: 'coral-reef', name: 'Coral reef', eyebrow: 'Habitat', factsNoun: 'reef',
  summary: 'Coral looks like rock, but it is made of tiny animals.',
  meta: ['Habitat'], stats: [{ label: 'Found in', value: 'Warm seas' }],
  facts: ['One.', 'Two.'], closer: ['Closer.'],
});

test('a complete discovery has no problems', () => {
  assert.deepEqual(validateDiscovery(complete()), []);
});

test('missing name, too few facts and a stat without a value are reported', () => {
  const discovery = { ...complete(), name: '', facts: ['Only one.'], stats: [{ label: 'Depth' }] };
  const problems = validateDiscovery(discovery).join(' ');
  for (const field of ['name', 'facts', 'stats']) assert.match(problems, new RegExp(field));
});
