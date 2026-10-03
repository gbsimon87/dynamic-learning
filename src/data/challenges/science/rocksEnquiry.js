import { initialProcessEnquiry, reduceProcessEnquiry } from "./processEnquiry.js";
import { isRocksRecordCorrect } from "./comparingAndGroupingRocks.js";

// The fair plan and its evidence share one revision. A rejected stale reset
// cannot clear the plan while leaving observations or checked records intact.
export function initialRocksEnquiry(revision = 0, version = 0) {
  return { ...initialProcessEnquiry(revision, version), stage: "plan", fairChoice: null };
}

export function reduceRocksEnquiry(state, action, question) {
  if (state.stage === "done" || action.revision !== state.revision) return state;
  if (action.type === "reset") return action.version === state.version ? initialRocksEnquiry(state.revision + 1, state.version + 1) : state;
  if (action.type === "plan") return state.stage === "plan" && question.fairOptions.includes(action.value) ? { ...state, fairChoice: action.value } : state;
  if (action.type === "checkPlan") return state.stage === "plan" && action.version === state.version && question.fairOptions.includes(state.fairChoice) && state.fairChoice === question.fairAnswer ? { ...state, stage: "prediction", version: state.version + 1 } : state;
  if (state.fairChoice !== question.fairAnswer || state.stage === "plan") return state;
  return reduceProcessEnquiry(state, action, question, isRocksRecordCorrect);
}
