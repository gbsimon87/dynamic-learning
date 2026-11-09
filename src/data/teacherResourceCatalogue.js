import { FRACTIONS_LESSONS } from "./lessons/math/year3/fractions.js";
import { ADD_SUBTRACT_LESSONS } from "./lessons/math/year3/addSubtract.js";

// Teacher vocabulary is separate from permanent curriculum titles/IDs.
// Scope reviewed against the Year 3 statutory mapping, year3Fractions.js,
// addingAndSubtractingPlaces.js, their renderers and Fraction Fun's Easy level.
export const LEARNING_NEEDS = [
  { id: "shape-fractions", title: "Recognise fractions of shapes", objectiveId: "fractions-as-numbers", aliases: ["finding halves", "halves", "quarters", "half of a shape", "shading fractions", "parts of a whole", "naming fractions", "equal parts", "fractions as numbers"] },
  { id: "quantity-fractions", title: "Find fractions of quantities", objectiveId: "fractions-of-a-set-of-objects", aliases: ["finding halves", "halves", "quarters", "fractions of amounts", "fractions of a set", "fractions of a set of objects", "fractions of groups", "half of a quantity", "half of an amount", "halving quantities", "sharing objects", "unit and non-unit fractions of quantities"] },
  { id: "number-line-fractions", title: "Place fractions on a number line", objectiveId: "fractions-as-numbers", aliases: ["finding halves", "halves", "quarters", "halfway along a number line", "half on a number line", "fraction number lines", "fractions as numbers", "counting in fractions"], note: "These activities practise number-line placement using thirds, quarters, fifths and sixths. This pilot has no number-line questions specifically about halves." },
  { id: "beyond-one", title: "Understand fractions greater than one", objectiveId: "fractions-as-numbers", aliases: ["improper fractions", "mixed numbers", "past one whole", "beyond one", "whole and part", "fractions as numbers"] },
  { id: "equivalence", title: "Recognise equivalent fractions", objectiveId: "equivalent-fractions", aliases: ["same amount different fractions", "equal fractions", "matching fraction bars", "fraction equivalence", "equivalent fraction bars"] },
  { id: "compare-unit", title: "Compare unit fractions", objectiveId: "comparing-and-ordering-fractions", aliases: ["which unit fraction is bigger", "comparing halves and thirds", "larger denominator smaller piece", "unit fraction comparison", "comparing and ordering fractions"] },
  { id: "compare-same", title: "Compare fractions with the same denominator", objectiveId: "comparing-and-ordering-fractions", aliases: ["same bottom number", "same denominators", "bigger fraction", "which fraction is larger", "fraction comparison", "like denominators", "comparing and ordering fractions"] },
  { id: "order-fractions", title: "Order fractions with the same denominator", objectiveId: "comparing-and-ordering-fractions", aliases: ["ordering fractions", "smallest to largest fractions", "sequencing fractions", "ascending fractions", "comparing and ordering fractions"] },
  { id: "mental-place-change", title: "Mentally add and subtract 1, 10 or 100", objectiveId: "adding-and-subtracting-ones-tens-and-hundreds", aliases: ["ones tens hundreds", "units tens hundreds", "adding and subtracting ones tens and hundreds", "adding and subtracting units tens and hundreds", "adding tens", "subtracting tens", "ten more ten less", "1 more or less", "10 more or less", "one more or less", "ten more or less", "100 more or less", "mental addition", "mental subtraction", "crossing hundreds", "base ten", "dienes", "place value addition"] },
];

function describe(teacherTitle, does, scope, use, needIds, limitation = "") {
  return { teacherTitle, does, scope, use, needIds, limitation };
}

const DESCRIPTIONS = {
  "fractions-as-numbers": [
    describe("Read fractions from shaded bars", "Count equal parts and select the fraction shown by a shaded bar.", "Fractions below one with denominators 3–6.", "Guided or independent visual practice", ["shape-fractions"], "Bar reading only; this challenge does not practise number-line placement."),
    describe("Place fractions between zero and one", "Tap the position of a named fraction on an equally divided number line.", "Thirds, quarters, fifths and sixths between 0 and 1.", "Guided practice connecting fractions to position", ["number-line-fractions"]),
    describe("Place fractions beyond one whole", "Tap a named fraction on a number line extending from 0 to 2.", "Improper fractions in thirds, quarters and fifths.", "Extend number-line understanding", ["number-line-fractions", "beyond-one"], "Requires readiness to count past one whole; not a first activity on halves."),
    describe("Write fractions greater than one from a story", "Read a ribbon-length story and enter the total number of equal parts.", "One whole plus a fraction; thirds, quarters and fifths.", "Apply understanding in a written context", ["beyond-one"], "A written quantity story, without an interactive number line or shaded-bar question."),
  ],
  "fractions-of-a-set-of-objects": [
    describe("Find one equal share of a collection", "Select the objects making one share; equal groups are marked on the board.", "Unit fractions with denominators 2–5; collections of 8–20 objects.", "Guided practice with grouped counters", ["quantity-fractions"]),
    describe("Find one or several shares of a collection", "Select the required fraction of objects without pre-marked equal groups.", "Unit and non-unit fractions with denominators 2–5; collections of 8–20.", "Independent practice after equal sharing", ["quantity-fractions"]),
    describe("Name the fraction of a coloured collection", "Read grouped, coloured objects and enter the missing numerator.", "Unit and non-unit fractions with denominators 2–5; collections of 8–20.", "Connect a selected quantity to fraction notation", ["quantity-fractions"], "Children name the fraction; they do not enter the number of coloured objects."),
    describe("Find a quantity from a fraction story", "Read how many counters there are and what fraction are blue; enter the blue-counter total.", "Unit and non-unit fractions with denominators 2–5; collections of 8–20.", "Apply fractions of quantities in a short story", ["quantity-fractions"]),
  ],
  "equivalent-fractions": [
    describe("Match equal amounts using fraction bars", "Choose the bar showing the same amount as the target fraction.", "Halves, thirds and quarters matched to quarters, sixths or eighths, and 2/4 to 1/2.", "Visual guided or independent practice", ["equivalence"], "Challenges 1 and 2 use the same question bank and interaction; either can provide another run, rather than a harder step."),
    describe("Revisit equivalent fractions with bars", "Choose the bar showing the same amount as the target fraction.", "The same fraction pairs and bar-matching interaction as Challenge 1.", "Repeat visual practice", ["equivalence"], "This is another run of Challenge 1's question bank, not a new level of difficulty."),
    describe("Shade a bar to make an equivalent fraction", "Shade parts of a second bar until it matches the amount in the target bar.", "Equivalent pairs using halves, thirds, quarters, sixths and eighths.", "Build an equivalent representation", ["equivalence"]),
    describe("Write the missing numerator in an equivalent fraction", "Use the target bar and an empty comparison bar to enter the equivalent numerator.", "The same small-denominator pairs, including 2/4 = 1/2.", "Connect visual equivalence to notation", ["equivalence"], "Some pairs reduce the denominator; it is not exclusively a doubling exercise."),
  ],
  "comparing-and-ordering-fractions": [
    describe("Compare the size of unit fractions", "Compare two shaded bars and select the larger unit fraction.", "Unit fractions with denominators 2–7.", "Discuss how the number of equal parts affects their size", ["compare-unit"]),
    describe("Compare fractions with matching denominators", "Compare two labelled, shaded bars and select the larger fraction.", "Pairs with the same denominator, from thirds to eighths.", "Visual comparison practice", ["compare-same"], "Does not teach comparison of arbitrary unlike denominators."),
    describe("Order three fractions with matching denominators", "Reorder three fraction cards from smallest to largest.", "Three fractions sharing a denominator of 5, 6, 7 or 8.", "Practise ordering after comparing pairs", ["order-fractions"], "Ordering cards rather than a number-line task; does not mix denominators."),
    describe("Compare fractions in a cake-sharing story", "Read Mia's and Sam's fractions of a cake and choose who has more.", "Pairs with matching denominators, from thirds to eighths.", "Apply comparison in a written context", ["compare-same"], "The story has no bar model; requires reading support where appropriate."),
  ],
  "adding-and-subtracting-ones-tens-and-hundreds": [
    describe("Find 1, 10 or 100 more or less with blocks", "Read base-ten blocks with the changing place highlighted and choose an answer.", "Three-digit numbers; one change of ±1, ±10 or ±100 without exchange.", "Supported retrieval or guided practice", ["mental-place-change"]),
    describe("Mentally change a number across a place boundary", "Read a calculation and type the answer, without blocks.", "Changes of ±1, ±10 or ±100, including crossings of tens and hundreds.", "Independent mental calculation", ["mental-place-change"]),
    describe("Build the result of two place-value changes", "Add or remove base-ten blocks to show the result of two successive changes.", "Three-digit starting numbers; two changes using ones, tens or hundreds.", "Practical modelling of a two-step calculation", ["mental-place-change"]),
    describe("Apply 1, 10 or 100 more or less in a story", "Read a short change-of-quantity story and type the new total.", "Three-digit quantities; one change of ±1, ±10 or ±100.", "Apply mental calculation in context", ["mental-place-change"]),
  ],
};

const PREREQUISITES = {
  "fractions-as-numbers": "Recognise equal parts and read a numerator and denominator. For number lines, count equal intervals from zero.",
  "fractions-of-a-set-of-objects": "Count a collection and share it into equal groups; connect the denominator to the number of groups.",
  "equivalent-fractions": "Recognise equal parts of the same-sized whole and read simple fraction notation.",
  "comparing-and-ordering-fractions": "Read simple fractions and compare equal-sized wholes. For ordering, compare a pair first.",
  "adding-and-subtracting-ones-tens-and-hundreds": "Recognise hundreds, tens and ones in a three-digit number. For Challenge 2, understand exchange across a place boundary.",
};

export function describeCurriculumResource(topicId, challengeId) {
  const description = DESCRIPTIONS[topicId]?.[challengeId - 1];
  if (!description) return null;
  const lesson = (FRACTIONS_LESSONS[topicId] ?? ADD_SUBTRACT_LESSONS[topicId])[challengeId - 1];
  return { ...description, learningObjective: description.teacherTitle, prerequisites: PREREQUISITES[topicId], childTitle: lesson.title, alignment: "direct" };
}

export const FRACTION_FUN_DESCRIPTION = {
  teacherTitle: "Name or shade fractions of shapes", learningObjective: "Recognise and represent fractions of a shape",
  does: "Shade a named fraction or choose the fraction represented by a shaded shape.",
  scope: "Reviewed starting choice: Easy, with halves, thirds and quarters. Select the level and game type manually.",
  prerequisites: "Recognise equal parts of a whole and count the shaded parts.",
  use: "Supporting visual practice; teacher sets a stopping time", needIds: ["shape-fractions"], alignment: "supporting",
  limitation: "Supports the shape representation within fractions as numbers. It does not practise fractions of quantities or number-line placement. Medium adds other denominators, including tenths; Challenge is outside this reviewed starting choice.",
  childTitle: "Fraction Fun",
};

const STOP_WORDS = new Set(["a", "an", "and", "are", "at", "by", "for", "how", "i", "in", "is", "my", "of", "on", "the", "to", "with", "children", "pupils", "need", "needs", "help", "teach", "practice", "practise", "class", "kids", "students", "struggle", "struggles", "struggling", "understand", "understanding", "they", "their", "we", "our", "some", "most", "really", "can", "cannot", "t", "not", "confident", "well", "doing", "hard", "difficult", "difficulty", "difficulties", "having", "have", "has", "getting", "trouble", "please", "math", "maths", "learning", "finding", "don"]);
function terms(text) {
  return text.slice(0, 160).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/)
    .filter((term) => term && !STOP_WORDS.has(term)).map((term) => term.length > 3 ? term.replace(/s$/, "") : term);
}

// Bounded Damerau–Levenshtein distance also tolerates adjacent transpositions.
function spellingDistance(a, b) {
  const grid = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
  for (let i = 1; i <= a.length; i += 1) for (let j = 1; j <= b.length; j += 1) {
    grid[i][j] = Math.min(grid[i - 1][j] + 1, grid[i][j - 1] + 1, grid[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) grid[i][j] = Math.min(grid[i][j], grid[i - 2][j - 2] + 1);
  }
  return grid[a.length][b.length];
}

// Fuzzy results are suggestions requiring confirmation. Topic search does not
// infer whether the class is struggling or confident: teachers supply that.
export function searchLearningNeeds(query, resources = [], needs = LEARNING_NEEDS) {
  const tokens = terms(query);
  const available = (need) => resourcesForNeed(resources, need.id);
  if (!tokens.length) return query.trim() ? [] : needs.map((need) => ({ need, matchType: "browse", resources: available(need) }));
  const exact = needs.filter((need) => [need.title, ...need.aliases].some((phrase) => terms(phrase).join(" ") === tokens.join(" ")));
  if (exact.length) return exact.map((need) => ({ need, matchType: "exact", resources: available(need) }));
  const distanceCache = new Map();
  const score = (phrases) => {
    let best = Infinity, rank = Infinity, prefix = false;
    for (const phrase of phrases) {
      const words = terms(phrase);
      let total = 0, hasPrefix = false;
      for (const token of tokens) {
        const distances = words.map((word) => {
          if (word === token) return 0;
          if (/\d/.test(token + word)) return Infinity;
          if (token === tokens.at(-1) && token.length >= 3 && word.startsWith(token)) return 0.25;
          if (token.length < 4 || word.length < 4) return Infinity;
          const limit = Math.min(token.length, word.length) >= 8 ? 2 : 1;
          if (Math.abs(token.length - word.length) > limit) return Infinity;
          const key = `${token}:${word}`;
          if (!distanceCache.has(key)) distanceCache.set(key, spellingDistance(token, word));
          const distance = distanceCache.get(key);
          return distance <= limit ? distance : Infinity;
        });
        const distance = Math.min(...distances);
        if (distance === 0.25) hasPrefix = true;
        total += distance;
      }
      const candidate = total + Math.max(0, words.length - tokens.length) / 100;
      if (candidate < rank) { rank = candidate; best = total; prefix = hasPrefix && total < 1; }
    }
    return { distance: best, rank, matchType: best === 0 ? "words" : prefix ? "prefix" : "fuzzy" };
  };
  const matches = needs.map((need) => {
    const topicScore = score([need.title, ...need.aliases]);
    const resourceMatches = available(need).map((resource) => ({ resource, ...score([resource.teacherTitle, resource.childTitle, ...(resource.lesson?.lines ?? []), ...(resource.detailLevel === "reviewed" ? [resource.does] : [])]) }));
    const ranked = resourceMatches.filter((match) => Number.isFinite(match.rank)).sort((a, b) => a.rank - b.rank);
    const bestResource = ranked[0];
    const topicWins = Number.isFinite(topicScore.rank) && (!bestResource || topicScore.rank <= bestResource.rank);
    const result = topicWins ? topicScore : bestResource ?? topicScore;
    return { need, distance: result.distance, rank: result.rank, matchType: result.matchType,
      resources: topicWins ? available(need) : ranked.filter((match) => result.matchType === "words" ? match.distance === 0 : match.rank <= result.rank + 0.1).map((match) => match.resource) };
  });
  const best = Math.min(...matches.map((match) => match.distance));
  const rank = Math.min(...matches.map((match) => match.rank));
  return matches.filter((match) => Number.isFinite(match.distance) && (best === 0 ? match.distance === 0 : match.rank === rank)).sort((a, b) => a.distance - b.distance);
}

export function findLearningNeeds(query, resources = [], needs = LEARNING_NEEDS) {
  return searchLearningNeeds(query, resources, needs).map((match) => match.need);
}

export function resourcesForNeed(resources, needId) {
  return resources.filter((resource) => resource.available && resource.needIds.includes(needId));
}

export function resourceFit(resource, objectiveId) {
  if (!resource.objectiveIds.includes(objectiveId)) return "Different objective: keep this activity only if it fits a separate teaching purpose.";
  return resource.alignment === "supporting"
    ? "Supporting practice for one representation of this objective. Check the scope before using it."
    : `Practises part of this lesson objective: ${resource.learningObjective.toLowerCase()}. Check the scope and starting knowledge.`;
}
