import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import NumberBonds from '../../src/pages/skills/math/NumberBonds';
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
});

it('Number Bonds practice counts a retry once and resets feedback on mode changes', () => {
  render(<ThemeContext.Provider value={{ theme: 'light' }}><NumberBonds /></ThemeContext.Provider>);
  fireEvent.change(screen.getByLabelText('Mode:'), { target: { value: 'practice' } });
  const first = Number(document.querySelector('.practice-equation span').textContent);
  const input = screen.getByPlaceholderText('?');
  const check = screen.getByRole('button', { name: 'Check' });

  fireEvent.change(input, { target: { value: '100' } });
  fireEvent.click(check);
  fireEvent.change(input, { target: { value: String(10 - first) } });
  fireEvent.click(check);
  fireEvent.click(check);
  expect(calls.answer.mock.calls).toEqual([[false], [true, { firstTry: false }]]);

  fireEvent.change(screen.getByLabelText('Mode:'), { target: { value: 'match' } });
  expect(calls.reset).toHaveBeenCalled();
  fireEvent.change(screen.getByLabelText('Mode:'), { target: { value: 'practice' } });
  const nextFirst = Number(document.querySelector('.practice-equation span').textContent);
  fireEvent.change(screen.getByPlaceholderText('?'), { target: { value: String(10 - nextFirst) } });
  fireEvent.click(screen.getByRole('button', { name: 'Check' }));
  expect(calls.answer.mock.lastCall).toEqual([true, { firstTry: true }]);
});
