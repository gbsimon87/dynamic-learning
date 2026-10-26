import test from "node:test";
import assert from "node:assert/strict";
import { ageOn, ageSentence, weightOn, weightSentence, playFor, yearLine, BIX_EARTH_KG, PLANET_PLAY } from "./planetPlay.js";

// The games read a body's play numbers, never its name; these are home's.
const play = (name) => PLANET_PLAY[name];
const HOME = { isHome: true };
const TRAPPIST_B = { yearInEarthYears: 1.51088 / 365.25, gravity: 1.1, hasSurface: true };
const TRAPPIST_H = { yearInEarthYears: 18.7729 / 365.25, gravity: 0.57, hasSurface: true };

test("age counts whole birthdays", () => {
    assert.deepEqual(ageOn(play("Mars"), 7), { whole: 3, birthdaysYet: true });
    assert.equal(ageOn(play("Mercury"), 7).whole, 29);
    assert.deepEqual(ageOn(play("Earth"), 7), { whole: 7, birthdaysYet: true });
    assert.equal(ageOn(TRAPPIST_B, 7).whole, 1692);
    assert.equal(ageOn(TRAPPIST_H, 7).whole, 136);
});

test("age 0 and slow years have no birthday yet", () => {
    assert.deepEqual(ageOn(play("Neptune"), 0), { whole: 0, birthdaysYet: false });
    assert.deepEqual(ageOn(play("Jupiter"), 7), { whole: 0, birthdaysYet: false });
});

test("age is null for bodies with no year", () => {
    assert.equal(ageOn(play("Moon"), 7), null);
    assert.equal(ageOn(undefined, 7), null);
    assert.equal(ageSentence("Phobos", undefined, 7), null);
});

test("age sentences", () => {
    assert.equal(ageSentence("Mars", play("Mars"), 7), "On Mars you'd be 3!");
    assert.equal(ageSentence("Mercury", play("Mercury"), 7), "On Mercury you'd be 29!");
    assert.equal(ageSentence("Earth", play("Earth"), 7, HOME), "On Earth you're 7, of course!");
    assert.equal(ageSentence("Jupiter", play("Jupiter"), 7), "On Jupiter you haven't had your first birthday yet!");
    assert.equal(ageSentence("TRAPPIST-1 b", TRAPPIST_B, 7), "On TRAPPIST-1 b you'd be 1692!");
});

test("weight is Bix's, rounded, never below 1", () => {
    assert.equal(BIX_EARTH_KG, 20);
    assert.equal(weightOn(play("Earth")), 20);
    assert.equal(weightOn(play("Mars")), 8);
    assert.equal(weightOn(play("Jupiter")), 51);
    assert.equal(weightOn(play("Moon")), 3);
    assert.ok(weightOn(play("Pluto")) >= 1);
    assert.equal(weightOn(undefined), null);
    assert.equal(weightOn(TRAPPIST_H), 11);
});

test("weight sentences", () => {
    assert.equal(weightSentence("Mars", play("Mars")), "On Mars, Bix would weigh 8 kg.");
    assert.equal(weightSentence("Earth", play("Earth"), HOME), "On Earth, Bix weighs 20 kg.");
    assert.equal(weightSentence("Moon", play("Moon")), "On the Moon, Bix would weigh 3 kg.");
    assert.match(weightSentence("Jupiter", play("Jupiter")), /^At Jupiter's cloud tops, Bix would weigh 51 kg\./);
    assert.equal(weightSentence("Phobos", undefined), null);
    assert.equal(weightSentence("TRAPPIST-1 h", TRAPPIST_H), "On TRAPPIST-1 h, Bix would weigh 11 kg.");
});

test("year lines use Earth years, or Earth days for very short years", () => {
    assert.equal(yearLine("Mars", play("Mars")), "A year on Mars is 1.9 Earth years long.");
    assert.equal(yearLine("Mercury", play("Mercury")), "A year on Mercury is 0.2 Earth years long.");
    assert.equal(yearLine("Earth", play("Earth"), HOME), null);
    assert.equal(yearLine("TRAPPIST-1 b", TRAPPIST_B), "A year on TRAPPIST-1 b is 1.5 Earth days long.");
    assert.equal(yearLine("TRAPPIST-1 h", TRAPPIST_H), "A year on TRAPPIST-1 h is 18.8 Earth days long.");
    assert.equal(yearLine("Moon", play("Moon")), null);
});

test("playFor says which games a body supports", () => {
    assert.deepEqual(playFor(play("Mars")), { age: true, weight: true });
    assert.deepEqual(playFor(play("Moon")), { age: false, weight: true });
    assert.deepEqual(playFor(undefined), { age: false, weight: false });
    assert.deepEqual(playFor(TRAPPIST_B), { age: true, weight: true });
});
