import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import MoonPhaseCard from '../../src/pages/skills/geography/MoonPhaseCard.jsx';
import { MOON_PHASE_LINE } from '../../src/pages/skills/geography/moonPhase.js';
import { speak, stopNarrationOf } from '../../src/utils/speech.js';
vi.mock('../../src/utils/speech.js', () => ({ speak: vi.fn(), stopNarrationOf: vi.fn() }));
vi.mock('../../src/components/celebration/sound/player.js', () => ({ isMuted: () => false }));

beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
        createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) }),
        putImageData: vi.fn(),
    });
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.clearAllMocks(); });

test('samples live model only while open, reads explanation and cleans up on close', () => {
    const getMoonPhase = vi.fn(() => ({ name: 'New Moon', light: { x: 0, y: 0, z: -1 } }));
    render(<MoonPhaseCard sceneApiRef={{ current: { getMoonPhase } }} />);
    expect(getMoonPhase).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /See the Moon/ }));
    expect(screen.getByRole('img').getAttribute('aria-label')).toContain('New Moon');
    getMoonPhase.mockReturnValue({ name: 'Full Moon', light: { x: 0, y: 0, z: 1 } });
    act(() => vi.advanceTimersByTime(150));
    expect(screen.getByRole('img').getAttribute('aria-label')).toContain('Full Moon');
    fireEvent.click(screen.getByRole('button', { name: /Hear about/ }));
    expect(speak).toHaveBeenCalledWith(MOON_PHASE_LINE);
    fireEvent.click(screen.getByRole('button', { name: /See the Moon/ }));
    const calls = getMoonPhase.mock.calls.length;
    act(() => vi.advanceTimersByTime(1000));
    expect(getMoonPhase).toHaveBeenCalledTimes(calls);
    expect(stopNarrationOf).toHaveBeenCalledWith(MOON_PHASE_LINE);
    expect(vi.getTimerCount()).toBe(0);
});

test('tour mute disables narration and unmount clears the sampling timer', () => {
    const { unmount } = render(<MoonPhaseCard sceneApiRef={{ current: {} }} muted />);
    fireEvent.click(screen.getByRole('button', { name: /See the Moon/ }));
    expect(screen.getByRole('button', { name: /Hear about/ }).disabled).toBe(true);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
});
