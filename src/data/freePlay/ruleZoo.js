/**
 * Secret Rule Zoo: the keeper sorts invented creatures into two pens by one
 * hidden rule, such as "has horns". The child chooses which creature to test,
 * watches where it goes, and works out the rule. Then they can set a rule and
 * watch Bix work it out.
 *
 * Pure: every function that deals creatures takes `rng`, so tests can seed it.
 * Creatures are invented, so nothing here teaches a false animal fact.
 *
 * A rule is one feature. Creatures with it go to the Sunny Pen, the rest to
 * the Moon Pen. A guess is "plausible" while every creature sorted so far
 * agrees with it; the game never calls a plausible guess wrong.
 */
import { pick, shuffle } from "./random.js";

export const FEATURES = [
    { id: "horns", clue: "Has horns", has: "horns", hasNot: "no horns" },
    { id: "wings", clue: "Has wings", has: "wings", hasNot: "no wings" },
    { id: "spots", clue: "Has spots", has: "spots", hasNot: "no spots" },
    { id: "fourLegs", clue: "Has four legs", has: "four legs", hasNot: "two legs" },
    { id: "oneEye", clue: "Has one eye", has: "one eye", hasNot: "two eyes" },
];
export const COLOURS = ["orange", "blue", "green", "purple"];
export const PENS = { sunny: "Sunny Pen", moon: "Moon Pen" };

// Easier rounds let only three features change, so there are three clues to
// tell apart; trickier rounds let all five change.
const ACTIVE_COUNT = { easier: 3, trickier: 5 };
const PARADE_SIZE = 3;

export function featureById(id) {
    return FEATURES.find((feature) => feature.id === id);
}

/** Which pen the keeper puts `creature` in under `rule`. */
export function penFor(rule, creature) {
    return creature[rule] ? "sunny" : "moon";
}

/** Rules still possible: every sorted creature is where that rule would put it. */
export function plausibleRules(candidates, evidence) {
    return candidates.filter((rule) => evidence.every(({ creature, pen }) => penFor(rule, creature) === pen));
}

/** A sorted creature that shows `rule` can't be the keeper's, or null. */
export function counterexample(rule, evidence) {
    return evidence.find(({ creature, pen }) => penFor(rule, creature) !== pen) ?? null;
}

/** Testing it would rule something out: the plausible rules disagree about its pen. */
export function isInformative(creature, plausible) {
    return new Set(plausible.map((rule) => penFor(rule, creature))).size > 1;
}

/** The plain-words description a screen reader hears, and Bix says. */
export function describeCreature(creature) {
    const parts = FEATURES.map((feature) => (creature[feature.id] ? feature.has : feature.hasNot));
    return `A ${creature.colour} creature with ${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}`;
}

let nextId = 1;

function makeCreature(rng, active, fixed, values = {}) {
    const creature = { id: `c${nextId++}`, colour: pick(rng, COLOURS) };
    for (const feature of FEATURES) {
        creature[feature.id] = feature.id in values
            ? values[feature.id]
            : active.includes(feature.id) ? rng() < 0.5 : fixed[feature.id];
    }
    return creature;
}

/**
 * A new zoo. The keeper's rule is one of the features that changes. The two
 * creatures already in the pens fit every one of those features at once,
 * so the child starts with several ideas and has to test to tell them apart.
 */
export function makeZoo(rng, level = "easier", rule = null) {
    const active = rule
        ? [rule, ...shuffle(FEATURES.map((f) => f.id).filter((id) => id !== rule), rng)].slice(0, ACTIVE_COUNT[level])
        : shuffle(FEATURES.map((f) => f.id), rng).slice(0, ACTIVE_COUNT[level]);
    const keeperRule = rule ?? pick(rng, active);
    // Features that don't change still differ from zoo to zoo, so the creatures vary.
    const fixed = Object.fromEntries(FEATURES.map((f) => [f.id, rng() < 0.5]));
    const all = (value) => Object.fromEntries(active.map((id) => [id, value]));
    const evidence = [
        { creature: makeCreature(rng, active, fixed, all(true)), pen: "sunny" },
        { creature: makeCreature(rng, active, fixed, all(false)), pen: "moon" },
    ];
    const zoo = { level, rule: keeperRule, candidates: active, fixed, evidence, parade: [] };
    return { ...zoo, parade: fillParade(rng, zoo, []) };
}

/**
 * Tops the parade up to three. While more than one rule is possible, at
 * least two of the three would rule something out, so there is always a
 * useful test to choose, and a less useful one to learn from.
 */
export function fillParade(rng, zoo, parade) {
    const plausible = plausibleRules(zoo.candidates, zoo.evidence);
    let next = [...parade];
    // A test can make a waiting creature useless; it wanders off to make room.
    if (plausible.length > 1) {
        let useless = 0;
        next = next.filter((c) => isInformative(c, plausible) || useless++ < PARADE_SIZE - 2);
    }
    for (let tries = 0; next.length < PARADE_SIZE && tries < 200; tries += 1) {
        const creature = makeCreature(rng, zoo.candidates, zoo.fixed);
        // Two look-alikes would be the same test twice.
        if (tries < 150 && next.some((c) => zoo.candidates.every((id) => c[id] === creature[id]))) continue;
        const useful = next.filter((c) => isInformative(c, plausible)).length;
        const needUseful = plausible.length > 1 && useful < 2 && PARADE_SIZE - next.length <= 2 - useful;
        if (needUseful && !isInformative(creature, plausible)) continue;
        next.push(creature);
    }
    return next;
}

/** The child (or Bix) tests one creature from the parade: it goes to its pen. */
export function testCreature(rng, zoo, creatureId, rule = zoo.rule) {
    const creature = zoo.parade.find((c) => c.id === creatureId);
    if (!creature) return zoo;
    const tested = {
        ...zoo,
        evidence: [...zoo.evidence, { creature, pen: penFor(rule, creature) }],
        parade: zoo.parade.filter((c) => c.id !== creatureId),
    };
    return { ...tested, parade: fillParade(rng, tested, tested.parade) };
}

/**
 * What a guess means: "right", "fits" (plausible, just not the keeper's rule
 * yet: test more) or "ruledOut", with the creature that shows it.
 */
export function checkGuess(zoo, guess) {
    if (guess === zoo.rule) return { result: "right" };
    const against = counterexample(guess, zoo.evidence);
    return against ? { result: "ruledOut", against } : { result: "fits" };
}

/**
 * Bix's next move when the child has set the rule: test the parade creature
 * that splits the possible rules most evenly, or say the rule once only one
 * is left.
 */
export function bixMove(zoo) {
    const plausible = plausibleRules(zoo.candidates, zoo.evidence);
    if (plausible.length === 1) return { kind: "guess", rule: plausible[0] };
    let best = null;
    let bestSplit = -1;
    for (const creature of zoo.parade) {
        const sunny = plausible.filter((rule) => penFor(rule, creature) === "sunny").length;
        const split = Math.min(sunny, plausible.length - sunny);
        if (split > bestSplit) {
            best = creature;
            bestSplit = split;
        }
    }
    return { kind: "test", creature: best };
}
