import React, { StrictMode } from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';
vi.mock('../../src/data/freePlay/spaceMathActivities.js', async importOriginal => ({
  ...await importOriginal(),
  makeSpaceActivity: vi.fn((mode, limit) => mode === 'collect' ? { kind: mode, target: 9 }
    : mode === 'balance' ? { kind: mode, a: 4, b: 3, base: 5, limit }
      : { kind: 'share', aliens: 3, total: 6 }),
}));
vi.mock('../../src/components/celebration/fx/effects.js', () => ({ playEffect: vi.fn() }));
import SpaceArithmeticPanel from '../../src/pages/skills/math/SpaceArithmeticPanel.jsx';
import { makeSpaceActivity } from '../../src/data/freePlay/spaceMathActivities.js';
let api;
const click = name => fireEvent.click(screen.getByRole('button', { name, exact: true }));
const TITLES = { collect: 'Target Collector', balance: 'Balance the Space Station', share: 'Alien Sharing Station' };
const choose = mode => click(TITLES[mode]);
function start(mode, forceStill = false) {
  const ref = React.createRef();
  render(<StrictMode><SpaceArithmeticPanel ref={ref} flightApi={api} forceStill={forceStill} /></StrictMode>);
  choose(mode); click('Start flight');
  return lane => { const [, roundId] = api.prepareRound.mock.calls.at(-1); act(() => ref.current.crossing({ lane, roundId })); return roundId; };
}
beforeEach(() => {
  api = { prepareRound: vi.fn(), setState: vi.fn(), setLane: vi.fn(), setTurbo: vi.fn(), setHot: vi.fn(), setTier: vi.fn(), setMission: vi.fn(), celebrate: vi.fn(), leave: vi.fn() };
});

test('collector collects, undoes and docks through flight gates, continuing straight into the next activity', () => {
  const pass = start('collect');
  pass(2); pass(3);
  expect(screen.getByRole('status', { name: 'Cargo 0 of 9' })).toBeTruthy();
  pass(2); pass(2); pass(2);
  expect(api.prepareRound.mock.calls.at(-1)[0].options).toEqual(['Dock', 'Undo', 'Dock', 'Undo']);
  pass(0);
  expect(screen.getByLabelText('Activities completed: 1')).toBeTruthy();
  expect(api.celebrate).toHaveBeenCalledWith({ kind: 'activity' });
  expect(screen.getByText('3 + 3 + 3 = 9')).toBeTruthy();
  expect(screen.getByRole('status', { name: 'Cargo 0 of 9' })).toBeTruthy();
  expect(screen.queryByRole('button', { name: 'Dock', exact: true })).toBeNull();
});

test('balance uses cargo gates and a docking crossing, with no panel-based gameplay', () => {
  const pass = start('balance');
  pass(3); expect(screen.getByLabelText('Activities completed: 0')).toBeTruthy();
  pass(1);
  expect(api.prepareRound.mock.calls.at(-1)[0].station.cargo).toEqual([1, 1]);
  pass(3); expect(screen.getByLabelText('Activities completed: 1')).toBeTruthy();
  const panel = within(screen.getByRole('region', { name: 'Space Arithmetic' }));
  expect(panel.queryByRole('button', { name: /Add cargo|Remove cargo|Check balance/ })).toBeNull();
});

test('alien bays deliver crystals and pick them back up for redistribution', () => {
  const pass = start('share');
  for (let i = 0; i < 6; i++) pass(0);
  expect(api.prepareRound.mock.calls.at(-1)[0].options[0]).toBe('Pick up 1');
  for (const alien of [1, 1, 2, 2]) { pass(0); pass(alien); }
  expect(screen.getByLabelText('Activities completed: 1')).toBeTruthy();
  expect(screen.queryByRole('button', { name: /Give a crystal|Take a crystal|Check sharing/ })).toBeNull();
});

test('calm play retains a spaceship in the world and steering controls outside the panel', () => {
  start('balance', true);
  expect(screen.getByRole('img', { name: /Spaceship at gate/ })).toBeTruthy();
  click('Fly through'); // initial lane: +2
  expect(screen.getByRole('status', { name: 'Station 4 + 3 and 5 + 2' })).toBeTruthy();
  click('Move right'); click('Move right'); click('Fly through');
  expect(screen.getByLabelText('Activities completed: 1')).toBeTruthy();
  expect(within(screen.getByRole('region', { name: 'Space Arithmetic' })).queryByRole('button', { name: 'Fly through' })).toBeNull();
});

test('pause and help block flight actions, and changing mode clears the activity', () => {
  const pass = start('balance');
  click('Show me'); pass(1); expect(screen.getByRole('region', { name: 'Help' })).toBeTruthy();
  click('Close help'); expect(screen.getByRole('status', { name: 'Station 4 + 3 and 5 + 0' })).toBeTruthy(); pass(1); expect(screen.getByRole('status', { name: 'Station 4 + 3 and 5 + 2' })).toBeTruthy();
  fireEvent.blur(window); pass(0); expect(screen.getByRole('status', { name: 'Station 4 + 3 and 5 + 2' })).toBeTruthy();
  click('Settings'); choose('share'); click('Start flight');
  expect(screen.queryByRole('button', { name: 'Resume' })).toBeNull();
  expect(screen.getByLabelText('Activities completed: 0')).toBeTruthy();
});

test('setup is one short card: mode tiles, a picture example, the gates and the range, with no paragraphs', () => {
  render(<StrictMode><SpaceArithmeticPanel flightApi={api} /></StrictMode>);
  choose('share');
  const card = screen.getByRole('region', { name: 'Space Arithmetic' });
  expect(card.className).toContain('space-activities is-activity-setup');
  expect(within(card).getByRole('group', { name: 'Maths mode' }).querySelectorAll('button')).toHaveLength(4);
  expect(within(card).getByRole('img', { name: /6 crystals shared by 3 aliens/ })).toBeTruthy();
  expect(within(card).getByRole('list', { name: 'Gates' })).toBeTruthy();
  expect(card.querySelectorAll('p:not(.space-activity-example)')).toHaveLength(0);
  click('Up to 20'); click('Start flight');
  expect(makeSpaceActivity).toHaveBeenLastCalledWith('share', 20);
  click('Settings'); click('Laser Blast');
  expect(screen.getByRole('button', { name: 'Sums' })).toBeTruthy();
});

test('Turbo works in every station mode: Shift or the button, stopped by pause or help', () => {
  for (const mode of ['collect', 'balance', 'share']) {
    const view = render(<StrictMode><SpaceArithmeticPanel flightApi={api} /></StrictMode>);
    choose(mode); click('Start flight');
    fireEvent.keyDown(window, { key: 'Shift' }); expect(api.setTurbo).toHaveBeenLastCalledWith(true);
    fireEvent.keyUp(window, { key: 'Shift' }); expect(api.setTurbo).toHaveBeenLastCalledWith(false);
    const turbo = screen.getByRole('button', { name: 'Hold Turbo to fly faster' });
    fireEvent.pointerDown(turbo, { pointerId: 1 }); expect(api.setTurbo).toHaveBeenLastCalledWith(true);
    click('Show me'); expect(api.setTurbo).toHaveBeenLastCalledWith(false);
    click('Close help'); fireEvent.keyDown(window, { key: 'Shift' }); click('Pause');
    expect(api.setTurbo).toHaveBeenLastCalledWith(false);
    view.unmount();
  }
});

test('calm play has no Turbo (nothing is flying)', () => {
  start('collect', true);
  expect(screen.queryByRole('button', { name: 'Hold Turbo to fly faster' })).toBeNull();
});
