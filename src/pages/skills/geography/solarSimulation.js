export function createSolarDefaults({ marsDistance = 39, jupiterDistance = 133.33 } = {}) {
  return {
    simulation: { orbitSpeedMultiplier: 1, rotationSpeedMultiplier: 1, showOrbits: true, showLabels: true, showMoonLabels: false, enableTilt: true },
    camera: { position: [0, 72, 128], target: [0, 0, 0], fov: 50, near: 0.1, far: 5000 },
    lighting: { sun: 400, ambient: 0.28 },
    glow: { enabled: true, intensity: 0.42, size: 16 },
    stars: { count: 5000, size: 0.6 },
    background: { enabled: true },
    belt: { enabled: true, count: 4500, innerRadius: marsDistance + 8, outerRadius: jupiterDistance - 15, minSize: 0.25, maxSize: 0.3, maxInclinationDeg: 3, eccentricity: 0.04, minSpeed: 0.0004, maxSpeed: 0.0012 },
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

export function getBodyPose({ speed, distance, phase = 0 }, time) {
  const angle = speed * time.orbitTime + phase;
  return {
    position: { x: Math.sin(angle) * distance, y: 0, z: Math.cos(angle) * distance },
    rotationY: speed * time.spinTime * 60,
  };
}
