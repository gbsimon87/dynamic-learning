import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import SolarFlightControls from '../../src/pages/skills/geography/SolarFlightControls.jsx';
import { FLIGHT_CLUES } from '../../src/pages/skills/geography/flightClues.js';
import { isMuted } from '../../src/components/celebration/sound/player.js';
import { speak } from '../../src/utils/speech.js';
vi.mock('../../src/utils/speech.js', () => ({ speak: vi.fn(), stopNarration: vi.fn() }));
vi.mock('../../src/components/celebration/sound/player.js', () => ({ isMuted: vi.fn(() => false) }));
beforeEach(() => { vi.spyOn(Math, "random").mockReturnValue(.9999); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.clearAllMocks(); });
const api = { setStick: vi.fn(), setThrust: vi.fn(), brake: vi.fn(), face: vi.fn(), home: vi.fn(), setGoal: vi.fn(), setBoost: vi.fn() };
const bodies = ['Earth', 'Mars'].map(id => ({ id, name: id, kind: 'planet' }));
test('touch steering and thrust release on cancellation; navigation and cleanup stay safe', () => {
  const close = vi.fn(), practice = vi.fn();
  const { unmount, rerender } = render(<SolarFlightControls api={api} bodies={bodies} onClose={close} onPractice={practice} />);
  const joystick = screen.getByRole('group', { name: 'Joystick' });
  vi.spyOn(joystick, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 136, height: 136 });
  fireEvent.pointerDown(joystick, { pointerId: 1, clientX: 90, clientY: 68 });
  expect(api.setStick).toHaveBeenCalled();
  fireEvent.pointerCancel(joystick, { pointerId: 1 }); expect(api.setStick).toHaveBeenLastCalledWith(0, 0);
  const go = screen.getByRole('button', { name: 'Thrust' });
  fireEvent.pointerDown(go, { pointerId: 2 }); expect(api.setThrust).toHaveBeenLastCalledWith(true);
  fireEvent.lostPointerCapture(go, { pointerId: 2 }); expect(api.setThrust).toHaveBeenLastCalledWith(false);
  fireEvent.click(screen.getByRole('button', { name: /Where to/ }));
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Earth' } });
  // Live speed updates must not steal focus from the destination select.
  screen.getByRole('combobox').focus();
  rerender(<SolarFlightControls api={api} bodies={bodies} view={{ name: 'Earth', speed: 3 }} onClose={() => close()} onPractice={practice} />);
  expect(document.activeElement).toBe(screen.getByRole('combobox'));
  fireEvent.click(screen.getByText('Point rocket here')); expect(api.face).toHaveBeenCalledWith('Earth');
  fireEvent.click(screen.getByRole('button', { name: /More/ }));
  fireEvent.click(screen.getByText('Back to Earth')); expect(api.home).toHaveBeenCalledOnce();
  fireEvent.click(screen.getByText('Stop')); expect(api.brake).toHaveBeenCalled();
  expect(screen.queryByText('Practice game')).toBeNull();
  fireEvent.keyDown(window, { key: 'Escape' }); expect(close).toHaveBeenCalledOnce();
  unmount(); expect(api.brake).toHaveBeenCalled();
});

const allBodies = [...new Set(FLIGHT_CLUES.map(c => c.target))].map(id => ({ id, name: id.split('/').at(-1), kind: id.includes('/') ? 'moon' : 'planet' }));
const noop = () => {};
const goalToken = () => api.setGoal.mock.calls.at(-1)[1];

test('hints are free, wrong arrivals do not award stars, and duplicate/stale arrivals cannot award again', () => {
  const props = { api, bodies: allBodies, onClose: noop, onPractice: noop };
  const { rerender, unmount } = render(<SolarFlightControls {...props} />);
  expect(screen.getByText(/what people call the red planet/)).toBeTruthy();
  const token = goalToken();
  fireEvent.click(screen.getByRole('button', { name: /Hint/ })); expect(screen.getByText('Look for Mars.')).toBeTruthy();
  fireEvent.click(screen.getByText('Help me steer')); expect(api.face).toHaveBeenLastCalledWith('Mars');
  rerender(<SolarFlightControls {...props} view={{ arrival: { target: 'Venus', token }, navigationArrived: 'Venus' }} />);
  expect(screen.getByText('You reached Venus. Keep following the clue!')).toBeTruthy();
  expect(screen.getByLabelText('0 stars earned')).toBeTruthy();
  rerender(<SolarFlightControls {...props} view={{ arrival: { target: 'Mars', token } }} />);
  expect(screen.getByText('✅ You found Mars!')).toBeTruthy();
  expect(screen.getByLabelText('1 stars earned')).toBeTruthy();
  expect(screen.getByText('First discovery')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Thrust' }).disabled).toBe(true);
  rerender(<SolarFlightControls {...props} view={{ arrival: { target: 'Mars', token } }} />);
  expect(screen.getByLabelText('1 stars earned')).toBeTruthy();
  fireEvent.click(screen.getByText('Next clue →'));
  expect(screen.getByText(/our home planet/)).toBeTruthy();
  expect(screen.queryByText('Look for Mars.')).toBeNull();
  expect(screen.getByRole('button', { name: 'Thrust' }).disabled).toBe(false);
  rerender(<SolarFlightControls {...props} view={{ arrival: { target: 'Mars', token } }} />);
  expect(screen.getByLabelText('1 stars earned')).toBeTruthy();
  expect(screen.queryByText('✅ You found Mars!')).toBeNull();
  unmount(); expect(api.setGoal).toHaveBeenLastCalledWith(null);
  // The previous flight's final arrival must not reward a fresh adventure.
  render(<SolarFlightControls {...props} view={{ arrival: { target: 'Mars', token } }} />);
  expect(screen.getByLabelText('0 stars earned')).toBeTruthy();
});

test('a full clue adventure earns 25 stars, milestone badges and a fresh replay', () => {
  const props = { api, bodies: allBodies, onClose: noop, onPractice: noop };
  const { rerender } = render(<SolarFlightControls {...props} />);
  for (let i = 0; i < FLIGHT_CLUES.length; i++) {
    const clue = FLIGHT_CLUES[i];
    rerender(<SolarFlightControls {...props} view={{ arrival: { target: clue.target, token: goalToken() } }} />);
    expect(screen.getByLabelText(`${i + 1} stars earned`)).toBeTruthy();
    expect(screen.getByRole('status').textContent).toContain('You found');
    if (i < FLIGHT_CLUES.length - 1) fireEvent.click(screen.getByText('Next clue →'));
  }
  expect(screen.getByText('Star Pilot')).toBeTruthy();
  expect(screen.getByText(/Adventure finished! You earned 25 stars/)).toBeTruthy();
  const lastToken = goalToken();
  fireEvent.click(screen.getByText('New adventure'));
  expect(goalToken()).not.toBe(lastToken);
  expect(screen.getByLabelText('0 stars earned')).toBeTruthy();
  expect(screen.getByText('Clue 1 / 25')).toBeTruthy();
});

test('clue and discovery read-aloud obey mute; the focused GO button supports keyboard thrust', () => {
  const props = { api, bodies: allBodies, onClose: noop, onPractice: noop };
  const { rerender } = render(<SolarFlightControls {...props} />);
  isMuted.mockReturnValue(true); fireEvent.click(screen.getByRole('button', { name: 'Read clue' })); expect(speak).not.toHaveBeenCalled();
  isMuted.mockReturnValue(false); fireEvent.click(screen.getByRole('button', { name: 'Read clue' })); expect(speak).toHaveBeenCalledWith(FLIGHT_CLUES[0].clue);
  const go = screen.getByRole('button', { name: 'Thrust' });
  fireEvent.keyDown(go, { key: ' ' }); expect(api.setThrust).toHaveBeenLastCalledWith(true);
  fireEvent.keyUp(go, { key: ' ' }); expect(api.setThrust).toHaveBeenLastCalledWith(false);
  rerender(<SolarFlightControls {...props} view={{ arrival: { target: 'Mars', token: goalToken() } }} />);
  fireEvent.click(screen.getByText('Read discovery')); expect(speak.mock.calls.at(-1)[0]).toContain('You found Mars!');
  isMuted.mockReturnValue(true); const calls = speak.mock.calls.length;
  fireEvent.click(screen.getByText('Read discovery')); expect(speak).toHaveBeenCalledTimes(calls);
});

test('flight tools open one compact panel at a time and Turbo releases on capture loss', () => {
  render(<SolarFlightControls api={api} bodies={allBodies} onClose={noop} />);
  expect(screen.queryByRole('combobox')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /Where to/ }));
  expect(screen.getByRole('combobox')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Hint/ }));
  expect(screen.queryByRole('combobox')).toBeNull();
  expect(screen.getByText('Look for Mars.')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Hint/ }));
  expect(screen.queryByText('Look for Mars.')).toBeNull();
  const turbo = screen.getByRole('button', { name: 'Hold Turbo to boost' });
  fireEvent.pointerDown(turbo, { pointerId: 8 }); expect(api.setBoost).toHaveBeenLastCalledWith(true);
  fireEvent.lostPointerCapture(turbo, { pointerId: 8 }); expect(api.setBoost).toHaveBeenLastCalledWith(false);
  fireEvent.keyDown(turbo, { key: 'Enter' }); expect(api.setBoost).toHaveBeenLastCalledWith(true);
  fireEvent.keyUp(turbo, { key: 'Enter' }); expect(api.setBoost).toHaveBeenLastCalledWith(false);
});

test('Stop brakes on touch-down, so it works while another finger holds GO', () => {
  render(<SolarFlightControls api={api} bodies={bodies} onClose={noop} />);
  const go = screen.getByRole('button', { name: 'Thrust' });
  fireEvent.pointerDown(go, { pointerId: 1 }); expect(go.className).toContain('is-on');
  fireEvent.pointerDown(screen.getByRole('button', { name: 'Stop' }), { pointerId: 2 });
  expect(api.brake).toHaveBeenCalled();
  expect(go.className).not.toContain('is-on');
});
