import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { PLANET_DETAILS } from '../../src/pages/skills/geography/planetDetails.js';
import SolarInfoCard from '../../src/pages/skills/geography/SolarInfoCard.jsx';
import { SOLAR_REGIONS } from '../../src/pages/skills/geography/solarRegionInfo.js';
import { HOME_SYSTEM } from '../../src/pages/skills/geography/systems/home.js';
import { TEST_SYSTEM } from '../../src/pages/skills/geography/systems/fixtures/testSystem.js';
import { buildPlanetInfo } from '../../src/pages/skills/geography/systems/bodyInfo.js';
vi.mock('../../src/utils/speech.js', () => ({ speak: vi.fn(), stopNarrationOf: vi.fn() }));
vi.mock('../../src/utils/speech', () => ({ speak: vi.fn(), stopNarrationOf: vi.fn() }));
vi.mock('../../src/components/celebration/sound/player.js', () => ({ isMuted: () => true }));
vi.mock('../../src/components/celebration/sound/player', () => ({ isMuted: () => true }));
afterEach(cleanup);
// Cards read what the scene's info builder makes from a system definition.
const homeInfo = name => { const i = HOME_SYSTEM.planets.findIndex(p => p.name === name); return buildPlanetInfo(HOME_SYSTEM, HOME_SYSTEM.planets[i], i); };
const earth = { ...homeInfo('Earth'), classification: 'Third planet', moonSummary: 'One Moon', summary: 'Our home planet. There is more to discover.', facts: [PLANET_DETAILS.Earth.facts[0]], narration: 'Welcome to Earth.' };
const tour = { active: false, muted: false, index: 0, total: 9 };
const api = { next: vi.fn(), previous: vi.fn(), replay: vi.fn(), toggleNarration: vi.fn(), openLineUp: vi.fn(), start: vi.fn() };
const sceneApiRef = { current: { getMoonPhase: () => null } };
test.each(SOLAR_REGIONS)('$name opens its region facts, closer reading and related destinations in the existing card', body => {
  const focusById = vi.fn(), onClose = vi.fn();
  render(<SolarInfoCard body={body} tour={tour} api={{ ...api, focusById }} sceneApiRef={sceneApiRef} onClose={onClose} />);
  expect(screen.getByRole('complementary', { name: `${body.name} information` }).classList.contains('solar-info-card')).toBe(true);
  expect(screen.getByRole('heading', { name: body.name })).toBeTruthy();
  expect(screen.getByText(body.classification, { selector: '.solar-info-card__meta span' })).toBeTruthy();
  expect(screen.getByText(body.summary)).toBeTruthy();
  body.facts.slice(0, 2).forEach(fact => expect(screen.getByText(fact)).toBeTruthy());
  fireEvent.click(screen.getByText('More facts'));
  body.facts.slice(2).forEach(fact => expect(screen.getByText(fact)).toBeTruthy());
  expect(screen.queryByRole('button', { name: /Play & compare|Show planet facts|Show moon facts/ })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /Look closer/ }));
  body.closer.forEach(paragraph => expect(screen.getByText(paragraph)).toBeTruthy());
  expect(screen.getByRole('button', { name: `🔊 Read about ${body.name}` })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Explore more/ }));
  for (const related of body.relatedBodies) {
    fireEvent.click(screen.getByRole('button', { name: `View ${related.name}` }));
    expect(focusById).toHaveBeenLastCalledWith(related.id);
  }
  fireEvent.click(screen.getByRole('button', { name: `Hide ${body.name} information` }));
  expect(onClose).toHaveBeenCalledOnce();
});
test('planet sections are compact and exclusive, activities are clear, and changing worlds resets them', () => {
  const props = { body: earth, tour, api, sceneApiRef, onClose: vi.fn() };
  const { rerender } = render(<SolarInfoCard {...props} />);
  expect(screen.getByText('Our home planet.')).toBeTruthy();
  expect(screen.getByText(PLANET_DETAILS.Earth.facts[0])).toBeTruthy();
  expect(screen.queryByRole('combobox')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /Play & compare/ }));
  expect(screen.queryByText(PLANET_DETAILS.Earth.facts[0])).toBeNull();
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'age' } });
  fireEvent.click(screen.getByRole('button', { name: '7', exact: true }));
  expect(screen.getByText("On Earth you're 7, of course!")).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Look closer/ }));
  fireEvent.click(screen.getByRole('button', { name: /Moon phases/ }));
  expect(screen.queryByRole('combobox')).toBeNull();
  expect(screen.getByRole('img', { name: /Moon seen from Earth/ })).toBeTruthy();
  expect(screen.queryByRole('button', { name: /See the Moon from Earth/ })).toBeNull();
  rerender(<SolarInfoCard {...props} body={{ ...homeInfo('Mars'), summary: 'The red planet.', facts: [PLANET_DETAILS.Mars.facts[0]] }} />);
  expect(screen.getByText(PLANET_DETAILS.Mars.facts[0])).toBeTruthy();
  expect(screen.queryByText(/you'd be/)).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /Discover/ }));
  expect(screen.queryByText(PLANET_DETAILS.Mars.facts[0])).toBeNull();
});
test('tour story collapses and navigation remains reachable', () => {
  render(<SolarInfoCard body={earth} tour={{ ...tour, active: true }} api={api} sceneApiRef={sceneApiRef} onClose={vi.fn()} />);
  expect(screen.getByText('Welcome to Earth.')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Discover/ }));
  expect(screen.queryByText('Welcome to Earth.')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Next', exact: true })); expect(api.next).toHaveBeenCalledOnce();
});

test('orbit compacts the facts while preserving tour navigation and optional reading', () => {
  const props = { body: earth, tour: { ...tour, active: true }, api, sceneApiRef, onClose: vi.fn() };
  const { rerender } = render(<SolarInfoCard {...props} orbiting />);
  expect(screen.queryByRole('button', { name: /Tour story/ })).toBeNull();
  expect(screen.getByRole('button', { name: 'Next', exact: true })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Show planet facts' }));
  expect(screen.getByRole('button', { name: /Tour story/ })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Hide planet facts' }));
  rerender(<SolarInfoCard {...props} orbiting={false} />);
  expect(screen.getByRole('button', { name: /Tour story/ })).toBeTruthy();
});

// The same card is used by clicked/search destinations and the guided tour.
test.each(['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'].flatMap(name => [false, true].map(active => [name, active])))(
  '%s has complete Discover and Look closer content (tour: %s)', (name, active) => {
    const detail = PLANET_DETAILS[name];
    render(<SolarInfoCard body={homeInfo(name)} tour={{ ...tour, active }} api={api} sceneApiRef={sceneApiRef} onClose={vi.fn()} />);
    if (active) fireEvent.click(screen.getByRole('button', { name: /Discover/ }));
    detail.facts.slice(0, 2).forEach(fact => expect(screen.getByText(fact)).toBeTruthy());
    fireEvent.click(screen.getByText('More facts'));
    detail.facts.slice(2).forEach(fact => expect(screen.getByText(fact)).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: /Look closer/ }));
    detail.closer.forEach(paragraph => expect(screen.getByText(paragraph)).toBeTruthy());
    expect(screen.getByRole('button', { name: `🔊 Read about ${name}` })).toBeTruthy();
  },
);

test('moon cards keep their own Discover facts', () => {
  render(<SolarInfoCard body={{ ...earth, id: 'Mars/Phobos', name: 'Phobos', kind: 'moon', parentName: 'Mars', facts: ['Phobos is a small moon of Mars.'], play: undefined, sections: undefined, closer: undefined }} tour={tour} api={api} sceneApiRef={sceneApiRef} onClose={vi.fn()} />);
  expect(screen.getByText('Phobos is a small moon of Mars.')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Look closer/ }));
  expect(screen.queryByRole('button', { name: /Read about/ })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /Explore more/ }));
  expect(screen.getByRole('button', { name: 'View Mars' })).toBeTruthy();
});

test('orbiting a moon compacts its own facts and keeps the way back to its planet', () => {
  const io = { kind: 'moon', name: 'Io', parentName: 'Jupiter', parentId: 'Jupiter', classification: "Jupiter's volcanic moon",
    moonSummary: '3,643 km across', summary: 'The most volcanically active world in the Solar System.', facts: ['Io has over 400 active volcanoes.', 'Io is squeezed by Jupiter.'] };
  const focusById = vi.fn();
  render(<SolarInfoCard body={io} tour={{ active: false, index: 0, total: 9, muted: false }} api={{ ...api, focusById }} sceneApiRef={sceneApiRef} onClose={vi.fn()} orbiting />);
  expect(screen.getByText('Moon of Jupiter')).toBeTruthy();
  expect(screen.getByText('Io has over 400 active volcanoes.').closest('[hidden]')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Show moon facts' }));
  expect(screen.getByText('Io has over 400 active volcanoes.').closest('[hidden]')).toBeNull();
  expect(screen.getByText('3,643 km across')).toBeTruthy();
});

test('home cards show their special sections only where the definition asks', () => {
  render(<SolarInfoCard body={homeInfo('Saturn')} tour={tour} api={api} sceneApiRef={sceneApiRef} onClose={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: /Look closer/ }));
  expect(screen.getByRole('button', { name: /Saturn’s rings/ })).toBeTruthy();
  expect(screen.queryByRole('button', { name: /Moon phases|Day & night|Northern lights/ })).toBeNull();
});

test('stats show the real numbers with a home comparison', () => {
  const body = buildPlanetInfo(TEST_SYSTEM, TEST_SYSTEM.planets[0], 0);
  const { container } = render(<SolarInfoCard body={body} tour={tour} api={api} sceneApiRef={sceneApiRef} onClose={vi.fn()} />);
  expect(container.querySelector('.solar-info-card__stats').textContent).toContain('Density 5.5 g/cm³ · Earth is 5.5');
  expect(screen.getByText('1st planet from Test Star', { selector: '.solar-info-card__meta span' })).toBeTruthy();
});

test('an away system\'s cards carry its honesty line; home cards do not', () => {
  render(<SolarInfoCard body={buildPlanetInfo(TEST_SYSTEM, TEST_SYSTEM.planets[0], 0)} tour={tour} api={api} sceneApiRef={sceneApiRef} onClose={vi.fn()} />);
  expect(screen.getByText('This system is pretend.')).toBeTruthy();
  cleanup();
  render(<SolarInfoCard body={homeInfo('Mars')} tour={tour} api={api} sceneApiRef={sceneApiRef} onClose={vi.fn()} />);
  expect(screen.queryByText('This system is pretend.')).toBeNull();
});

test('the last tour stop uses the system\'s finish label', () => {
  const last = { ...tour, active: true, index: 2, total: 3, finish: 'end', finishLabel: 'Finish the tour' };
  render(<SolarInfoCard body={buildPlanetInfo(TEST_SYSTEM, TEST_SYSTEM.planets[1], 1)} tour={last} api={api} sceneApiRef={sceneApiRef} onClose={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: 'Finish the tour' }));
  expect(api.next).toHaveBeenCalled();
});
