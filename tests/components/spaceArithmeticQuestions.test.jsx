import React, { StrictMode } from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import SpaceArithmeticPanel from '../../src/pages/skills/math/SpaceArithmeticPanel.jsx';
import { SPACE_FEEDBACK_MS } from '../../src/data/freePlay/spaceArithmeticConfig.js';

vi.mock('../../src/components/celebration/fx/effects.js', () => ({ playEffect: vi.fn() }));
afterEach(() => { vi.useRealTimers(); });

test('real questions and answer rings remain numeric after repeated correct crossings', () => {
  vi.useFakeTimers();
  const ref = React.createRef();
  const flightApi = { prepareRound: vi.fn(), setState: vi.fn(), setLane: vi.fn(), setTurbo: vi.fn() };
  render(<StrictMode><SpaceArithmeticPanel ref={ref} flightApi={flightApi} /></StrictMode>);
  fireEvent.click(screen.getByRole('button', { name: 'Up to 20' }));
  fireEvent.click(screen.getByRole('button', { name: 'Start flight' }));
  for (let solved = 0; solved < 8; solved++) {
    const [question, roundId] = flightApi.prepareRound.mock.calls.at(-1);
    expect(question.prompt).not.toMatch(/NaN|undefined|Infinity/);
    expect(question.parts.a).toBeGreaterThanOrEqual(1);
    expect(question.parts.a).toBeLessThanOrEqual(20);
    expect(question.answer).toBe(question.parts.a + question.parts.b);
    expect(question.options.every(Number.isInteger)).toBe(true);
    expect(new Set(question.options).size).toBe(4);
    expect(screen.getByRole('heading', { name: question.prompt })).toBeTruthy();
    act(() => ref.current.crossing({ lane: question.options.indexOf(question.answer), roundId }));
    expect(screen.getByText(`Sums solved: ${solved + 1}`)).toBeTruthy();
    act(() => vi.advanceTimersByTime(SPACE_FEEDBACK_MS.correct));
  }
});

test('Find the sum: four-way steering reaches every equation ring and scoring waits for flight crossing', async () => {
  const { evaluateCalculation } = await import('../../src/pages/skills/math/generateQuestion.js');
  const ref = React.createRef();
  const flightApi = { prepareRound: vi.fn(), setState: vi.fn(), setLane: vi.fn(), setTurbo: vi.fn(), leave: vi.fn() };
  render(<SpaceArithmeticPanel ref={ref} flightApi={flightApi} />);
  fireEvent.click(screen.getByRole('button', { name: /Find the sum/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Multiplication' }));
  fireEvent.click(screen.getByRole('button', { name: 'Mix operations in one question' }));
  fireEvent.click(screen.getByRole('button', { name: '4', exact: true }));
  fireEvent.click(screen.getByRole('button', { name: 'Up to 100' }));
  fireEvent.click(screen.getByRole('button', { name: 'Start flight' }));
  for (let solved = 0; solved < 6; solved++) {
    const [question, roundId] = flightApi.prepareRound.mock.calls.at(-1);
    expect(question.prompt).toBe(`? = ${question.target}`);
    expect(screen.getByRole('heading', { name: question.prompt })).toBeTruthy();
    const making = question.options.filter(text => evaluateCalculation(text.replaceAll('−', '-')) === question.target);
    expect(making).toEqual([question.answer]);
    expect(screen.queryByRole('region', { name: 'Choose a flight ring' })).toBeNull();
    expect(screen.queryByRole('button', { name: /^Ring \d:/ })).toBeNull();
    // Top right -> bottom right -> bottom left -> top left -> top right.
    for (const [key, lane] of [['ArrowDown', 3], ['ArrowLeft', 2], ['w', 0], ['d', 1]]) {
      fireEvent.keyDown(window, { key });
      expect(flightApi.setLane).toHaveBeenLastCalledWith(lane);
      expect(screen.getByText(`Sums solved: ${solved}`)).toBeTruthy();
    }
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(flightApi.setLane).toHaveBeenLastCalledWith(1);
    expect(screen.getByRole('button', { name: 'Move up' }).disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Move down' }));
    expect(flightApi.setLane).toHaveBeenLastCalledWith(3);
    expect(screen.getByRole('button', { name: 'Move down' }).disabled).toBe(true);
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    const calls = flightApi.setLane.mock.calls.length;
    fireEvent.keyDown(window, { key: 's' });
    expect(flightApi.setLane.mock.calls).toHaveLength(calls);
    expect(screen.getByRole('button', { name: 'Move down' }).disabled).toBe(true);
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);
    fireEvent.click(screen.getByRole('button', { name: 'Resume' }));
    fireEvent.click(screen.getByRole('button', { name: 'Show me' }));
    expect(screen.getByRole('button', { name: 'Move down' }).disabled).toBe(true);
    expect(screen.getByText(`Work out each sum, one at a time. Which one makes ${question.target}?`)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Close help' }));
    act(() => ref.current.crossing({ lane: question.options.indexOf(question.answer), roundId }));
    expect(screen.getByText(`Sums solved: ${solved + 1}`)).toBeTruthy();
    expect(screen.getByText(`${question.answer} = ${question.target}`)).toBeTruthy();
  }
});

test('still equation choices submit answers directly without a flight board', () => {
  render(<SpaceArithmeticPanel forceStill />);
  fireEvent.click(screen.getByRole('button', { name: /Find the sum/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Start flight' }));
  expect(screen.queryByRole('region', { name: 'Choose a flight ring' })).toBeNull();
  const options = within(screen.getByRole('group', { name: 'Answer rings' })).getAllByRole('button');
  expect(options).toHaveLength(4);
  fireEvent.click(options[0]);
  expect(options.every(b => b.disabled)).toBe(true);
});
