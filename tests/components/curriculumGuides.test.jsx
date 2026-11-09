import { AuthContext } from '../../src/context/auth-context';
import { render as renderView, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, RouterProvider, createMemoryRouter } from 'react-router';
import { expect, it, vi } from 'vitest';
import { CURRICULUM_GUIDES } from '../../shared/curriculumGuides.js';
import { isChallengeImplemented } from '../../src/data/challengeAvailability';
import { loadCurriculum } from '../../src/data/curriculumRegistry';
import CurriculumGuide, { CurriculumOverview } from '../../src/seo/CurriculumGuide';

vi.mock('../../src/components/mascot/Mascot', () => ({ default: () => null }));

it('offers all thirty-nine guides from an anonymous, year-grouped hub', () => {
  render(<MemoryRouter><CurriculumOverview /></MemoryRouter>);
  for (const guide of CURRICULUM_GUIDES) {
    expect(screen.getByRole('link', { name: new RegExp(guide.label) }).getAttribute('href')).toBe(guide.path);
  }
  expect(screen.queryByText(/first detailed guide/i)).toBeNull();
});

it.each(CURRICULUM_GUIDES)('renders the full $label topic inventory without an auth provider', (guide) => {
  render(<MemoryRouter initialEntries={[guide.path]}><Routes><Route path="/curriculum-guide/:slug" element={<CurriculumGuide />} /></Routes></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(`${guide.label} with Bix`);
  expect(screen.getByText('Choose any challenge. Completed steps are saved to your child’s profile.')).toBeTruthy();
  expect(screen.queryByText(/Completed steps unlock/)).toBeNull();
  const curriculum = loadCurriculum(guide.year, guide.subject);
  for (const category of curriculum) for (const topic of category.topics) {
    expect(screen.getByText(topic.name, { selector: 'li' })).toBeTruthy();
    const built = topic.challenges.every(challenge => isChallengeImplemented(guide.subject, guide.year, topic.id, challenge.id));
    if (built) expect(isChallengeImplemented(guide.subject, guide.year, topic.id, topic.challenges[0].id)).toBe(true);
    else expect(screen.getByText(topic.name, { selector: 'li' }).textContent).toContain('Coming soon');
  }
  expect(screen.getAllByRole('link', { name: /Create an account/ }).every(link => link.getAttribute('href') === '/signup')).toBe(true);
  expect(screen.getByRole('navigation', { name: `More Year ${guide.year} subjects` }).querySelectorAll('a')).toHaveLength(CURRICULUM_GUIDES.filter(item => item.year === guide.year).length - 1);
  if (guide.games) expect(screen.getByRole('heading', { name: 'Try a game. No signup needed.' })).toBeTruthy();
  else expect(screen.getByRole('heading', { name: 'Little ideas to try together' })).toBeTruthy();
});

it('does not turn an unknown curriculum guide into another year’s content', () => {
  render(<RouterProvider router={createMemoryRouter([{ path: "*", element: <CurriculumGuide slug="year-7-maths" /> }])} />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe("We can't find that page");
});

function render(view) {
  return renderView(<AuthContext.Provider value={{ status: "signedOut" }}>{view}</AuthContext.Provider>);
}
