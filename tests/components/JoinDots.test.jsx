import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import JoinDots from '../../src/pages/skills/geography/JoinDots.jsx';
import { constellations } from '../../src/pages/skills/geography/constellations.js';
import { traceSteps } from '../../src/pages/skills/geography/constellationTrace.js';
import { isMuted } from '../../src/components/celebration/sound/player.js';
import { speak } from '../../src/utils/speech.js';
vi.mock('../../src/utils/speech.js', () => ({ speak: vi.fn(), stopNarration: vi.fn() }));
vi.mock('../../src/components/celebration/sound/player.js', () => ({ isMuted: vi.fn(() => false) }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });
const api = { setConstellationTrace: vi.fn(), projectConstellationStar: vi.fn(() => ({ x: 120, y: 120, visible: true })), showConstellationSky: vi.fn() };
const props = { onCollect: vi.fn(), api, muted: false, onClose: vi.fn(), onPrevious: vi.fn(), onNext: vi.fn(), index: 0, total: 5 };

test('a wrong star preserves progress; every constellation plays to completion and can restart', () => {
  for (const figure of constellations) {
    const { unmount } = render(<JoinDots {...props} constellation={figure} />);
    const steps = traceSteps(figure.lines);
    const name = id => figure.stars.find(s => s.id === id).name;
    fireEvent.click(screen.getByRole('button', { name: `Star ${name(steps[1].id)}`, exact: true }));
    expect(screen.getByRole('status').textContent).toContain('Try the numbered star');
    expect(api.setConstellationTrace).toHaveBeenLastCalledWith(0);
    for (const step of steps) fireEvent.click(screen.getByRole('button', { name: `Star ${name(step.id)}`, exact: true }));
    expect(screen.getByRole('status').textContent).toContain(`You drew ${figure.name}`);
    expect(api.setConstellationTrace).toHaveBeenLastCalledWith(figure.lines.length);
    expect(props.onCollect).toHaveBeenLastCalledWith(figure.id);
    expect(screen.getByLabelText('Constellation complete')).toBeTruthy();
    expect(screen.getByRole('progressbar').value).toBe(steps.length);
    expect(screen.getByLabelText(/1 of 5 constellations collected/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Start again' }));
    expect(api.setConstellationTrace).toHaveBeenLastCalledWith(0);
    expect(screen.getByRole('status').textContent).toContain('Tap 1');
    unmount(); expect(api.setConstellationTrace).toHaveBeenLastCalledWith(null);
  }
});
test('changing figures resets play, recenter works, narration follows both mutes, Escape exits', () => {
  const { rerender } = render(<JoinDots {...props} key="one" constellation={constellations[0]} />);
  fireEvent.click(screen.getByRole('button', { name: 'Star Alkaid', exact: true }));
  rerender(<JoinDots {...props} key="two" constellation={constellations[2]} />);
  expect(screen.getByRole('status').textContent).toContain('Tap 1: Caph');
  fireEvent.click(screen.getByRole('button', { name: 'Centre stars' }));
  expect(api.showConstellationSky).toHaveBeenCalledWith('cassiopeia');
  isMuted.mockReturnValue(true); fireEvent.click(screen.getByRole('button', { name: 'Read aloud' })); expect(speak).not.toHaveBeenCalled();
  isMuted.mockReturnValue(false); fireEvent.click(screen.getByRole('button', { name: 'Read aloud' })); expect(speak).toHaveBeenCalledOnce();
  rerender(<JoinDots {...props} muted key="two" constellation={constellations[2]} />);
  expect(screen.getByRole('button', { name: 'Read aloud' }).disabled).toBe(true);
  fireEvent.keyDown(window, { key: 'Escape' }); expect(props.onClose).toHaveBeenCalledOnce();
});

test('collected constellations stay visible after switching figures without awarding duplicates', () => {
  const { rerender } = render(<JoinDots {...props} key="one" completedIds={['ursa-major']} constellation={constellations[2]} />);
  expect(screen.getByLabelText(/1 of 5 constellations collected/)).toBeTruthy();
  for (const step of traceSteps(constellations[2].lines)) {
    const name = constellations[2].stars.find(s => s.id === step.id).name;
    fireEvent.click(screen.getByRole('button', { name: `Star ${name}`, exact: true }));
  }
  expect(screen.getByLabelText(/2 of 5 constellations collected/)).toBeTruthy();
  rerender(<JoinDots {...props} key="one" completedIds={['ursa-major', 'cassiopeia']} constellation={constellations[2]} />);
  expect(screen.getByLabelText(/2 of 5 constellations collected/)).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Try next constellation' }));
  expect(props.onNext).toHaveBeenCalledOnce();
  rerender(<JoinDots {...props} key="two" completedIds={['ursa-major', 'cassiopeia']} constellation={constellations[3]} />);
  expect(screen.getByRole('progressbar').value).toBe(0);
  expect(screen.getByLabelText(/2 of 5 constellations collected/)).toBeTruthy();
});
