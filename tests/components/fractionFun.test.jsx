import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import FractionFun from '../../src/pages/skills/math/FractionFun';
import { ThemeContext } from '../../src/context/theme-context';

const calls = vi.hoisted(() => ({ answer: vi.fn(), clear: vi.fn(), reset: vi.fn() }));
vi.mock('../../src/components/skills/useAnswerFeedback', () => ({
  useAnswerFeedback: () => ({
    answer: calls.answer,
    clear: calls.clear,
    reset: calls.reset,
    feedback: null,
    answerRef: { current: null },
    feedbackRef: { current: null },
  }),
}));
vi.mock('../../src/utils/speech', () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));

beforeEach(() => {
  calls.answer.mockReset();
  calls.clear.mockReset();
  calls.reset.mockReset();
  vi.useRealTimers();
});

const renderGame = () => render(<ThemeContext.Provider value={{ theme: 'light' }}><FractionFun /></ThemeContext.Provider>);
const parts = () => [...document.querySelectorAll('.fraction-part')];

it('Shade it: a wrong count misses, the right count is correct and moves on', () => {
  vi.useFakeTimers();
  renderGame();
  const total = parts().length;
  expect(total).toBeGreaterThanOrEqual(2);

  const fraction = document.querySelector('.fraction-prompt .frac');
  const numerator = Number(fraction.querySelector('.frac-top').textContent);

  const wrongCount = numerator === 1 ? 2 : 1;
  for (let i = 0; i < wrongCount; i += 1) fireEvent.click(parts()[i]);
  fireEvent.click(screen.getByRole('button', { name: 'Check' }));
  expect(calls.answer).toHaveBeenLastCalledWith(false);

  act(() => { vi.advanceTimersByTime(1100); });
  fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
  for (let i = 0; i < numerator; i += 1) fireEvent.click(parts()[i]);
  fireEvent.click(screen.getByRole('button', { name: 'Check' }));
  expect(calls.answer).toHaveBeenLastCalledWith(true, { firstTry: false });
  act(() => { vi.advanceTimersByTime(1500); });
  expect(calls.clear).toHaveBeenCalled();
});

it('Name it shows options, and switching level or game resets feedback', () => {
  renderGame();
  fireEvent.click(screen.getByRole('button', { name: 'Name it' }));
  expect(calls.reset).toHaveBeenCalledTimes(1);
  expect(document.querySelectorAll('.fraction-option').length).toBeGreaterThanOrEqual(3);
  expect(document.querySelectorAll('.fraction-part.filled').length).toBeGreaterThan(0);

  fireEvent.click(screen.getAllByRole('button', { name: /Challenge/ })[0]);
  expect(calls.reset).toHaveBeenCalledTimes(2);
  fireEvent.click(screen.getByRole('button', { name: 'Shade it' }));
  expect(calls.reset).toHaveBeenCalledTimes(3);
  expect(document.querySelectorAll('.fraction-part.filled').length).toBe(0);
});
