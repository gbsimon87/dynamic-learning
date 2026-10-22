import test from "node:test";
import assert from "node:assert/strict";
import { ageOn, ageSentence, weightOn, weightSentence, playFor, BIX_EARTH_KG } from "./planetPlay.js";

test("age counts whole birthdays", () => {
    assert.deepEqual(ageOn("Mars", 7), { whole: 3, birthdaysYet: true });
    assert.equal(ageOn("Mercury", 7).whole, 29);
    assert.deepEqual(ageOn("Earth", 7), { whole: 7, birthdaysYet: true });
});

test("age 0 and slow years have no birthday yet", () => {
    assert.deepEqual(ageOn("Neptune", 0), { whole: 0, birthdaysYet: false });
    assert.deepEqual(ageOn("Jupiter", 7), { whole: 0, birthdaysYet: false });
});

test("age is null for bodies with no year", () => {
    assert.equal(ageOn("Moon", 7), null);
    assert.equal(ageOn("Phobos", 7), null);
    assert.equal(ageOn("toString", 7), null);
    assert.equal(ageSentence("Phobos", 7), null);
});

test("age sentences", () => {
    assert.equal(ageSentence("Mars", 7), "On Mars you'd be 3!");
    assert.equal(ageSentence("Mercury", 7), "On Mercury you'd be 29!");
    assert.equal(ageSentence("Earth", 7), "On Earth you're 7, of course!");
    assert.equal(ageSentence("Jupiter", 7), "On Jupiter you haven't had your first birthday yet!");
});

test("weight is Bix's, rounded, never below 1", () => {
    assert.equal(BIX_EARTH_KG, 20);
    assert.equal(weightOn("Earth"), 20);
    assert.equal(weightOn("Mars"), 8);
    assert.equal(weightOn("Jupiter"), 51);
    assert.equal(weightOn("Moon"), 3);
    assert.ok(weightOn("Pluto") >= 1);
    assert.equal(weightOn("Phobos"), null);
});

test("weight sentences", () => {
    assert.equal(weightSentence("Mars"), "On Mars, Bix would weigh 8 kg.");
    assert.equal(weightSentence("Earth"), "On Earth, Bix weighs 20 kg.");
    assert.match(weightSentence("Jupiter"), /^At Jupiter's cloud tops, Bix would weigh 51 kg\./);
    assert.equal(weightSentence("Phobos"), null);
});

test("playFor says which games a body supports", () => {
    assert.deepEqual(playFor("Mars"), { age: true, weight: true });
    assert.deepEqual(playFor("Moon"), { age: false, weight: true });
    assert.deepEqual(playFor("Phobos"), { age: false, weight: false });
    assert.deepEqual(playFor(undefined), { age: false, weight: false });
});
