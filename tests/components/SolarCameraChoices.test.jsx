import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import SolarCameraChoices from '../../src/pages/skills/geography/SolarCameraChoices.jsx';
import SolarCockpit from '../../src/pages/skills/geography/SolarCockpit.jsx';

test('camera choices are labelled, announce the selected view, and emit reversible changes', () => {
  const onChange = vi.fn();
  const { rerender } = render(<>
    <SolarCameraChoices value="behind" onChange={onChange} />
    <SolarCockpit />
  </>);
  const behind = screen.getByRole('button', { name: /Behind rocket/ });
  const cockpit = screen.getByRole('button', { name: /Cockpit/ });
  expect(behind.getAttribute('aria-pressed')).toBe('true');
  expect(cockpit.getAttribute('aria-pressed')).toBe('false');
  expect(screen.getByLabelText('Camera view')).toBeTruthy();
  expect(document.querySelector('.solar-cockpit').getAttribute('aria-hidden')).toBe('true');

  fireEvent.click(cockpit);
  expect(onChange).toHaveBeenCalledWith('cockpit');
  rerender(<SolarCameraChoices value="cockpit" onChange={onChange} />);
  expect(screen.getByRole('button', { name: /Cockpit/ }).getAttribute('aria-pressed')).toBe('true');
  fireEvent.click(screen.getByRole('button', { name: /Behind rocket/ }));
  expect(onChange).toHaveBeenLastCalledWith('behind');
});

test('C toggles either camera once per press and stops listening after flight ends', () => {
  const onChange = vi.fn();
  const { rerender, unmount } = render(<SolarCameraChoices value="behind" onChange={onChange} />);
  fireEvent.keyDown(window, { key: 'c' });
  expect(onChange).toHaveBeenLastCalledWith('cockpit');
  rerender(<SolarCameraChoices value="cockpit" onChange={onChange} />);
  fireEvent.keyDown(window, { key: 'c', repeat: true });
  expect(onChange).toHaveBeenCalledTimes(1);
  fireEvent.keyDown(window, { key: 'C', shiftKey: true });
  expect(onChange).toHaveBeenLastCalledWith('behind');
  expect(onChange).toHaveBeenCalledTimes(2);
  fireEvent.keyDown(window, { key: 'с', code: 'KeyC' });
  expect(onChange).toHaveBeenCalledTimes(3);
  unmount();
  fireEvent.keyDown(window, { key: 'c' });
  expect(onChange).toHaveBeenCalledTimes(3);
});

test('camera shortcut leaves typing, composition and browser shortcuts alone', () => {
  const onChange = vi.fn();
  render(<>
    <SolarCameraChoices onChange={onChange} />
    <input aria-label="Search" /><textarea aria-label="Notes" />
    <select aria-label="Destination"><option>Earth</option></select>
    <div contentEditable suppressContentEditableWarning>Editable text</div>
  </>);
  for (const element of document.querySelectorAll('input, textarea, select, [contenteditable]')) {
    fireEvent.keyDown(element, { key: 'c' });
  }
  for (const modifier of ['ctrlKey', 'metaKey', 'altKey', 'isComposing']) {
    fireEvent.keyDown(window, { key: 'c', [modifier]: true });
  }
  fireEvent.keyDown(window, { key: 'v' });
  expect(onChange).not.toHaveBeenCalled();
});
