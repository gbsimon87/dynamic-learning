// Space Arithmetic's planet tour: every JOURNEY_LEG right answers the rocket
// "reaches" the next planet, Mercury out to Neptune, then round again.
// Session-only fun, like the milestone line: nothing is stored or earned.
import { MILESTONE_EVERY } from './feedback.js';

export const JOURNEY_LEG = MILESTONE_EVERY;
export const JOURNEY_STOPS = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

/**
 * Where the tour is after `solved` right answers: the planet just reached (only
 * on the answer that reaches it), the next stop and how far along this leg.
 */
export function journeyAt(solved) {
  const n = Math.max(0, Math.floor(Number(solved) || 0));
  const legs = Math.floor(n / JOURNEY_LEG);
  const stop = i => JOURNEY_STOPS[i % JOURNEY_STOPS.length];
  return { reached: n > 0 && n % JOURNEY_LEG === 0 ? stop(legs - 1) : null, next: stop(legs), progress: n % JOURNEY_LEG };
}
