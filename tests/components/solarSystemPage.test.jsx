import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { HOME_SYSTEM } from '../../src/pages/skills/geography/systems/home.js';
import { TEST_SYSTEM } from '../../src/pages/skills/geography/systems/fixtures/testSystem.js';

// The 3D scene cannot run in jsdom; the wrapper only decides which system it shows.
const sceneProps = [];
const mounts = [];
vi.mock('../../src/pages/skills/geography/SolarSystem.jsx', async () => {
  const { useEffect } = await import('react');
  return {
    default: function FakeScene(props) {
      sceneProps.push(props);
      useEffect(() => { mounts.push(props.system.id); }, [props.system.id]);
      return <div data-testid="scene">{props.system.name}</div>;
    },
  };
});
vi.mock('../../src/utils/speech.js', () => ({ speak: vi.fn(), stopNarration: vi.fn() }));
vi.mock('../../src/components/celebration/sound/player.js', () => ({ isMuted: vi.fn(() => false) }));
// Loads wait for the test to release them, so a request can arrive mid-load.
const pending = [];
vi.mock('../../src/pages/skills/geography/systems/registry.js', async (original) => {
  const actual = await original();
  const entries = [...actual.SYSTEM_REGISTRY,
    { id: TEST_SYSTEM.id, name: TEST_SYSTEM.name, phrase: TEST_SYSTEM.phrase, home: false, load: () => new Promise((resolve) => pending.push(() => resolve(TEST_SYSTEM))) },
    { id: 'broken-system', name: 'Broken System', phrase: 'the Broken System', home: false, load: () => new Promise((resolve, reject) => pending.push(() => reject(new Error('offline')))) }];
  const registryEntry = (id) => entries.find((entry) => entry.id === id) ?? null;
  return { ...actual, SYSTEM_REGISTRY: entries, registryEntry, loadSystem: (id) => registryEntry(id)?.load() ?? Promise.reject(new Error(id)) };
});

const { default: SolarSystemPage } = await import('../../src/pages/skills/geography/SolarSystemPage.jsx');
const { speak } = await import('../../src/utils/speech.js');
const { isMuted } = await import('../../src/components/celebration/sound/player.js');

beforeEach(() => { sceneProps.length = 0; mounts.length = 0; pending.length = 0; vi.clearAllMocks(); window.history.replaceState(null, '', '/solar-system'); });
const finishLoads = async () => { await act(async () => { while (pending.length) pending.shift()(); }); };
const travel = async (request) => { await act(async () => { sceneProps.at(-1).onTravel(request); }); await finishLoads(); };
const TO_TEST = { to: 'test-system', mode: 'flown', direction: { x: 1, y: 0, z: 0 }, turnedBack: false };
afterEach(() => { window.history.replaceState(null, '', '/'); });

test('renders the home system by default', () => {
  render(<SolarSystemPage />);
  expect(screen.getByTestId('scene').textContent).toBe(HOME_SYSTEM.name);
  expect(sceneProps.at(-1).system).toBe(HOME_SYSTEM);
  expect(sceneProps.at(-1).arrival).toBeNull();
});

test('the ?system= switch is ignored without the adult debug flag', async () => {
  window.history.replaceState(null, '', '/solar-system?system=test-system');
  render(<SolarSystemPage />);
  await act(async () => {});
  expect(sceneProps.at(-1).system).toBe(HOME_SYSTEM);
});

test('with the debug flag, ?system= opens that system', async () => {
  window.history.replaceState(null, '', '/solar-system?debug&system=test-system');
  render(<SolarSystemPage />);
  await finishLoads();
  expect(sceneProps.at(-1).system).toBe(TEST_SYSTEM);
});

test('handoff remounts into the other system with arrival details', async () => {
  render(<SolarSystemPage />);
  await travel(TO_TEST);
  expect(screen.getByTestId('scene').textContent).toBe(TEST_SYSTEM.name);
  expect(mounts).toEqual([HOME_SYSTEM.id, TEST_SYSTEM.id]);
  expect(sceneProps.at(-1).arrival).toEqual({ from: HOME_SYSTEM.id, mode: 'flown', fromDirection: { x: -1, y: 0, z: 0 }, turnedBack: false });
});

test('travel requests while a trip is running are ignored', async () => {
  render(<SolarSystemPage />);
  const { onTravel } = sceneProps.at(-1);
  await act(async () => { onTravel(TO_TEST); onTravel(TO_TEST); onTravel({ ...TO_TEST, to: 'broken-system' }); });
  expect(pending.length).toBe(1);
  expect(screen.getByRole('status').textContent).toContain('Getting the Test System ready');
  // Above the hand-over fade (z-index 60) and the trip panel (65), so a slow load is never hidden.
  expect(Number(screen.getByRole('status').style.zIndex)).toBeGreaterThan(65);
  await finishLoads();
  expect(mounts).toEqual([HOME_SYSTEM.id, TEST_SYSTEM.id]);
  await travel({ to: HOME_SYSTEM.id, mode: 'autopilot', direction: { x: -1, y: 0, z: 0 }, turnedBack: false });
  expect(mounts).toEqual([HOME_SYSTEM.id, TEST_SYSTEM.id, HOME_SYSTEM.id], 'a new trip is accepted once the last one has landed');
});

test('a failed system load lands the child home with a message', async () => {
  render(<SolarSystemPage />);
  await travel(TO_TEST);
  await travel({ ...TO_TEST, to: 'broken-system' });
  expect(sceneProps.at(-1).system).toBe(HOME_SYSTEM);
  expect(sceneProps.at(-1).arrival).toBeNull();
  expect(screen.getByRole('alert').textContent).toBe("We couldn't reach the Broken System. Back home for now.");
  expect(Number(screen.getByRole('alert').style.zIndex)).toBeGreaterThan(65);
  expect(screen.queryByText(/Getting .* ready/)).toBeNull();
});

test('a failed load from home still rebuilds home, so no trip is left hanging', async () => {
  render(<SolarSystemPage />);
  await travel({ ...TO_TEST, to: 'broken-system' });
  expect(mounts).toEqual([HOME_SYSTEM.id, HOME_SYSTEM.id]);
  expect(screen.getByRole('alert')).toBeTruthy();
});

test('arrival welcome speaks once, never when muted, not after turn back', async () => {
  render(<SolarSystemPage />);
  act(() => { sceneProps.at(-1).onArrived(); });
  expect(speak).not.toHaveBeenCalled(); // home has no welcome
  await travel(TO_TEST);
  act(() => { sceneProps.at(-1).onArrived(); sceneProps.at(-1).onArrived(); });
  expect(speak).toHaveBeenCalledTimes(1);
  expect(speak).toHaveBeenCalledWith(TEST_SYSTEM.welcome);
  expect(screen.getByRole('status').textContent).toContain(TEST_SYSTEM.welcome);
  // Turning back mid-arrival lands home without a welcome; flying out again and turning back too.
  await travel({ to: HOME_SYSTEM.id, mode: 'flown', direction: { x: -1, y: 0, z: 0 }, turnedBack: true });
  await travel({ ...TO_TEST, turnedBack: true });
  act(() => { sceneProps.at(-1).onArrived(); });
  expect(speak).toHaveBeenCalledTimes(1);
  expect(screen.queryByText(TEST_SYSTEM.welcome)).toBeNull();
  isMuted.mockReturnValue(true);
  await travel({ to: HOME_SYSTEM.id, mode: 'autopilot', direction: { x: -1, y: 0, z: 0 }, turnedBack: false });
  await travel(TO_TEST);
  act(() => { sceneProps.at(-1).onArrived(); });
  expect(speak).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('status').textContent).toContain(TEST_SYSTEM.welcome);
  isMuted.mockReturnValue(false);
});

test('the "couldn\'t reach" message clears on its own', async () => {
  vi.useFakeTimers();
  try {
    render(<SolarSystemPage />);
    await travel({ ...TO_TEST, to: 'broken-system' });
    expect(screen.getByRole('alert')).toBeTruthy();
    act(() => { vi.advanceTimersByTime(10000); });
    expect(screen.queryByRole('alert')).toBeNull();
  } finally { vi.useRealTimers(); }
});

test('a load that never finishes gives up and lands home with a message', async () => {
  vi.useFakeTimers();
  try {
    render(<SolarSystemPage />);
    await act(async () => { sceneProps.at(-1).onTravel(TO_TEST); });
    expect(screen.getByRole('status').textContent).toContain('Getting the Test System ready');
    await act(async () => { vi.advanceTimersByTime(20000); });
    expect(sceneProps.at(-1).system).toBe(HOME_SYSTEM);
    expect(mounts).toEqual([HOME_SYSTEM.id, HOME_SYSTEM.id], 'home is rebuilt, so the trip is not left hanging');
    expect(screen.getByRole('alert').textContent).toBe("We couldn't reach the Test System. Back home for now.");
    expect(screen.queryByText(/Getting .* ready/)).toBeNull();
    // A retry starts a fresh load; the hung one turning up late changes nothing.
    await act(async () => { sceneProps.at(-1).onTravel(TO_TEST); });
    expect(pending.length).toBe(2);
    await act(async () => { pending.shift()(); });
    expect(sceneProps.at(-1).system).toBe(HOME_SYSTEM, 'the late load is ignored');
    await finishLoads();
    expect(sceneProps.at(-1).system).toBe(TEST_SYSTEM);
  } finally { vi.useRealTimers(); }
});

test('onPrepare starts loading the next system early, and the trip reuses it', async () => {
  render(<SolarSystemPage />);
  await act(async () => { sceneProps.at(-1).onPrepare('test-system'); sceneProps.at(-1).onPrepare('test-system'); });
  expect(pending.length).toBe(1);
  await act(async () => { sceneProps.at(-1).onTravel(TO_TEST); });
  expect(pending.length).toBe(1, 'no second load');
  await finishLoads();
  expect(sceneProps.at(-1).system).toBe(TEST_SYSTEM);
  // A failed early load is forgotten, so the trip itself tries again.
  await act(async () => { sceneProps.at(-1).onPrepare('broken-system'); });
  await finishLoads();
  await act(async () => { sceneProps.at(-1).onTravel({ ...TO_TEST, to: 'broken-system' }); });
  expect(pending.length).toBe(1);
});
