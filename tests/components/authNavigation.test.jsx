import { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { expect, it, vi } from 'vitest';
import { AuthContext } from '../../src/context/auth-context';
import Login from '../../src/pages/auth/Login';
import SignUpFlow from '../../src/pages/auth/signup/SignUpFlow';
import CurriculumGuide, { CurriculumOverview } from '../../src/seo/CurriculumGuide';

vi.mock('../../src/components/mascot/Mascot', () => ({ default: () => null }));

it.each([Login, SignUpFlow])('redirects existing accounts away from %s', (Page) => {
  const view = render(<AuthContext.Provider value={{ status: 'ready' }}><MemoryRouter initialEntries={['/auth']}><Routes><Route path="/auth" element={createElement(Page)} /><Route path="/curriculum" element={<h1>Curriculum destination</h1>} /><Route path="/profiles" element={<h1>Profile destination</h1>} /></Routes></MemoryRouter></AuthContext.Provider>);
  expect(screen.getByText('Curriculum destination')).toBeTruthy();
  view.unmount();
  render(<AuthContext.Provider value={{ status: 'needsChild' }}><MemoryRouter initialEntries={['/auth']}><Routes><Route path="/auth" element={createElement(Page)} /><Route path="/profiles" element={<h1>Profile destination</h1>} /></Routes></MemoryRouter></AuthContext.Provider>);
  expect(screen.getByText('Profile destination')).toBeTruthy();
});

it.each([Login, SignUpFlow])('waits for session restoration before displaying %s', (Page) => {
  const { container } = render(<AuthContext.Provider value={{ status: 'loading' }}><MemoryRouter>{createElement(Page)}</MemoryRouter></AuthContext.Provider>);
  expect(container.textContent).toBe('');
});

it.each(['signedOut', 'needsChild', 'ready', 'loading'])('shows curriculum actions appropriate for %s', (status) => {
  render(<AuthContext.Provider value={{ status }}><MemoryRouter><CurriculumOverview /><CurriculumGuide slug="year-3-maths" /></MemoryRouter></AuthContext.Provider>);
  const accountLinks = screen.queryAllByRole('link', { name: /Create an account/ });
  expect(accountLinks.length > 0).toBe(status === 'signedOut');
  expect(screen.queryAllByRole('link', { name: 'Sign in' }).length > 0).toBe(status === 'signedOut');
  if (status === 'ready' || status === 'needsChild') {
    expect(screen.getByRole('heading', { name: 'Ready for your next little step?' })).toBeTruthy();
    expect(screen.queryByText(/finish setting up your parent account/)).toBeNull();
    for (const link of screen.getAllByRole('link', { name: /Explore the curriculum/ })) expect(link.getAttribute('href')).toBe('/curriculum');
  }
});
