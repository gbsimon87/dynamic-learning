import { StrictMode } from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { beforeEach, expect, it, vi } from 'vitest';
import OceanExplorer from '../../src/pages/skills/geography/OceanExplorer';
import SkillGameLayout from '../../src/components/skills/SkillGameLayout';
import SkillsPage from '../../src/pages/skills/SkillsPage';
import { OCEAN_DISCOVERIES } from '../../src/pages/skills/geography/oceanDiscoveries.js';
import { speak, stopNarrationOf } from '../../src/utils/speech.js';

const scenes = vi.hoisted(() => []);
const speech = vi.hoisted(() => ({ speak: vi.fn(), stopNarrationOf: vi.fn() }));
vi.mock('../../src/pages/skills/geography/oceanScene.js', () => ({
  createOceanScene: vi.fn((options) => {
    let view = 'behind';
    const api = { resetView: vi.fn(), toggleCameraView: vi.fn(() => { options.onCameraViewChange?.(view = view === 'behind' ? 'cockpit' : 'behind'); }), setWaterPaused: vi.fn(), setSteering: vi.fn(), returnToStart: vi.fn(), enterOrbit: vi.fn(() => true), leaveOrbit: vi.fn(), tourTo: vi.fn(() => true), setTourPaused: vi.fn(), handleViewKey: vi.fn((event) => event.key === '+' || (event.shiftKey && event.key.startsWith('Arrow'))), dispose: vi.fn() };
    scenes.push({ ...options, ...api });
    return api;
  }),
}));

vi.mock('../../src/utils/speech.js', () => speech);
vi.mock('../../src/components/celebration/sound/player.js', () => ({ isMuted: () => false }));

const renderOcean = (ui = <OceanExplorer />) => render(<MemoryRouter>{ui}</MemoryRouter>);

beforeEach(() => { scenes.length = 0; speech.speak.mockReset(); speech.stopNarrationOf.mockReset(); });

it('waits for a rendered scene, resets it and delegates only supported view keys', () => {
  renderOcean();
  const reset = screen.getByRole('button', { name: 'Reset view' });
  const canvas = screen.getByLabelText('Submarine viewing area');
  expect(screen.getByRole('status').textContent).toMatch(/Diving/);
  expect(reset.disabled).toBe(true);
  act(() => scenes[0].onReady());
  expect(screen.queryByRole('status')).toBeNull();
  expect(reset.disabled).toBe(false);
  fireEvent.click(reset);
  expect(scenes[0].resetView).toHaveBeenCalledOnce();
  expect(fireEvent.keyDown(canvas, { key: '+' })).toBe(false);
  expect(fireEvent.keyDown(canvas, { key: 'ArrowLeft', shiftKey: true })).toBe(false);
  expect(fireEvent.keyDown(canvas, { key: 'Tab' })).toBe(true);
  expect(scenes[0].handleViewKey).toHaveBeenCalledTimes(3);
  expect(scenes[0].setSteering).not.toHaveBeenCalled();
});

it('offers pause/resume and keeps the ocean still for reduced motion', () => {
  renderOcean();
  act(() => { scenes[0].onWaterMotionChange({ paused: false, reduced: false }); scenes[0].onReady(); });
  fireEvent.click(screen.getByRole('button', { name: 'Pause ocean' }));
  expect(scenes[0].setWaterPaused).toHaveBeenLastCalledWith(true);
  act(() => scenes[0].onWaterMotionChange({ paused: true, reduced: false }));
  fireEvent.click(screen.getByRole('button', { name: 'Resume ocean' }));
  expect(scenes[0].setWaterPaused).toHaveBeenLastCalledWith(false);
  act(() => scenes[0].onWaterMotionChange({ paused: true, reduced: true }));
  expect(screen.getByRole('button', { name: 'Still ocean' }).disabled).toBe(true);
});

it('switches camera with C or the menu and ignores held keys, shortcuts and typing', () => {
  const { container, unmount } = renderOcean();
  const button = () => screen.getByRole('button', { name: /view C/ });
  expect(button().disabled).toBe(true);
  fireEvent.keyDown(document.body, { key: 'c' });
  expect(scenes[0].toggleCameraView).not.toHaveBeenCalled();
  act(() => scenes[0].onReady());
  fireEvent.keyDown(document.body, { key: 'c' });
  expect(button().getAttribute('aria-pressed')).toBe('true');
  expect(container.querySelector('.ocean-cockpit')).toBeTruthy();
  fireEvent.keyDown(document.body, { key: 'C', repeat: true });
  for (const modifier of ['ctrlKey', 'altKey', 'metaKey']) fireEvent.keyDown(document.body, { key: 'c', [modifier]: true });
  const input = document.createElement('input');
  document.body.append(input);
  fireEvent.keyDown(input, { key: 'c' });
  input.remove();
  expect(scenes[0].toggleCameraView).toHaveBeenCalledOnce();
  fireEvent.keyDown(screen.getByLabelText('Submarine viewing area'), { key: 'C' });
  expect(button().getAttribute('aria-pressed')).toBe('false');
  expect(container.querySelector('.ocean-cockpit')).toBeNull();
  fireEvent.click(button());
  expect(button().getAttribute('aria-pressed')).toBe('true');
  unmount();
  fireEvent.keyDown(document.body, { key: 'c' });
  expect(scenes[0].toggleCameraView).toHaveBeenCalledTimes(3);
});

it('keeps an honest unavailable message and disables reset when the scene fails', () => {
  renderOcean();
  act(() => scenes[0].onUnavailable());
  expect(screen.getByRole('status').textContent).toMatch(/unavailable on this device/);
  expect(screen.getByRole('button', { name: 'Reset view' }).disabled).toBe(true);
  expect(screen.getByLabelText('Submarine viewing area').tabIndex).toBe(-1);
});

it('disposes StrictMode setups and ignores callbacks from an old scene', () => {
  const { unmount } = render(<StrictMode><MemoryRouter><OceanExplorer /></MemoryRouter></StrictMode>);
  expect(scenes).toHaveLength(2);
  expect(scenes[0].dispose).toHaveBeenCalledOnce();
  act(() => scenes[1].onReady());
  act(() => scenes[0].onUnavailable());
  expect(screen.getByRole('button', { name: 'Reset view' }).disabled).toBe(false);
  unmount();
  expect(scenes[1].dispose).toHaveBeenCalledOnce();
});

it('steers from held keys, ignores repeats and releases everything on blur', () => {
  renderOcean();
  act(() => scenes[0].onReady());
  const canvas = screen.getByLabelText('Submarine viewing area');
  const last = () => scenes[0].setSteering.mock.calls.at(-1)[0];
  expect(fireEvent.keyDown(canvas, { key: ' ' })).toBe(false);
  expect(last()).toEqual({ turn: 0, throttle: 1, lift: 0 });
  fireEvent.keyDown(canvas, { key: 'D' });
  fireEvent.keyDown(canvas, { key: 'ArrowUp' });
  expect(last()).toEqual({ turn: 1, throttle: 1, lift: 1 });
  const calls = scenes[0].setSteering.mock.calls.length;
  fireEvent.keyDown(canvas, { key: 'ArrowUp', repeat: true });
  expect(scenes[0].setSteering).toHaveBeenCalledTimes(calls);
  fireEvent.keyUp(canvas, { key: ' ' });
  expect(last()).toEqual({ turn: 1, throttle: 0, lift: 1 });
  fireEvent.blur(canvas);
  expect(last()).toEqual({ turn: 0, throttle: 0, lift: 0 });
});

it('drives with the joystick and GO, releasing them on pointer up and cancel', () => {
  renderOcean();
  act(() => scenes[0].onReady());
  // stickVector can report -0 on a level stick.
  const last = () => Object.fromEntries(Object.entries(scenes[0].setSteering.mock.calls.at(-1)[0]).map(([key, value]) => [key, value + 0]));
  const stick = screen.getByRole('group', { name: 'Joystick' });
  stick.getBoundingClientRect = () => ({ left: 0, top: 0, width: 128, height: 128 });
  fireEvent.pointerDown(stick, { pointerId: 1, clientX: 128, clientY: 64 });
  expect(last()).toEqual({ turn: 1, throttle: 0, lift: 0 });
  const go = screen.getByRole('button', { name: 'Hold GO to move' });
  fireEvent.pointerDown(go, { pointerId: 2 });
  expect(last()).toEqual({ turn: 1, throttle: 1, lift: 0 });
  fireEvent.pointerCancel(stick, { pointerId: 1 });
  expect(last()).toEqual({ turn: 0, throttle: 1, lift: 0 });
  fireEvent.pointerUp(go, { pointerId: 2 });
  expect(last()).toEqual({ turn: 0, throttle: 0, lift: 0 });
});

it('sends the submarine back to the start once the scene is ready', () => {
  renderOcean();
  const back = screen.getByRole('button', { name: 'Back to start' });
  expect(back.disabled).toBe(true);
  expect(screen.queryByRole('button', { name: 'Hold GO to move' })).toBeNull();
  act(() => scenes[0].onReady());
  fireEvent.click(back);
  expect(scenes[0].returnToStart).toHaveBeenCalledOnce();
});

it('takes a pauseable guided tour through existing discoveries', () => {
  renderOcean();
  act(() => scenes[0].onReady());
  fireEvent.click(screen.getByRole('button', { name: 'Start reef tour' }));
  expect(scenes[0].tourTo).toHaveBeenCalledWith('coral-reef');
  expect(screen.getByRole('status').textContent).toMatch(/heading to Coral reef/i);

  act(() => scenes[0].onOrbitChange({ ...REEF, steady: false }));
  expect(screen.getByText('Tour stop 1 of 3')).toBeTruthy();
  expect(speak).toHaveBeenCalledOnce();

  fireEvent.click(screen.getByRole('button', { name: 'Pause tour' }));
  expect(scenes[0].setTourPaused).toHaveBeenLastCalledWith(true);
  expect(stopNarrationOf).toHaveBeenCalledOnce();
  expect(screen.getByRole('button', { name: 'Next' }).disabled).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: 'Resume tour' }));
  fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  expect(scenes[0].tourTo).toHaveBeenLastCalledWith('parrotfish');
  fireEvent.click(screen.getByRole('button', { name: 'Skip tour' }));
  expect(scenes[0].leaveOrbit).toHaveBeenCalledOnce();
  expect(screen.getByRole('button', { name: 'Start reef tour' })).toBeTruthy();
});

it('opens from the real Skills catalogue and returns through its back link', async () => {
  const router = createMemoryRouter([
    { path: '/skills', element: <SkillsPage /> },
    { element: <SkillGameLayout />, children: [{ path: '/skills/ocean-explorer', element: <OceanExplorer /> }] },
  ], { initialEntries: ['/skills'] });
  render(<RouterProvider router={router} />);
  await userEvent.click(screen.getByRole('link', { name: 'Explore the Ocean (preview)', exact: true }));
  expect(screen.getByRole('heading', { name: 'Ocean Explorer' })).toBeTruthy();
  await userEvent.click(within(screen.getByRole('region', { name: 'Ocean Explorer' })).getByRole('link', { name: 'Back to Skills' }));
  expect(screen.getByRole('heading', { name: 'Pick a game' })).toBeTruthy();
  expect(scenes[0].dispose).toHaveBeenCalledOnce();
});

const REEF = { id: 'coral-reef', name: 'Coral reef' };
const orbitReady = () => {
  renderOcean();
  act(() => scenes[0].onReady());
  act(() => scenes[0].onOrbitOffer(REEF));
};
const startOrbit = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Orbit Coral reef' }));
  act(() => scenes[0].onOrbitChange({ ...REEF, steady: false }));
};

it('offers and enters orbit', () => {
  orbitReady();
  startOrbit();
  expect(scenes[0].enterOrbit).toHaveBeenCalledOnce();
  expect(screen.getByRole('status').textContent).toBe('Orbiting Coral reef');
  expect(screen.getByRole('complementary', { name: 'Coral reef information' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Leave orbit around Coral reef' })).toBeTruthy();
  act(() => scenes[0].onOrbitOffer(null));
  expect(screen.getByRole('button', { name: 'Leave orbit around Coral reef' })).toBeTruthy();
});

it('closing the card keeps orbiting', () => {
  orbitReady();
  startOrbit();
  fireEvent.click(screen.getByRole('button', { name: 'Hide Coral reef information' }));
  expect(screen.queryByRole('complementary', { name: 'Coral reef information' })).toBeNull();
  expect(screen.getByRole('button', { name: 'Leave orbit around Coral reef' })).toBeTruthy();
  expect(scenes[0].leaveOrbit).not.toHaveBeenCalled();
});

it('leaving orbit closes the card', () => {
  orbitReady();
  startOrbit();
  fireEvent.click(screen.getByRole('button', { name: 'Leave orbit around Coral reef' }));
  expect(scenes[0].leaveOrbit).toHaveBeenCalledOnce();
  act(() => scenes[0].onOrbitChange(null));
  expect(screen.queryByRole('complementary', { name: 'Coral reef information' })).toBeNull();
  expect(screen.getByRole('button', { name: 'Orbit Coral reef' })).toBeTruthy();
  startOrbit();
  fireEvent.keyDown(screen.getByLabelText('Submarine viewing area'), { key: 'Escape' });
  expect(scenes[0].leaveOrbit).toHaveBeenCalledTimes(2);
});

it('Escape leaves orbit even when the viewing area is not focused', () => {
  orbitReady();
  startOrbit();
  fireEvent.keyDown(document.body, { key: 'Escape' });
  expect(scenes[0].leaveOrbit).toHaveBeenCalledOnce();
});

it('the card follows the orbited discovery', () => {
  orbitReady();
  startOrbit();
  fireEvent.click(screen.getByRole('button', { name: 'Leave orbit around Coral reef' }));
  act(() => scenes[0].onOrbitChange(null));
  const FISH = { id: 'parrotfish', name: 'Parrotfish' };
  act(() => scenes[0].onOrbitOffer(FISH));
  fireEvent.click(screen.getByRole('button', { name: 'Orbit Parrotfish' }));
  act(() => scenes[0].onOrbitChange({ ...FISH, steady: false }));
  expect(screen.getByRole('complementary', { name: 'Parrotfish information' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Show parrotfish facts' })).toBeTruthy();
  expect(screen.queryByRole('complementary', { name: 'Coral reef information' })).toBeNull();
});

it('every discovery opens its own card with its own facts heading', () => {
  orbitReady();
  for (const { id, name, factsNoun } of OCEAN_DISCOVERIES) {
    act(() => scenes[0].onOrbitOffer({ id, name }));
    fireEvent.click(screen.getByRole('button', { name: `Orbit ${name}` }));
    act(() => scenes[0].onOrbitChange({ id, name, steady: false }));
    expect(screen.getByRole('complementary', { name: `${name} information` }), name).toBeTruthy();
    expect(screen.getByRole('button', { name: `Show ${factsNoun} facts` }), name).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: `Leave orbit around ${name}` }));
    act(() => scenes[0].onOrbitChange(null));
  }
});
