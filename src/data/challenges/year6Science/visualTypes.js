import { VISUAL_TYPES as YEAR5 } from "../year5Science/visualTypes.js";

// The figure types Year6ScienceVisual can draw: its own five, then everything Year 5 Science
// draws, plus the classification key the Year 4 frame draws. Pure, so node --test can read it.
export const YEAR6_ONLY_TYPES = ["circuitDiagram", "lightPath", "periscope", "shadow", "circulation"];
export const VISUAL_TYPES = [...YEAR6_ONLY_TYPES, ...YEAR5, "classificationKey"];

// Standard circuit symbols a circuitDiagram can draw, in series around one loop.
export const CIRCUIT_PARTS = ["cell", "lamp", "buzzer", "motor", "switchOpen", "switchClosed", "wire"];
