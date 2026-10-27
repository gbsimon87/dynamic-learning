import React from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import SolarFlightControls from '../../src/pages/skills/geography/SolarFlightControls.jsx';
import { FLIGHT_CHAPTERS, FLIGHT_CLUES } from '../../src/pages/skills/geography/flightClues.js';
import { HOME_SYSTEM } from '../../src/pages/skills/geography/systems/home.js';

vi.mock('../../src/utils/speech.js', () => ({ speak: vi.fn(), stopNarration: vi.fn() }));
vi.mock('../../src/components/celebration/sound/player.js', () => ({ isMuted: vi.fn(() => false) }));
const { speak } = await import('../../src/utils/speech.js');
const { isMuted } = await import('../../src/components/celebration/sound/player.js');

beforeEach(() => { vi.spyOn(Math, 'random').mockReturnValue(.9999); });
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); vi.clearAllMocks(); });

const api = { setStick: vi.fn(), setThrust: vi.fn(), brake: vi.fn(), face: vi.fn(), home: vi.fn(), setGoal: vi.fn(), setBoost: vi.fn() };
const steps = FLIGHT_CLUES.flatMap(c => c.then ? [c, c.then] : [c]);
const bodies = [...new Set(steps.map(c => c.target))].map(id => ({ id, name: id.split('/').at(-1), kind: 'planet' }));
const HOME = { clues: FLIGHT_CLUES, chapters: FLIGHT_CHAPTERS, badges: HOME_SYSTEM.flight.badges, startName: 'Earth', systemName: 'Solar System', systemPhrase: 'the Solar System', api, bodies, onClose: () => {} };
const goal = () => api.setGoal.mock.calls.at(-1);
const arrive = (rerender, props = {}) => {
  const [target, token] = goal();
  rerender(<SolarFlightControls {...HOME} {...props} view={{ arrival: { target, token } }} />);
};
const choose = name => fireEvent.click(screen.getByRole('button', { name: new RegExp(name) }));

test('the picker offers every chapter, suggests the first, and starting one sets its first goal', () => {
  render(<SolarFlightControls {...HOME} />);
  expect(screen.getByText('Choose an adventure')).toBeTruthy();
  const list = screen.getAllByRole('listitem');
  expect(list).toHaveLength(FLIGHT_CHAPTERS.length);
  expect(within(list[0]).getByText(/Start here/)).toBeTruthy();
  expect(goal()).toEqual([null, null]);
  expect(screen.queryByRole('button', { name: /Where to/ })).toBeNull();
  choose('Asteroid-belt run');
  expect(screen.getByText(/☄️ Asteroid-belt run · Clue 1 \/ 5/)).toBeTruthy();
  expect(screen.getByText(/mostly empty space/)).toBeTruthy();
  expect(goal()[0]).toBeTruthy();
});

test('aiming help is locked until the child has flown 20 seconds; each new clue locks it again', () => {
  const { rerender } = render(<SolarFlightControls {...HOME} chapters={[FLIGHT_CHAPTERS[0]]} view={{ engineTime: 100 }} />);
  fireEvent.click(screen.getByRole('button', { name: /Where to/ }));
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Mars' } });
  expect(screen.getByText('Point rocket here').disabled).toBe(true);
  expect(screen.getByText(/Read the clue and try first/)).toBeTruthy();
  rerender(<SolarFlightControls {...HOME} chapters={[FLIGHT_CHAPTERS[0]]} view={{ engineTime: 110 }} />);
  expect(screen.getByRole('progressbar', { name: 'Help unlocking' }).getAttribute('aria-valuenow')).toBe('50');
  rerender(<SolarFlightControls {...HOME} chapters={[FLIGHT_CHAPTERS[0]]} view={{ engineTime: 120 }} />);
  expect(screen.getByText('Point rocket here').disabled).toBe(false);
  fireEvent.click(screen.getByText('Point rocket here')); expect(api.face).toHaveBeenLastCalledWith('Mars');
  const [target, token] = goal();
  rerender(<SolarFlightControls {...HOME} chapters={[FLIGHT_CHAPTERS[0]]} view={{ engineTime: 120, arrival: { target, token } }} />);
  fireEvent.click(screen.getByRole('button', { name: /Keep going|Next clue/ }));
  fireEvent.click(screen.getByRole('button', { name: /Hint/ }));
  expect(screen.getByText('Help me steer').disabled).toBe(true);
});

test('opening the hint unlocks Help me steer after 10 seconds', () => {
  vi.useFakeTimers();
  render(<SolarFlightControls {...HOME} chapters={[FLIGHT_CHAPTERS[0]]} />);
  fireEvent.click(screen.getByRole('button', { name: /Hint/ }));
  expect(screen.getByText('Help me steer').disabled).toBe(true);
  act(() => { vi.advanceTimersByTime(5000); });
  expect(screen.getByText('Help me steer').disabled).toBe(true);
  act(() => { vi.advanceTimersByTime(5500); });
  expect(screen.getByText('Help me steer').disabled).toBe(false);
});

test('a question after a find: a wrong answer is gently corrected, never costs a star, and is read aloud when unmuted', () => {
  const belt = FLIGHT_CHAPTERS.find(c => c.id === 'belt');
  const { rerender } = render(<SolarFlightControls {...HOME} chapters={[belt]} />);
  let asked = null;
  for (let i = 0; i < 5 && !asked; i++) {
    arrive(rerender, { chapters: [belt] });
    asked = screen.queryByRole('group', { name: 'Quick question' });
    if (!asked) fireEvent.click(screen.getByRole('button', { name: /Next clue|Keep going/ }));
  }
  expect(asked).toBeTruthy();
  const stars = screen.getByLabelText(/stars earned/).getAttribute('aria-label');
  const buttons = within(asked).getAllByRole('button').filter(b => b.textContent !== 'Read question');
  const clue = steps.find(c => c.question && buttons.some(b => b.textContent === c.question.answer) && screen.queryByText(c.fact));
  const wrong = buttons.find(b => b.textContent !== clue.question.answer);
  fireEvent.click(wrong);
  expect(screen.getByText(new RegExp(`Not quite — it’s “${clue.question.answer}”`))).toBeTruthy();
  expect(buttons.every(b => b.disabled)).toBe(true);
  expect(screen.getByLabelText(/stars earned/).getAttribute('aria-label')).toBe(stars);
  isMuted.mockReturnValue(true); fireEvent.click(within(asked).getByText('Read question')); expect(speak).not.toHaveBeenCalled();
  isMuted.mockReturnValue(false); fireEvent.click(within(asked).getByText('Read question'));
  expect(speak.mock.calls.at(-1)[0]).toContain(clue.question.text);
});

test('the right answer says Yes and why', () => {
  const rocky = FLIGHT_CHAPTERS[0];
  const { rerender } = render(<SolarFlightControls {...HOME} chapters={[rocky]} />);
  for (let i = 0; i < 5; i++) {
    arrive(rerender, { chapters: [rocky] });
    const asked = screen.queryByRole('group', { name: 'Quick question' });
    if (asked) {
      const clue = steps.find(c => c.question && screen.queryByText(c.question.text));
      fireEvent.click(within(asked).getByText(clue.question.answer));
      expect(screen.getByText(`Yes! ${clue.question.why}`)).toBeTruthy();
      return;
    }
    fireEvent.click(screen.getByRole('button', { name: /Next clue|Keep going/ }));
  }
  throw new Error('no question in the rocky chapter');
});

test('closing and reopening the panel keeps the chapter, its progress and finished ticks', () => {
  const session = {};
  const { rerender, unmount } = render(<SolarFlightControls {...HOME} session={session} />);
  choose('Giant planets');
  arrive(rerender, { session });
  unmount();
  const again = render(<SolarFlightControls {...HOME} session={session} />);
  expect(screen.getByLabelText('1 stars earned')).toBeTruthy();
  expect(screen.getByText(/🪐 Giant planets · Clue 1/)).toBeTruthy();
  for (let i = 0; i < 6; i++) {
    const next = screen.queryByRole('button', { name: /Next clue|Keep going|Finish adventure/ });
    if (!next) break;
    const finishing = next.textContent === 'Finish adventure';
    fireEvent.click(next);
    if (finishing) break;
    arrive(again.rerender, { session });
  }
  expect(screen.getByText('🎉 Giant planets complete!')).toBeTruthy();
  again.unmount();
  render(<SolarFlightControls {...HOME} session={session} />);
  expect(screen.getByText('🎉 Giant planets complete!')).toBeTruthy();
  expect(screen.queryAllByLabelText('finished')).toHaveLength(0); // the finished chapter is not in the "another" list
  fireEvent.click(screen.getByRole('button', { name: /Rocky planets/ }));
  expect(screen.getByText(/🪨 Rocky planets · Clue 1/)).toBeTruthy();
});

test('More offers another adventure, which returns to the picker and keeps the stars', () => {
  const { rerender } = render(<SolarFlightControls {...HOME} />);
  choose('Rocky planets');
  arrive(rerender);
  fireEvent.click(screen.getByRole('button', { name: /Keep going|Next clue/ }));
  fireEvent.click(screen.getByRole('button', { name: /More/ }));
  fireEvent.click(screen.getByText('Choose another adventure'));
  expect(screen.getByText('Choose an adventure')).toBeTruthy();
  expect(screen.getByLabelText('1 stars earned')).toBeTruthy();
  choose('Icy edge');
  expect(screen.getByLabelText('1 stars earned')).toBeTruthy();
});

test('bumping a belt rock shows a short, kind message', () => {
  vi.useFakeTimers();
  const { rerender } = render(<SolarFlightControls {...HOME} chapters={[FLIGHT_CHAPTERS[3]]} view={{ bumps: 0 }} />);
  expect(screen.queryByText(/Bump!/)).toBeNull();
  rerender(<SolarFlightControls {...HOME} chapters={[FLIGHT_CHAPTERS[3]]} view={{ bumps: 1 }} />);
  expect(screen.getByText('Bump! Rocks only wobble you — keep going.')).toBeTruthy();
  act(() => { vi.advanceTimersByTime(2100); });
  expect(screen.queryByText(/Bump!/)).toBeNull();
});
