import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import ShapeExplorer from '../../src/pages/skills/math/ShapeExplorer';
import ShapeArt from '../../src/pages/skills/math/ShapeArt';
import { KINDS, shapesForLevel } from '../../src/data/freePlay/shapeExplorer';

vi.mock('../../src/utils/speech', () => ({ speak: () => {}, stopNarration: () => {}, speakAndWait: async () => {}, isNarrationSupported: () => false }));
vi.mock('../../src/components/celebration/sound/player', () => ({
  playCue: () => () => {}, preloadSounds: () => {}, isMuted: () => true, setMuted: () => {}, subscribe: () => () => {},
}));
vi.mock('../../src/components/celebration/fx/effects', () => ({ playEffect: () => () => {} }));

const choices = () => [...document.querySelectorAll('.se-choice')];

it('every shape in every level has a drawing', () => {
  for (const kind of KINDS) {
    for (const level of [1, 2, 3]) {
      for (const shape of shapesForLevel(level, kind.id)) {
        const { container, unmount } = render(<ShapeArt id={shape.id} />);
        const svg = container.querySelector('svg.se-shape');
        expect(svg, `${kind.id} L${level} ${shape.id} has no drawing`).not.toBeNull();
        expect(svg.children.length, shape.id).toBeGreaterThan(0);
        unmount();
      }
    }
  }
});

it('the 2D / 3D switch deals solids and keeps the level', () => {
  render(<ShapeExplorer />);
  fireEvent.click(screen.getByRole('button', { name: /Medium/ }));
  fireEvent.click(screen.getByRole('button', { name: '3D shapes' }));
  expect(screen.getByRole('button', { name: '3D shapes' }).getAttribute('aria-pressed')).toBe('true');
  expect(screen.getByText('What 3D shape is this?')).toBeTruthy();
  expect(screen.getByRole('button', { name: /Medium/ }).getAttribute('aria-pressed')).toBe('true');
  const solids = new Set(shapesForLevel(2, '3d').map((s) => s.name));
  for (const tile of choices()) expect(solids.has(tile.textContent)).toBe(true);
});

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
