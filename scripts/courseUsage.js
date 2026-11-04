import { parseArgs } from 'node:util';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import path from 'node:path';
import { REPO_ROOT } from './curriculum/topics.js';
import { readTimer, timerReport, formatDuration } from './curriculum/buildTimer.js';
import { countUsage, discoverSession, sessionFiles, writeUsage } from './curriculum/buildUsage.js';

try {
  const { values } = parseArgs({ options: {
    timer: { type: 'string' }, branch: { type: 'string' }, session: { type: 'string', multiple: true },
    record: { type: 'string' }, topics: { type: 'string' }, write: { type: 'boolean' }, help: { type: 'boolean', short: 'h' },
  } });
  if (values.help) console.log('Usage: npm run course:usage -- --timer ID [--branch BRANCH] [--session coordinator.jsonl (repeatable)] [--record docs/superpowers/DATE-course-build.md --topics N --write]\nClaude Code logs only. Default discovers one matching project session and its subagents. Read-only JSON unless --write; writing requires a stopped timer and verified topic count.');
  else {
    const timer = readTimer(REPO_ROOT, values.timer);
    if (timer.status === 'running') throw new Error('Pause or stop the timer before collecting usage.');
    if (values.write && timer.status !== 'finished') throw new Error('--write requires a stopped timer; pilot snapshots must not become finished-build measurements.');
    const branch = values.branch ?? execFileSync('git', ['branch', '--show-current'], { cwd: REPO_ROOT, encoding: 'utf8' }).trim();
    const start = timer.startedAt, end = timer.finishedAt ?? timer.updatedAt;
    const projectDirectory = path.join(homedir(), '.claude/projects', REPO_ROOT.replace(/\/$/, '').replace(/[^a-zA-Z0-9-]/g, '-'));
    const sessions = values.session ?? [await discoverSession({ projectDirectory, branch, start, end })];
    const files = [...new Map(sessions.flatMap(session => sessionFiles(path.resolve(session))).map(f => [f.file, f])).values()];
    const report = await countUsage({ files, branch, start, end });
    if (!report.messages) throw new Error('No matching logged messages. Record usage as unknown; do not use zero.');
    if (values.write) writeUsage({ root: REPO_ROOT, record: values.record, report, topics: Number(values.topics), workTime: formatDuration(timerReport(timer).recordedWorkMs) });
    console.log(JSON.stringify(report, null, 2));
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }
