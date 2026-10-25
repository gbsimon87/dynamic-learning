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
  { id: "crab", emoji: "🦀", move: "sway", text: "Scuttle like a crab: 4 steps sideways, then 4 steps back!" },
  { id: "bunny", emoji: "🐰", move: "jump", text: "Make bunny ears with your hands and hop 6 times!" },
  { id: "robot", emoji: "🤖", move: "sway", text: "Walk like a stiff robot and say 'beep boop' 3 times!" },
  { id: "dinosaur", emoji: "🦖", move: "sway", text: "Make tiny T. rex arms, stomp about and give a big ROAR!" },
  { id: "popcorn", emoji: "🍿", move: "jump", text: "Crouch small like popcorn… then POP up high! Do it 5 times!" },
  { id: "octopus", emoji: "🐙", move: "sway", text: "Wiggle your arms like a wobbly octopus! Can you wiggle 8?" },
  { id: "freeze", emoji: "💃", move: "sway", text: "Dance like crazy, then FREEZE like a statue! Do it 3 times!" },
  { id: "flamingo", emoji: "🦩", move: "stretch", text: "Balance on one leg like a flamingo. Now swap legs!" },
  { id: "cat", emoji: "🐱", move: "stretch", text: "Stretch like a sleepy cat, then give a big yawn. Miaow!" },
  { id: "monkey", emoji: "🐒", move: "jump", text: "Scratch your head and jump like a cheeky monkey 5 times!" },
  { id: "bee", emoji: "🐝", move: "spin", text: "Buzz like a busy bee and turn round slowly 3 times!" },
  { id: "snowman", emoji: "⛄", move: "stretch", text: "Melt like a snowman down to the floor, then grow back tall!" },
  { id: "superhero", emoji: "🦸", move: "stretch", text: "Do your best superhero pose and hold it while you count to 5!" },
  { id: "jelly", emoji: "🍮", move: "sway", text: "Wobble like a jelly on a plate! Wibble, wobble, wibble!" },
  { id: "horse", emoji: "🐴", move: "jump", text: "Gallop on the spot like a horse, then say 'neigh'!" },
  { id: "owl", emoji: "🦉", move: "sway", text: "Turn your head slowly like an owl: left, then right. Twit-twoo!" },
  { id: "tortoise", emoji: "🐢", move: "sway", text: "Take 5 super slow-motion steps like a tortoise." },
  { id: "wet-dog", emoji: "🐶", move: "spin", text: "Shake like a wet dog: head, arms, legs, everything!" },
  { id: "crocodile", emoji: "🐊", move: "jump", text: "Make crocodile jaws with your arms and SNAP 5 times!" },
  { id: "noodle", emoji: "🍜", move: "sway", text: "Go floppy like a wet noodle, then stiff as a pencil!" },
  { id: "head-toes", emoji: "🙌", move: "stretch", text: "Touch your head, shoulders, knees and toes. Now go faster!" },
  { id: "ladder", emoji: "☁️", move: "stretch", text: "Climb an invisible ladder up to the clouds. 10 steps!" },
  { id: "canoe", emoji: "🛶", move: "sway", text: "Paddle a canoe: row 5 times on each side!" },
  { id: "apples", emoji: "🍎", move: "stretch", text: "Reach up high and pick apples from a tall tree: left, right!" },
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
