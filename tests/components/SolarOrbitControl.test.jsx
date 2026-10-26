import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import SolarOrbitControl from '../../src/pages/skills/geography/SolarOrbitControl.jsx';
import SolarFlightControls from '../../src/pages/skills/geography/SolarFlightControls.jsx';
import { HOME_SYSTEM } from '../../src/pages/skills/geography/systems/home.js';

// The flight HUD takes its clues, badges and wording from the system definition.
const HOME_FLIGHT = { clues: HOME_SYSTEM.flight.clues, badges: HOME_SYSTEM.flight.badges, startName: 'Earth', systemName: 'Solar System', systemPhrase: 'the Solar System' };


const noop = () => {};
test('orbit entry is optional, has a labelled exit and communicates reduced motion', () => {
  const onEnter = vi.fn(), onLeave = vi.fn();
  const { rerender } = render(<SolarOrbitControl name="Saturn" onEnter={onEnter} onLeave={onLeave} />);
  expect(onEnter).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Orbit Saturn' })); expect(onEnter).toHaveBeenCalledOnce();
  rerender(<SolarOrbitControl name="Saturn" active reducedMotion onEnter={onEnter} onLeave={onLeave} />);
  expect(screen.getByRole('status').textContent).toContain('steady view');
  fireEvent.click(screen.getByRole('button', { name: 'Leave orbit around Saturn' })); expect(onLeave).toHaveBeenCalledOnce();
});

test('manual orbit offer and exit remain accessible with the flight panel collapsed', () => {
  const api = { setGoal: noop, brake: vi.fn(), enterOrbit: vi.fn(), leaveOrbit: vi.fn() };
  const props = { api, bodies: [], onClose: noop };
  const { rerender } = render(<SolarFlightControls {...HOME_FLIGHT} {...props} view={{ orbitPlanet: { name: 'Earth' } }} />);
  fireEvent.click(screen.getByRole('button', { name: 'Collapse flight panel' }));
  fireEvent.click(screen.getByRole('button', { name: 'Orbit Earth' }));
  expect(api.brake).toHaveBeenCalled(); expect(api.enterOrbit).toHaveBeenCalledOnce();
  rerender(<SolarFlightControls {...HOME_FLIGHT} {...props} view={{ orbitPlanet: { name: 'Earth' }, orbiting: true }} />);
  fireEvent.click(screen.getByRole('button', { name: 'Leave orbit around Earth' })); expect(api.leaveOrbit).toHaveBeenCalledOnce();
  rerender(<SolarFlightControls {...HOME_FLIGHT} {...props} view={{ orbitPlanet: null }} />);
  expect(screen.queryByRole('button', { name: /Orbit Earth|Leave orbit/ })).toBeNull();
});

test('Escape closes the Beyond picker without ending the flight underneath', async () => {
  const { default: BeyondPicker } = await import('../../src/pages/skills/geography/BeyondPicker.jsx');
  const { availableDestinations } = await import('../../src/pages/skills/geography/beyondDestinations.js');
  const onFlightClose = vi.fn(), onPickerClose = vi.fn();
  render(<>
    <SolarFlightControls {...HOME_FLIGHT} api={{ setGoal: noop, brake: noop }} bodies={[]} onClose={onFlightClose} view={{}} />
    <BeyondPicker destinations={availableDestinations()} onChoose={noop} onClose={onPickerClose} />
  </>);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onPickerClose).toHaveBeenCalledOnce();
  expect(onFlightClose).not.toHaveBeenCalled();
});
