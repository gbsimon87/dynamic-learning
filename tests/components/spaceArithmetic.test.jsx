import React, { StrictMode } from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
const FACTS = { addition: [3, '+', 4, 7], subtraction: [9, '−', 4, 5], multiplication: [3, '×', 4, 12], division: [12, '÷', 3, 4] };
vi.mock('../../src/data/freePlay/spaceArithmeticQuestions.js', () => ({ makeSpaceQuestion: vi.fn((settings, previousKey) => {
  const operation = previousKey ? 'addition' : settings.types.at(-1);
  const [a, sign, b, answer] = previousKey ? [2, '+', 2, 4] : FACTS[operation];
  return { key: `${a} ${sign} ${b}`, prompt: `${a} ${sign} ${b} = ?`, answer, options: [answer - 1, answer + 1, answer, answer + 2], parts: { a, b, operation } };
}) }));
vi.mock('../../src/components/celebration/fx/effects.js', () => ({ playEffect: vi.fn() }));
import SpaceArithmetic from '../../src/pages/skills/math/SpaceArithmeticPanel.jsx';
import { makeSpaceQuestion } from '../../src/data/freePlay/spaceArithmeticQuestions.js';
import { SPACE_FEEDBACK_MS as FEEDBACK_MS } from '../../src/data/freePlay/spaceArithmeticConfig.js';
const click = name => fireEvent.click(screen.getByRole('button', { name, exact: true }));
let flightApi;
beforeEach(() => { vi.useFakeTimers(); flightApi = { prepareRound: vi.fn(), setState: vi.fn(), setLane: vi.fn(), setTurbo: vi.fn(), setHot: vi.fn(), setTier: vi.fn(), fire: vi.fn(() => true), setMission: vi.fn(), celebrate: vi.fn(), leave: vi.fn() }; localStorage.clear(); });
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });
function setup(ref, props = {}) { return render(<StrictMode><MemoryRouter><SpaceArithmetic ref={ref} flightApi={flightApi} {...props} /></MemoryRouter></StrictMode>); }
const lastRound = () => flightApi.prepareRound.mock.calls.at(-1);

for (const [operation, sum, correct, help] of [['Addition', '3 + 4 = ?', 7, /Start at 3\. Count on 4 more/], ['Subtraction', '9 − 4 = ?', 5, /Start at 9\. Count back 4/], ['Multiplication', '3 × 4 = ?', 12, /3 groups of 4\. Count up in 4s/], ['Division', '12 ÷ 3 = ?', 4, /How many groups of 3 make 12\?/]]) test(`${operation}: help fits the question; the flight flies straight on: wrong comes round again, right brings the next sum`, () => {
  const ref = React.createRef(); setup(ref); if (operation !== 'Addition') click(operation); click('Start flight');
  expect(screen.getByRole('heading', { name: sum })).toBeTruthy();
  click('Show me'); expect(screen.getByText(help)).toBeTruthy(); click('Close help');
  const [question, roundId] = lastRound(); expect(question.prompt).toBe(sum);
  act(() => ref.current.crossing({ lane: 0, roundId }));
  expect(screen.getByLabelText('Sums solved: 0')).toBeTruthy();
  expect(screen.queryByRole('button', { name: /Try again|Next sum/ })).toBeNull();
  // No feedback stop: the same sum is already flying in again, steering still works.
  const [retry, retryId] = lastRound(); expect(retry).toBe(question); expect(retryId).toBeGreaterThan(roundId);
  expect(screen.getByRole('button', { name: 'Move right' }).disabled).toBe(false);
  act(() => ref.current.crossing({ lane: 2, roundId: retryId }));
  expect(screen.getByLabelText('Sums solved: 1')).toBeTruthy();
  expect(screen.getByRole('heading', { name: '2 + 2 = ?' })).toBeTruthy();
  expect(screen.getByText(sum.replace('?', correct))).toBeTruthy();
  act(() => vi.advanceTimersByTime(FEEDBACK_MS.correct));
  expect(screen.queryByText(sum.replace('?', correct))).toBeNull();
  click('Settings'); click('Start flight'); expect(screen.getByLabelText('Sums solved: 0')).toBeTruthy();
});
test('setup offers Arithmetic Practice\'s choices and passes them to the questions', () => {
  setup(React.createRef());
  const mix = screen.getByRole('button', { name: 'Mix operations in one question' });
  expect(mix.disabled).toBe(true);
  click('Addition'); expect(screen.getByRole('button', { name: 'Addition' }).getAttribute('aria-pressed')).toBe('true');
  click('Multiplication'); expect(mix.disabled).toBe(false); fireEvent.click(mix);
  click('3'); click('Up to 50');
  expect(screen.getByText(/^From/).textContent).toBe('From 1 to 50');
  fireEvent.change(screen.getByLabelText('Smallest number'), { target: { value: '5' } });
  click('Start flight');
  expect(makeSpaceQuestion).toHaveBeenLastCalledWith(expect.objectContaining({ types: ['addition', 'multiplication'], mixOperations: true, operands: 3, min: 5, max: 50, mission: 'blaster' }), null);
});
test('left/right buttons and keys pick the lane, kept into the next sum; stale and duplicate crossings are ignored', () => {
  const ref = React.createRef(); setup(ref); click('Start flight');
  expect(flightApi.setLane).toHaveBeenLastCalledWith(1);
  click('Move right'); expect(flightApi.setLane).toHaveBeenLastCalledWith(2);
  fireEvent.keyDown(window, { key: 'd' }); expect(flightApi.setLane).toHaveBeenLastCalledWith(3);
  expect(screen.getByRole('button', { name: 'Move right' }).disabled).toBe(true);
  fireEvent.keyDown(window, { key: 'ArrowLeft' }); fireEvent.keyDown(window, { key: 'a' }); fireEvent.keyDown(window, { key: 'ArrowLeft' }); fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(flightApi.setLane).toHaveBeenLastCalledWith(0);
  const [, roundId] = lastRound();
  act(() => ref.current.crossing({ lane: 2, roundId: roundId - 1 })); expect(screen.getByLabelText('Sums solved: 0')).toBeTruthy();
  act(() => ref.current.crossing({ lane: 2, roundId })); act(() => ref.current.crossing({ lane: 2, roundId }));
  expect(screen.getByLabelText('Sums solved: 1')).toBeTruthy();
  expect(lastRound()[1]).toBeGreaterThan(roundId);
  expect(flightApi.setLane).toHaveBeenLastCalledWith(0);
  expect(screen.getByText('Ring 3')).toBeTruthy();
});
test('holding Shift or Turbo speeds the rings up; letting go, pausing or help stops it', () => {
  setup(React.createRef()); click('Start flight');
  expect(flightApi.setTurbo).toHaveBeenLastCalledWith(false);
  fireEvent.keyDown(window, { key: 'Shift' }); expect(flightApi.setTurbo).toHaveBeenLastCalledWith(true);
  fireEvent.keyUp(window, { key: 'Shift' }); expect(flightApi.setTurbo).toHaveBeenLastCalledWith(false);
  const turbo = screen.getByRole('button', { name: 'Hold Turbo to fly faster' });
  fireEvent.pointerDown(turbo, { pointerId: 1 }); expect(flightApi.setTurbo).toHaveBeenLastCalledWith(true);
  fireEvent.pointerUp(turbo, { pointerId: 1 }); expect(flightApi.setTurbo).toHaveBeenLastCalledWith(false);
  fireEvent.keyDown(window, { key: 'Shift' }); click('Show me'); expect(flightApi.setTurbo).toHaveBeenLastCalledWith(false);
  click('Close help'); expect(flightApi.setTurbo).toHaveBeenLastCalledWith(false);
  fireEvent.keyDown(window, { key: 'Shift' }); click('Pause'); expect(flightApi.setTurbo).toHaveBeenLastCalledWith(false);
});
test('a held Turbo carries on into the next sum', () => {
  const ref = React.createRef(); setup(ref); click('Start flight');
  fireEvent.keyDown(window, { key: 'Shift' }); expect(flightApi.setTurbo).toHaveBeenLastCalledWith(true);
  const calls = flightApi.setTurbo.mock.calls.length;
  act(() => ref.current.crossing({ lane: 2, roundId: lastRound()[1] }));
  expect(flightApi.setTurbo.mock.calls.slice(calls).some(([on]) => on === false)).toBe(false);
});
test('help and pause stop the flight; a pause never resumes by itself', () => {
  const ref = React.createRef(); setup(ref); click('Start flight');
  click('Show me'); expect(flightApi.setState).toHaveBeenLastCalledWith({ blocked: true, phase: 'choosing' });
  expect(screen.getByRole('button', { name: 'Move left' }).disabled).toBe(true);
  click('Close help'); expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Show me' }));
  fireEvent.blur(window); expect(screen.getByRole('button', { name: 'Resume' })).toBeTruthy();
  expect(flightApi.setState).toHaveBeenLastCalledWith({ blocked: true, phase: 'choosing' });
  const rounds = flightApi.prepareRound.mock.calls.length;
  act(() => ref.current.crossing({ lane: 2, roundId: lastRound()[1] }));
  act(() => vi.advanceTimersByTime(FEEDBACK_MS.correct * 3)); fireEvent.focus(window);
  expect(flightApi.prepareRound.mock.calls.length).toBe(rounds);
  vi.spyOn(document, 'hasFocus').mockReturnValue(true); click('Resume');
  expect(flightApi.setState).toHaveBeenLastCalledWith({ blocked: false, phase: 'choosing' });
  act(() => ref.current.crossing({ lane: 2, roundId: lastRound()[1] })); expect(flightApi.prepareRound.mock.calls.length).toBe(rounds + 1);
});
test('still view (no moving scene) answers by tapping a ring', () => {
  setup(undefined, { forceStill: true }); click('Start flight');
  expect(screen.queryByRole('button', { name: 'Move left' })).toBeNull();
  click('Answer 6'); expect(screen.getByLabelText('Sums solved: 0')).toBeTruthy();
  act(() => vi.advanceTimersByTime(FEEDBACK_MS.wrong));
  click('Answer 7'); expect(screen.getByLabelText('Sums solved: 1')).toBeTruthy();
});
test('streak, hot flame and the planet tour grow with right answers and never stop the flight', () => {
  const ref = React.createRef(); setup(ref); click('Start flight');
  expect(screen.getByText('Next stop: Mercury')).toBeTruthy();
  const pass = lane => act(() => ref.current.crossing({ lane, roundId: lastRound()[1] }));
  pass(2); pass(2);
  expect(screen.getByLabelText('2 right first time in a row')).toBeTruthy();
  expect(screen.getByRole('img', { name: '2 of 5 sums to Mercury' })).toBeTruthy();
  pass(2); expect(flightApi.setHot).toHaveBeenLastCalledWith(true);
  pass(0); expect(screen.queryByLabelText(/in a row/)).toBeNull(); expect(flightApi.setHot).toHaveBeenLastCalledWith(false);
  pass(2); pass(2);
  expect(screen.getByText('You reached Mercury!')).toBeTruthy();
  expect(screen.getByRole('img', { name: '0 of 5 sums to Venus' })).toBeTruthy();
  act(() => vi.advanceTimersByTime(FEEDBACK_MS.correct));
  expect(screen.getByText('Next stop: Venus')).toBeTruthy();
});

// Missions: one flight, different things to find and fly through.
const rightLane = () => { const [question] = lastRound(); return question.options.indexOf(question.answer); };
const passRight = ref => act(() => ref.current.crossing({ lane: rightLane(), roundId: lastRound()[1] }));
test('Number bonds: bonds to the chosen target on stars, with fitting help', () => {
  const ref = React.createRef(); setup(ref); click('Number bonds');
  expect(screen.queryByRole('button', { name: 'Addition' })).toBeNull();
  click('Make 20'); click('Start flight');
  const [question] = lastRound();
  expect(question.prompt).toMatch(/^\d+ \+ \? = 20$/); expect(question.dressing).toBe('star');
  expect(screen.getByRole('heading', { name: question.prompt })).toBeTruthy();
  expect(screen.getByLabelText('Stars found: 0')).toBeTruthy();
  click('Show me'); expect(screen.getByText(/Count on to 20\. How many jumps\?/)).toBeTruthy(); click('Close help');
  passRight(ref); expect(screen.getByLabelText('Stars found: 1')).toBeTruthy();
  expect(lastRound()[0].prompt).toMatch(/= 20$/);
});
test('Count in steps: counting in the chosen step, in flight or by tapping in still view', () => {
  setup(undefined, { forceStill: true }); click('Count in steps'); click('5s');
  expect(screen.getByText('5, 10, ?, 20')).toBeTruthy();
  click('Start flight');
  const sum = screen.getByRole('heading', { level: 2, name: /\?/ }).textContent;
  const terms = sum.split(', ');
  const gap = terms.indexOf('?');
  const answer = gap > 0 ? Number(terms[gap - 1]) + 5 : Number(terms[1]) - 5;
  click('Show me'); expect(screen.getByText('Each jump adds 5. Count on in 5s.')).toBeTruthy(); click('Close help');
  click(`Answer ${answer}`); expect(screen.getByLabelText('Numbers found: 1')).toBeTruthy();
});
test('stardust counts up while flying, never while paused, and starts again with a new flight', () => {
  const ref = React.createRef(); setup(ref); click('Start flight');
  expect(screen.queryByLabelText(/stardust/)).toBeNull();
  act(() => ref.current.stardust(1)); act(() => ref.current.stardust(2));
  expect(screen.getByLabelText('3 stardust collected')).toBeTruthy();
  click('Pause'); act(() => ref.current.stardust(5));
  expect(screen.getByLabelText('3 stardust collected')).toBeTruthy();
  click('Settings'); click('Start flight');
  expect(screen.queryByLabelText(/stardust/)).toBeNull();
});
test('reaching a planet on the tour sends it sweeping past in the scene', () => {
  const ref = React.createRef(); setup(ref); click('Start flight');
  expect(flightApi.setMission).toHaveBeenLastCalledWith('blaster');
  for (let i = 0; i < 4; i++) passRight(ref);
  expect(flightApi.celebrate).not.toHaveBeenCalled();
  passRight(ref);
  expect(flightApi.celebrate).toHaveBeenLastCalledWith({ kind: 'planet', planet: 'Mercury' });
});

test('Laser Blast is the only answer flight: Fire, Space or F shoots at the answer ahead, in every question set', () => {
  const ref = React.createRef(); setup(ref);
  expect(screen.getByRole('button', { name: 'Laser Blast' }).getAttribute('aria-pressed')).toBe('true');
  for (const gone of ['Free Flight', 'Meteor Smash', 'Comet Chase', 'Space Delivery', 'Answer flight']) expect(screen.queryByRole('button', { name: gone })).toBeNull();
  click('Start flight');
  click('Fire'); expect(flightApi.fire).toHaveBeenCalledTimes(1);
  fireEvent.keyDown(window, { key: ' ' }); fireEvent.keyDown(window, { key: 'f' }); fireEvent.keyDown(window, { key: 'f', repeat: true });
  expect(flightApi.fire).toHaveBeenCalledTimes(3);
  // The scene scores a shot like a ring flown through.
  passRight(ref); expect(screen.getByLabelText('Sums solved: 1')).toBeTruthy();
  click('Pause'); expect(screen.getByRole('button', { name: 'Fire' }).disabled).toBe(true);
  fireEvent.keyDown(window, { key: 'f' }); expect(flightApi.fire).toHaveBeenCalledTimes(3);
  click('Settings'); click('Number bonds'); click('Start flight');
  expect(screen.getByRole('button', { name: 'Fire' })).toBeTruthy();
});
test('streak power-ups: Blazing at 3 and Lightning at 6 recolour the flight and say so; a miss powers down', () => {
  const ref = React.createRef(); setup(ref); click('Start flight');
  expect(flightApi.setTier).toHaveBeenLastCalledWith(null);
  passRight(ref); passRight(ref); passRight(ref);
  expect(flightApi.setTier).toHaveBeenLastCalledWith('blazing');
  expect(screen.getByText('🔥 Blazing rocket!')).toBeTruthy();
  passRight(ref); passRight(ref); passRight(ref);
  expect(flightApi.setTier).toHaveBeenLastCalledWith('lightning');
  expect(screen.getByText('⚡ Lightning rocket!')).toBeTruthy();
  expect(screen.getByLabelText('6 right first time in a row').textContent).toBe('⚡ 6');
  act(() => vi.advanceTimersByTime(3000)); expect(screen.queryByText('⚡ Lightning rocket!')).toBeNull();
  act(() => ref.current.crossing({ lane: (rightLane() + 1) % 4, roundId: lastRound()[1] }));
  expect(flightApi.setTier).toHaveBeenLastCalledWith(null);
});
test('best streak per mission is kept in this browser; beating it gets fireworks once a flight', () => {
  const ref = React.createRef(); const view = setup(ref); click('Start flight');
  passRight(ref); passRight(ref);
  expect(screen.getByLabelText('Best streak 2')).toBeTruthy();
  expect(flightApi.celebrate).not.toHaveBeenCalledWith({ kind: 'record' }); // the first record is just set
  click('Settings');
  expect(screen.getByLabelText('Best streak 2')).toBeTruthy();
  click('Number bonds'); expect(screen.queryByLabelText(/Best streak/)).toBeNull();
  click('Sums');
  view.unmount();
  // A new visit in this browser remembers it.
  setup(ref); expect(screen.getByLabelText('Best streak 2')).toBeTruthy();
  click('Start flight');
  passRight(ref); passRight(ref);
  expect(flightApi.celebrate).not.toHaveBeenCalledWith({ kind: 'record' });
  passRight(ref);
  expect(flightApi.celebrate).toHaveBeenCalledWith({ kind: 'record' });
  expect(screen.getByText('🏆 New best streak: 3!')).toBeTruthy();
  expect(screen.getByLabelText('Best streak 3').className).toContain('is-new');
  passRight(ref);
  expect(flightApi.celebrate.mock.calls.filter(([e]) => e?.kind === 'record')).toHaveLength(1);
  expect(JSON.parse(localStorage.getItem('dl.spaceArithmeticRecords'))).toEqual({ version: 1, bestStreak: { blaster: 4 } });
});
const passWrong = ref => act(() => ref.current.crossing({ lane: (rightLane() + 1) % 4, roundId: lastRound()[1] }));
test('a flight lands after ten right answers with its log; Keep flying carries on, New mission goes back to setup', () => {
  const ref = React.createRef(); setup(ref); click('Start flight');
  for (let i = 0; i < 9; i++) passRight(ref);
  expect(screen.queryByRole('heading', { name: /Flight complete/ })).toBeNull();
  passRight(ref);
  const heading = screen.getByRole('heading', { name: /Flight complete/ });
  expect(document.activeElement).toBe(heading);
  expect(flightApi.celebrate).toHaveBeenCalledWith({ kind: 'landing' });
  expect(flightApi.setState).toHaveBeenLastCalledWith(expect.objectContaining({ blocked: true }));
  const log = document.querySelector('.space-arithmetic-log').textContent;
  expect(log).toContain('Sums solved10'); expect(log).toContain('Right first time10'); expect(log).toContain('Longest streak10'); expect(log).toContain('Planets reached2');
  expect(screen.queryByRole('group', { name: 'Steer the rocket' })).toBeNull();
  fireEvent.keyDown(window, { key: 'ArrowLeft' }); expect(flightApi.setLane).not.toHaveBeenLastCalledWith(0);
  click('Keep flying');
  expect(flightApi.setState).toHaveBeenLastCalledWith(expect.objectContaining({ blocked: false }));
  expect(screen.getByLabelText('Sums solved: 10')).toBeTruthy();
  for (let i = 0; i < 10; i++) passRight(ref);
  expect(screen.getByRole('heading', { name: /Flight complete/ })).toBeTruthy();
  click('New mission'); expect(screen.getByRole('button', { name: /Start flight/ })).toBeTruthy();
});
test('a sum that needed a second go comes back a few sums later; cracking it first time is in the flight log', () => {
  const ref = React.createRef(); setup(ref); click('Start flight');
  expect(lastRound()[0].prompt).toBe('3 + 4 = ?');
  passWrong(ref); passRight(ref);
  const seen = [];
  for (let i = 0; i < 4 && !lastRound()[0].comeback; i++) { seen.push(lastRound()[0].prompt); passRight(ref); }
  expect(lastRound()[0].prompt).toBe('3 + 4 = ?');
  expect(seen.length).toBeGreaterThan(0);
  expect(screen.getByText('Comeback sum')).toBeTruthy();
  passRight(ref);
  while (!screen.queryByRole('heading', { name: /Flight complete/ })) passRight(ref);
  expect(document.querySelector('.space-arithmetic-cracked').textContent).toContain('3 + 4 = 7');
});
test('stuck on one sum: after two misses Show me opens by itself, once', () => {
  const ref = React.createRef(); setup(ref); click('Start flight');
  passWrong(ref);
  expect(screen.queryByRole('region', { name: 'Help' })).toBeNull();
  passWrong(ref);
  expect(screen.getByRole('region', { name: 'Help' })).toBeTruthy();
  expect(screen.getByText('Tricky one! Let’s work it out together.')).toBeTruthy();
  expect(flightApi.setState).toHaveBeenLastCalledWith(expect.objectContaining({ blocked: true }));
  click('Close help');
  passWrong(ref);
  expect(screen.queryByRole('region', { name: 'Help' })).toBeNull();
});
