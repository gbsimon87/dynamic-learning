import { isFairTestCorrect, isGrowthRecordCorrect } from "./whatPlantsNeedToGrow.js";

export function initialGrowthInvestigation(revision = 0, version = 0) {
  return { revision, version, stage: "prediction", prediction: null, placement: {}, observation: 0, seen: [], record: {}, conclusion: [], setupChecked: false, recordChecked: false };
}
/** A pure, revision-tagged state machine. Intermediate checks never complete
 * a shell question. Transition version guards rapid taps; revision guards
 * reset/unmount callbacks. No timers, storage, random draws or side effects. */
export function reduceGrowthInvestigation(state, action, question) {
  if (state.stage === "done" || action.revision !== state.revision) return state;
  if (action.type === "reset") return action.version !== state.version ? state : initialGrowthInvestigation(state.revision + 1, state.version + 1);
  const allObserved = state.seen.length === question.stages.length && state.seen.every((value, index) => value === index);
  const advance = (changes) => ({ ...state, ...changes, version: state.version + 1 });
  const transition = ["start", "checkSetup", "nextObservation", "recordStage", "checkRecord", "finish"].includes(action.type);
  if (transition && action.version !== state.version) return state;
  switch (action.type) {
    case "predict":
      return state.stage === "prediction" && question.predictionOptions.includes(action.value) ? { ...state, prediction: action.value } : state;
    case "start":
      return state.stage === "prediction" && question.predictionOptions.includes(state.prediction) ? advance({ stage: "setup" }) : state;
    case "place": {
      if (state.stage !== "setup" || !question.cards.some((card) => card.id === action.id) || !["change", "keep", null].includes(action.bin)) return state;
      const placement = { ...state.placement };
      if (action.bin === null) delete placement[action.id];
      else placement[action.id] = action.bin;
      return { ...state, placement };
    }
    case "checkSetup":
      return state.stage === "setup" && isFairTestCorrect(question, state.placement) ? advance({ stage: "observe", setupChecked: true, observation: 0, seen: [0] }) : state;
    case "viewObservation":
      return ["observe", "record", "conclusion"].includes(state.stage) && Number.isInteger(action.index) && state.seen.includes(action.index) ? { ...state, observation: action.index } : state;
    case "nextObservation": {
      if (state.stage !== "observe" || !state.setupChecked || state.observation !== state.seen.at(-1)) return state;
      const next = state.observation + 1;
      return next < question.stages.length ? advance({ observation: next, seen: [...state.seen, next] }) : state;
    }
    case "recordStage":
      return state.stage === "observe" && state.setupChecked && allObserved ? advance({ stage: "record", observation: question.stages.length - 1 }) : state;
    case "record":
      return state.stage === "record" && ["A", "B"].includes(action.id) && typeof action.value === "string" ? { ...state, record: { ...state.record, [action.id]: action.value } } : state;
    case "checkRecord":
      return state.stage === "record" && state.setupChecked && isGrowthRecordCorrect(question, state.record) ? advance({ stage: "conclusion", recordChecked: true }) : state;
    case "conclusion":
      return state.stage === "conclusion" && Array.isArray(action.ids) && action.ids.every((id) => question.tiles.some((tile) => tile.id === id)) && new Set(action.ids).size === action.ids.length ? { ...state, conclusion: [...action.ids] } : state;
    case "finish":
      return state.stage === "conclusion" && state.setupChecked && state.recordChecked &&
        allObserved && isFairTestCorrect(question, state.placement) && isGrowthRecordCorrect(question, state.record) &&
        state.conclusion.length === 1 && state.conclusion[0] === "conclusion-0" ? advance({ stage: "done" }) : state;
    default: return state;
  }
}
