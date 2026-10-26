import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test, vi } from 'vitest';
import SolarInfoCard from '../../src/pages/skills/geography/SolarInfoCard.jsx';
import { HOME_SYSTEM } from '../../src/pages/skills/geography/systems/home.js';
import { TRAPPIST_1 } from '../../src/pages/skills/geography/systems/trappist1.js';
import { buildPlanetInfo, buildStarInfo } from '../../src/pages/skills/geography/systems/bodyInfo.js';
import { createFlightRound } from '../../src/pages/skills/geography/flightClues.js';
vi.mock('../../src/utils/speech.js', () => ({ speak: vi.fn(), stopNarrationOf: vi.fn() }));
vi.mock('../../src/utils/speech', () => ({ speak: vi.fn(), stopNarrationOf: vi.fn() }));
vi.mock('../../src/components/celebration/sound/player.js', () => ({ isMuted: () => true }));
vi.mock('../../src/components/celebration/sound/player', () => ({ isMuted: () => true }));
afterEach(cleanup);

const tour = { active: false, muted: false, index: 0, total: 8 };
const api = { next: vi.fn(), previous: vi.fn(), replay: vi.fn(), toggleNarration: vi.fn(), openLineUp: vi.fn(), start: vi.fn() };
const sceneApiRef = { current: { getMoonPhase: () => null } };
const planetInfo = (id) => { const i = TRAPPIST_1.planets.findIndex((p) => p.id === id); return buildPlanetInfo(TRAPPIST_1, TRAPPIST_1.planets[i], i); };
const show = (body, extra = {}) => render(<SolarInfoCard body={body} tour={tour} api={api} sceneApiRef={sceneApiRef} onClose={vi.fn()} {...extra} />);

test('b card says "1st planet from TRAPPIST-1"', () => {
  show(planetInfo('trappist-1b'));
  expect(screen.getByText('1st planet from TRAPPIST-1', { selector: '.solar-info-card__meta span' })).toBeTruthy();
});

test('space birthday choice of 7 reads "On TRAPPIST-1 b you\'d be 1692!"', async () => {
  show(planetInfo('trappist-1b'));
  fireEvent.click(screen.getByRole('button', { name: /Play & compare/ }));
  await userEvent.selectOptions(screen.getByRole('combobox'), 'age');
  await userEvent.click(screen.getByRole('button', { name: '7' }));
  expect(screen.getByText("On TRAPPIST-1 b you'd be 1692!")).toBeTruthy();
});

test('Bix on the scales is offered when gravity is present', async () => {
  show(planetInfo('trappist-1e'));
  fireEvent.click(screen.getByRole('button', { name: /Play & compare/ }));
  expect(screen.getByRole('option', { name: /Bix on the scales/ })).toBeTruthy();
});

test('planet and star cards show the honesty line', () => {
  show(planetInfo('trappist-1f'));
  expect(screen.getByText(TRAPPIST_1.scene.honesty)).toBeTruthy();
  cleanup();
  show(buildStarInfo(TRAPPIST_1, TRAPPIST_1.stars[0]));
  expect(screen.getByText(TRAPPIST_1.scene.honesty)).toBeTruthy();
  expect(screen.getAllByText('Ultracool red dwarf star').length).toBeGreaterThan(0);
});

test("tour card's last button reads Finish the tour", () => {
  show(planetInfo('trappist-1h'), { tour: { ...tour, active: true, index: 7, total: 8, finish: TRAPPIST_1.tour.finish, finishLabel: TRAPPIST_1.tour.finishLabel } });
  expect(screen.getByRole('button', { name: 'Finish the tour' })).toBeTruthy();
});

test('home Mercury card still says "1st planet from the Sun"', () => {
  show(buildPlanetInfo(HOME_SYSTEM, HOME_SYSTEM.planets[0], 0));
  expect(screen.getByText('1st planet from the Sun', { selector: '.solar-info-card__meta span' })).toBeTruthy();
});

test('a full clue deck never asks for the same target twice in a row, for any shuffle', () => {
  for (let seed = 1; seed <= 300; seed++) {
    let s = seed;
    const random = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
    const { deck } = createFlightRound(random, TRAPPIST_1.flight.clues);
    expect(deck).toHaveLength(TRAPPIST_1.flight.clues.length);
    for (let i = 1; i < deck.length; i++) expect(deck[i].target).not.toBe(deck[i - 1].target);
  }
});
