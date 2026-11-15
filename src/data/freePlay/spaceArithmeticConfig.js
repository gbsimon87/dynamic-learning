// Space Arithmetic's question choices are Arithmetic Practice's (math/practiceSettings.js).
export const SPACE_FLIGHT = {
  optionCount: 4, initialLane: 1, durationSeconds: 1.2, maxDeltaSeconds: 0.05,
  laneX: [-3, -1, 1, 3], ringRadius: 0.7,
  waitingZ: -8, passedZ: 2, pixelRatioCap: 1.5,
};
// How long feedback stays before the next sum (or the same sum again) flies in.
export const SPACE_FEEDBACK_MS = { correct: 1800, wrong: 2400 };
