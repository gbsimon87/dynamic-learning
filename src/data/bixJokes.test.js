import test from "node:test";
import assert from "node:assert/strict";
import { JOKES, JOKE_KINDS, nextJoke } from "./bixJokes.js";
import { findUsSpellings } from "./english/textChecks.js";

test("every joke has a unique id, a known kind and both lines", () => {
  const ids = new Set();
  for (const joke of JOKES) {
    assert.ok(joke.id, "missing id");
    assert.ok(!ids.has(joke.id), `duplicate id ${joke.id}`);
    ids.add(joke.id);
    assert.ok(JOKE_KINDS.includes(joke.kind), `${joke.id}: unknown kind ${joke.kind}`);
    assert.ok(joke.setup?.trim(), `${joke.id}: empty setup`);
    assert.ok(joke.punchline?.trim(), `${joke.id}: empty punchline`);
  }
});

test("the pool is big enough to feel fresh, and every kind is represented", () => {
  assert.ok(JOKES.length >= 36, `only ${JOKES.length} jokes`);
  for (const kind of JOKE_KINDS) {
    assert.ok(JOKES.filter((joke) => joke.kind === kind).length >= 10, `too few ${kind} jokes`);
  }
});

test("jokes are short enough to read aloud and fit a speech bubble", () => {
  for (const joke of JOKES) {
    assert.ok(joke.setup.length <= 90, `${joke.id}: setup is ${joke.setup.length} chars`);
    assert.ok(joke.punchline.length <= 70, `${joke.id}: punchline is ${joke.punchline.length} chars`);
  }
});

test("setups ask and punchlines land: a question, then an answer", () => {
  for (const joke of JOKES) {
    assert.match(joke.setup, /\?$/, `${joke.id}: setup should be a question`);
    assert.match(joke.punchline, /[!.]$/, `${joke.id}: punchline should end with ! or .`);
  }
});

test("British spelling throughout", () => {
  for (const joke of JOKES) {
    const found = findUsSpellings(`${joke.setup} ${joke.punchline}`);
    assert.deepEqual(found, [], `${joke.id}: ${found.join(", ")}`);
  }
});

test("never repeats a joke until the whole pool has been told", () => {
  let seen = [];
  const told = [];
  for (let i = 0; i < JOKES.length; i++) {
    const next = nextJoke(seen, Math.random);
    told.push(next.joke.id);
    seen = next.seen;
  }
  assert.equal(new Set(told).size, JOKES.length);
  assert.equal(seen.length, JOKES.length);
});

test("once exhausted it starts again, never with the joke just told", () => {
  const all = JOKES.map((joke) => joke.id);
  for (let i = 0; i < 20; i++) {
    const { joke, seen } = nextJoke(all, () => i / 20);
    assert.notEqual(joke.id, all[all.length - 1]);
    assert.deepEqual(seen, [joke.id]);
  }
});

test("tolerates odd randomness and stale ids", () => {
  const pool = JOKES.slice(0, 3);
  assert.equal(nextJoke([], () => 0.9999999, pool).joke.id, pool[2].id);
  assert.equal(nextJoke([], () => 1, pool).joke.id, pool[2].id);
  assert.equal(nextJoke([], () => -1, pool).joke.id, pool[0].id);
  // An id that is no longer in the pool is dropped from the told list.
  const { seen } = nextJoke(["gone-joke", pool[0].id], () => 0, pool);
  assert.deepEqual(seen, [pool[0].id, pool[1].id]);
});

test("a one-joke pool still answers", () => {
  const pool = JOKES.slice(0, 1);
  const first = nextJoke([], Math.random, pool);
  const second = nextJoke(first.seen, Math.random, pool);
  assert.equal(second.joke.id, pool[0].id);
});
