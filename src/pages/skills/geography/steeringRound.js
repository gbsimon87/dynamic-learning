/**
 * Pure logic for the rocket-steering game: which planet is the target, how a
 * round is scored, what the grown-up notes say, and the joystick maths.
 * Kept free of three.js and the DOM so it can be tested with node:test.
 */

export const STEERING_COLOURS = [
    { name: "RED", hex: 0xff4d4d },
    { name: "BLUE", hex: 0x3d8bff },
    { name: "GREEN", hex: 0x3ddc6a },
    { name: "YELLOW", hex: 0xffd23d },
    { name: "PURPLE", hex: 0xb05cff },
];

export const TARGET_COUNT = STEERING_COLOURS.length;
export const STYLE_NAMES = { A: "A: Joystick", B: "B: Tap to go" };
/** What the third column counts: letting go of GO! (A) or taps (B). */
export const ACTION_LABELS = { A: "let-go", B: "taps" };
/** Joystick wobble below this size is ignored so shaky thumbs do not steer. */
export const DEAD_ZONE = 0.12;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function shuffle(items, random = Math.random) {
    return items.map((x) => [random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);
}

/** A fresh round: the five colours in a random order, nothing logged yet. */
export function createRound(random = Math.random) {
    return {
        order: shuffle(STEERING_COLOURS.map((_, i) => i), random),
        idx: 0,
        done: false,
        log: [],
        cur: { t: 0, bumps: 0, acts: 0 },
    };
}

/** Index into STEERING_COLOURS of the current target, or null when finished. */
export function targetIndex(round) {
    return round.done ? null : round.order[round.idx];
}

/** Time only counts while there is still a target to find. */
export function addTime(round, dt) {
    if (!round.done) round.cur.t += dt;
}

export function addBump(round) {
    if (!round.done) round.cur.bumps++;
}

export function addAct(round) {
    if (!round.done) round.cur.acts++;
}

/** The target was reached: log it and move on. Returns true when that was the last one. */
export function recordReached(round) {
    round.log.push({ name: STEERING_COLOURS[round.order[round.idx]].name, ...round.cur });
    round.idx++;
    round.cur = { t: 0, bumps: 0, acts: 0 };
    if (round.idx >= TARGET_COUNT) round.done = true;
    return round.done;
}

/**
 * Joystick input after adding the keyboard and applying the dead zone.
 * `keys` is a Set of lower-cased key names; stick values run from -1 to 1.
 */
export function steerInput(stickX, stickY, keys) {
    const has = (...names) => names.some((n) => keys.has(n));
    let x = stickX;
    let y = stickY;
    if (has("ArrowLeft", "a")) x -= 1;
    if (has("ArrowRight", "d")) x += 1;
    if (has("ArrowUp", "w")) y += 1;
    if (has("ArrowDown", "s")) y -= 1;
    x = clamp(x, -1, 1);
    y = clamp(y, -1, 1);
    if (Math.hypot(x, y) < DEAD_ZONE) return { x: 0, y: 0 };
    return { x, y };
}

/**
 * Turn a pointer offset from the joystick centre into a stick value.
 * `dx`, `dy` are screen pixels (y down); `max` is how far the thumb may travel.
 * Returns the stick (y up) and the clamped thumb offset in pixels.
 */
export function stickVector(dx, dy, max) {
    const d = Math.hypot(dx, dy);
    if (d > max) {
        dx *= max / d;
        dy *= max / d;
    }
    return { x: dx / max, y: -dy / max, thumbX: dx, thumbY: dy };
}

/** Rows for the notes table: finished targets plus the one being tried now. */
export function notesRows(round) {
    const rows = round.log.map((r) => ({ ...r, live: false }));
    if (!round.done && (round.cur.t > 0 || round.log.length)) {
        rows.push({ name: `${STEERING_COLOURS[round.order[round.idx]].name} (now)`, ...round.cur, live: true });
    }
    return rows;
}

const sum = (rows, key) => rows.reduce((a, r) => a + r[key], 0);
export const formatSeconds = (n) => n.toFixed(1);

/** Everything the notes panel shows for one steering style. */
export function notesFor(round) {
    return { rows: notesRows(round), doneCount: round.log.length, doneSeconds: sum(round.log, "t") };
}

/** Plain-text summary of both styles, the same text "Copy results" copies. */
export function resultsSummary(rounds) {
    return ["Steering playtest", ...["A", "B"].flatMap((st) => {
        const d = rounds[st].log;
        const act = ACTION_LABELS[st];
        return [
            `${STYLE_NAMES[st]}: ${d.length}/${TARGET_COUNT} targets, total ${formatSeconds(sum(d, "t"))} s, bumps ${sum(d, "bumps")}, ${act} ${sum(d, "acts")}`,
            ...d.map((r) => `  ${r.name}: ${formatSeconds(r.t)} s, ${r.bumps} bumps, ${r.acts} ${act}`),
        ];
    })].join("\n");
}
