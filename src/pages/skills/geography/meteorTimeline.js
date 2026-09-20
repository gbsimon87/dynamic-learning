const ORDER = ["preparing", "approaching", "impact", "breaking", "aftermath"];
const DURATIONS = {
  normal: { preparing: 1, approaching: 3.5, impact: 0.8, breaking: 2.4, aftermath: 2 },
  reduced: { preparing: 0.2, approaching: 0, impact: 0.25, breaking: 0, aftermath: 0.4 },
};

export function getPhaseDuration(phase, reducedMotion = false) {
  return DURATIONS[reducedMotion ? "reduced" : "normal"][phase] ?? 0;
}

export function createMeteorState({ reducedMotion = false } = {}) {
  return { phase: "ready", elapsed: 0, phaseElapsed: 0, reducedMotion };
}

export function launchMeteor(state, { reducedMotion = false } = {}) {
  if (state.phase !== "ready") return { state, entered: [] };
  return { state: { phase: "preparing", elapsed: 0, phaseElapsed: 0, reducedMotion }, entered: ["preparing"] };
}

export function advanceMeteor(state, dt) {
  if (state.phase === "ready" || !Number.isFinite(dt) || dt <= 0) return { state, entered: [] };
  const entered = [];
  let phase = state.phase;
  let phaseElapsed = state.phaseElapsed;
  let elapsed = state.elapsed;
  let remaining = dt;
  for (let step = 0; step < ORDER.length + 1; step++) {
    const duration = getPhaseDuration(phase, state.reducedMotion);
    if (phase === "aftermath") {
      const consumed = Math.min(remaining, Math.max(0, duration - phaseElapsed));
      phaseElapsed += consumed;
      elapsed += consumed;
      break;
    }
    const consumed = Math.min(remaining, Math.max(0, duration - phaseElapsed));
    phaseElapsed += consumed;
    elapsed += consumed;
    remaining -= consumed;
    if (phaseElapsed < duration) break;
    phase = ORDER[ORDER.indexOf(phase) + 1];
    phaseElapsed = 0;
    entered.push(phase);
  }
  return { state: { ...state, phase, elapsed, phaseElapsed }, entered };
}

export function resetMeteor(state) {
  return { state: createMeteorState({ reducedMotion: state.reducedMotion }), entered: state.phase === "ready" ? [] : ["ready"] };
}
