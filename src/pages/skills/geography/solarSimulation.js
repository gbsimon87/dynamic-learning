import { orbitPosition } from "./planetOrbits.js";

export function createSolarDefaults() {
  return {
    simulation: { orbitSpeedMultiplier: 1, rotationSpeedMultiplier: 1, showOrbits: true, showLabels: true, showMoonLabels: false, enableTilt: true },
    camera: { position: [0, 72, 128], target: [0, 0, 0], fov: 50, near: 0.1, far: 5000 },
    lighting: { sun: 400, ambient: 0.8 },
    glow: { enabled: true, intensity: 0.42, size: 16 },
    stars: { count: 5000, size: 0.6 },
    background: { enabled: true },
    // Fixed teaching scale, with rocks comparable to the neighbouring Trojans.
    belt: { enabled: true, count: 6000, innerRadius: 55, outerRadius: 90, minSize: 0.30, maxSize: 0.45, maxInclinationDeg: 3, eccentricity: 0.04, minSpeed: 0.0004, maxSpeed: 0.0012 },
  };
}

export function createWorldTime() {
  return { elapsed: 0, orbitTime: 0, spinTime: 0 };
}

export function advanceWorldTime(time, dt, settings, paused = false) {
  if (paused || !Number.isFinite(dt) || dt <= 0) return time;
  return {
    elapsed: time.elapsed + dt,
    orbitTime: time.orbitTime + dt * settings.orbitSpeedMultiplier,
    spinTime: time.spinTime + dt * settings.rotationSpeedMultiplier,
  };
}

// Bodies with `orbit` elements (the planets) follow real ellipses; the rest
// (moons) keep simple circles. `tilt` (radians, about Z like a planet's axial
// tilt) lays a moon's circle in its planet's equator.
export function getBodyPose({ speed, distance, phase = 0, tidallyLocked = false, orbit, tilt = 0 }, time) {
  const angle = speed * time.orbitTime + phase;
  const flatX = Math.sin(angle) * distance;
  return {
    position: orbit
      ? orbitPosition({ distance, speed, orbit }, time.orbitTime)
      : { x: flatX * Math.cos(tilt), y: flatX * Math.sin(tilt), z: Math.cos(angle) * distance },
    // SphereGeometry's map centre (local +X) is the near side. Keep it
    // pointing towards the parent at the origin, regardless of spin speed.
    // Apply rotationY first, then rotationZ (Euler order "ZYX").
    rotationY: tidallyLocked ? angle + Math.PI / 2 : speed * time.spinTime * 60,
    rotationZ: orbit ? 0 : tilt,
  };
}
