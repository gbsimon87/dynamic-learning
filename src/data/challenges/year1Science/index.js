import { plantBuilders } from "./plants.js";
import { animalBuilders } from "./animals.js";
import { materialBuilders } from "./materials.js";
import { seasonBuilders } from "./seasons.js";

// Stable builders keep DataChallenge's mount-time randomisation from restarting.
export const YEAR1_SCIENCE_BUILDERS = { ...plantBuilders, ...animalBuilders, ...materialBuilders, ...seasonBuilders };
export const YEAR1_SCIENCE_TITLES = ["Look and learn", "Spot and sort", "Put it together", "Be a scientist"];
