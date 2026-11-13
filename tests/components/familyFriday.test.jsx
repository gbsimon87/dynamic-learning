import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import FamilyFridayQuiz from '../../src/pages/skills/family/FamilyFridayQuiz.jsx';
import FamilyFridayCard from '../../src/components/familyFriday/FamilyFridayCard.jsx';
import Home from '../../src/pages/home/Home.jsx';
import SkillsPage from '../../src/pages/skills/SkillsPage.jsx';
import SkillGameLayout from '../../src/components/skills/SkillGameLayout.jsx';
import { AuthContext } from '../../src/context/auth-context.js';
import { familyFridayEdition } from '../../src/data/familyFriday.js';

vi.mock('../../src/components/skills/useAnswerFeedback.js', () => ({ useAnswerFeedback: () => ({ answer: vi.fn(), clear: vi.fn(), answerRef: { current: null }, feedbackRef: { current: null } }) }));
vi.mock('../../src/components/mascot/Mascot.jsx', () => ({ default: () => <span aria-hidden="true">Bix</span> }));
vi.mock('../../src/pages/home/useHomeResume.js', () => ({ useHomeResume: () => ({ resume: null, candidates: [] }) }));
vi.mock('../../src/pages/home/HomeAchievements.jsx', () => ({ default: () => null }));
vi.mock('../../src/pages/home/HomeCurriculumOverview.jsx', () => ({ default: () => null }));

beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date('2026-11-27T12:00:00Z')); });
afterEach(() => { vi.useRealTimers(); delete navigator.clipboard; });

function openQuiz(path = '/skills/family-friday') {
  const router = createMemoryRouter([
    { path: '/skills', element: <SkillsPage /> },
    { element: <SkillGameLayout />, children: [{ path: '/skills/family-friday', element: <FamilyFridayQuiz /> }] },
  ], { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
}

it('finishes exactly five questions, reveals misses, guards repeated taps and resets a replay', () => {
  openQuiz('/skills/family-friday?week=2026-11-13');
  expect(screen.getByRole('heading', { name: 'Family Friday Quiz' })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Start the quiz/ }));
  const quiz = familyFridayEdition('2026-11-13');
  quiz.questions.forEach((question, i) => {
    expect(screen.getByRole('heading', { name: question.prompt })).toBe(document.activeElement);
    const value = i === 0 ? question.options.find(option => option !== question.answer) : question.answer;
    const option = within(screen.getByRole('group', { name: /Choose your family/ })).getAllByRole('button').find(button => button.textContent.includes(value));
    fireEvent.click(option);
    fireEvent.click(option);
    expect(screen.getByText(question.explanation)).toBeTruthy();
    for (const button of within(screen.getByRole('group', { name: /Choose your family/ })).getAllByRole('button')) expect(button.disabled).toBe(true);
    const next = screen.getByRole('button', { name: i === 4 ? /See our score/ : /Next question/ });
    fireEvent.click(next);
    fireEvent.click(next);
  });
  expect(screen.getByLabelText('Your family scored 4 out of 5')).toBeTruthy();
  fireEvent.click(screen.getByText('Look back at the answers'));
  expect(screen.getAllByText(/Your answer:/)).toHaveLength(5);
  fireEvent.click(screen.getByRole('button', { name: /Play this quiz again/ }));
  fireEvent.click(screen.getByRole('button', { name: /Start the quiz/ }));
  expect(screen.getByRole('heading', { name: quiz.questions[0].prompt })).toBeTruthy();
  expect(screen.queryByRole('button', { name: /Next question/ })).toBeNull();
  expect(localStorage.getItem('dl.progress')).toBeNull();
});

it('opens from the Skills hub, switches archived editions cleanly and rejects future links', async () => {
  const router = openQuiz('/skills');
  await act(async () => fireEvent.click(screen.getByRole('link', { name: 'Family Friday Quiz', exact: true })));
  expect(screen.getByRole('button', { name: /Start the quiz/ })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Start the quiz/ }));
  await act(async () => fireEvent.click(screen.getByRole('link', { name: /13 November 2026/ })));
  expect(screen.getByText('Edition 1 · 13 November 2026')).toBeTruthy();
  expect(screen.getByRole('button', { name: /Start the quiz/ })).toBeTruthy();
  await act(() => router.navigate('/skills/family-friday?week=2026-12-04'));
  expect(screen.getByRole('heading', { name: 'That quiz isn’t available' })).toBeTruthy();
  expect(screen.queryByRole('button', { name: /Start the quiz/ })).toBeNull();
  await act(() => router.navigate('/skills/family-friday?week=2026-02-30'));
  expect(screen.getByRole('heading', { name: 'That quiz isn’t available' })).toBeTruthy();
});

it('shows the home invitation on Friday for signed-out visitors and updates across midnight', () => {
  vi.setSystemTime(new Date('2027-06-03T22:59:50Z'));
  render(<MemoryRouter><AuthContext.Provider value={{ child: null, status: 'signedOut' }}><Home /></AuthContext.Provider></MemoryRouter>);
  expect(screen.queryByRole('link', { name: /Play this week’s quiz/ })).toBeNull();
  act(() => vi.advanceTimersByTime(30000));
  expect(screen.getByRole('link', { name: /Play this week’s quiz/ }).getAttribute('href')).toBe('/skills/family-friday?week=2027-06-04');
  vi.setSystemTime(new Date('2027-06-04T23:00:00Z'));
  act(() => window.dispatchEvent(new Event('focus')));
  expect(screen.queryByRole('link', { name: /Play this week’s quiz/ })).toBeNull();
});

it('keeps the Friday invitation independent of profile selection', () => {
  render(<MemoryRouter><AuthContext.Provider value={{ child: { name: 'Sam' }, status: 'signedIn' }}><FamilyFridayCard /></AuthContext.Provider></MemoryRouter>);
  expect(screen.getByRole('link', { name: /Play this week’s quiz/ })).toBeTruthy();
});

it('copies an edition link and provides a selectable fallback when clipboard access fails', async () => {
  openQuiz('/skills/family-friday?week=2026-11-13');
  fireEvent.click(screen.getByRole('button', { name: /Start the quiz/ }));
  for (const question of familyFridayEdition('2026-11-13').questions) {
    const option = within(screen.getByRole('group', { name: /Choose your family/ })).getAllByRole('button').find(button => button.textContent.includes(question.answer));
    fireEvent.click(option);
    fireEvent.click(screen.getByRole('button', { name: /Next question|See our score/ }));
  }
  const copy = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: copy } });
  fireEvent.click(screen.getByRole('button', { name: 'Share this quiz' }));
  await act(async () => {});
  expect(copy).toHaveBeenCalledWith(expect.stringContaining('/skills/family-friday?week=2026-11-13'));
  expect(screen.getByText(/Quiz link copied/)).toBeTruthy();
  copy.mockRejectedValue(new Error('permission denied'));
  fireEvent.click(screen.getByRole('button', { name: 'Share this quiz' }));
  await act(async () => {});
  expect(screen.getByRole('textbox', { name: 'Quiz link' }).value).toContain('week=2026-11-13');
});
