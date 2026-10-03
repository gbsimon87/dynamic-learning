import { isWaterRecordCorrect } from "./waterTransportInPlants.js";

export function initialWaterInvestigation(revision = 0, version = 0) {
  return { revision, version, stage: "prediction", prediction: null, observation: 0, seen: [], record: {}, recordChecked: false, conclusion: [] };
}
// Supplied setup: this enquiry observes a process, so there is no graded
// experiment-factor setup. All assessed work is tied to this revision.
export function reduceWaterInvestigation(state, action, question) {
  if (state.stage === "done" || action.revision !== state.revision) return state;
  if (action.type === "reset") return action.version === state.version ? initialWaterInvestigation(state.revision + 1, state.version + 1) : state;
  const transition = ["start", "next", "recordStage", "checkRecord", "finish"].includes(action.type);
  if (transition && action.version !== state.version) return state;
  const advance = (changes) => ({ ...state, ...changes, version: state.version + 1 });
  const allSeen = question.stages.length > 0 && state.seen.length === question.stages.length && state.seen.every((value, index) => value === index);
  switch (action.type) {
    case "predict": return state.stage === "prediction" && question.predictionOptions.includes(action.value) ? { ...state, prediction: action.value } : state;
    case "start": return state.stage === "prediction" && question.predictionOptions.includes(state.prediction) ? advance({ stage: "observe", seen: [0] }) : state;
    case "view": return ["observe", "record", "conclusion"].includes(state.stage) && Number.isInteger(action.index) && state.seen.includes(action.index) ? { ...state, observation: action.index } : state;
    case "next": {
      const next = state.observation + 1;
      return state.stage === "observe" && state.observation === state.seen.at(-1) && next < question.stages.length ? advance({ observation: next, seen: [...state.seen, next] }) : state;
    }
    case "recordStage": return state.stage === "observe" && allSeen ? advance({ stage: "record", observation: question.stages.length - 1 }) : state;
    case "record": {
      if (state.stage !== "record" || !question.recordCards.some((card) => card.id === action.id) || !["seen", "not-seen", null].includes(action.bin)) return state;
      const record = { ...state.record };
      if (action.bin === null) delete record[action.id]; else record[action.id] = action.bin;
      return { ...state, record };
    }
    case "checkRecord": return state.stage === "record" && allSeen && isWaterRecordCorrect(question, state.record) ? advance({ stage: "conclusion", recordChecked: true }) : state;
    case "conclusion": return state.stage === "conclusion" && Array.isArray(action.ids) && new Set(action.ids).size === action.ids.length && action.ids.every((id) => question.tiles.some((tile) => tile.id === id)) ? { ...state, conclusion: [...action.ids] } : state;
    case "finish": return state.stage === "conclusion" && allSeen && state.recordChecked && isWaterRecordCorrect(question, state.record) && state.conclusion.length === 1 && state.conclusion[0] === "supported" ? advance({ stage: "done" }) : state;
    default: return state;
  }
}
