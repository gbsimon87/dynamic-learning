import { initialProcessEnquiry, reduceProcessEnquiry } from "./processEnquiry.js";
import { isShadowSetupCorrect, isShadowSizeRecordCorrect } from "./changingShadowSize.js";
export function initialShadowEnquiry(revision = 0, version = 0) {
  return { ...initialProcessEnquiry(revision, version), setup: {} };
}
export function reduceShadowEnquiry(state, action, question) {
  if (state.stage === "done" || action.revision !== state.revision) return state;
  if (action.type === "reset") return action.version === state.version ? initialShadowEnquiry(state.revision + 1, state.version + 1) : state;
  if (action.type === "start") return state.stage === "prediction" && action.version === state.version && question.predictionOptions.includes(state.prediction) ? { ...state, stage: "setup", version: state.version + 1 } : state;
  if (action.type === "setup") {
    if (state.stage !== "setup" || !question.setupCards.some(c => c.id === action.id) || ![null, "change", "keep"].includes(action.bin)) return state;
    const setup = { ...state.setup };
    if (action.bin === null) delete setup[action.id]; else setup[action.id] = action.bin;
    return { ...state, setup };
  }
  if (action.type === "checkSetup") {
    if (state.stage !== "setup" || action.version !== state.version || !isShadowSetupCorrect(question, state.setup)) return state;
    return { ...state, stage: "observe", observation: 0, seen: [0], version: state.version + 1 };
  }
  // Completed setup is immutable. Reset is the only way to change it and clears all evidence.
  if (["observe", "record", "conclusion"].includes(state.stage) && !isShadowSetupCorrect(question, state.setup)) return state;
  return reduceProcessEnquiry(state, action, question, isShadowSizeRecordCorrect);
}
