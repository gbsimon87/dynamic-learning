import {
  CLOWNFISH_DISCOVERY, CLOWNFISH_ORBIT, DOLPHIN_DISCOVERY, DOLPHIN_ORBIT, FISH_DISCOVERY, FISH_ORBIT, JELLYFISH_DISCOVERY, JELLYFISH_ORBIT,
  OCTOPUS_DISCOVERY, OCTOPUS_ORBIT, PORCUPINEFISH_DISCOVERY, PORCUPINEFISH_ORBIT, RAY_DISCOVERY, RAY_ORBIT, SEAHORSE_DISCOVERY, SEAHORSE_ORBIT,
  SHARK_DISCOVERY, SHARK_ORBIT, SWORDFISH_DISCOVERY, SWORDFISH_ORBIT, TURTLE_DISCOVERY, TURTLE_ORBIT, WHALE_DISCOVERY, WHALE_ORBIT,
} from './oceanDiscoveries.js';
import { FISH_LOOP, FISH_RADIUS, createOceanFish, animateFish } from './oceanFish.js';
import { animateClownfish, animateRay, animateSeahorse, animateTurtle, createOceanClownfish, createOceanRay, createOceanSeahorse, createOceanTurtle } from './oceanCreatures.js';
import { animateDolphin, animateJellyfish, animateOctopus, animatePufferfish, animateShark, animateSwordfish, animateWhale, createOceanDolphin, createOceanJellyfish, createOceanOctopus, createOceanPufferfish, createOceanShark, createOceanSwordfish, createOceanWhale } from './oceanMoreCreatures.js';
import { REEFS } from './oceanReef.js';
import { STEERING } from './oceanSteering.js';

/**
 * The first five species each have one home loop (the first of its kind, near the start); every other animal is placed across the ocean.
 * `base` is a typical loop: its radius, height and lap time. `radius` is the orbit pilot's target size.
 * @typedef {{ id: string, discovery: object, orbit: object, radius: number, home: object, base: { radius: number, height: number, lapSeconds: number }, count: number, create: (water: object) => import('three').Object3D, animate: (model: import('three').Object3D, seconds: number) => void }} Species
 * @type {Species[]}
 */
const SPECIES = [
  {
    id: 'parrotfish', discovery: FISH_DISCOVERY, orbit: FISH_ORBIT, radius: FISH_RADIUS, home: FISH_LOOP, count: 14, create: createOceanFish,
    base: { radius: 5, height: 3.2, lapSeconds: 30 },
    animate: animateFish,
  },
  { id: 'clownfish', discovery: CLOWNFISH_DISCOVERY, orbit: CLOWNFISH_ORBIT, radius: 0.9, home: { x: 12, z: 3, radius: 3, height: 3.1, lapSeconds: 24 }, count: 10, base: { radius: 3, height: 3.1, lapSeconds: 24 }, create: createOceanClownfish, animate: animateClownfish },
  { id: 'sea-turtle', discovery: TURTLE_DISCOVERY, orbit: TURTLE_ORBIT, radius: 1.4, home: { x: 8, z: 20, radius: 4.5, height: 3.6, lapSeconds: 60 }, count: 7, base: { radius: 4.5, height: 3.6, lapSeconds: 60 }, create: createOceanTurtle, animate: animateTurtle },
  { id: 'eagle-ray', discovery: RAY_DISCOVERY, orbit: RAY_ORBIT, radius: 1.8, home: { x: -10, z: 10, radius: 3.5, height: 3.8, lapSeconds: 45 }, count: 7, base: { radius: 3.5, height: 3.8, lapSeconds: 45 }, create: createOceanRay, animate: animateRay },
  { id: 'seahorse', discovery: SEAHORSE_DISCOVERY, orbit: SEAHORSE_ORBIT, radius: 1.1, home: { x: -11, z: -13, radius: 2, height: 3.2, lapSeconds: 40 }, count: 8, base: { radius: 2, height: 3.2, lapSeconds: 40 }, create: createOceanSeahorse, animate: animateSeahorse },
  { id: 'reef-shark', discovery: SHARK_DISCOVERY, orbit: SHARK_ORBIT, radius: 1.7, count: 5, base: { radius: 6, height: 3.8, lapSeconds: 40 }, create: createOceanShark, animate: animateShark },
  { id: 'octopus', discovery: OCTOPUS_DISCOVERY, orbit: OCTOPUS_ORBIT, radius: 1, count: 6, base: { radius: 3, height: 3.3, lapSeconds: 36 }, create: createOceanOctopus, animate: animateOctopus },
  { id: 'humpback-whale', discovery: WHALE_DISCOVERY, orbit: WHALE_ORBIT, radius: 3.8, count: 3, base: { radius: 11, height: 4.6, lapSeconds: 90 }, create: createOceanWhale, animate: animateWhale },
  { id: 'swordfish', discovery: SWORDFISH_DISCOVERY, orbit: SWORDFISH_ORBIT, radius: 1.6, count: 5, base: { radius: 7, height: 4, lapSeconds: 30 }, create: createOceanSwordfish, animate: animateSwordfish },
  { id: 'dolphin', discovery: DOLPHIN_DISCOVERY, orbit: DOLPHIN_ORBIT, radius: 1.3, count: 6, base: { radius: 6, height: 4, lapSeconds: 28 }, create: createOceanDolphin, animate: animateDolphin },
  { id: 'porcupinefish', discovery: PORCUPINEFISH_DISCOVERY, orbit: PORCUPINEFISH_ORBIT, radius: 0.8, count: 6, base: { radius: 2.5, height: 3.2, lapSeconds: 34 }, create: createOceanPufferfish, animate: animatePufferfish },
  { id: 'jellyfish', discovery: JELLYFISH_DISCOVERY, orbit: JELLYFISH_ORBIT, radius: 0.9, count: 8, base: { radius: 2, height: 4, lapSeconds: 60 }, create: createOceanJellyfish, animate: animateJellyfish },
];

let seed = 90210;
const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };

/** Whether a loop leaves room for its orbit beside the reefs, the start and the edge. */
function fits(loop, orbit) {
  const reach = Math.hypot(loop.x, loop.z);
  if (reach + loop.radius + orbit.radius + 1 >= STEERING.areaRadius) return false;
  if (reach - loop.radius <= orbit.entryDistance + 3) return false;
  return REEFS.every(reef => Math.hypot(loop.x - reef.x, loop.z - reef.z) > reef.radius + loop.radius + orbit.radius + 2);
}

/**
 * Every animal in the ocean, one entry per thing swimming. Extra animals take the best of several random spots,
 * the one farthest from every loop so far, so the ocean fills evenly. Each gets its own size, height, speed,
 * direction and starting point.
 * @typedef {{ key: string, id: string, discovery: object, orbit: object, radius: number, loop: object, create: Function, animate: Function }} Animal
 * @type {Animal[]}
 */
export const ANIMALS = (() => {
  const animals = SPECIES.filter(({ home }) => home).map(({ id, discovery, orbit, radius, home, create, animate }) => ({ key: id, id, discovery, orbit, radius, loop: home, create, animate }));
  const spread = (loop) => Math.min(...animals.map(other => Math.hypot(loop.x - other.loop.x, loop.z - other.loop.z) - other.loop.radius - loop.radius));
  for (let round = 0; animals.length < SPECIES.reduce((total, species) => total + species.count, 0); round++) {
    for (const species of SPECIES) {
      if (round >= species.count || (round === 0 && species.home)) continue;
      let best = null, bestGap = -Infinity;
      for (let attempt = 0; attempt < 200 && (best === null || attempt < 60); attempt++) {
        // A parked submarine must still be able to reach it, so a loop stays inside the orbit's entry distance.
        const widest = Math.min(1.2, (species.orbit.entryDistance - 0.7) / species.base.radius);
        const scale = 0.7 + random() * (widest - 0.7);
        const loop = {
          radius: species.base.radius * scale,
          height: 3 + random() * (Math.min(4.8, species.base.height + 1.2) - 3),
          lapSeconds: species.base.lapSeconds * (0.8 + random() * 0.45),
          direction: random() < 0.5 ? -1 : 1,
          phase: random() * species.base.lapSeconds,
        };
        const angle = random() * Math.PI * 2, distance = Math.sqrt(random()) * STEERING.areaRadius;
        loop.x = Math.cos(angle) * distance;
        loop.z = Math.sin(angle) * distance;
        if (!fits(loop, species.orbit)) continue;
        const gap = spread(loop);
        if (gap > bestGap) { best = loop; bestGap = gap; }
      }
      animals.push({ key: round === 0 ? species.id : `${species.id}-${round + 1}`, id: species.id, discovery: species.discovery, orbit: species.orbit, radius: species.radius, loop: best, create: species.create, animate: species.animate });
    }
  }
  return animals;
})();
