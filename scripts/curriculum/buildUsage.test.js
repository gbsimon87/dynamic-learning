import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { countUsage, discoverSession, sessionFiles, writeUsage } from './buildUsage.js';

const start = '2026-11-04T00:00:00.000Z', end = '2026-11-04T01:00:00.000Z', branch = 'feat/year6-math';
const usage = { input_tokens: 2, cache_creation_input_tokens: 10, cache_read_input_tokens: 100, output_tokens: 20 };
const entry = (id, extra = {}, counters = usage) => ({ timestamp: '2026-11-04T00:20:00Z', gitBranch: branch, message: { id, model: 'model-a', usage: counters }, ...extra });
function fixture(t) {
  const root = mkdtempSync(path.join(tmpdir(), 'bix-usage-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const put = (name, rows) => {
    const file = path.join(root, name); mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, typeof rows === 'string' ? rows : rows.map(row => JSON.stringify(row)).join('\n') + '\n');
    return file;
  };
  return { root, put };
}
const reportFor = (files, extra = {}) => countUsage({ files, branch, start, end, ...extra });

test('deduplicates cumulative snapshots globally, including copies across parent/agent files', async t => {
  const { put } = fixture(t);
  const main = put('main.jsonl', [entry('a', {}, { ...usage, output_tokens: 4 }), entry('a'), entry('b')]);
  const agent = put('main/subagents/agent.jsonl', [entry('a'), entry('c', { message: { id: 'c', model: 'model-b', usage } })]);
  const report = await reportFor([{ file: main, source: 'main.jsonl', role: 'coordinator' }, { file: agent, source: 'agent.jsonl', role: 'subagent' }]);
  assert.equal(report.usageRows, 5);
  assert.equal(report.messages, 3);
  assert.equal(report.duplicateRows, 2);
  assert.deepEqual(report.totals, { input: 6, cache_write: 30, cache_read: 300, output: 60 });
  assert.deepEqual(report.rows.map(r => [r.model, r.role, r.messages]), [['model-a', 'coordinator', 2], ['model-b', 'subagent', 1]]);
});

test('filters by branch and exact timer window; includes both explicitly supplied resumed sessions', async t => {
  const { put } = fixture(t);
  const a = put('a.jsonl', [entry('before', { timestamp: '2026-11-03T23:59:59Z' }), entry('other', { gitBranch: 'dev' }), entry('first')]);
  const b = put('b.jsonl', [entry('resumed'), entry('later', { timestamp: '2026-11-04T01:00:01Z' }), { type: 'user' }]);
  const report = await reportFor([a,b].map(file => ({ file, source: path.basename(file), role: 'coordinator' })));
  assert.equal(report.messages, 2);
  assert.equal(report.totals.output, 40);
});

test('missing fields remain unknown, explicit zero remains zero, empty logs never imply zero usage', async t => {
  const { put } = fixture(t);
  const file = put('a.jsonl', [entry('a', {}, { input_tokens: 0, output_tokens: 3 })]);
  const report = await reportFor([{ file, role: 'coordinator', source: 'a.jsonl' }]);
  assert.deepEqual(report.totals, { input: 0, cache_write: null, cache_read: null, output: 3 });
  const empty = await reportFor([{ file, role: 'coordinator', source: 'a.jsonl' }], { branch: 'missing' });
  assert.equal(empty.messages, 0);
  assert.equal(empty.totals.output, null);
});

test('invalid logs/counters/IDs fail without printing conversation content', async t => {
  const { put } = fixture(t);
  for (const [name, data, pattern] of [
    ['bad.jsonl', '{"private conversation', /Invalid JSON in bad.jsonl:1/],
    ['id.jsonl', [entry('')], /message ID/],
    ['counter.jsonl', [entry('a', {}, { ...usage, output_tokens: -1 })], /Invalid output_tokens/],
    ['clock.jsonl', [entry('a', { timestamp: undefined })], /timestamp/],
  ]) {
    const file = put(name, data);
    await assert.rejects(reportFor([{ file, role: 'coordinator', source: name }]), pattern);
  }
});

test('discovers exactly one matching root and its agents, rejects ambiguous or missing sessions', async t => {
  const { root, put } = fixture(t);
  put('one.jsonl', [entry('a')]);
  put('one/subagents/agent.jsonl', [entry('b')]);
  put('unrelated.jsonl', [entry('other', { gitBranch: 'dev' })]);
  const found = await discoverSession({ projectDirectory: root, branch, start, end });
  assert.equal(path.basename(found), 'one.jsonl');
  assert.equal(sessionFiles(found).length, 2);
  put('second.jsonl', [entry('c')]);
  await assert.rejects(discoverSession({ projectDirectory: root, branch, start, end }), /2 matching/);
  await assert.rejects(discoverSession({ projectDirectory: root, branch: 'missing', start, end }), /0 matching/);
});

test('writes a summary and one measured-build row idempotently, preserving prior records', async t => {
  const { root, put } = fixture(t);
  const log = put('one.jsonl', [entry('a')]);
  const report = await reportFor(sessionFiles(log));
  const record = 'docs/superpowers/2026-11-04-year6-math-course-build.md';
  put(record, '# Course build: Year 6 Maths\n\nOwner feedback stays here.\n');
  put('docs/BUILD_MEASUREMENT.md', '# Measurements\n\n| Build | Tool and models | Topics | Work time | Messages | Input | Cache write | Cache read | Output | Record |\n|---|---|---:|---:|---:|---:|---:|---:|---:|---|\n| Existing | Tool | 1 | 1m | 1 | 1 | 1 | 1 | 1 | prior |\n');
  const args = { root, record, report, topics: 4, workTime: '0h 10m 0s' };
  writeUsage(args);
  const first = readFileSync(path.join(root, record), 'utf8');
  writeUsage(args);
  assert.equal(readFileSync(path.join(root, record), 'utf8'), first);
  assert.ok(first.includes('Owner feedback stays here.'));
  assert.ok(first.includes('one.jsonl'));
  const table = readFileSync(path.join(root, 'docs/BUILD_MEASUREMENT.md'), 'utf8');
  assert.equal(table.split('\n').filter(line => line.includes('[course record]')).length, 1);
  assert.ok(table.includes('| Existing |'));
  assert.throws(() => writeUsage({ ...args, topics: 0 }), /verified topic/);
  assert.throws(() => writeUsage({ ...args, record: '../escape.md' }), /course record/);
});

test('bad table or partial markers never modify either existing document', async t => {
  const { root, put } = fixture(t);
  const log = put('one.jsonl', [entry('a')]);
  const report = await reportFor(sessionFiles(log));
  const record = 'docs/superpowers/2026-11-04-course-build.md';
  const file = put(record, '# Course\n');
  put('docs/BUILD_MEASUREMENT.md', 'No table');
  assert.throws(() => writeUsage({ root, record, report, topics: 4 }), /table not found/);
  assert.equal(readFileSync(file, 'utf8'), '# Course\n');
  put(record, '# Course\n<!-- course-usage:start -->');
  assert.throws(() => writeUsage({ root, record, report, topics: 4 }), /Incomplete usage markers/);
});
