// UK publication dates are independent of the visitor's or server's timezone.
export const FIRST_FAMILY_FRIDAY = '2026-11-13';
export const FAMILY_FRIDAY_PATH = '/skills/family-friday';
const DAY = 86400000;
const ukDate = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
});

export function londonDay(now = new Date()) {
  const parts = Object.fromEntries(ukDate.formatToParts(now).map(part => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function dateNumber(day) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day ?? '')) return NaN;
  const value = Date.parse(`${day}T12:00:00Z`);
  return Number.isFinite(value) && new Date(value).toISOString().slice(0, 10) === day ? value : NaN;
}

export function editionIndex(week) {
  const value = dateNumber(week);
  if (!Number.isFinite(value) || new Date(value).getUTCDay() !== 5 || week < FIRST_FAMILY_FRIDAY) return null;
  return Math.round((value - dateNumber(FIRST_FAMILY_FRIDAY)) / (7 * DAY));
}

export function latestFriday(now = new Date()) {
  const day = londonDay(now);
  const value = dateNumber(day);
  const sinceFriday = (new Date(value).getUTCDay() + 2) % 7;
  const friday = new Date(value - sinceFriday * DAY).toISOString().slice(0, 10);
  return friday >= FIRST_FAMILY_FRIDAY ? friday : null;
}

export function isFamilyFriday(now = new Date()) {
  const day = londonDay(now);
  return editionIndex(day) !== null;
}

export function isPublishedEdition(week, now = new Date()) {
  const latest = latestFriday(now);
  return editionIndex(week) !== null && latest !== null && week <= latest;
}

export function publishedFridays(now = new Date(), limit = 8) {
  const latest = latestFriday(now);
  if (!latest) return [];
  const count = Math.min(editionIndex(latest) + 1, Math.max(0, Math.floor(limit)));
  return Array.from({ length: count }, (_, index) =>
    new Date(dateNumber(latest) - index * 7 * DAY).toISOString().slice(0, 10));
}

export function editionPath(week) {
  return `${FAMILY_FRIDAY_PATH}?week=${week}`;
}

export function editionLabel(week) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${week}T12:00:00Z`));
}
