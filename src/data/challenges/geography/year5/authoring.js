import { topic as topicFor } from "../year3/authoring.js";
export { visual, record, c, sort, ordered, lesson } from "../year3/authoring.js";
/** Year 5 topic: `topic(lessons, activity?)`. Notes limit 70 words, sentences 18 words. */
export const topic = (lessons, activity) => topicFor(lessons, activity, 5);
