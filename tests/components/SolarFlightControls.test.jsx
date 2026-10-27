import React from 'react';
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import SolarFlightControls from '../../src/pages/skills/geography/SolarFlightControls.jsx';
import { FLIGHT_CLUES } from '../../src/pages/skills/geography/flightClues.js';
import { HOME_SYSTEM } from '../../src/pages/skills/geography/systems/home.js';
import { TEST_SYSTEM } from '../../src/pages/skills/geography/systems/fixtures/testSystem.js';

// The HUD takes its clues, badges and wording from the system definition.
// One chapter starts at once; chapter choosing has its own tests below.
const ONE_CHAPTER = [{ id: 'all', name: 'All', icon: '🚀', promise: 'Everything', clueIds: FLIGHT_CLUES.map(c => c.id) }];
const HOME_FLIGHT = { clues: HOME_SYSTEM.flight.clues, chapters: ONE_CHAPTER, badges: HOME_SYSTEM.flight.badges, startName: 'Earth', systemName: 'Solar System', systemPhrase: 'the Solar System' };
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
  const { unmount, rerender } = render(<SolarFlightControls {...HOME_FLIGHT} api={api} bodies={bodies} onClose={close} onPractice={practice} />);
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
  rerender(<SolarFlightControls {...HOME_FLIGHT} api={api} bodies={bodies} view={{ name: 'Earth', speed: 3, engineTime: 30 }} onClose={() => close()} onPractice={practice} />);
  expect(document.activeElement).toBe(screen.getByRole('combobox'));
  fireEvent.click(screen.getByText('Point rocket here')); expect(api.face).toHaveBeenCalledWith('Earth');
  fireEvent.click(screen.getByRole('button', { name: /More/ }));
  fireEvent.click(screen.getByText('Back to Earth')); expect(api.home).toHaveBeenCalledOnce();
  expect(screen.queryByText('Practice game')).toBeNull();
  fireEvent.keyDown(window, { key: 'Escape' }); expect(close).toHaveBeenCalledOnce();
  unmount(); expect(api.brake).toHaveBeenCalled();
});

const allBodies = [...new Set(FLIGHT_CLUES.map(c => c.target))].map(id => ({ id, name: id.split('/').at(-1), kind: id.includes('/') ? 'moon' : 'planet' }));
const noop = () => {};
const goalToken = () => api.setGoal.mock.calls.at(-1)[1];

test('hints are free, wrong arrivals do not award stars, and duplicate/stale arrivals cannot award again', () => {
  const props = { api, bodies: allBodies, onClose: noop, onPractice: noop };
  const { rerender, unmount } = render(<SolarFlightControls {...HOME_FLIGHT} {...props} />);
  expect(screen.getByText(/what people call the red planet/)).toBeTruthy();
  const token = goalToken();
  fireEvent.click(screen.getByRole('button', { name: /Hint/ })); expect(screen.getByText('Look for Mars.')).toBeTruthy();
  rerender(<SolarFlightControls {...HOME_FLIGHT} {...props} view={{ engineTime: 30 }} />);
  fireEvent.click(screen.getByText('Help me steer')); expect(api.face).toHaveBeenLastCalledWith('Mars');
  rerender(<SolarFlightControls {...HOME_FLIGHT} {...props} view={{ arrival: { target: 'Venus', token }, navigationArrived: 'Venus' }} />);
  expect(screen.getByText('You reached Venus. Keep following the clue!')).toBeTruthy();
  expect(screen.getByLabelText('0 stars earned')).toBeTruthy();
  rerender(<SolarFlightControls {...HOME_FLIGHT} {...props} view={{ arrival: { target: 'Mars', token } }} />);
  expect(screen.getByText('✅ You found Mars!')).toBeTruthy();
  expect(screen.getByLabelText('1 stars earned')).toBeTruthy();
  expect(screen.getByText('First discovery')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Thrust' }).disabled).toBe(true);
  rerender(<SolarFlightControls {...HOME_FLIGHT} {...props} view={{ arrival: { target: 'Mars', token } }} />);
  expect(screen.getByLabelText('1 stars earned')).toBeTruthy();
  fireEvent.click(screen.getByText('Keep going →'));
  expect(screen.getByText(/Now find Phobos/)).toBeTruthy();
  expect(screen.queryByText('Look for Mars.')).toBeNull();
  expect(screen.getByRole('button', { name: 'Thrust' }).disabled).toBe(false);
  rerender(<SolarFlightControls {...HOME_FLIGHT} {...props} view={{ arrival: { target: 'Mars', token } }} />);
  expect(screen.getByLabelText('1 stars earned')).toBeTruthy();
  expect(screen.queryByText('✅ You found Mars!')).toBeNull();
  unmount(); expect(api.setGoal).toHaveBeenLastCalledWith(null);
  // The previous flight's final arrival must not reward a fresh adventure.
  render(<SolarFlightControls {...HOME_FLIGHT} {...props} view={{ arrival: { target: 'Mars', token } }} />);
  expect(screen.getByLabelText('0 stars earned')).toBeTruthy();
});

test('a chapter of about five finds ends with its card; playing again keeps the stars and starts fresh', () => {
  const props = { api, bodies: allBodies, onClose: noop, onPractice: noop };
  const { rerender } = render(<SolarFlightControls {...HOME_FLIGHT} {...props} />);
  const labels = [];
  for (let i = 0; i < 5; i++) {
    const target = api.setGoal.mock.calls.at(-1)[0];
    rerender(<SolarFlightControls {...HOME_FLIGHT} {...props} view={{ arrival: { target, token: goalToken() } }} />);
    expect(screen.getByLabelText(`${i + 1} stars earned`)).toBeTruthy();
    if (i === 4) expect(screen.getByText('Space Scout')).toBeTruthy();
    const next = screen.getByRole('button', { name: /Keep going|Next clue|Finish adventure/ });
    labels.push(next.textContent); fireEvent.click(next);
  }
  expect(labels).toEqual(['Keep going →', 'Next clue →', 'Keep going →', 'Next clue →', 'Finish adventure']);
  expect(screen.getByText('🎉 All complete!')).toBeTruthy();
  expect(screen.getByRole('list', { name: 'What you found' }).children).toHaveLength(5);
  expect(api.setGoal).toHaveBeenLastCalledWith(null, null);
  const lastToken = goalToken();
  fireEvent.click(screen.getByText('Play All again'));
  expect(goalToken()).not.toBe(lastToken);
  expect(screen.getByLabelText('5 stars earned')).toBeTruthy();
  expect(screen.getByText(/Clue 1 \/ 5/)).toBeTruthy();
});

test('choosing a camera returns desktop keyboard focus to the flight surface', () => {
  const onCameraViewChange = vi.fn();
  const props = { api, bodies, onClose: noop, onCameraViewChange };
  const { rerender } = render(<SolarFlightControls {...HOME_FLIGHT} {...props} />);
  const viewChoices = screen.getByRole('group', { name: 'Camera view' });
  fireEvent.click(within(viewChoices).getByRole('button', { name: /Cockpit/ }));
  expect(onCameraViewChange).toHaveBeenCalledWith('cockpit');
  expect(document.activeElement).toBe(screen.getByRole('region', { name: 'Fly through the Solar System' }));
  rerender(<SolarFlightControls {...HOME_FLIGHT} {...props} cameraView="cockpit" />);
  fireEvent.click(screen.getByRole('button', { name: 'Collapse flight panel' }));
  const cameraToggle = screen.getByRole('button', { name: 'Switch to Behind rocket camera' });
  fireEvent.click(cameraToggle);
  expect(onCameraViewChange).toHaveBeenLastCalledWith('behind');
  fireEvent.keyDown(window, { key: 'c' });
  expect(onCameraViewChange).toHaveBeenLastCalledWith('behind');
  expect(document.activeElement).toBe(screen.getByRole('region', { name: 'Fly through the Solar System' }));
});

test('clue and discovery read-aloud obey mute; the focused GO button supports keyboard thrust', () => {
  const props = { api, bodies: allBodies, onClose: noop, onPractice: noop };
  const { rerender } = render(<SolarFlightControls {...HOME_FLIGHT} {...props} />);
  isMuted.mockReturnValue(true); fireEvent.click(screen.getByRole('button', { name: 'Read clue' })); expect(speak).not.toHaveBeenCalled();
  isMuted.mockReturnValue(false); fireEvent.click(screen.getByRole('button', { name: 'Read clue' })); expect(speak).toHaveBeenCalledWith(FLIGHT_CLUES[0].clue);
  const go = screen.getByRole('button', { name: 'Thrust' });
  fireEvent.keyDown(go, { key: ' ' }); expect(api.setThrust).toHaveBeenLastCalledWith(true);
  fireEvent.keyUp(go, { key: ' ' }); expect(api.setThrust).toHaveBeenLastCalledWith(false);
  rerender(<SolarFlightControls {...HOME_FLIGHT} {...props} view={{ arrival: { target: 'Mars', token: goalToken() } }} />);
  fireEvent.click(screen.getByText('Read discovery')); expect(speak.mock.calls.at(-1)[0]).toContain('You found Mars!');
  isMuted.mockReturnValue(true); const calls = speak.mock.calls.length;
  fireEvent.click(screen.getByText('Read discovery')); expect(speak).toHaveBeenCalledTimes(calls);
});

test('flight tools open one compact panel at a time and Turbo releases on capture loss', () => {
  render(<SolarFlightControls {...HOME_FLIGHT} api={api} bodies={allBodies} onClose={noop} />);
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

test('flight panel collapses and expands; touch layout has no Stop button', () => {
  render(<SolarFlightControls {...HOME_FLIGHT} api={api} bodies={bodies} onClose={noop} />);
  expect(screen.getByRole('group', { name: 'Joystick' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Thrust' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Hold Turbo to boost' })).toBeTruthy();
  expect(screen.queryByRole('button', { name: 'Stop' })).toBeNull();
  const details = document.querySelector('#solar-flight-details');
  const collapse = screen.getByRole('button', { name: 'Collapse flight panel' });
  fireEvent.click(collapse);
  expect(details.hidden).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: 'Expand flight panel' }));
  expect(details.hidden).toBe(false);
});

test('another system names its own start world and system, and uses its own clues', () => {
  const api = { setGoal: vi.fn(), home: vi.fn(), face: vi.fn(), setThrust: vi.fn(), setBoost: vi.fn(), setStick: vi.fn(), brake: vi.fn(), enterOrbit: vi.fn(), leaveOrbit: vi.fn() };
  const bodies = TEST_SYSTEM.planets.map(({ id, name }) => ({ id, name, kind: 'planet' }));
  render(<SolarFlightControls api={api} bodies={bodies} onClose={() => {}} clues={TEST_SYSTEM.flight.clues} badges={TEST_SYSTEM.flight.badges} startName="Test b" systemName="Test System" systemPhrase="the Test System" />);
  expect(screen.getByRole('region', { name: 'Fly through the Test System' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Back to Test System' })).toBeTruthy();
  expect(screen.getByText(/Clue 1 \/ 2/)).toBeTruthy();
  expect(TEST_SYSTEM.flight.clues.map(c => c.clue)).toContain(screen.getByText(/Find the/).textContent);
  fireEvent.click(screen.getByRole('button', { name: /More/ }));
  fireEvent.click(screen.getByText('Back to Test b'));
  expect(api.home).toHaveBeenCalledOnce();
});

test('no Warp to Beyond button at the edge any more; a trip shows the trip HUD', () => {
  const turnBack = vi.fn();
  render(<SolarFlightControls {...HOME_FLIGHT} api={{ ...api, turnBack }} bodies={bodies} onClose={() => {}}
    view={{ trip: { phase: 'warning', mode: 'flown', secondsLeft: 3, progress: 0, calm: false, distanceLy: 40.66, toPhrase: 'TRAPPIST-1', fromPhrase: 'the Solar System', toHome: false } }} />);
  expect(screen.queryByRole('button', { name: /Warp to Beyond/ })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Turn back' }));
  expect(turnBack).toHaveBeenCalledTimes(1);
});

test('Home button shows only away from home and starts an autopilot trip', () => {
  const onHome = vi.fn();
  const { rerender } = render(<SolarFlightControls {...HOME_FLIGHT} api={api} bodies={bodies} onClose={() => {}} />);
  expect(screen.queryByRole('button', { name: /Fly home/ })).toBeNull();
  rerender(<SolarFlightControls {...HOME_FLIGHT} api={api} bodies={bodies} onClose={() => {}} onHome={onHome} homePhrase="the Solar System" />);
  fireEvent.click(screen.getByRole('button', { name: 'Fly home to the Solar System' }));
  expect(onHome).toHaveBeenCalledTimes(1);
  expect(api.brake).toHaveBeenCalled();
  rerender(<SolarFlightControls {...HOME_FLIGHT} api={api} bodies={bodies} onClose={() => {}} onHome={onHome} homePhrase="the Solar System"
    view={{ trip: { phase: 'departing', mode: 'autopilot', secondsLeft: 5, progress: .2, calm: false, distanceLy: 40.66, toPhrase: 'the Solar System', fromPhrase: 'TRAPPIST-1', toHome: true } }} />);
  expect(screen.queryByRole('button', { name: /Fly home/ })).toBeNull();
});

test('while the next system loads, the panel cannot be closed (button or Escape)', () => {
  const close = vi.fn();
  const trip = { phase: 'departing', mode: 'flown', secondsLeft: 3, progress: .5, calm: false, distanceLy: 40.66, toPhrase: 'TRAPPIST-1', fromPhrase: 'the Solar System', toHome: false };
  const { rerender } = render(<SolarFlightControls {...HOME_FLIGHT} api={api} bodies={bodies} onClose={close} view={{ trip: { ...trip, waiting: true } }} />);
  expect(screen.getByRole('button', { name: `Back to ${HOME_FLIGHT.systemName}` }).disabled).toBe(true);
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(close).not.toHaveBeenCalled();
  rerender(<SolarFlightControls {...HOME_FLIGHT} api={api} bodies={bodies} onClose={close} view={{ trip: { ...trip, waiting: false } }} />);
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(close).toHaveBeenCalledOnce();
});

test('during the hand-over wait, Back to start and Turn back are disabled', () => {
  const trip = { phase: 'departing', mode: 'flown', secondsLeft: 3, progress: .5, calm: false, distanceLy: 40.66, toPhrase: 'TRAPPIST-1', fromPhrase: 'the Solar System', toHome: false, waiting: true };
  render(<SolarFlightControls {...HOME_FLIGHT} api={api} bodies={bodies} onClose={() => {}} view={{ trip }} />);
  expect(screen.getByRole('button', { name: /Turn back/ }).disabled).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: /More/ }));
  const back = screen.queryByRole('button', { name: 'Back to Earth' });
  expect(back.disabled).toBe(true);
});
