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

vi.mock('../../src/utils/speech.js', async importOriginal => ({
  ...await importOriginal(), isNarrationSupported: () => true,
  speakAndWait: vi.fn().mockResolvedValue(undefined), stopNarration: vi.fn(),
}));
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

function choose(value) {
  const buttons = within(screen.getByRole('group', { name: /Choose your family/ })).getAllByRole('button');
  const button = buttons.find(item => item.querySelectorAll('span')[1].textContent === value);
  fireEvent.click(button);
  return button;
}

it('keeps answers hidden, preserves editable choices when going back, and scores only the submitted choices', () => {
  openQuiz('/skills/family-friday?week=2026-11-13');
  fireEvent.click(screen.getByRole('button', { name: /Start the quiz/ }));
  const quiz = familyFridayEdition('2026-11-13');
  expect(screen.getByRole('button', { name: 'Previous question' }).disabled).toBe(true);
  const next = screen.getByRole('button', { name: /Next question/ });
  expect(next.disabled).toBe(true);
  fireEvent.click(next);
  expect(screen.getByRole('heading', { name: quiz.questions[0].prompt })).toBeTruthy();
  quiz.questions.forEach((question, i) => {
    expect(screen.getByRole('heading', { name: question.prompt })).toBe(document.activeElement);
    const value = i < 2 ? question.options.find(option => option !== question.answer) : question.answer;
    const option = choose(value);
    fireEvent.click(option);
    expect(option.getAttribute('aria-pressed')).toBe('true');
    expect(option.disabled).toBe(false);
    expect(screen.queryByText(question.explanation)).toBeNull();
    expect(screen.queryByRole('button', { name: /Hear answer|Hear why/ })).toBeNull();
    expect(screen.queryByLabelText(/Your family scored/)).toBeNull();
    expect(document.querySelector('.is-correct')).toBeNull();
    if (i < 4) fireEvent.click(screen.getByRole('button', { name: /Next question/ }));
  });
  // Return from the last question to the first and fix just that answer.
  for (let i = 0; i < 4; i += 1) fireEvent.click(screen.getByRole('button', { name: 'Previous question' }));
  expect(screen.getByRole('heading', { name: quiz.questions[0].prompt })).toBeTruthy();
  const firstChoices = within(screen.getByRole('group', { name: /Choose your family/ })).getAllByRole('button');
  expect(firstChoices.find(button => button.getAttribute('aria-pressed') === 'true').textContent).not.toContain(quiz.questions[0].answer);
  choose(quiz.questions[0].answer);
  expect(firstChoices.filter(button => button.getAttribute('aria-pressed') === 'true')).toHaveLength(1);
  for (let i = 1; i <= 4; i += 1) {
    fireEvent.click(screen.getByRole('button', { name: /Next question/ }));
    expect(screen.getByRole('heading', { name: quiz.questions[i].prompt })).toBeTruthy();
    expect(within(screen.getByRole('group', { name: /Choose your family/ })).getAllByRole('button').filter(button => button.getAttribute('aria-pressed') === 'true')).toHaveLength(1);
    expect(screen.queryByText(quiz.questions[i].explanation)).toBeNull();
  }
  const submit = screen.getByRole('button', { name: /Submit quiz/ });
  fireEvent.click(submit);
  fireEvent.click(submit);
  expect(screen.getByLabelText('Your family scored 4 out of 5')).toBeTruthy();
  const reviewCards = within(screen.getByRole('list', { name: 'Your family’s quiz discoveries' })).getAllByRole('listitem');
  expect(reviewCards).toHaveLength(5);
  quiz.questions.forEach((question, i) => {
    expect(within(reviewCards[i]).getByRole('heading', { name: question.prompt })).toBeTruthy();
    expect(within(reviewCards[i]).getByText(question.answer, { exact: true })).toBeTruthy();
    expect(within(reviewCards[i]).getByText(i === 1 ? 'A new discovery' : 'You got it!', { exact: false })).toBeTruthy();
    expect(within(reviewCards[i]).getByText(question.explanation)).toBeTruthy();
  });
  expect(document.querySelector('.ff-review').open).toBe(true);
  expect(screen.getAllByRole('button', { name: /Hear answer/ })).toHaveLength(5);
  for (const question of quiz.questions) expect(screen.getByText(question.explanation, { exact: false })).toBeTruthy();
  expect(screen.queryByRole('button', { name: 'Previous question' })).toBeNull();
  expect(screen.queryByRole('group', { name: /Choose your family/ })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /Play this quiz again/ }));
  fireEvent.click(screen.getByRole('button', { name: /Start the quiz/ }));
  expect(screen.getByRole('heading', { name: quiz.questions[0].prompt })).toBeTruthy();
  expect(screen.getByRole('button', { name: /Next question/ }).disabled).toBe(true);
  expect(within(screen.getByRole('group', { name: /Choose your family/ })).getAllByRole('button').every(button => button.getAttribute('aria-pressed') === 'false')).toBe(true);
  expect(localStorage.getItem('dl.progress')).toBeNull();
});

it('guards rapid navigation and cannot submit until the final question has a choice', () => {
  openQuiz('/skills/family-friday?week=2026-11-13');
  fireEvent.click(screen.getByRole('button', { name: /Start the quiz/ }));
  const quiz = familyFridayEdition('2026-11-13');
  for (let i = 0; i < 4; i += 1) {
    choose(quiz.questions[i].answer);
    const next = screen.getByRole('button', { name: /Next question/ });
    act(() => { fireEvent.click(next); fireEvent.click(next); });
    expect(screen.getByRole('heading', { name: quiz.questions[i + 1].prompt })).toBeTruthy();
  }
  const submit = screen.getByRole('button', { name: /Submit quiz/ });
  expect(submit.disabled).toBe(true);
  fireEvent.click(submit);
  expect(screen.queryByLabelText(/Your family scored/)).toBeNull();
  choose(quiz.questions[4].answer);
  fireEvent.click(submit);
  expect(screen.getByLabelText('Your family scored 5 out of 5')).toBeTruthy();
});

it('opens from the Skills hub, switches archived editions cleanly and rejects future links', async () => {
  const router = openQuiz('/skills');
  await act(async () => fireEvent.click(screen.getByRole('link', { name: 'Family Friday Quiz', exact: true })));
  expect(screen.getByRole('button', { name: /Start the quiz/ })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Start the quiz/ }));
  choose(familyFridayEdition('2026-11-27').questions[0].answer);
  await act(async () => fireEvent.click(screen.getByRole('link', { name: /13 November 2026/ })));
  expect(screen.getByText('Edition 1 · 13 November 2026')).toBeTruthy();
  expect(screen.getByRole('button', { name: /Start the quiz/ })).toBeTruthy();
  await act(() => router.navigate('/skills/family-friday?week=2026-12-04'));
  expect(screen.getByRole('heading', { name: 'That quiz isn’t available' })).toBeTruthy();
  expect(screen.queryByRole('button', { name: /Start the quiz/ })).toBeNull();
  await act(() => router.navigate('/skills/family-friday?week=2026-02-30'));
  expect(screen.getByRole('heading', { name: 'That quiz isn’t available' })).toBeTruthy();
});

it('plays an automatically mixed curriculum edition and switches back to the preserved launch quiz', async () => {
  const router = openQuiz('/skills/family-friday?week=2026-11-20');
  const edition = familyFridayEdition('2026-11-20');
  fireEvent.click(screen.getByRole('button', { name: /Start the quiz/ }));
  for (const question of edition.questions) {
    expect(screen.getByRole('heading', { name: question.prompt })).toBeTruthy();
    const choices = within(screen.getByRole('group', { name: /Choose your family/ })).getAllByRole('button');
    const correct = choices.find(button => button.querySelectorAll('span')[1].textContent === question.answer);
    fireEvent.click(correct);
    expect(screen.queryByText(question.explanation)).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /Next question|Submit quiz/ }));
  }
  expect(screen.getByLabelText('Your family scored 5 out of 5')).toBeTruthy();
  await act(() => router.navigate('/skills/family-friday?week=2026-11-13'));
  expect(screen.getByRole('button', { name: /Start the quiz/ })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Start the quiz/ }));
  expect(screen.getByRole('heading', { name: 'How many hearts does an octopus have?' })).toBeTruthy();
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
    fireEvent.click(screen.getByRole('button', { name: /Next question|Submit quiz/ }));
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
