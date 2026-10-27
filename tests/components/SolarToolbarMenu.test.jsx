import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import SolarToolbarMenu from '../../src/pages/skills/geography/SolarToolbarMenu.jsx';

const items = (overrides = {}) => [
  { id: 'map', icon: '🗺', label: 'Galaxy map', onSelect: vi.fn(), ...overrides.map },
  { id: 'beyond', icon: '🌀', label: 'Beyond', ariaLabel: 'Warp to Beyond', onSelect: vi.fn(), ...overrides.beyond },
];

test('the More button opens a list of labelled choices and focuses the first', () => {
  render(<SolarToolbarMenu items={items()} />);
  const toggle = screen.getByRole('button', { name: 'More things to do' });
  expect(toggle.getAttribute('aria-expanded')).toBe('false');
  expect(screen.queryByRole('button', { name: 'Galaxy map' })).toBeNull();
  fireEvent.click(toggle);
  expect(toggle.getAttribute('aria-expanded')).toBe('true');
  expect(screen.getByRole('group', { name: 'More things to do' })).toBeTruthy();
  expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Galaxy map' }));
  expect(screen.getByRole('button', { name: 'Warp to Beyond' }).textContent).toContain('Beyond');
});

test('choosing an item closes the list, then runs it', () => {
  const list = items();
  render(<SolarToolbarMenu items={list} />);
  fireEvent.click(screen.getByRole('button', { name: 'More things to do' }));
  fireEvent.click(screen.getByRole('button', { name: 'Warp to Beyond' }));
  expect(list[1].onSelect).toHaveBeenCalledOnce();
  expect(screen.queryByRole('group')).toBeNull();
});

test('Escape closes the list and returns focus to More without reaching the page', () => {
  const pageEscape = vi.fn();
  window.addEventListener('keydown', pageEscape);
  try {
    render(<SolarToolbarMenu items={items()} />);
    const toggle = screen.getByRole('button', { name: 'More things to do' });
    fireEvent.click(toggle);
    fireEvent.keyDown(screen.getByRole('button', { name: 'Galaxy map' }), { key: 'Escape' });
    expect(screen.queryByRole('group')).toBeNull();
    expect(document.activeElement).toBe(toggle);
    expect(pageEscape).not.toHaveBeenCalled();
  } finally { window.removeEventListener('keydown', pageEscape); }
});

test('a tap outside closes the list; disabled items cannot be chosen', () => {
  const list = items({ map: { disabled: true } });
  render(<div><p>outside</p><SolarToolbarMenu items={list} /></div>);
  fireEvent.click(screen.getByRole('button', { name: 'More things to do' }));
  fireEvent.click(screen.getByRole('button', { name: 'Galaxy map' }));
  expect(list[0].onSelect).not.toHaveBeenCalled();
  fireEvent.pointerDown(screen.getByText('outside'));
  expect(screen.queryByRole('group')).toBeNull();
});

test('the toggle can be disabled and exposes its ref for focus return', () => {
  const ref = React.createRef();
  render(<SolarToolbarMenu items={items()} disabled buttonRef={ref} />);
  expect(ref.current).toBe(screen.getByRole('button', { name: 'More things to do' }));
  expect(ref.current.disabled).toBe(true);
});
