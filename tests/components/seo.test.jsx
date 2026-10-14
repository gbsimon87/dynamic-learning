import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router';
import { afterEach, expect, it } from 'vitest';
import PageMetadata from '../../src/seo/PageMetadata';
import SkillGuide from '../../src/seo/SkillGuide';
import SkillsPage from '../../src/pages/skills/SkillsPage';
import { SKILL_GUIDES } from '../../shared/skillGuides';

afterEach(() => {
  document.head.querySelectorAll('[data-seo]').forEach(node => node.remove());
  delete document.documentElement.dataset.seoIndexable;
  delete document.documentElement.dataset.seoOrigin;
});

it('updates canonical, title, social metadata and robots after client navigation', async () => {
  document.documentElement.dataset.seoOrigin = 'https://learnwithbix.com';
  document.documentElement.dataset.seoIndexable = 'true';
  render(<MemoryRouter initialEntries={['/learn/number-bonds?utm_source=test']}><PageMetadata /><Link to="/login">Sign in</Link><Link to="/skills">Skills</Link></MemoryRouter>);
  expect(document.title).toContain('Number Bonds');
  expect(document.querySelector('[rel="canonical"]').href).toBe('https://learnwithbix.com/learn/number-bonds');
  expect(document.querySelector('[name="robots"]').content).toBe('index, follow');
  expect(document.querySelectorAll('#seo-jsonld')).toHaveLength(1);
  await userEvent.click(screen.getByRole('link', { name: 'Sign in' }));
  await waitFor(() => expect(document.title).toBe('Sign in | Learn with Bix'));
  expect(document.querySelector('[name="robots"]').content).toBe('noindex, follow');
  expect(document.querySelector('#seo-jsonld')).toBeNull();
  await userEvent.click(screen.getByRole('link', { name: 'Skills' }));
  expect(document.querySelectorAll('[rel="canonical"]')).toHaveLength(1);
  expect(document.querySelector('[property="og:url"]').content).toBe('https://learnwithbix.com/skills');
});

it.each(SKILL_GUIDES)('renders the $label guide with one h1, instructions and its original ungated play link', guide => {
  render(<MemoryRouter><SkillGuide slug={guide.slug} /></MemoryRouter>);
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByText(guide.instructions)).toBeTruthy();
  expect(screen.getByRole('link', { name: `Play ${guide.label}` }).getAttribute('href')).toBe(guide.to);
});

it('exposes every guide alongside its existing game link on the skills hub', () => {
  render(<MemoryRouter><SkillsPage /></MemoryRouter>);
  for (const guide of SKILL_GUIDES) {
    expect(screen.getByRole('link', { name: `About ${guide.label}` }).getAttribute('href')).toBe(guide.path);
    expect(screen.getByRole('link', { name: guide.label, exact: true })).toBeTruthy();
  }
});

it('shows an honest not-found page for a missing guide and removes public metadata', () => {
  render(<RouterProvider router={createMemoryRouter([{ path: '/learn/:slug', element: <SkillGuide /> }], { initialEntries: ['/learn/missing'] })} />);
  expect(screen.getByRole('heading', { name: "We can't find that page" })).toBeTruthy();
  expect(document.querySelector('[name="robots"]').content).toBe('noindex, follow');
  expect(document.querySelector('[rel="canonical"]')).toBeNull();
});
