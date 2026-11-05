import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import NumberBonds from '../../src/pages/skills/math/NumberBonds';

vi.mock('../../src/utils/speech', () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock('../../src/components/celebration/sound/player', () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock('../../src/components/celebration/fx/effects', () => ({ playEffect: () => () => {} }));

const prompt = () => document.querySelector('.nb-prompt strong').textContent;

it('starts on target 10 in match mode with a full card board', () => {
  render(<NumberBonds />);
  expect(screen.getByRole('button', { name: '10' }).getAttribute('aria-pressed')).toBe('true');
  expect(prompt()).toBe('10');
  expect(document.querySelectorAll('.nb-card').length).toBe(10);
});

it('preset targets change the board', () => {
  render(<NumberBonds />);
  fireEvent.click(screen.getByRole('button', { name: '5' }));
  expect(prompt()).toBe('5');
  expect(document.querySelectorAll('.nb-card').length).toBe(4);
  expect(document.querySelector('.nb-notice')).not.toBeNull();
});

it('custom target steps and clamps to 2-100', () => {
  render(<NumberBonds />);
  fireEvent.click(screen.getByRole('button', { name: 'Custom' }));
  fireEvent.click(screen.getByRole('button', { name: 'One more' }));
  expect(prompt()).toBe('11');
  const input = screen.getByLabelText('Custom target number');
  fireEvent.change(input, { target: { value: '500' } });
  fireEvent.blur(input);
  expect(prompt()).toBe('100');
  expect(screen.getByRole('button', { name: 'One more' }).disabled).toBe(true);
  fireEvent.change(input, { target: { value: '1' } });
  fireEvent.blur(input);
  expect(prompt()).toBe('2');
  expect(screen.getByRole('button', { name: 'One less' }).disabled).toBe(true);
});

it('matching a pair counts it', () => {
  render(<NumberBonds />);
  const cards = [...document.querySelectorAll('.nb-card')];
  const val = (c) => Number(c.querySelector('.nb-card-back').textContent);
  const a = cards[0];
  const b = cards.find((c) => c !== a && val(c) + val(a) === 10);
  fireEvent.click(a);
  fireEvent.click(b);
  expect(document.querySelector('.nb-score').textContent).toContain('Pairs 1 / 5');
});
