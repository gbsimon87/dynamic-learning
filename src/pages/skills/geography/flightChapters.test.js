import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTER_SIZE, HELP_ENGINE_SECONDS, HELP_HINT_SECONDS, createChapterRound, flightChapters, flightRoundReducer, helpProgress, shuffledOptions } from './flightClues.js';

const seeded = (seed = 7) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const clue = (id, extra = {}) => ({ id, target: id.toUpperCase(), clue: `Find ${id}`, hint: `Hint ${id}`, fact: `Fact ${id}`, ...extra });
const QUESTION = { text: 'Big or small?', options: ['Big', 'Small'], answer: 'Big', why: 'It is big.' };

test('a system without chapters gets parts of about five clues, in order', () => {
  const clues = Array.from({ length: 12 }, (_, i) => clue(`c${i}`));
  const chapters = flightChapters({ clues });
  assert.deepEqual(chapters.map(c => c.name), ['Part 1', 'Part 2', 'Part 3']);
  assert.deepEqual(chapters.map(c => c.clueIds.length), [5, 5, 2]);
  assert.deepEqual(chapters.flatMap(c => c.clueIds), clues.map(c => c.id));
  const named = [{ id: 'rocky', name: 'Rocky', icon: '🪨', promise: 'Rocks', clueIds: ['c0'] }];
  assert.equal(flightChapters({ clues, chapters: named }), named);
});

test('a chapter round picks about five finds; a two-step clue counts as two and expands into steps', () => {
  const clues = [clue('a', { then: clue('a2') }), clue('b'), clue('c'), clue('d'), clue('e'), clue('f'), clue('g')];
  const chapter = { id: 'x', name: 'X', clueIds: clues.map(c => c.id) };
  for (let i = 0; i < 50; i++) {
    const round = createChapterRound(chapter, clues, seeded(i + 1));
    assert.equal(round.chapterId, 'x');
    assert.ok(round.deck.length >= CHAPTER_SIZE && round.deck.length <= CHAPTER_SIZE + 1, `${round.deck.length}`);
    const a = round.deck.findIndex(s => s.id === 'a');
    if (a >= 0) {
      assert.equal(round.deck[a + 1].id, 'a2', 'the second step follows its first');
      assert.equal(round.deck[a + 1].stepOf, 'a');
      assert.equal(round.deck[a].continues, true);
    }
    assert.equal(new Set(round.deck.map(s => s.id)).size, round.deck.length);
  }
});

test('a short chapter plays every clue it has', () => {
  const clues = [clue('a'), clue('b')];
  const round = createChapterRound({ id: 'p', clueIds: ['a', 'b'] }, clues, seeded());
  assert.deepEqual(round.deck.map(s => s.id).sort(), ['a', 'b']);
});

test('the last find of a chapter carries a question when any chosen clue has one', () => {
  const clues = [clue('a', { question: QUESTION }), clue('b'), clue('c'), clue('d'), clue('e')];
  for (let i = 0; i < 30; i++) {
    const round = createChapterRound({ id: 'q', clueIds: clues.map(c => c.id) }, clues, seeded(i + 3));
    assert.ok(round.deck.at(-1).question, round.deck.map(s => s.id).join());
  }
});

test('answering a question is recorded once and never changes stars', () => {
  const clues = [clue('a', { question: QUESTION })];
  let round = createChapterRound({ id: 'q', clueIds: ['a'] }, clues, seeded());
  round = flightRoundReducer(round, { type: 'arrive', token: 'a', target: 'A' });
  round = flightRoundReducer(round, { type: 'answer', stepId: 'a', choice: 'Small' });
  assert.deepEqual(round.answers, { a: 'Small' });
  assert.equal(flightRoundReducer(round, { type: 'answer', stepId: 'a', choice: 'Big' }), round, 'first answer stands');
  assert.equal(round.earned.length, 1);
  assert.equal(flightRoundReducer(round, { type: 'answer', stepId: 'nope', choice: 'Big' }), round);
});

test('help unlocks after 20 s of flying or 10 s after opening the hint', () => {
  assert.equal(HELP_ENGINE_SECONDS, 20); assert.equal(HELP_HINT_SECONDS, 10);
  assert.deepEqual(helpProgress({ engineSeconds: 0, hintSeconds: null }), { unlocked: false, share: 0 });
  assert.deepEqual(helpProgress({ engineSeconds: 10, hintSeconds: null }), { unlocked: false, share: .5 });
  assert.equal(helpProgress({ engineSeconds: 20, hintSeconds: null }).unlocked, true);
  assert.deepEqual(helpProgress({ engineSeconds: 2, hintSeconds: 5 }), { unlocked: false, share: .5 });
  assert.equal(helpProgress({ engineSeconds: 0, hintSeconds: 10 }).unlocked, true);
  assert.equal(helpProgress({ engineSeconds: 99, hintSeconds: 99 }).share, 1);
});

test('answer options shuffle but keep every option', () => {
  const orders = new Set();
  const random = seeded(11);
  for (let i = 0; i < 40; i++) {
    const options = shuffledOptions({ ...QUESTION, options: ['A', 'B', 'C'] }, random);
    assert.deepEqual([...options].sort(), ['A', 'B', 'C']);
    orders.add(options.join());
  }
  assert.ok(orders.size > 3);
});
