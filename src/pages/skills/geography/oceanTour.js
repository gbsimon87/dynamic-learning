import { OCEAN_DISCOVERIES } from './oceanDiscoveries.js';

// A deliberately short first tour: all three stops are already near the start,
// so the child sees a habitat and two animals without crossing the whole ocean.
export const OCEAN_TOUR_STOPS = [
  {
    id: 'coral-reef',
    name: 'Coral reef',
    narration: 'Welcome to the reef! Coral may look like rock, but it is made by tiny animals called polyps. A reef is a busy home for many sea creatures.',
  },
  {
    id: 'parrotfish',
    name: 'Parrotfish',
    narration: 'Here is a parrotfish. Its teeth join together to make a strong beak. It scrapes tiny plants from rocks and old coral.',
  },
  {
    id: 'sea-turtle',
    name: 'Green sea turtle',
    narration: 'Our last neighbour is a green sea turtle. It is a reptile, not a fish, so it must swim to the surface to breathe air.',
  },
];

export const oceanTourStop = (id) => OCEAN_TOUR_STOPS.find((stop) => stop.id === id);

export const oceanTourDiscovery = (id) => {
  const discovery = OCEAN_DISCOVERIES.find((item) => item.id === id);
  const stop = oceanTourStop(id);
  return discovery && stop ? { ...discovery, narration: stop.narration } : null;
};
