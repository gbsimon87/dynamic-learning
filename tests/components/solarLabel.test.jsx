import { expect, test, vi } from 'vitest';
import { createSolarLabel } from '../../src/pages/skills/geography/solarLabel.js';

test('long flight equations wrap whole words without dropping numbers, operators or brackets', () => {
  const context = {
    measureText: text => ({ width: text.length * 58 }),
    beginPath: vi.fn(), roundRect: vi.fn(), fill: vi.fn(), stroke: vi.fn(), fillText: vi.fn(),
  };
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
  const text = '100 + (99 × 100) + 98';
  const label = createSolarLabel(text, 96, '#ffffff', 'arithmetic');
  try {
    const lines = context.fillText.mock.calls.map(([line]) => line);
    expect(lines.length).toBeGreaterThan(1);
    expect(lines.join(' ')).toBe(text);
    expect(lines.every(line => line.length <= 14)).toBe(true);
    const canvas = label.material.map.image;
    expect(context.fillText.mock.calls.every(([line, x, y]) => x > 0 && y > 0 && y < canvas.height && context.measureText(line).width < canvas.width)).toBe(true);
    expect(label.scale.y).toBe(1.75 * lines.length);
  } finally { label.material.map.dispose(); label.material.dispose(); }
});
