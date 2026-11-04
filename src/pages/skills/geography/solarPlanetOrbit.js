import { ORBIT_RATE, createOrbitPilot, nearestOrbitTarget } from '../../../components/worlds/orbitPilot.js';

export const PLANET_ORBIT_RATE = ORBIT_RATE;
const ORBITABLE = ['planet', 'moon'];
// Moons sit close to their planets, so they are offered only from nearby.
export const orbitEntryDistance = body => body.kind === 'moon'
  ? Math.max(body.radius * 6, body.radius + 1.2)
  : Math.max(body.radius * 4, body.radius + 3.5);

// A moon is tiny beside its planet: ride and film it from much closer.
function solarOrbitProfile(body) {
  if (!ORBITABLE.includes(body?.kind)) return null;
  const moon = body.kind === 'moon';
  return {
    entryDistance: orbitEntryDistance(body),
    radius: moon
      ? Math.max(body.radius * 2.6, body.radius + .35)
      : Math.max(body.radius * (body.name === 'Saturn' ? 3.2 : 2.1), body.radius + .9),
    rig: moon
      ? { back: Math.max(body.radius * 3, .9), lift: .25, trail: .25 }
      : { back: Math.max(body.radius * 2.5, 2.2), lift: .6, trail: .6 },
  };
}

const solid = obstacle => !['belt', 'comet', 'satellite'].includes(obstacle.kind);

export const nearestOrbitBody = (bodies, position) => nearestOrbitTarget(bodies, position, solarOrbitProfile);

/** Planet/moon orbit for the existing manual/autopilot ships, on the shared world pilot. */
export const createPlanetOrbit = options => createOrbitPilot({ ...options, profile: solarOrbitProfile, isSolid: solid });
