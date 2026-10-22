import { raDecToUnitVector } from './constellationProjection.js';

export const SKY_RADIUS = 2700;
const OBLIQUITY = 23.4392911 * Math.PI / 180;
export const SKY_LINE = 'These star patterns surround our Solar System. The lines are imaginary guides. The stars are far beyond the planets and at different distances. This model shows their directions, not tonight’s sky from your home.';

// J2000 into a right-handed y-up ecliptic frame. RA increases towards -z,
// so east is left when the sky is viewed from inside (matching the SVG charts).
export function skyDirection(star) {
  const p = raDecToUnitVector(star);
  return { x: p.x, y: p.y * Math.cos(OBLIQUITY) - p.z * Math.sin(OBLIQUITY), z: -p.y * Math.sin(OBLIQUITY) - p.z * Math.cos(OBLIQUITY) };
}
export function constellationFrame(stars, aspect, height) {
  const points = stars.map(skyDirection);
  const center = points.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y, z: a.z + p.z }), { x: 0, y: 0, z: 0 });
  const length = Math.hypot(center.x, center.y, center.z) || 1;
  for (const key of ['x', 'y', 'z']) center[key] /= length;
  const angle = Math.max(...points.map(p => Math.acos(Math.min(1, Math.max(-1, p.x * center.x + p.y * center.y + p.z * center.z)))));
  const landscape = height <= 420 && aspect > 1.3;
  const reserved = landscape ? 0 : Math.min(250, height * .44);
  const reservedX = landscape ? Math.min(364, aspect * height * .44 + 24) : 0;
  const usable = Math.max(.25, (height - reserved) / height);
  const fov = Math.min(120, Math.max(25, 2 * Math.atan(Math.tan(angle * 1.18) / Math.min((aspect - reservedX / height) * .88, usable)) * 180 / Math.PI));
  return { center, fov, reserved, reservedX };
}
