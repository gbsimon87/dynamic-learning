import { oppositePole } from "./magnetModel.js";
import { isMagnetBuildCorrect } from "./predictingAttractionAndRepulsion.js";

export function initialMagnetBuild(question, revision = 0, version = 0) {
  return { pair: { ...question.initialPair }, tested: false, revision, version, done: false };
}
export function reduceMagnetBuild(state, action, question) {
  if (state.done || action.revision !== state.revision) return state;
  if (action.type === "reset") return initialMagnetBuild(question, state.revision + 1, state.version + 1);
  if (action.type === "turn") {
    if (!["left", "right"].includes(action.side) || (question.turnSide && action.side !== question.turnSide)) return state;
    return { ...state, pair: { ...state.pair, [action.side]: oppositePole(state.pair[action.side]) }, tested: false, version: state.version + 1 };
  }
  if (action.version !== state.version) return state;
  if (action.type === "run") return state.tested ? state : { ...state, tested: true, version: state.version + 1 };
  if (action.type === "check") return isMagnetBuildCorrect(question, state.pair, state.tested) ? { ...state, done: true, version: state.version + 1 } : state;
  return state;
}
