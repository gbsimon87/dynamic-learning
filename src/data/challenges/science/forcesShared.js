import { initialProcessEnquiry, reduceProcessEnquiry } from "./processEnquiry.js";

export const FORCE_SOURCES = {
  friction: { label: "American Physical Society: Friction Fun (concepts adapted)", url: "https://www.aps.org/learning-resources/friction-fun" },
  contact: { label: "Institute of Physics: non-contact forces (concepts adapted)", url: "https://spark.iop.org/collections/non-contact-forces-physics-narrative" },
  materials: { label: "University of Wisconsin–Madison: magnetism (concepts adapted)", url: "https://wonders.physics.wisc.edu/what-is-magnetism/" },
  poles: { label: "Institute of Physics: interactions between magnets (concepts adapted)", url: "https://spark.iop.org/interactions-between-magnets" },
};
export function exactRecord(descriptors, expected, record) {
  if (!Array.isArray(descriptors) || descriptors.length === 0 || expected == null || record == null || typeof record !== "object" || Array.isArray(record)) return false;
  const ids = descriptors.map(d => d.id);
  return new Set(ids).size === ids.length && Object.keys(expected).length === ids.length && Object.keys(record).length === ids.length && ids.every(id => typeof id === "string" && Object.hasOwn(expected, id) && Object.hasOwn(record, id) && record[id] === expected[id]);
}
export function initialForcesEnquiry(revision = 0, version = 0) {
  return { ...initialProcessEnquiry(revision, version), setup: {} };
}
export function reduceForcesEnquiry(state, action, question, validateRecord, validateSetup = null) {
  if (state.stage === "done" || action.revision !== state.revision) return state;
  if (action.type === "reset") return action.version === state.version ? initialForcesEnquiry(state.revision + 1, state.version + 1) : state;
  if (validateSetup) {
    if (action.type === "start") return state.stage === "prediction" && action.version === state.version && question.predictionOptions.includes(state.prediction) ? { ...state, stage: "setup", version: state.version + 1 } : state;
    if (action.type === "setup") {
      if (state.stage !== "setup" || !question.setupCards.some(c => c.id === action.id) || ![null, "change", "keep"].includes(action.bin)) return state;
      const setup = { ...state.setup };
      if (action.bin === null) delete setup[action.id]; else setup[action.id] = action.bin;
      return { ...state, setup };
    }
    if (action.type === "checkSetup") return state.stage === "setup" && action.version === state.version && question.stages.length > 0 && validateSetup(question, state.setup) ? { ...state, stage: "observe", observation: 0, seen: [0], version: state.version + 1 } : state;
    if (["observe", "record", "conclusion"].includes(state.stage) && !validateSetup(question, state.setup)) return state;
  }
  return reduceProcessEnquiry(state, action, question, validateRecord);
}
