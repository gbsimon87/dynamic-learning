import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import GalaxyMapPanel from '../../src/pages/skills/geography/GalaxyMapPanel.jsx';
import { mapCatalogue } from '../../src/pages/skills/geography/galaxyMapData.js';
import { SYSTEM_REGISTRY } from '../../src/pages/skills/geography/systems/registry.js';
import { availableDestinations } from '../../src/pages/skills/geography/beyondDestinations.js';
import { speak } from '../../src/utils/speech.js';
vi.mock('../../src/utils/speech.js', () => ({ speak: vi.fn(), stopNarration: vi.fn() }));
vi.mock('../../src/components/celebration/sound/player.js', () => ({ isMuted: vi.fn(() => false) }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

const catalogue = mapCatalogue(SYSTEM_REGISTRY, availableDestinations());
// What the map scene would project for each level: every marker on screen.
const markersFor = (level, currentSystemId) => {
  if (level === 'galaxies') return [...catalogue.galaxies.map((g) => ({ id: g.id, kind: 'galaxy', label: g.name, enterable: Boolean(g.enterable) })),
    ...catalogue.events.map((e) => ({ id: e.id, kind: 'event', label: e.name }))].map((m, i) => ({ ...m, x: 40 * i, y: 50, visible: true }));
  if (level === 'milky-way') return [{ id: 'you-are-here', kind: 'here', label: 'You are here', x: 100, y: 100, visible: true }];
  return catalogue.systems.map((s, i) => ({ id: s.id, kind: 'system', label: s.name, here: s.id === currentSystemId, x: 60 * i, y: 80, visible: true }));
};
function show({ level = 'galaxies', currentSystemId = 'solar-system', ...handlers } = {}) {
  const props = { catalogue, level, currentSystemId, getMarkers: () => markersFor(level, currentSystemId),
    onLevel: vi.fn(), onFocus: vi.fn(), onClose: vi.fn(), onJump: vi.fn(), onGoHome: vi.fn(), onVisitEvent: vi.fn(), ...handlers };
  const utils = render(<GalaxyMapPanel {...props} />);
  return { ...utils, props };
}

test('galaxies level shows Andromeda with no jump button', () => {
  const { props } = show();
  expect(screen.getByRole('heading', { name: 'Galaxies near ours' })).toBeTruthy();
  expect(screen.getByText('Distances squeezed to fit')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Andromeda' }));
  expect(props.onFocus).toHaveBeenCalledWith('andromeda');
  const card = screen.getByRole('region', { name: 'Andromeda' });
  expect(card.textContent).toContain('about a trillion stars');
  expect(card.textContent).toContain('too far to visit');
  expect(screen.queryByRole('button', { name: /Jump there|Go home|Visit/ })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Read aloud' }));
  expect(speak).toHaveBeenCalledTimes(1);
});

test('tapping the Milky Way goes to its level and Back returns', () => {
  const { props, unmount } = show();
  fireEvent.click(screen.getByRole('button', { name: 'Milky Way' }));
  expect(props.onLevel).toHaveBeenCalledWith('milky-way');
  unmount();
  const next = show({ level: 'milky-way' });
  expect(screen.getByRole('heading', { name: 'The Milky Way, our galaxy' })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'You are here' }));
  expect(next.props.onLevel).toHaveBeenCalledWith('neighbourhood');
  fireEvent.click(screen.getByRole('button', { name: 'Back' }));
  expect(next.props.onLevel).toHaveBeenLastCalledWith('galaxies');
});

test('neighbourhood shows home and TRAPPIST-1; TRAPPIST-1 card offers Jump there', () => {
  const { props } = show({ level: 'neighbourhood' });
  expect(screen.getByRole('button', { name: 'Solar System (you are here)' })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'TRAPPIST-1' }));
  const card = screen.getByRole('region', { name: 'TRAPPIST-1' });
  expect(card.textContent).toContain('About 41 light-years from home');
  expect(card.textContent).toContain('Ultracool red dwarf');
  expect(card.textContent).toContain('7 planets');
  fireEvent.click(screen.getByRole('button', { name: 'Jump there' }));
  expect(props.onJump).toHaveBeenCalledWith('trappist-1');
  fireEvent.click(screen.getByRole('button', { name: 'Back' }));
  expect(props.onLevel).toHaveBeenCalledWith('milky-way');
});

test("the current system's card closes the map instead of jumping", () => {
  const { props } = show({ level: 'neighbourhood', currentSystemId: 'trappist-1' });
  fireEvent.click(screen.getByRole('button', { name: 'TRAPPIST-1 (you are here)' }));
  expect(screen.queryByRole('button', { name: 'Jump there' })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Back to TRAPPIST-1' }));
  expect(props.onClose).toHaveBeenCalledTimes(1);
  expect(props.onJump).not.toHaveBeenCalled();
});

test('away from home the Solar System card says Go home', () => {
  const { props } = show({ level: 'neighbourhood', currentSystemId: 'trappist-1' });
  fireEvent.click(screen.getByRole('button', { name: 'Solar System' }));
  expect(screen.getByRole('region', { name: 'Solar System' }).textContent).toContain('Our home');
  fireEvent.click(screen.getByRole('button', { name: 'Go home' }));
  expect(props.onGoHome).toHaveBeenCalledTimes(1);
});

test('Space ripples card visits Beyond', () => {
  const { props } = show();
  fireEvent.click(screen.getByRole('button', { name: 'Space ripples' }));
  expect(screen.getByRole('region', { name: 'Space ripples' }).textContent).toContain('Far beyond our galaxy');
  fireEvent.click(screen.getByRole('button', { name: 'Visit' }));
  expect(props.onVisitEvent).toHaveBeenCalledWith('space-ripples');
});

test('Escape and the close button close the map', () => {
  const { props } = show();
  fireEvent.keyDown(window, { key: 'Escape' });
  fireEvent.click(screen.getByRole('button', { name: 'Close the galaxy map' }));
  expect(props.onClose).toHaveBeenCalledTimes(2);
});
