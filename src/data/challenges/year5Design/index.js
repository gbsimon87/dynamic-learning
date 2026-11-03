import { buildTopic, CREATIVE_TITLES } from "../year5Creative/shared.js";
import { withVisuals } from "../year5Creative/visuals.js";
import { YEAR5_DESIGN_TOPIC_VISUALS, YEAR5_DESIGN_QUESTION_VISUALS } from "./visuals.js";
import { design } from "./design.js";
import { make } from "./make.js";
import { technical } from "./technical.js";
import { food } from "./food.js";

export const YEAR5_DESIGN_TOPICS = withVisuals({ ...design, ...make, ...technical, ...food }, YEAR5_DESIGN_TOPIC_VISUALS, YEAR5_DESIGN_QUESTION_VISUALS);
export const YEAR5_DESIGN_BUILDERS = Object.fromEntries(Object.entries(YEAR5_DESIGN_TOPICS).map(([id, topic]) => [id, buildTopic(topic)]));
export const YEAR5_DESIGN_TITLES = CREATIVE_TITLES;
