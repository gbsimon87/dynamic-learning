export const MISSION_KEY = 'dl.solarMissions';
export const MISSIONS = [
  { id: 'red', clue: 'Fly to the red planet.', target: 'Mars', answer: 'Mars looks red because its surface contains rusty iron minerals.' },
  { id: 'rings', clue: 'Fly to the planet famous for its bright rings.', target: 'Saturn', answer: 'Saturn has bright rings made mostly of pieces of ice.' },
  { id: 'home', clue: 'Fly to our home planet.', target: 'Earth', answer: 'Earth is our home, with liquid oceans and life.' },
  { id: 'largest', clue: 'Fly to the biggest planet in our Solar System.', target: 'Jupiter', answer: 'Jupiter is the biggest planet in our Solar System.' },
  { id: 'geysers', clue: 'Find Saturn’s icy moon with geysers. Try searching for Enceladus!', target: 'Enceladus', parent: 'Saturn', answer: 'Enceladus sprays water and icy particles from near its south pole.' },
  { id: 'moon', clue: 'Fly to the Moon that orbits Earth.', target: 'Moon', parent: 'Earth', answer: 'Our Moon orbits Earth and keeps the same face towards us.' },
];

export function missionMatches(mission, body) {
  return Boolean(mission && body && body.name === mission.target && (!mission.parent || body.parentName === mission.parent));
}
export function loadMissionStamps(storage) {
  try {
    const data = JSON.parse((storage ?? window.localStorage).getItem(MISSION_KEY));
    return data?.version === 1 && Array.isArray(data.completed)
      ? MISSIONS.filter(m => data.completed.includes(m.id)).map(m => m.id) : [];
  } catch { return []; }
}
export function saveMissionStamps(completed, storage) {
  try {
    (storage ?? window.localStorage).setItem(MISSION_KEY, JSON.stringify({ version: 1, completed: MISSIONS.filter(m => completed.includes(m.id)).map(m => m.id) }));
    return true;
  } catch { return false; }
}
