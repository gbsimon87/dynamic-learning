import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import SolarTripHud from '../../src/pages/skills/geography/SolarTripHud.jsx';
import { isMuted } from '../../src/components/celebration/sound/player.js';
import { speak } from '../../src/utils/speech.js';
vi.mock('../../src/utils/speech.js', () => ({ speak: vi.fn(), stopNarration: vi.fn() }));
vi.mock('../../src/components/celebration/sound/player.js', () => ({ isMuted: vi.fn(() => false) }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

const trip = (more = {}) => ({ phase: 'warning', mode: 'flown', secondsLeft: 3, progress: 0, calm: false, distanceLy: 40.66,
  toPhrase: 'TRAPPIST-1', fromPhrase: 'the Solar System', toSpoken: 'TRAPPIST one', fromSpoken: 'the Solar System', toHome: false, ...more });

test('warning counts down and speaks once when unmuted', () => {
  const { rerender } = render(<SolarTripHud trip={trip()} onTurnBack={() => {}} />);
  expect(screen.getByRole('status').textContent).toBe('Leaving the Solar System — heading for TRAPPIST-1 in 3…');
  rerender(<SolarTripHud trip={trip({ secondsLeft: 1.4 })} onTurnBack={() => {}} />);
  expect(screen.getByRole('status').textContent).toBe('Leaving the Solar System — heading for TRAPPIST-1 in 2…');
  rerender(<SolarTripHud trip={trip({ secondsLeft: .2 })} onTurnBack={() => {}} />);
  expect(speak).toHaveBeenCalledTimes(1);
  expect(speak).toHaveBeenCalledWith('Leaving the Solar System, heading for TRAPPIST one in 3, 2, 1.');
  expect(screen.getByText('Sped up - even light takes about 41 years to make this trip.')).toBeTruthy();
  cleanup(); vi.clearAllMocks(); isMuted.mockReturnValue(true);
  render(<SolarTripHud trip={trip({ toPhrase: 'the Solar System', toSpoken: 'the Solar System', fromPhrase: 'TRAPPIST-1', toHome: true })} onTurnBack={() => {}} />);
  expect(screen.getByRole('status').textContent).toBe('Leaving TRAPPIST-1 — heading home to the Solar System in 3…');
  expect(speak).not.toHaveBeenCalled();
  isMuted.mockReturnValue(false);
});

test('Turn back button and B key call onTurnBack', () => {
  const onTurnBack = vi.fn();
  render(<><input aria-label="Name" /><SolarTripHud trip={trip({ phase: 'departing', secondsLeft: 5 })} onTurnBack={onTurnBack} /></>);
  expect(screen.getByRole('status').textContent).toBe('Flying to TRAPPIST-1');
  fireEvent.click(screen.getByRole('button', { name: 'Turn back' }));
  fireEvent.keyDown(window, { key: 'b' });
  fireEvent.keyDown(window, { key: 'Backspace' });
  expect(onTurnBack).toHaveBeenCalledTimes(3);
  fireEvent.keyDown(screen.getByLabelText('Name'), { key: 'b' });
  expect(onTurnBack).toHaveBeenCalledTimes(3);
});

test('switching to reduced motion mid-trip keeps the trip and shows progress', () => {
  const { rerender } = render(<SolarTripHud trip={trip({ phase: 'departing', progress: .3 })} onTurnBack={() => {}} />);
  expect(screen.queryByRole('progressbar')).toBeNull();
  rerender(<SolarTripHud trip={trip({ phase: 'departing', progress: .3, calm: true })} onTurnBack={() => {}} />);
  expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('30');
  expect(screen.getByRole('button', { name: 'Turn back' })).toBeTruthy();
  rerender(<SolarTripHud trip={trip({ phase: 'arriving', progress: .8, calm: true, toPhrase: 'TRAPPIST-1' })} onTurnBack={() => {}} />);
  expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('80');
  expect(screen.getByRole('status').textContent).toBe('Arriving at TRAPPIST-1');
});
