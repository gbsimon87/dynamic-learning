import test from "node:test";
import assert from "node:assert/strict";
import { seeded } from "./random.js";
import {
    FEATURES,
    bixMove,
    checkGuess,
    describeCreature,
    isInformative,
    makeZoo,
    penFor,
    plausibleRules,
    testCreature,
} from "./ruleZoo.js";

const LEVELS = ["easier", "trickier"];

test("a new zoo starts with every changing feature still possible", () => {
    for (const level of LEVELS) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const zoo = makeZoo(seeded(seed), level);
            assert.equal(zoo.candidates.length, level === "easier" ? 3 : 5);
            assert.ok(zoo.candidates.includes(zoo.rule));
            assert.deepEqual(plausibleRules(zoo.candidates, zoo.evidence), zoo.candidates);
            for (const { creature, pen } of zoo.evidence) assert.equal(penFor(zoo.rule, creature), pen);
        }
    }
});

test("while the rule is unsettled, two of the three creatures on parade would rule something out", () => {
    for (const level of LEVELS) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rng = seeded(seed);
            let zoo = makeZoo(rng, level);
            for (let step = 0; step < 8; step += 1) {
                const plausible = plausibleRules(zoo.candidates, zoo.evidence);
                assert.equal(zoo.parade.length, 3);
                if (plausible.length > 1) {
                    assert.ok(zoo.parade.filter((c) => isInformative(c, plausible)).length >= 2, `seed ${seed} step ${step}`);
                }
                zoo = testCreature(rng, zoo, zoo.parade[step % 3].id);
            }
        }
    }
});

test("no two creatures on parade share all the changing features", () => {
    for (const level of LEVELS) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rng = seeded(seed);
            let zoo = makeZoo(rng, level);
            for (let step = 0; step < 6; step += 1) {
                const keys = zoo.parade.map((c) => zoo.candidates.map((id) => c[id]).join());
                assert.equal(new Set(keys).size, keys.length, `seed ${seed} step ${step}`);
                zoo = testCreature(rng, zoo, zoo.parade[0].id);
            }
        }
    }
});

test("testing a creature sends it to the keeper's pen, never ruling out the real rule", () => {
    const rng = seeded(7);
    let zoo = makeZoo(rng, "trickier");
    for (let step = 0; step < 10; step += 1) {
        const creature = zoo.parade[0];
        zoo = testCreature(rng, zoo, creature.id);
        assert.equal(zoo.evidence.at(-1).pen, penFor(zoo.rule, creature));
        assert.ok(plausibleRules(zoo.candidates, zoo.evidence).includes(zoo.rule));
    }
});

test("always picking a useful creature pins the rule down within the number of clues", () => {
    for (let seed = 1; seed <= 200; seed += 1) {
        const rng = seeded(seed);
        let zoo = makeZoo(rng, "trickier");
        let tests = 0;
        while (plausibleRules(zoo.candidates, zoo.evidence).length > 1) {
            const plausible = plausibleRules(zoo.candidates, zoo.evidence);
            zoo = testCreature(rng, zoo, zoo.parade.find((c) => isInformative(c, plausible)).id);
            tests += 1;
        }
        assert.ok(tests <= 4, `seed ${seed}: ${tests}`);
        assert.deepEqual(plausibleRules(zoo.candidates, zoo.evidence), [zoo.rule]);
    }
});

test("a guess that fits the evidence is never called wrong; one that doesn't shows why", () => {
    const zoo = makeZoo(seeded(3), "easier");
    const other = zoo.candidates.find((rule) => rule !== zoo.rule);
    assert.deepEqual(checkGuess(zoo, zoo.rule), { result: "right" });
    // At the start every changing feature fits both creatures in the pens.
    assert.deepEqual(checkGuess(zoo, other), { result: "fits" });

    const rng = seeded(3);
    let tested = zoo;
    while (plausibleRules(tested.candidates, tested.evidence).includes(other)) {
        const plausible = plausibleRules(tested.candidates, tested.evidence);
        tested = testCreature(rng, tested, tested.parade.find((c) => isInformative(c, plausible)).id);
    }
    const { result, against } = checkGuess(tested, other);
    assert.equal(result, "ruledOut");
    assert.notEqual(penFor(other, against.creature), against.pen);
});

test("Bix works out a rule the child sets, testing the most useful creature each time", () => {
    for (const rule of FEATURES.map((f) => f.id)) {
        for (let seed = 1; seed <= 50; seed += 1) {
            const rng = seeded(seed);
            let zoo = makeZoo(rng, "trickier", rule);
            let move = bixMove(zoo);
            let tests = 0;
            while (move.kind === "test") {
                zoo = testCreature(rng, zoo, move.creature.id, rule);
                move = bixMove(zoo);
                tests += 1;
                assert.ok(tests <= 6, `${rule} seed ${seed}`);
            }
            assert.equal(move.rule, rule);
        }
    }
});

test("descriptions name every feature in plain words", () => {
    const creature = { colour: "blue", horns: true, wings: false, spots: true, fourLegs: false, oneEye: true };
    assert.equal(describeCreature(creature), "A blue creature with horns, no wings, spots, two legs and one eye");
});
