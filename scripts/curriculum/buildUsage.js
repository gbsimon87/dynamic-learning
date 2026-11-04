/** Read Claude Code counters without loading conversation contents into the agent context. */
import { createReadStream, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import path from 'node:path';
import { repoPath } from './topics.js';

export const COUNTERS = {
  input: 'input_tokens', cache_write: 'cache_creation_input_tokens',
  cache_read: 'cache_read_input_tokens', output: 'output_tokens',
};
const empty = () => Object.fromEntries(Object.keys(COUNTERS).map(key => [key, null]));
const sum = rows => Object.fromEntries(Object.keys(COUNTERS).map(key => [key,
  rows.some(row => row[key] === null) ? null : rows.reduce((total, row) => total + row[key], 0),
]));

export function sessionFiles(session) {
  if (!session.endsWith('.jsonl') || !existsSync(session)) throw new Error('Session must be an existing coordinator .jsonl file.');
  const directory = session.slice(0, -6) + '/subagents';
  return [{ file: session, role: 'coordinator', source: path.basename(session) },
    ...(existsSync(directory) ? readdirSync(directory).filter(name => name.endsWith('.jsonl')).sort().map(name => ({
      file: path.join(directory, name), role: 'subagent', source: `${path.basename(session, '.jsonl')}/subagents/${name}`,
    })) : [])];
}

export async function countUsage({ files, branch, start, end }) {
  const from = Date.parse(start), to = Date.parse(end);
  if (!branch || !Number.isFinite(from) || !Number.isFinite(to) || to < from) throw new Error('A branch and valid start/end timestamps are required.');
  const messages = new Map();
  let usageRows = 0;
  for (const { file, role, source } of files) {
    const input = createReadStream(file, { encoding: 'utf8' });
    const lines = createInterface({ input, crlfDelay: Infinity });
    let lineNumber = 0;
    try {
      for await (const line of lines) {
        lineNumber++;
        if (!line.trim()) continue;
        let row;
        try { row = JSON.parse(line); }
        catch { throw new Error(`Invalid JSON in ${source}:${lineNumber}; retry after log flushing. No totals written.`); }
        const usage = row.message?.usage;
        if (!usage || row.gitBranch !== branch) continue;
        if (typeof usage !== 'object' || Array.isArray(usage)) throw new Error(`Invalid usage object in ${source}:${lineNumber}.`);
        const at = Date.parse(row.timestamp);
        if (!Number.isFinite(at)) throw new Error(`Usage row lacks a timestamp in ${source}:${lineNumber}.`);
        if (at < from || at > to) continue;
        if (typeof row.message.id !== 'string' || !row.message.id) throw new Error(`Usage row lacks a message ID in ${source}:${lineNumber}.`);
        usageRows++;
        const id = row.message.id, model = row.message.model ?? 'unknown';
        const previous = messages.get(id);
        if (previous && previous.model !== model) throw new Error(`Conflicting model for one message in ${source}.`);
        const message = previous ?? { id, model, role, ...empty() };
        // Logs can contain repeated/cumulative streaming snapshots of one reply.
        // Retain the largest observed value of each counter, once per global ID.
        for (const [key, field] of Object.entries(COUNTERS)) if (usage[field] !== undefined && usage[field] !== null) {
          if (!Number.isSafeInteger(usage[field]) || usage[field] < 0) throw new Error(`Invalid ${field} in ${source}:${lineNumber}.`);
          message[key] = Math.max(message[key] ?? 0, usage[field]);
        }
        if (role === 'coordinator') message.role = role;
        messages.set(id, message);
      }
    } finally { lines.close(); input.destroy(); }
  }
  const groups = new Map();
  for (const message of messages.values()) {
    const key = `${message.model}/${message.role}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(message);
  }
  const rows = [...groups.values()].map(list => ({ model: list[0].model, role: list[0].role, messages: list.length, ...sum(list) }));
  return {
    tool: 'Claude Code', branch, start, end, sources: [...new Set(files.map(f => f.source))],
    usageRows, messages: messages.size, duplicateRows: usageRows - messages.size, rows,
    totals: messages.size ? sum([...messages.values()]) : empty(),
    scope: 'Branch-filtered usage entries within the timer start/end window; global message-ID deduplication; per-counter maximum snapshot. Missing counters are unknown. No cost inferred.',
    limitations: ['Only messages flushed to these logs by collection time are included.',
      'Messages before timer start, final reporting after timer stop, and unlogged activity are excluded.',
      'The outer timer window includes pauses; separate unrelated work onto another branch/session.'],
  };
}

export async function discoverSession({ projectDirectory, branch, start, end }) {
  if (!existsSync(projectDirectory)) throw new Error('No Claude Code project logs found. Use --session PATH or record usage as unknown for this tool.');
  const matches = [];
  for (const name of readdirSync(projectDirectory).filter(name => name.endsWith('.jsonl')).sort()) {
    const session = path.join(projectDirectory, name);
    if (statSync(session).mtimeMs < Date.parse(start)) continue;
    const report = await countUsage({ files: sessionFiles(session), branch, start, end });
    if (report.messages) matches.push(session);
  }
  if (matches.length !== 1) throw new Error(`Found ${matches.length} matching coordinator sessions. Supply --session PATH once per build session; do not guess or sum unrelated sessions.`);
  return matches[0];
}

const cell = value => String(value ?? 'unknown').replace(/[|\r\n]/g, ' ');
const display = value => value === null ? 'unknown' : value.toLocaleString('en-GB');
export function usageMarkdown(report) {
  return [
    '## Recorded token usage', '',
    `Tool: ${report.tool}. Branch: \`${cell(report.branch)}\`.`,
    `Window: ${report.start} to ${report.end} (UTC).`,
    `Source files: ${report.sources.map(source => `\`${cell(source)}\``).join(', ')}.`,
    `Counting: ${report.usageRows} usage rows → ${report.messages} unique messages; ${report.duplicateRows} duplicate rows removed.`,
    report.scope, '',
    '| Model | Role | Messages | Input | Cache write | Cache read | Output |',
    '|---|---|---:|---:|---:|---:|---:|',
    ...report.rows.map(row => `| ${cell(row.model)} | ${cell(row.role)} | ${row.messages} | ${Object.keys(COUNTERS).map(key => display(row[key])).join(' | ')} |`),
    `| **Total** | | **${report.messages}** | ${Object.keys(COUNTERS).map(key => display(report.totals[key])).join(' | ')} |`, '',
    ...report.limitations.map(note => `- ${note}`),
    '- Raw field values are kept separate; input/cache counters are not converted into costs or compared across tools.',
  ].join('\n');
}

export function writeUsage({ root, record, report, topics, workTime }) {
  if (!Number.isSafeInteger(topics) || topics < 1 || !report.messages) throw new Error('Writing requires a positive verified topic count and at least one logged message.');
  if (!/^docs\/superpowers\/[a-z0-9-]+\.md$/.test(record)) throw new Error('--record must name an existing docs/superpowers/*.md course record.');
  const recordPath = repoPath(root, record), tablePath = repoPath(root, 'docs/BUILD_MEASUREMENT.md');
  const start = '<!-- course-usage:start -->', end = '<!-- course-usage:end -->';
  let text = readFileSync(recordPath, 'utf8');
  const block = `${start}\n${usageMarkdown(report)}\n${end}`;
  if (text.includes(start) !== text.includes(end)) throw new Error('Incomplete usage markers; existing record was not changed.');
  text = text.includes(start) ? text.slice(0, text.indexOf(start)) + block + text.slice(text.indexOf(end) + end.length) : text.trimEnd() + '\n\n' + block + '\n';
  const link = `[course record](${record.replace(/^docs\//, '')})`;
  const label = readFileSync(recordPath, 'utf8').split('\n')[0].replace(/^# (?:Course build: )?/, '');
  const totals = Object.keys(COUNTERS).map(key => display(report.totals[key]));
  const row = `| ${cell(label)} | Claude Code: ${[...new Set(report.rows.map(r => cell(r.model)))].join(', ')} | ${topics} | ${workTime} | ${report.messages} | ${totals.join(' | ')} | ${link} |`;
  const table = readFileSync(tablePath, 'utf8').split('\n');
  const index = table.findIndex(line => line.startsWith('|') && line.includes(link));
  if (index >= 0) table[index] = row;
  else {
    const header = table.findIndex(line => line.startsWith('| Build | Tool and models |'));
    if (header < 0 || !table[header + 1]?.startsWith('|---')) throw new Error('Measured builds table not found; no files changed.');
    let at = header + 2;
    while (table[at]?.startsWith('|')) at++;
    table.splice(at, 0, row);
  }
  writeFileSync(recordPath, text);
  writeFileSync(tablePath, table.join('\n'));
}
