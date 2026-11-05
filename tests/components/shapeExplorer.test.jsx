import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import ShapeExplorer from '../../src/pages/skills/math/ShapeExplorer';

vi.mock('../../src/utils/speech', () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock('../../src/components/celebration/sound/player', () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock('../../src/components/celebration/fx/effects', () => ({ playEffect: () => () => {} }));

const choices = () => [...document.querySelectorAll('.se-choice')];

it('draws one shape with four named choices', () => {
  render(<ShapeExplorer />);
  expect(screen.getByText('What shape is this?')).toBeTruthy();
  expect(document.querySelectorAll('.se-shape').length).toBe(1);
  expect(choices().length).toBe(4);
});

it('a wrong tap sets that tile aside and keeps the others playable', () => {
  render(<ShapeExplorer />);
  // The easiest level deals only four shapes, so tapping each tile finds a wrong one.
  const first = choices()[0];
  fireEvent.click(first);
  const wrong = choices().filter((c) => c.classList.contains('is-wrong'));
  const right = choices().filter((c) => c.classList.contains('is-right'));
  expect(wrong.length + right.length).toBe(1);
  if (wrong.length) {
    expect(wrong[0].disabled).toBe(true);
    expect(choices().filter((c) => !c.disabled).length).toBe(3);
  }
});

it('finding the right tile locks the question', () => {
  render(<ShapeExplorer />);
  for (const tile of choices()) {
    if (!tile.disabled) fireEvent.click(tile);
  }
  expect(choices().filter((c) => c.classList.contains('is-right')).length).toBe(1);
  expect(choices().every((c) => c.disabled)).toBe(true);
});
