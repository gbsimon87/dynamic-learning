import test from 'node:test';
import assert from 'node:assert/strict';
import { buildYear4Math, titleFor } from './questions.js';
import { TOPIC_TITLES } from './builders/fractions.js';
import { seededRng } from '../questionKinds.js';
import { year4MathCurriculum } from '../../year4MathCurriculum.js';
import { FRACTIONS_LESSONS } from '../../lessons/math/year4/fractions.js';

const TOPICS = ['equivalent', 'hundredths', 'fractionSets', 'fractionCalc', 'decimal', 'quarters', 'decimalDivide', 'decimalRound', 'decimalCompare', 'decimalProblems'];
const runs = (topic, level, seeds = 100) => Array.from({ length: seeds }, (_, s) => buildYear4Math(topic, level, seededRng(s + 1)));
const all = (topic, level) => runs(topic, level).flat();
const key = q => JSON.stringify([q.prompt, q.text, q.answer, q.visual, q.tiles?.map(t => t.label).sort(), q.items?.map(t => t.label).sort(), q.cards?.map(c => c.label).sort(), q.terms]);
const shown = q => [q.prompt, q.text, q.answer, ...(q.options ?? []), ...(q.tiles ?? []).map(t => t.label), ...(q.items ?? []).map(t => t.label), ...(q.cards ?? []).map(c => c.label), ...(q.bins ?? []).map(b => b.label)].filter(x => x !== undefined).map(String);
const kinds = (topic, level) => new Set(all(topic, level).map(q => `${q.kind}:${q.prompt.replace(/\d+(\.\d+)?/g, '#')}:${q.kind === 'sequence' ? Math.sign(q.terms[1] - q.terms[0]) : ''}`));

test('every fractions topic has four short titles ending in a full stop, and they reach the game', () => {
  for (const topic of TOPICS) {
    assert.equal(TOPIC_TITLES[topic].length, 4, topic);
    TOPIC_TITLES[topic].forEach((title, i) => {
      assert.match(title, /\.$/, title);
      assert.ok(title.split(/\s+/).length <= 6, title);
      assert.equal(titleFor(topic, i + 1), title);
    });
  }
});

test('each lesson title matches its challenge title without the full stop', () => {
  const category = year4MathCurriculum.find(c => c.id === 'number---fractions-including-decimals');
  for (const topic of category.topics) {
    assert.deepEqual(FRACTIONS_LESSONS[topic.id].map(l => l.title), TOPIC_TITLES[topic.builder].map(t => t.slice(0, -1)), topic.id);
  }
});

test('no question repeats inside a run, and runs vary between attempts', () => {
  for (const topic of TOPICS) for (let level = 1; level <= 4; level++) {
    const keys = runs(topic, level).map(run => run.map(key));
    for (const run of keys) assert.equal(new Set(run).size, run.length, `${topic} L${level}: ${run.join('\n')}`);
    assert.ok(new Set(keys.map(k => [...k].sort().join())).size > 20, `${topic} L${level} varies`);
  }
});

test('the four levels never set the same task', () => {
  // fractionSets L1/L2 share a sentence but not a task: unit fractions, then non-unit ones.
  assert.ok(all('fractionSets', 1).every(q => /What is 1\//.test(q.prompt)));
  assert.ok(all('fractionSets', 2).every(q => !/What is 1\//.test(q.prompt)));
  // decimal L1 is tenths only; L2 is hundredths only.
  assert.ok(all('decimal', 1).every(q => !/\/100|hundredth/.test(q.prompt)));
  assert.ok(all('decimal', 2).every(q => /\/100 |hundredths?\?/.test(q.prompt)));
  for (const topic of TOPICS) for (let a = 1; a <= 4; a++) for (let b = a + 1; b <= 4; b++) {
    if ((topic === 'fractionSets' || topic === 'decimal') && a === 1 && b === 2) continue;
    const shared = [...kinds(topic, a)].filter(k => kinds(topic, b).has(k));
    assert.deepEqual(shared, [], `${topic} L${a} and L${b}`);
  }
});

test('level 1 states its rule; choice questions have exactly one correct option', () => {
  for (const topic of TOPICS) {
    assert.ok(all(topic, 1).every(q => q.rule || q.kind === 'sequence'), topic);
    for (let level = 1; level <= 4; level++) for (const q of all(topic, level)) {
      if (q.kind === 'choice') assert.equal(q.options.filter(o => o === q.answer).length, 1, q.prompt);
    }
  }
});

test('decimals are written without trailing zeros (0.5, 0.3), except money', () => {
  for (const topic of TOPICS) for (let level = 1; level <= 4; level++) for (const q of all(topic, level)) {
    for (const text of shown(q)) {
      const stripped = text.replace(/£\d+\.\d\d/g, '');
      assert.doesNotMatch(stripped, /\d\.\d*0(?!\d)/, `${topic} L${level}: ${text}`);
    }
  }
  assert.ok(all('decimal', 1).every(q => /^0\.\d$/.test(q.answer)));
  assert.ok(all('quarters', 1).some(q => q.answer === '0.5'));
});

test('equivalent: L2 finds a missing numerator or denominator, L4 is a matching story', () => {
  const l2 = all('equivalent', 2);
  assert.ok(l2.every(q => q.kind === 'number' && !q.rule));
  assert.ok(l2.some(q => /missing numerator/.test(q.prompt)) && l2.some(q => /missing denominator/.test(q.prompt)));
  for (const q of l2) {
    const [n, d, a, b] = q.prompt.match(/(\d+)\/(\d+) = (\d+|\?)\/(\d+|\?)/).slice(1);
    assert.equal(a === '?' ? Number(n) * Number(b) / Number(d) : Number(d) * Number(a) / Number(n), q.answer);
  }
  for (const q of all('equivalent', 4)) {
    const [, n, d, parts] = q.prompt.match(/(\d+)\/(\d+) of .* has (\d+) equal/);
    assert.equal(q.answer, Number(n) * Number(parts) / Number(d));
  }
});

test('fractionSets L3 keeps brackets as their own tiles', () => {
  for (const q of all('fractionSets', 3)) {
    const labels = q.tiles.map(t => t.label);
    assert.ok(labels.includes('(') && labels.includes(')'));
    assert.ok(labels.every(l => l.length === 1 || /^\d+$/.test(l)), labels.join(' '));
  }
});

test('fractionCalc: L2 finds a missing fraction, L4 answers a whole fraction within one whole', () => {
  assert.ok(all('fractionCalc', 2).every(q => /missing fraction/.test(q.prompt) && !q.rule));
  for (const q of all('fractionCalc', 4)) {
    assert.equal(q.kind, 'choice');
    const [n, d] = q.answer.split('/').map(Number);
    assert.ok(n >= 1 && n <= d, q.answer);
    assert.ok(q.options.every(o => /^\d+\/\d+$/.test(o) && o.endsWith(`/${d}`)));
    assert.doesNotMatch(q.prompt, /numerator/);
  }
});

test('decimal: L1 tenths with one decimal place, L2 hundredths in two representations', () => {
  for (const q of all('decimal', 1)) assert.match(q.prompt, /\/10 | tenths? /);
  const l2 = all('decimal', 2);
  assert.ok(l2.some(q => /tenths? and \d hundredths?/.test(q.prompt)) && l2.some(q => /\/100 as/.test(q.prompt)));
  assert.ok(l2.filter(q => / 1 (tenths|hundredths)/.test(q.prompt)).length === 0, 'singular for 1');
});

test('quarters: L1 and L2 vary beyond three questions and use money, measures and mixed numbers', () => {
  for (const level of [1, 2]) assert.ok(new Set(all('quarters', level).map(q => q.prompt)).size > 10, `L${level}`);
  const l2 = all('quarters', 2).map(q => q.prompt).join('\n');
  for (const word of ['£1', ' m long', ' kg', 'Which is the same as']) assert.ok(l2.includes(word), word);
  assert.ok(all('quarters', 2).some(q => /^\d \d\/4$|^\d\.\d+$/.test(q.answer) && /\d\.\d/.test(q.answer + q.prompt)));
});

test('decimalDivide: L2 always asks a digit value, L3 order needs the division', () => {
  for (const q of all('decimalDivide', 2)) {
    const [, a, divisor, result, digit] = q.prompt.match(/^(\d+) ÷ (\d+) = ([\d.]+)\. What is the value of the (\d) in ([\d.]+)\?$/);
    assert.equal(Number(result), Number(a) / Number(divisor));
    assert.notEqual(digit, '0');
    assert.ok(!result.startsWith('0.') || Number(divisor) === 100);
    const [whole, frac = ''] = result.split('.');
    const place = whole.indexOf(digit) >= 0 && whole !== '0' ? 1 : frac[0] === digit ? 0.1 : 0.01;
    assert.equal(Number(q.answer), Number((Number(digit) * place).toFixed(2)));
  }
  for (const q of all('decimalDivide', 3)) {
    const parse = l => l.split(' ÷ ').map(Number);
    const byStart = [...q.items].sort((x, y) => parse(x.label)[0] - parse(y.label)[0]).map(i => i.id);
    const byValue = [...q.items].sort((x, y) => parse(x.label)[0] / parse(x.label)[1] - parse(y.label)[0] / parse(y.label)[1]).map(i => i.id);
    assert.deepEqual(byValue, q.answer);
    assert.notDeepEqual(byStart, q.answer, 'ordering the starting numbers must not give the answer');
    assert.ok(q.items.some(i => i.label.endsWith('÷ 10')) && q.items.some(i => i.label.endsWith('÷ 100')));
  }
});

test('decimalRound and decimalCompare: L2 is a different reasoning step from L1', () => {
  for (const q of all('decimalRound', 2)) {
    const k = Number(q.prompt.match(/rounds to (\d+)/)[1]);
    assert.equal(q.options.filter(o => Math.round(Number(o)) === k).length, 1, q.prompt);
  }
  for (const q of all('decimalCompare', 2)) {
    const [, a, b] = q.prompt.match(/makes ([\d.]+) ___ (\d+)\/100/);
    const x = Math.round(Number(a) * 100), y = Number(b);
    assert.equal(q.answer, x < y ? '<' : x > y ? '>' : '=');
  }
});

test('decimalProblems: each level has its own focus and L4 is two-step with real decimals', () => {
  assert.ok(all('decimalProblems', 1).every(q => /change/.test(q.prompt) && !/ and a /.test(q.prompt)));
  assert.ok(all('decimalProblems', 2).every(q => /(Half|quarter) of it/.test(q.prompt)));
  for (const q of all('decimalProblems', 2)) {
    const cm = Math.round(Number(q.prompt.match(/(\d+\.\d+) m/)[1]) * 100);
    assert.notEqual(cm % 10, 0);
    assert.equal(q.answer, /quarter/.test(q.prompt) ? cm / 4 : cm / 2);
  }
  assert.ok(all('decimalProblems', 3).every(q => q.tiles.some(t => t.label === '+') && /total/.test(q.prompt)));
  for (const q of all('decimalProblems', 4)) {
    const amounts = [...q.prompt.matchAll(/(\d+)\.(\d\d)/g)];
    assert.equal(amounts.length, 2, q.prompt);
    assert.ok(amounts.every(m => m[2] !== '00'), q.prompt);
    if (/ribbon/.test(q.prompt)) assert.ok(amounts.every(m => !m[2].endsWith('0')), q.prompt);
  }
});
