import { buildTopic, TITLES } from "./engine.js";
import { habitats } from "./habitats.js";
import { animals } from "./animals.js";
import { matter } from "./matter.js";
import { sound } from "./sound.js";
import { electricity } from "./electricity.js";

export const YEAR4_SCIENCE_TOPICS = { ...habitats, ...animals, ...matter, ...sound, ...electricity };
export const YEAR4_SCIENCE_BUILDERS = Object.fromEntries(Object.entries(YEAR4_SCIENCE_TOPICS).map(([id, topic]) => [id, buildTopic(topic)]));
export const YEAR4_SCIENCE_TITLES = TITLES;
