import React, { StrictMode } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import FlagFinder from '../../src/pages/skills/geography/FlagFinder';
import { ThemeContext } from '../../src/context/theme-context';
import { createFlagCountriesStore } from '../../src/data/flagCountries';

const records = (prefix, continent = 'Europe') => Array.from({ length: 4 }, (_, i) => ({
  names: { common: `${prefix}${i}` }, flag: { url_png: `https://example.org/${prefix}${i}.png` },
  continents: [continent],
}));
const response = (objects, more = false) => ({ ok: true, json: async () => ({ data: { objects, meta: { more } } }) });
const mount = (store) => render(<StrictMode><ThemeContext.Provider value={{ theme: 'light' }}>
  <FlagFinder countryStore={store} />
</ThemeContext.Provider></StrictMode>);
afterEach(() => vi.useRealTimers());

describe('Flag Finder loading', () => {
  it('plays after the first page, preserves feedback while paging, and caches revisits', async () => {
    let resolveSecond;
    const second = new Promise((resolve) => { resolveSecond = resolve; });
    const fetchPage = vi.fn().mockResolvedValueOnce(response(records('A'), true)).mockReturnValueOnce(second);
    const store = createFlagCountriesStore({ fetchPage, pageDelayMs: 0 });
    const view = mount(store);
    await screen.findByText('Which country’s flag is this?');
    await waitFor(() => expect(fetchPage).toHaveBeenCalledTimes(2));
    expect(new URL(fetchPage.mock.calls[0][0]).searchParams.get('limit')).toBe('100');
    expect(new URL(fetchPage.mock.calls[1][0]).searchParams.get('offset')).toBe('4');
    const flag = screen.getByRole('img');
    const original = flag.getAttribute('src');
    const correct = flag.getAttribute('alt').replace('Flag of ', '');
    fireEvent.click(screen.getByRole('button', { name: correct }));
    expect(screen.getByText('✓ Correct!')).toBeTruthy();
    await act(async () => resolveSecond(response(records('Z', 'Asia'))));
    expect(screen.getByRole('img').getAttribute('src')).toBe(original);
    expect(screen.getByText('✓ Correct!')).toBeTruthy();
    expect(screen.getByRole('option', { name: /whole planet \(8\)/ })).toBeTruthy();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Asia' } });
    expect(screen.getByRole('img').getAttribute('alt')).toMatch(/Flag of Z/);
    expect(screen.getByText('Score: 0 / 0')).toBeTruthy();
    view.unmount();
    mount(store);
    expect(screen.queryByText('Loading flags...')).toBeNull();
    expect(fetchPage).toHaveBeenCalledTimes(2);
  });

  it('recovers with retry after an initial failure', async () => {
    const fetchPage = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(response(records('B')));
    const store = createFlagCountriesStore({ fetchPage });
    mount(store);
    await screen.findByRole('button', { name: 'Try again' });
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    await screen.findByText('Which country’s flag is this?');
    expect(fetchPage).toHaveBeenCalledTimes(2);
  });

  it('keeps partial data playable when a later page fails and deduplicates retry data', async () => {
    const fetchPage = vi.fn().mockResolvedValueOnce(response(records('A'), true))
      .mockRejectedValueOnce(new Error('rate limit'))
      .mockResolvedValueOnce(response([...records('A'), ...records('Z')]));
    const store = createFlagCountriesStore({ fetchPage, pageDelayMs: 0 });
    mount(store);
    await screen.findByText('Some flags couldn’t load. You can keep playing.');
    expect(screen.getAllByRole('button')).toHaveLength(5);
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    await screen.findByRole('option', { name: /whole planet \(8\)/ });
  });

  it('aborts a stalled request and makes retry available', async () => {
    vi.useFakeTimers();
    const fetchPage = vi.fn((url, { signal }) => new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('timeout')));
    }));
    const store = createFlagCountriesStore({ fetchPage, timeoutMs: 8000 });
    mount(store);
    await act(async () => { await vi.advanceTimersByTimeAsync(8000); });
    expect(fetchPage.mock.calls[0][1].signal.aborted).toBe(true);
    expect(screen.getByRole('button', { name: 'Try again' })).toBeTruthy();
  });
});
