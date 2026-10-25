import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import BeyondPicker from '../../src/pages/skills/geography/BeyondPicker.jsx';
import BeyondWarpControls from '../../src/pages/skills/geography/BeyondWarpControls.jsx';
import SpaceRipplesCard from '../../src/pages/skills/geography/SpaceRipplesCard.jsx';
import { SPACE_RIPPLES_FACTS, SPACE_RIPPLES_LINE } from '../../src/pages/skills/geography/spaceRipplesFacts.js';
import { availableDestinations } from '../../src/pages/skills/geography/beyondDestinations.js';
import { speak } from '../../src/utils/speech.js';
import { isMuted } from '../../src/components/celebration/sound/player.js';

vi.mock('../../src/utils/speech.js', () => ({ speak: vi.fn(), stopNarrationOf: vi.fn() }));
vi.mock('../../src/components/celebration/sound/player.js', () => ({ isMuted: vi.fn(() => false) }));

const PICTURE = "This is a picture to help us imagine. Real space ripples are invisible, and we've sped them up.";
const PRETEND = "Getting here was a pretend space shortcut. Real black holes don't lead anywhere.";
const noop = () => {};

beforeEach(() => { speak.mockClear(); isMuted.mockReturnValue(false); });
afterEach(() => { Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' }); });

test('picker lists only ready destinations and chooses one', () => {
  const onChoose = vi.fn(), onClose = vi.fn();
  render(<BeyondPicker destinations={availableDestinations()} onChoose={onChoose} onClose={onClose} />);
  const dialog = screen.getByRole('dialog', { name: 'Where to?' });
  expect(dialog.textContent).toContain('Far beyond our galaxy');
  expect(dialog.textContent).toContain('pretend space shortcut');
  expect(screen.getAllByRole('button', { name: /Space ripples/ })).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', { name: /Space ripples/ }));
  expect(onChoose).toHaveBeenCalledWith('space-ripples');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});

test('holding by pointer and by Space or Shift reports hold and release', () => {
  const onHoldChange = vi.fn();
  render(<BeyondWarpControls progress={0} calm={false} onHoldChange={onHoldChange} />);
  const hold = screen.getByRole('button', { name: 'Hold to power the engine' });
  fireEvent.pointerDown(hold, { pointerId: 1 });
  expect(onHoldChange).toHaveBeenLastCalledWith(true);
  fireEvent.pointerUp(hold, { pointerId: 1 });
  expect(onHoldChange).toHaveBeenLastCalledWith(false);
  fireEvent.keyDown(window, { key: ' ', code: 'Space' });
  expect(onHoldChange).toHaveBeenLastCalledWith(true);
  fireEvent.keyUp(window, { key: ' ', code: 'Space' });
  expect(onHoldChange).toHaveBeenLastCalledWith(false);
  fireEvent.keyDown(window, { key: 'Shift', code: 'ShiftLeft' });
  expect(onHoldChange).toHaveBeenLastCalledWith(true);
  fireEvent.keyUp(window, { key: 'Shift', code: 'ShiftLeft' });
  expect(onHoldChange).toHaveBeenLastCalledWith(false);
});

test('losing focus or hiding the page while holding releases the engine', () => {
  const onHoldChange = vi.fn();
  render(<BeyondWarpControls progress={0.3} calm={false} onHoldChange={onHoldChange} />);
  fireEvent.keyDown(window, { key: ' ', code: 'Space' });
  act(() => { window.dispatchEvent(new Event('blur')); });
  expect(onHoldChange).toHaveBeenLastCalledWith(false);
  fireEvent.keyDown(window, { key: ' ', code: 'Space' });
  expect(onHoldChange).toHaveBeenLastCalledWith(true);
  Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
  act(() => { document.dispatchEvent(new Event('visibilitychange')); });
  expect(onHoldChange).toHaveBeenLastCalledWith(false);
  const hold = screen.getByRole('button', { name: 'Hold to power the engine' });
  fireEvent.pointerDown(hold, { pointerId: 2 });
  fireEvent.pointerCancel(hold, { pointerId: 2 });
  expect(onHoldChange).toHaveBeenLastCalledWith(false);
});

test('progress is announced as a progressbar, with a calm hint under reduced motion', () => {
  const { rerender } = render(<BeyondWarpControls progress={0.42} calm={false} onHoldChange={noop} />);
  expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('42');
  expect(screen.queryByText(/we'll get there gently/)).toBeNull();
  rerender(<BeyondWarpControls progress={0.42} calm onHoldChange={noop} />);
  expect(screen.getByText("Hold to fill the bar — we'll get there gently.")).toBeTruthy();
});

test('ripples card shows the right action for each stage and the honesty labels', () => {
  const props = { onBringTogether: vi.fn(), onReplay: vi.fn(), onHome: vi.fn() };
  const { rerender } = render(<SpaceRipplesCard stage="waiting" {...props} />);
  expect(SPACE_RIPPLES_FACTS).toHaveLength(3);
  for (const fact of SPACE_RIPPLES_FACTS) expect(screen.getByText(fact)).toBeTruthy();
  expect(screen.getByText(PICTURE)).toBeTruthy();
  expect(screen.getByText(PRETEND)).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Bring them together' }));
  expect(props.onBringTogether).toHaveBeenCalledOnce();
  expect(screen.queryByRole('button', { name: 'Replay' })).toBeNull();
  rerender(<SpaceRipplesCard stage="merging" {...props} />);
  expect(screen.queryByRole('button', { name: 'Bring them together' })).toBeNull();
  expect(screen.queryByRole('button', { name: 'Replay' })).toBeNull();
  rerender(<SpaceRipplesCard stage="settled" {...props} />);
  fireEvent.click(screen.getByRole('button', { name: 'Replay' }));
  expect(props.onReplay).toHaveBeenCalledOnce();
  fireEvent.click(screen.getByRole('button', { name: 'Back to the Solar System' }));
  expect(props.onHome).toHaveBeenCalledOnce();
});

test('read-aloud respects the navbar mute', () => {
  render(<SpaceRipplesCard stage="waiting" onBringTogether={noop} onReplay={noop} onHome={noop} />);
  const listen = screen.getByRole('button', { name: /Hear about space ripples/ });
  isMuted.mockReturnValue(true);
  fireEvent.click(listen);
  expect(speak).not.toHaveBeenCalled();
  isMuted.mockReturnValue(false);
  fireEvent.click(listen);
  expect(speak).toHaveBeenCalledWith(SPACE_RIPPLES_LINE);
  expect(SPACE_RIPPLES_LINE).toContain(PICTURE);
});

test('the warp controls take focus, so a keyboard child can hold straight away', () => {
  render(<BeyondWarpControls progress={0} calm={false} onHoldChange={noop} />);
  expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Hold to power the engine' }));
});

test('focus follows the ripples card: its action on arrival, its title while merging, Replay once settled', () => {
  const props = { onBringTogether: noop, onReplay: noop, onHome: noop };
  const { rerender } = render(<SpaceRipplesCard stage="waiting" {...props} />);
  expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Bring them together' }));
  rerender(<SpaceRipplesCard stage="merging" {...props} />);
  expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Space ripples' }));
  rerender(<SpaceRipplesCard stage="settled" {...props} />);
  expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Replay' }));
});

test('the ripples card leaves focus alone when the child is elsewhere on the page', () => {
  const outside = document.createElement('button');
  document.body.append(outside);
  const props = { onBringTogether: noop, onReplay: noop, onHome: noop };
  const { rerender } = render(<SpaceRipplesCard stage="merging" {...props} />);
  outside.focus();
  rerender(<SpaceRipplesCard stage="settled" {...props} />);
  expect(document.activeElement).toBe(outside);
  outside.remove();
});
