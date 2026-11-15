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
beforeEach(() => { vi.useFakeTimers(); flightApi = { prepareRound: vi.fn(), setState: vi.fn(), setLane: vi.fn(), setTurbo: vi.fn(), setHot: vi.fn(), leave: vi.fn() }; });
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });
function setup(ref, props = {}) { return render(<StrictMode><MemoryRouter><SpaceArithmetic ref={ref} flightApi={flightApi} {...props} /></MemoryRouter></StrictMode>); }
const lastRound = () => flightApi.prepareRound.mock.calls.at(-1);

for (const [operation, sum, correct, help] of [['Addition', '3 + 4 = ?', 7, /Start at 3\. Count on 4 more/], ['Subtraction', '9 − 4 = ?', 5, /Start at 9\. Count back 4/], ['Multiplication', '3 × 4 = ?', 12, /3 groups of 4\. Count up in 4s/], ['Division', '12 ÷ 3 = ?', 4, /How many groups of 3 make 12\?/]]) test(`${operation}: help fits the question; the flight flies straight on: wrong comes round again, right brings the next sum`, () => {
  const ref = React.createRef(); setup(ref); if (operation !== 'Addition') click(operation); click('Start flight');
  expect(screen.getByRole('heading', { name: sum })).toBeTruthy();
  click('Show me'); expect(screen.getByText(help)).toBeTruthy(); click('Close help');
  const [question, roundId] = lastRound(); expect(question.prompt).toBe(sum);
  act(() => ref.current.crossing({ lane: 0, roundId }));
  expect(screen.getByText('Sums solved: 0')).toBeTruthy();
  expect(screen.queryByRole('button', { name: /Try again|Next sum/ })).toBeNull();
  // No feedback stop: the same sum is already flying in again, steering still works.
  const [retry, retryId] = lastRound(); expect(retry).toBe(question); expect(retryId).toBeGreaterThan(roundId);
  expect(screen.getByRole('button', { name: 'Move right' }).disabled).toBe(false);
  act(() => ref.current.crossing({ lane: 2, roundId: retryId }));
  expect(screen.getByText('Sums solved: 1')).toBeTruthy();
  expect(screen.getByRole('heading', { name: '2 + 2 = ?' })).toBeTruthy();
  expect(screen.getByText(sum.replace('?', correct))).toBeTruthy();
  act(() => vi.advanceTimersByTime(FEEDBACK_MS.correct));
  expect(screen.queryByText(sum.replace('?', correct))).toBeNull();
  click('Settings'); click('Start flight'); expect(screen.getByText('Sums solved: 0')).toBeTruthy();
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
  expect(makeSpaceQuestion).toHaveBeenLastCalledWith(expect.objectContaining({ types: ['addition', 'multiplication'], mixOperations: true, operands: 3, min: 5, max: 50 }));
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
  act(() => ref.current.crossing({ lane: 2, roundId: roundId - 1 })); expect(screen.getByText('Sums solved: 0')).toBeTruthy();
  act(() => ref.current.crossing({ lane: 2, roundId })); act(() => ref.current.crossing({ lane: 2, roundId }));
  expect(screen.getByText('Sums solved: 1')).toBeTruthy();
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
  click('Answer 6'); expect(screen.getByText('Sums solved: 0')).toBeTruthy();
  act(() => vi.advanceTimersByTime(FEEDBACK_MS.wrong));
  click('Answer 7'); expect(screen.getByText('Sums solved: 1')).toBeTruthy();
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
