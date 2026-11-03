import { fact, sequence, sentence, groups, measurement, buildTopic, isScienceAnswerCorrect } from "../year4Science/engine.js";

// Authoring helpers shared by the Year 5 Art, Music and Design banks. Pure: the
// only randomness is the rng handed to buildTopic when a challenge mounts.
export { fact, sequence, sentence, groups, measurement, buildTopic, isScienceAnswerCorrect };

/**
 * One multiple-choice question per row of a table. `ask(key, value)` words the
 * question; the wrong options are the values of the next rows that differ from
 * the answer, so a table of well-checked facts gives a bank without hand-written
 * distractors. Rows whose values repeat are skipped as distractors for each other.
 */
export function linked(rows, ask, wrongs = 2) {
  return rows.map(([key, value], at) => {
    const others = [];
    for (let step = 1; step < rows.length && others.length < wrongs; step += 1) {
      const candidate = rows[(at + step) % rows.length][1];
      if (candidate !== value && !others.includes(candidate)) others.push(candidate);
    }
    return fact(ask(key, value), value, ...others);
  });
}

/** Titles shared by the three subjects: the same four steps of a topic. */
export const CREATIVE_TITLES = ["Look and learn", "Compare and sort", "Put it together", "Use what you know"];
