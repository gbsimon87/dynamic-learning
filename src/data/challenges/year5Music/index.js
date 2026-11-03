import { buildTopic, CREATIVE_TITLES } from "../year5Creative/shared.js";
import { withVisuals } from "../year5Creative/visuals.js";
import { YEAR5_MUSIC_TOPIC_VISUALS, YEAR5_MUSIC_QUESTION_VISUALS } from "./visuals.js";
import { rhythm } from "./rhythm.js";
import { pitch } from "./pitch.js";
import { form } from "./form.js";
import { listening } from "./listening.js";

export const YEAR5_MUSIC_TOPICS = withVisuals({ ...rhythm, ...pitch, ...form, ...listening }, YEAR5_MUSIC_TOPIC_VISUALS, YEAR5_MUSIC_QUESTION_VISUALS);
export const YEAR5_MUSIC_BUILDERS = Object.fromEntries(Object.entries(YEAR5_MUSIC_TOPICS).map(([id, topic]) => [id, buildTopic(topic)]));
export const YEAR5_MUSIC_TITLES = CREATIVE_TITLES;
