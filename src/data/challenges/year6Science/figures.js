import { circuit } from "./engine.js";
import { livingVisuals, livingRules } from "./living.js";
import { animalsVisuals, animalsRules } from "./animals.js";
import { evolutionVisuals, evolutionRules } from "./evolution.js";
import { lightVisuals, lightRules } from "./light.js";

// Pictures for Year 6 Science. A topic visual shows on the start screen and on level 1, so it
// only sets the scene: it never labels or shows an answer to a level 1 question. Question
// rules draw only what the question text itself says, so a picture never contradicts it.
// Most Year 6 questions that need a diagram carry it themselves (`visual` in the bank).
const scene = (backdrop, alt, items, extra = {}) => ({ type: "scene", backdrop, alt, items, ...extra });

// Each strand file exports its own topic visuals and rules beside its bank; Electricity's are here.
export const TOPIC_VISUALS = {
  ...livingVisuals, ...animalsVisuals, ...evolutionVisuals, ...lightVisuals,
  // Electricity
  "circuit-symbols": circuit(["cell", "switchClosed", "lamp", "motor"], { alt: "A circuit diagram drawn with symbols: a cell, a closed switch, a bulb and a motor in one loop.", caption: "A circuit drawn with symbols." }),
  "cells-and-brightness": scene("lab", "Some cells, a battery and a bulb on a bench.", [["🔋", 90, 140, 60], ["🔋", 160, 140, 60], ["💡", 290, 130, 76]]),
  "comparing-components": scene("room", "A lamp, a bell and an electric fan in a room.", [["💡", 90, 130, 66], ["🔔", 200, 130, 66], ["🌀", 310, 130, 66]]),
  "switches-and-circuit-faults": scene("room", "A torch and a light switch on a wall.", [["🔦", 120, 140, 72], ["🎚️", 290, 120, 72]]),
};

export const FIGURE_RULES = { ...livingRules, ...animalsRules, ...evolutionRules, ...lightRules };
