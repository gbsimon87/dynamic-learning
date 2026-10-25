import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import SolarOrbitControl from '../../src/pages/skills/geography/SolarOrbitControl.jsx';
import SolarFlightControls from '../../src/pages/skills/geography/SolarFlightControls.jsx';

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
  const { rerender } = render(<SolarFlightControls {...props} view={{ orbitPlanet: { name: 'Earth' } }} />);
  fireEvent.click(screen.getByRole('button', { name: 'Collapse flight panel' }));
  fireEvent.click(screen.getByRole('button', { name: 'Orbit Earth' }));
  expect(api.brake).toHaveBeenCalled(); expect(api.enterOrbit).toHaveBeenCalledOnce();
  rerender(<SolarFlightControls {...props} view={{ orbitPlanet: { name: 'Earth' }, orbiting: true }} />);
  fireEvent.click(screen.getByRole('button', { name: 'Leave orbit around Earth' })); expect(api.leaveOrbit).toHaveBeenCalledOnce();
  rerender(<SolarFlightControls {...props} view={{ orbitPlanet: null }} />);
  expect(screen.queryByRole('button', { name: /Orbit Earth|Leave orbit/ })).toBeNull();
});

test('the flight edge past Pluto offers Warp to Beyond, also with the panel collapsed', () => {
  const api = { setGoal: noop, brake: vi.fn() };
  const onBeyond = vi.fn();
  const props = { api, bodies: [], onClose: noop, onBeyond };
  const { rerender } = render(<SolarFlightControls {...props} view={{ atEdge: false }} />);
  expect(screen.queryByRole('button', { name: 'Warp to Beyond' })).toBeNull();
  rerender(<SolarFlightControls {...props} view={{ atEdge: true }} />);
  fireEvent.click(screen.getByRole('button', { name: 'Collapse flight panel' }));
  fireEvent.click(screen.getByRole('button', { name: 'Warp to Beyond' }));
  expect(api.brake).toHaveBeenCalled();
  expect(onBeyond).toHaveBeenCalledOnce();
  rerender(<SolarFlightControls {...props} view={{ atEdge: false }} />);
  expect(screen.queryByRole('button', { name: 'Warp to Beyond' })).toBeNull();
});

test('Escape closes the Beyond picker without ending the flight underneath', async () => {
  const { default: BeyondPicker } = await import('../../src/pages/skills/geography/BeyondPicker.jsx');
  const { availableDestinations } = await import('../../src/pages/skills/geography/beyondDestinations.js');
  const onFlightClose = vi.fn(), onPickerClose = vi.fn();
  render(<>
    <SolarFlightControls api={{ setGoal: noop, brake: noop }} bodies={[]} onClose={onFlightClose} view={{ atEdge: true }} onBeyond={noop} />
    <BeyondPicker destinations={availableDestinations()} onChoose={noop} onClose={onPickerClose} />
  </>);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onPickerClose).toHaveBeenCalledOnce();
  expect(onFlightClose).not.toHaveBeenCalled();
});
