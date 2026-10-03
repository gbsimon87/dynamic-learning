// Reusable supplied-source enquiry. Topic validators own what evidence means;
// this state machine owns ordering, revision guards and completion eligibility.
export function initialProcessEnquiry(revision = 0, version = 0) {
  return { revision, version, stage: "prediction", prediction: null, observation: 0, seen: [], record: {}, recordChecked: false, conclusion: [] };
}
export function reduceProcessEnquiry(state, action, question, validateRecord) {
  if (state.stage === "done" || action.revision !== state.revision) return state;
  if (action.type === "reset") return action.version === state.version ? initialProcessEnquiry(state.revision + 1, state.version + 1) : state;
  if (["start", "next", "recordStage", "checkRecord", "finish"].includes(action.type) && action.version !== state.version) return state;
  const advance = (changes) => ({ ...state, ...changes, version: state.version + 1 });
  const allSeen = question.stages.length > 0 && state.seen.length === question.stages.length && state.seen.every((value, index) => value === index);
  switch (action.type) {
    case "predict": return state.stage === "prediction" && question.predictionOptions.includes(action.value) ? { ...state, prediction: action.value } : state;
    case "start": return state.stage === "prediction" && question.stages.length > 0 && question.predictionOptions.includes(state.prediction) ? advance({ stage: "observe", seen: [0] }) : state;
    case "view": return ["observe", "record", "conclusion"].includes(state.stage) && Number.isInteger(action.index) && state.seen.includes(action.index) ? { ...state, observation: action.index } : state;
    case "next": {
      const next = state.observation + 1;
      return state.stage === "observe" && state.observation === state.seen.at(-1) && next < question.stages.length ? advance({ observation: next, seen: [...state.seen, next] }) : state;
    }
    case "recordStage": return state.stage === "observe" && allSeen ? advance({ stage: "record", observation: question.stages.length - 1 }) : state;
    case "record": {
      if (state.stage !== "record" || !question.recordCards.some((card) => card.id === action.id) || (action.bin !== null && !question.recordBins.some((bin) => bin.id === action.bin))) return state;
      const record = { ...state.record };
      if (action.bin === null) delete record[action.id]; else record[action.id] = action.bin;
      return { ...state, record };
    }
    case "checkRecord": return state.stage === "record" && allSeen && validateRecord(question, state.record) ? advance({ stage: "conclusion", recordChecked: true }) : state;
    case "conclusion": return state.stage === "conclusion" && Array.isArray(action.ids) && new Set(action.ids).size === action.ids.length && action.ids.every((id) => question.tiles.some((tile) => tile.id === id)) ? { ...state, conclusion: [...action.ids] } : state;
    case "finish": return state.stage === "conclusion" && allSeen && state.recordChecked && validateRecord(question, state.record) &&
      question.correctConclusionIds.length > 0 && state.conclusion.length === question.correctConclusionIds.length &&
      state.conclusion.every((id, index) => id === question.correctConclusionIds[index] && question.tiles.some((tile) => tile.id === id)) ? advance({ stage: "done" }) : state;
    default: return state;
  }
}
