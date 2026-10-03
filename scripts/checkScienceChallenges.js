// Run: node scripts/checkScienceChallenges.js
// Read-only Vite SSR checks; no browser, storage, profile or API access.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
const root = fileURLToPath(new URL('../', import.meta.url));
const reportDir = await fs.mkdtemp(path.join(tmpdir(), 'science-render-review-'));
const serverOptions = { root, server: { middlewareMode: true, ws: false, hmr: false }, appType: 'custom' };

// Load real wrappers and the actual Vite glob before installing any fixtures.
let initialRenders = 0;
const liveServer = await createServer(serverOptions);
try {
  const { year3ScienceCurriculum: curriculum } = await liveServer.ssrLoadModule('/src/data/year3ScienceCurriculum.js');
  const { isChallengeImplemented } = await liveServer.ssrLoadModule('/src/data/challengeAvailability.js');
  for (const category of curriculum) for (const topic of category.topics) for (let level = 1; level <= 4; level++) {
    assert.equal(isChallengeImplemented('science', 3, topic.id, level), true);
    const pascal = topic.id.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
    const { default: Wrapper } = await liveServer.ssrLoadModule(`/src/pages/skills/science/challenges/year3/${topic.id}/${pascal}Challenge${level}.jsx`);
    const html = renderToStaticMarkup(React.createElement(Wrapper, { onComplete: () => { throw new Error('Premature completion'); } }));
    assert.match(html, /challenge-container/); assert.match(html, /challenge-feedback/);
    assert.doesNotMatch(html, /NaN|undefined|\[object Object\]/);
    initialRenders++;
  }
  assert.equal(initialRenders, 84);
  const { default: InformationCard } = await liveServer.ssrLoadModule('/src/components/challenge/ScienceInformationCard.jsx');
  const escaped = renderToStaticMarkup(React.createElement(InformationCard, { title: '<script>alert(1)</script>', text: '<img src=x onerror=alert(1)>', sourceLabel: '<iframe src=javascript:alert(1)>' }));
  assert.match(escaped, /&lt;script&gt;/); assert.match(escaped, /&lt;img/); assert.match(escaped, /&lt;iframe/);
  assert.doesNotMatch(escaped, /<(?:script|img|iframe)\b/);
} finally { await liveServer.close(); }
// A read-only SSR fixture: real reducers prepare legitimate intermediate states;
// the rendering plugin injects them into hooks. This is not browser interaction.
let phase = 'prediction', observationIndex = 0, renders = 0, stagedRounds = 0;
globalThis.__scienceReviewState = (question, initial, reduce) => {
  let state = initial();
  const act = (type, extra = {}) => { state = reduce(state, { type, ...extra, revision: state.revision, version: state.version }); };
  const growth = initial.name === 'initialGrowthInvestigation';
  if (state.stage === 'plan') {
    if (phase === 'plan') return state;
    act('plan', { value: question.fairAnswer }); act('checkPlan');
    assert.equal(state.stage, 'prediction');
  }
  if (phase === 'prediction') return state;
  act('predict', { value: question.predictionOptions[0] }); act('start');
  if (state.stage === 'setup') {
    if (phase === 'setup') return state;
    const setup = growth ? Object.fromEntries(question.cards.map(c => [c.id, c.id === question.factor ? 'change' : 'keep'])) : question.setupExpected;
    for (const [id, bin] of Object.entries(setup)) act(growth ? 'place' : 'setup', { id, bin });
    act('checkSetup');
  }
  assert.equal(state.stage, 'observe');
  if (phase === 'setup') return state;
  const until = phase === 'observe' ? Math.min(observationIndex, question.stages.length - 1) : question.stages.length - 1;
  for (let next = 1; next <= until; next++) {
    act(growth ? 'nextObservation' : 'next');
    assert.equal(state.observation, next, 'Observation transition must advance exactly once');
  }
  if (phase === 'observe') { stagedRounds++; return state; }
  act('recordStage'); assert.equal(state.stage, 'record');
  if (phase === 'record') { stagedRounds++; return state; }
  const expected = growth ? Object.fromEntries(Object.entries(question.stages.at(-1).heights).map(([id, height]) => [id, String(height)])) : initial.name === 'initialWaterInvestigation' ? Object.fromEntries(question.recordCards.map(c => [c.id, question.stages.at(-1).marks.includes(c.id) ? 'seen' : 'not-seen'])) : question.recordExpected;
  for (const [id, value] of Object.entries(expected)) act('record', { id, value, bin: value });
  act('checkRecord'); assert.equal(state.stage, 'conclusion'); stagedRounds++;
  return state;
};
const injection = {
  useProcessEnquiry: 'initialProcessEnquiry, (s, a) => reduceProcessEnquiry(s, a, question, validateRecord)',
  useRocksEnquiry: 'initialRocksEnquiry, (s, a) => reduceRocksEnquiry(s, a, question)',
  useShadowEnquiry: 'initialShadowEnquiry, (s, a) => reduceShadowEnquiry(s, a, question)',
  useForcesEnquiry: 'initialForcesEnquiry, (s, a) => reduceForcesEnquiry(s, a, question, validateRecord, validateSetup)',
  WhatPlantsNeedToGrowGame: 'initialGrowthInvestigation, (s, a) => reduceGrowthInvestigation(s, a, question)',
  WaterTransportInPlantsGame: 'initialWaterInvestigation, (s, a) => reduceWaterInvestigation(s, a, question)',
};
const server = await createServer({ ...serverOptions, plugins: [{ name: 'science-review-fixture', enforce: 'pre', transform(code, id) {
  if (id.endsWith('/ChallengeShell.jsx')) return `import React from 'react'; export default function ReviewShell({ title, questions, render }) { return <div className="challenge-container"><h3>{title}</h3>{questions.map((question, index) => <section key={index}>{render({ question, index, submit: () => { throw new Error('Premature completion'); }, locked: globalThis.__scienceReviewLocked, misses: 2 })}</section>)}</div>; }`;
  for (const [name, factory] of Object.entries(injection)) if (id.endsWith(`/${name}.jsx`) || id.endsWith(`/${name}.js`)) return code.replace(/useState\((initial\w+)\)/, `useState(() => globalThis.__scienceReviewState(question, ${factory}))`);
} }] });
const errors = [], evidence = [];
const originalRandom = Math.random;
try {
  const { year3ScienceCurriculum: curriculum } = await server.ssrLoadModule('/src/data/year3ScienceCurriculum.js');
  for (const category of curriculum) for (const topic of category.topics) {
    const pascal = topic.id.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
    for (let level = 1; level <= 4; level++) {
      const { default: Wrapper } = await server.ssrLoadModule(`/src/pages/skills/science/challenges/year3/${topic.id}/${pascal}Challenge${level}.jsx`);
      for (let seed = 1; seed <= 15; seed++) for (const locked of [false, true]) {
        const phases = level === 4 ? [['prediction', 0], ['setup', 0], ['observe', 0], ['observe', 1], ['observe', 2], ['observe', 3], ['record', 0], ['conclusion', 0]] : [['prediction', 0]];
        if (level === 4 && topic.id === 'comparing-and-grouping-rocks') phases.unshift(['plan', 0]);
        for (const [requestedPhase, index] of phases) {
          phase = requestedPhase; observationIndex = index; globalThis.__scienceReviewLocked = locked;
          let value = seed; Math.random = () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
          try {
            const html = renderToStaticMarkup(React.createElement(Wrapper, { onComplete: () => { throw new Error('Premature completion'); } }));
            assert.match(html, /challenge-container/); assert.doesNotMatch(html, /NaN|undefined|\[object Object\]/);
            if (locked) assert.equal((html.match(/<button\b[^>]*>/g) ?? []).filter(tag => !/disabled=""/.test(tag)).length, 0, 'Every answer control must be disabled while the shell is locked');
            if (seed === 1 && !locked) evidence.push(`<section><h2>${topic.name} C${level} ${phase} ${index}</h2>${html}</section>`);
            renders++;
          } catch (e) { errors.push(`${topic.id} C${level} ${phase}/${index} seed ${seed} locked ${locked}: ${e.stack}`); }
        }
      }
    }
  }
  await fs.writeFile(path.join(reportDir, 'stages.html'), `<!doctype html><html><body>${evidence.join('')}</body></html>`);
  await fs.writeFile(path.join(reportDir, 'errors.log'), errors.join('\n\n'));
  console.log(JSON.stringify({ initialRenders, renders, stagedRounds, failures: errors.length, reportDir, errors: errors.slice(0, 3) }));
  if (errors.length) process.exitCode = 1;
} finally { Math.random = originalRandom; delete globalThis.__scienceReviewState; delete globalThis.__scienceReviewLocked; await server.close(); }
