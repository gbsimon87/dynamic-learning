import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import WorldInfoCard from '../../src/components/worlds/WorldInfoCard.jsx';

afterEach(cleanup);

const reef = {
  id: 'coral-reef', name: 'Coral reef', eyebrow: 'Habitat', factsNoun: 'reef',
  summary: 'Coral looks like rock, but it is made of tiny animals. There is more.',
  honesty: 'This ocean is a made-up mix of places.',
  meta: ['Habitat', 'Warm seas'],
  stats: [{ label: 'Depth', value: 'Shallow', compare: 'about a pool' }],
  facts: ['Fact one.', 'Fact two.', 'Fact three.'],
  closer: ['Closer one.', 'Closer two.'],
};

const card = (props = {}) => render(<WorldInfoCard discovery={reef} onClose={vi.fn()} onRead={vi.fn()} {...props} />);

test('shows the discovery in the shared card structure', () => {
  card();
  const aside = screen.getByRole('complementary', { name: 'Coral reef information' });
  expect(aside.classList.contains('world-card')).toBe(true);
  expect(screen.getByText('Habitat', { selector: '.world-card__eyebrow' })).toBeTruthy();
  expect(screen.getByRole('heading', { name: 'Coral reef' })).toBeTruthy();
  expect(screen.getByText('Coral looks like rock, but it is made of tiny animals.')).toBeTruthy();
  expect(screen.getByText(reef.honesty)).toBeTruthy();
  expect(aside.querySelector('.world-card__stats').textContent).toContain('Depth Shallow · about a pool');
  expect(screen.getByText('Fact one.')).toBeTruthy();
  const more = aside.querySelector('.world-card__more-facts');
  expect(more.open).toBe(false);
  expect(more.textContent).toContain('Fact three.');
});

test('reads the closer text aloud', () => {
  const onRead = vi.fn();
  card({ onRead });
  fireEvent.click(screen.getByRole('button', { name: '🔎 Look closer' }));
  fireEvent.click(screen.getByRole('button', { name: '🔊 Read about Coral reef' }));
  expect(onRead).toHaveBeenCalledWith('Closer one. Closer two.');
});

test('leaves out sections the world does not provide', () => {
  card();
  for (const name of [/Play & compare/, /Explore more/, /Tour story/]) expect(screen.queryByRole('button', { name })).toBeNull();
});

test('starts folded while orbiting and toggles its facts', () => {
  const { container } = card({ orbiting: true });
  expect(container.querySelector('.world-card__body').hidden).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: 'Show reef facts' }));
  expect(container.querySelector('.world-card__body').hidden).toBe(false);
  expect(screen.getByRole('button', { name: 'Hide reef facts' })).toBeTruthy();
});

test('closes from the × button', () => {
  const onClose = vi.fn();
  card({ onClose });
  fireEvent.click(screen.getByRole('button', { name: 'Hide Coral reef information' }));
  expect(onClose).toHaveBeenCalledOnce();
});

test('a world can retitle the play and story sections', () => {
  card({ playSection: <p>Pick one.</p>, playTitle: '🐠 Match the fish', tour: { active: true, index: 0, total: 2 }, storyTitle: '🔊 Dive story' });
  expect(screen.getByRole('button', { name: '🐠 Match the fish' })).toBeTruthy();
  expect(screen.getByRole('button', { name: '🔊 Dive story' })).toBeTruthy();
});
