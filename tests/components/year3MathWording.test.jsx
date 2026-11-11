import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import CountingChallenge from '../../src/pages/skills/math/challenges/year3/counting-in-multiples-of-4-8-50-and-100/CountingInMultiplesOf4850And100Challenge4';
import Year3MeasurementGame from '../../src/pages/skills/math/challenges/year3/Year3MeasurementGame';
import Year3FractionGame from '../../src/pages/skills/math/challenges/year3/Year3FractionGame';
import FractionEquationBoard from '../../src/components/challenge/FractionEquationBoard';
import { buildMassQuestions, buildMoneyQuestions } from '../../src/data/challenges/year3Measurement';
import { buildEquivalentQuestions, buildArithmeticQuestions, buildNumbersQuestions } from '../../src/data/challenges/year3Fractions';

vi.mock('../../src/utils/speech', () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock('../../src/components/celebration/sound/player', async original => ({ ...await original(), playCue: () => () => {} }));
vi.mock('../../src/components/celebration/fx/effects', () => ({ playEffect: () => {} }));

const wrappers = import.meta.glob('../../src/pages/skills/math/challenges/year3/**/*Challenge[1-4].jsx', { eager: true });

it('all 176 Year 3 Maths wrappers mount with an answer action and no broken interpolations', () => {
  expect(Object.keys(wrappers)).toHaveLength(176);
  vi.spyOn(Math, 'random').mockReturnValue(.375);
  for (const [path, module] of Object.entries(wrappers)) {
    const Challenge = module.default;
    const { container, unmount } = render(<MemoryRouter><Challenge onComplete={() => {}} /></MemoryRouter>);
    expect(screen.getByRole('button', { name: /^Check my/ }), path).toBeTruthy();
    expect(container.textContent, path).not.toMatch(/undefined|NaN|\b\d+ths\b/);
    unmount();
  }
});

async function submitAndAdvance(complete, isLast) {
  const check = screen.getByRole('button', { name: 'Check my answer' });
  expect(check.disabled).toBe(false);
  fireEvent.click(check);
  expect(check.disabled).toBe(true);
  expect(complete).not.toHaveBeenCalled();
  await act(async () => vi.advanceTimersByTime(1000));
  if (isLast) {
    expect(complete).toHaveBeenCalledTimes(1);
    expect(complete.mock.calls[0][0]).toHaveProperty('combos');
  } else expect(complete).not.toHaveBeenCalled();
}

it('the stated number of jumps from zero gives the accepted answer, with wrong-answer retry', async () => {
  vi.useFakeTimers();
  vi.spyOn(Math, 'random').mockReturnValue(.375);
  const complete = vi.fn();
  try {
    const { container } = render(<CountingChallenge onComplete={complete} />);
    for (let round = 0; round < 6; round++) {
      const prompt = container.querySelector('.challenge-prompt').textContent;
      const [, jumps, step] = /Make (\d+) jumps of (\d+)/.exec(prompt);
      const answer = Number(jumps) * Number(step);
      if (round === 0) {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: String(answer - Number(step)) } });
        fireEvent.click(screen.getByRole('button', { name: 'Check my answer' }));
        await act(async () => vi.advanceTimersByTime(1000));
        expect(container.querySelector('.challenge-prompt').textContent).toBe(prompt);
        expect(complete).not.toHaveBeenCalled();
      }
      fireEvent.change(screen.getByRole('textbox'), { target: { value: String(answer) } });
      await submitAndAdvance(complete, round === 5);
    }
  } finally { vi.useRealTimers(); }
});

it('each mass reading asks for grams and accepts the value on its scale', async () => {
  vi.useFakeTimers();
  vi.spyOn(Math, 'random').mockReturnValue(.375);
  const complete = vi.fn();
  try {
    render(<Year3MeasurementGame topic="mass" level={1} onComplete={complete} />);
    const questions = buildMassQuestions(1, () => .375);
    for (const [index, question] of questions.entries()) {
      expect(screen.getByText('How many grams are shown on the scale?')).toBeTruthy();
      expect(screen.getByRole('img', { name: `The marker is on ${question.answer} g` })).toBeTruthy();
      fireEvent.click(screen.getByRole('button', { name: String(question.answer), exact: true }));
      await submitAndAdvance(complete, index === questions.length - 1);
    }
  } finally { vi.useRealTimers(); }
});

function pence(text) {
  const pounds = /£(\d+)/.exec(text);
  const pennies = /(\d+)p/.exec(text);
  return (pounds ? Number(pounds[1]) * 100 : 0) + (pennies ? Number(pennies[1]) : 0);
}

it('all change questions supply the paid amount, price and requested unit, and accept their difference', async () => {
  vi.useFakeTimers();
  vi.spyOn(Math, 'random').mockReturnValue(.375);
  const complete = vi.fn();
  try {
    const { container } = render(<Year3MeasurementGame topic="money" level={2} onComplete={complete} />);
    for (let round = 0; round < 6; round++) {
      const prompt = container.querySelector('.challenge-prompt').textContent;
      const [, paid, cost] = /You pay (.*?) for a toy costing (.*?)\./.exec(prompt);
      expect(prompt).toContain('in pence?');
      const answer = pence(paid) - pence(cost);
      if (round === 0) {
        fireEvent.change(screen.getByRole('textbox'), { target: { value: String(answer + 1) } });
        fireEvent.click(screen.getByRole('button', { name: 'Check my answer' }));
        await act(async () => vi.advanceTimersByTime(1000));
        expect(container.querySelector('.challenge-prompt').textContent).toBe(prompt);
        expect(complete).not.toHaveBeenCalled();
      }
      fireEvent.change(screen.getByRole('textbox'), { target: { value: String(answer) } });
      await submitAndAdvance(complete, round === 5);
    }
  } finally { vi.useRealTimers(); }
});

it('pounds-and-pence choice labels still represent the correct total', () => {
  vi.spyOn(Math, 'random').mockReturnValue(.375);
  const [question] = buildMoneyQuestions(1, () => .375);
  const { container } = render(<Year3MeasurementGame topic="money" level={1} onComplete={() => {}} />);
  expect(container.querySelector('.challenge-prompt').textContent).not.toMatch(/£\d+\.\d/);
  const correct = question.options.find(label => pence(label) === question.first + question.second);
  expect(correct).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: correct, exact: true }));
  fireEvent.click(screen.getByRole('button', { name: 'Check my answer' }));
  expect(screen.getByRole('button', { name: 'Check my answer' }).disabled).toBe(true);
});

for (const level of [1, 2, 3]) it(`fraction arithmetic ${level} gives instructions matching its answer controls`, async () => {
  vi.useFakeTimers();
  vi.spyOn(Math, 'random').mockReturnValue(.375);
  const complete = vi.fn();
  try {
    const { container } = render(<Year3FractionGame topic="arithmetic" level={level} onComplete={complete} />);
    const questions = buildArithmeticQuestions(level, () => .375);
    for (const [index, q] of questions.entries()) {
      if (level === 1) {
        expect(screen.getByText('Choose the answer below.')).toBeTruthy();
        expect(container.querySelectorAll('.fraction-shade-board button')).toHaveLength(0);
        fireEvent.click(screen.getByRole('button', { name: `${q.first + q.second}/${q.denominator}`, exact: true }));
      } else {
        expect(screen.getByText('Tap parts of the answer bar to shade your answer.')).toBeTruthy();
        const count = level === 2 ? q.first + q.second : q.first - q.second;
        for (const part of [...container.querySelectorAll('.fraction-shade-board button')].slice(0, count)) fireEvent.click(part);
      }
      await submitAndAdvance(complete, index === questions.length - 1);
    }
  } finally { vi.useRealTimers(); }
});

for (const [topic, build] of [['equivalent', buildEquivalentQuestions], ['numbers', buildNumbersQuestions]]) {
  it(`${topic}: each fraction story requests the top number that its input accepts`, async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(.375);
    const complete = vi.fn();
    try {
      const { container } = render(<Year3FractionGame topic={topic} level={4} onComplete={complete} />);
      const questions = build(4, () => .375);
      for (const [index, q] of questions.entries()) {
        expect(container.querySelector('.challenge-prompt').textContent).toMatch(/\?\/\d+/);
        const answer = topic === 'equivalent' ? q.target.numerator * q.answerDenominator / q.target.denominator : q.numerator;
        fireEvent.change(screen.getByRole('textbox'), { target: { value: String(answer) } });
        await submitAndAdvance(complete, index === questions.length - 1);
      }
    } finally { vi.useRealTimers(); }
  });
}

it('the shared fraction board retains its default caption for existing callers', () => {
  render(<FractionEquationBoard denominator={5} first={1} second={2} operation="add" selected={[]} />);
  expect(screen.getByText('Shade the answer.')).toBeTruthy();
  cleanup();
});

// This shared tray has a Year 3 formatter; other callers keep their default.
it('the change-making tray shows its running total in pounds and pence', () => {
  vi.spyOn(Math, 'random').mockReturnValue(.375);
  const { container } = render(<Year3MeasurementGame topic="money" level={3} onComplete={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: 'Add £1', exact: true }));
  fireEvent.click(screen.getByRole('button', { name: 'Add 20p', exact: true }));
  expect(container.querySelector('.coin-total').textContent).toBe('Total: £1 and 20p');
  fireEvent.click(screen.getByRole('button', { name: 'Remove 20p', exact: true }));
  expect(container.querySelector('.coin-total').textContent).toBe('Total: £1');
});
