/**
 * Brain breaks: after a stretch of active play, Bix suggests a short movement
 * break. Optional, skippable, never a lock. The interval is a DEVICE setting
 * a grown-up changes in /parent (`dl.brainBreak`: minutes, or "off"), kept
 * beside the mute switch — not learner data.
 *
 * Pure: the activities, the setting's parsing and the "is it time?" rule.
 */

export const BREAK_SETTING_KEY = "dl.brainBreak";
export const BREAK_CHOICES = [10, 15, 20, 30];
export const DEFAULT_BREAK_MINUTES = 15;

/** A tick of play counts only if the child tapped or typed this recently. */
export const IDLE_AFTER_MS = 60_000;

/**
 * Grown-up and account pages never count towards a break and never show one:
 * the timer is about play, and a break offer must not land on a password form.
 */
const NOT_PLAY = ["/parent", "/login", "/signup", "/forgot-password", "/reset-password", "/profiles", "/privacy", "/credits", "/hello"];

export function countsTowardsBreak(pathname) {
  return !NOT_PLAY.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

/** `emoji` is what bounces on screen; `move` names the CSS animation. */
export const ACTIVITIES = [
  { id: "kangaroo", emoji: "🦘", move: "jump", text: "Jump like a kangaroo 5 times!" },
  { id: "giraffe", emoji: "🦒", move: "stretch", text: "Stretch up as tall as a giraffe!" },
  { id: "starfish", emoji: "⭐", move: "spin", text: "Make a big starfish shape, then curl up small. Do it 3 times!" },
  { id: "frog", emoji: "🐸", move: "jump", text: "Hop like a frog 4 times!" },
  { id: "tree", emoji: "🌳", move: "sway", text: "Stand on one leg like a tree. Can you count to 5?" },
  { id: "penguin", emoji: "🐧", move: "sway", text: "Waddle like a penguin around your chair!" },
  { id: "rocket", emoji: "🚀", move: "jump", text: "Crouch down low, count 3, 2, 1 — and blast off with a big jump!" },
  { id: "windmill", emoji: "🌬️", move: "spin", text: "Swing your arms round like a windmill 5 times!" },
  { id: "elephant", emoji: "🐘", move: "sway", text: "Stomp like an elephant 6 times!" },
  { id: "butterfly", emoji: "🦋", move: "sway", text: "Flap your arms like butterfly wings and tiptoe around!" },
];

/** The saved setting: a number of minutes, or null for off. Bad values fall back to the default. */
export function parseBreakSetting(raw) {
  if (raw === "off") return null;
  const minutes = Number(raw);
  return BREAK_CHOICES.includes(minutes) ? minutes : DEFAULT_BREAK_MINUTES;
}

/** True once `activeMs` of play has passed the interval. Off never offers one. */
export function breakDue(activeMs, minutes) {
  return minutes !== null && activeMs >= minutes * 60_000;
}

/** The next activity: never the one just done, cycling through them all. */
export function nextActivity(lastId, rng = Math.random) {
  const pool = ACTIVITIES.filter((activity) => activity.id !== lastId);
  return pool[Math.floor(rng() * pool.length)];
}
