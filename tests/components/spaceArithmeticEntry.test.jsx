import { readFileSync } from 'node:fs';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { expect, test, vi } from 'vitest';
vi.mock('../../src/pages/skills/geography/SolarSystem.jsx', async () => {
  const { useEffect } = await import('react');
  const api = { prepareRound() {}, setState() {}, setLane() {}, leave() {} };
  return { default: function Scene({ initialActivity, onOpenArithmetic }) {
    useEffect(() => { if (initialActivity) onOpenArithmetic({ api }); }, [initialActivity, onOpenArithmetic]);
    return <canvas data-testid="solar-canvas" />;
  } };
});
import { spaceArithmeticRoute } from '../../src/routes/spaceArithmeticRoute.js';
import SkillGameLayout from '../../src/components/skills/SkillGameLayout.jsx';
import { SKILL_GROUPS } from '../../shared/skillsCatalog.js';
import { findSkillGuide } from '../../shared/skillGuides.js';
test('production lazy route mounts with both return paths and catalogue/guide entries', async () => {
  const router = createMemoryRouter([{ Component: SkillGameLayout, children: [spaceArithmeticRoute] }], { initialEntries: ['/skills/space-arithmetic'] });
  render(<RouterProvider router={router} />);
  await screen.findByRole('heading', { name: 'Space Arithmetic' });
  expect(screen.getByRole('link', { name: /Back to Skills/ }).getAttribute('href')).toBe('/skills');
  expect(screen.getByRole('button', { name: /Back to Solar System/ })).toBeTruthy();
  expect(screen.getByTestId('solar-canvas')).toBeTruthy();
  expect(SKILL_GROUPS.find(g => g.id === 'math').games[4].to).toBe('/skills/space-arithmetic');
  expect(findSkillGuide('space-arithmetic').path).toBe('/learn/space-arithmetic');
  const main = readFileSync('src/main.jsx', 'utf8');
  expect(main).toContain('          spaceArithmeticRoute,');
});
