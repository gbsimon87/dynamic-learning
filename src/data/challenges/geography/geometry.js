/** Shared by the drawings and independent geometry tests. Coordinates are never pixel guesses. */
export function project(point, extent, width = 480, height = 320) {
  const [west, south, east, north] = extent;
  return [(point[0] - west) / (east - west) * width, (north - point[1]) / (north - south) * height];
}
const validGridPoint = (point) => Array.isArray(point) && point.length === 2 && point.every(n => Number.isFinite(n) && n >= 0 && n < 100);
export function gridReference(point) {
  if (!validGridPoint(point)) throw new RangeError("Grid coordinates must be finite numbers from 0 to less than 100.");
  const [east, north] = point;
  return `${Math.floor(east).toString().padStart(2, "0")}${Math.floor(north).toString().padStart(2, "0")}`;
}
export function isGridInterior(point) { return validGridPoint(point) && point.every(n => n % 1 !== 0); }
export const DIRECTIONS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
export const STEPS = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
export function directionBetween(a, b) {
  const dx = Math.sign(b[0] - a[0]), dy = Math.sign(b[1] - a[1]);
  const i = STEPS.findIndex(([x, y]) => x === dx && y === dy);
  return DIRECTIONS[i] ?? null;
}
