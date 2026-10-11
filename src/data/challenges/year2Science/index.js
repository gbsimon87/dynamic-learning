import { livingBuilders } from "./living.js";
import { plantBuilders } from "./plants.js";
import { animalBuilders } from "./animals.js";
import { materialBuilders } from "./materials.js";

// Stable builders keep DataChallenge's mount-time randomisation from restarting.
// The banks reuse the Year 1 Science recipe engine (../year1Science/engine.js).
export const YEAR2_SCIENCE_BUILDERS = { ...livingBuilders, ...plantBuilders, ...animalBuilders, ...materialBuilders };
export const YEAR2_SCIENCE_TITLES = ["Look and learn", "Spot and sort", "Put it together", "Be a scientist"];
