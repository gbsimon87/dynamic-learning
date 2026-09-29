/**
 * The celebration particle effects, by name, drawn with canvas-confetti.
 *
 * Canvas rather than DOM nodes so a fireworks finale stays smooth on a phone.
 * The library is imported lazily: the first effect costs one small chunk, and a
 * child who never finishes anything never downloads it.
 *
 * `prefers-reduced-motion` turns every effect into a no-op (the steps still
 * show their content; only the particles go). Small screens get fewer
 * particles, which is both cheaper and less of a wall of colour.
 *
 * `playEffect` returns a stop function; call it on skip or unmount so a finale
 * never rains on the next screen.
 */

const COLOURS = ["#ef626c", "#e0a833", "#52a99d", "#84dccf", "#ffd166", "#b388eb"];
// Deep enough to read on the pale light-theme panel, bright enough for dark.
const GOLD = ["#ffc53d", "#f59e0b", "#e0a833", "#ef626c"];

let loader = null;
function loadConfetti() {
  loader ??= import("canvas-confetti").then((module) => module.default);
  return loader;
}

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function scale(count) {
  return Math.round(count * (window.innerWidth < 500 ? 0.55 : 1));
}

/** An element's centre in canvas-confetti's 0–1 viewport coordinates. */
function originOf(element) {
  const rect = element?.getBoundingClientRect?.();
  if (!rect) return { x: 0.5, y: 0.45 };
  return {
    x: (rect.left + rect.width / 2) / window.innerWidth,
    y: (rect.top + rect.height / 2) / window.innerHeight,
  };
}

const BASE = { zIndex: 1000, disableForReducedMotion: true };

/** Each effect: (fire, origin, schedule) => void. */
const EFFECTS = {
  sparkle(fire, origin) {
    fire({ particleCount: scale(16), spread: 70, startVelocity: 16, ticks: 55, scalar: 0.7,
      shapes: ["star"], colors: GOLD, gravity: 0.6, origin });
  },

  stars(fire, origin) {
    fire({ particleCount: scale(40), spread: 360, startVelocity: 22, ticks: 80, scalar: 1.1,
      shapes: ["star"], colors: GOLD, gravity: 0.4, origin });
  },

  burst(fire, origin) {
    fire({ particleCount: scale(70), spread: 80, startVelocity: 38, colors: COLOURS, origin });
    fire({ particleCount: scale(24), spread: 120, startVelocity: 26, scalar: 1.1,
      shapes: ["star"], colors: GOLD, origin });
  },

  confetti(fire, origin, schedule) {
    const cannons = () => {
      fire({ particleCount: scale(70), angle: 60, spread: 60, startVelocity: 60,
        colors: COLOURS, origin: { x: 0, y: 0.85 } });
      fire({ particleCount: scale(70), angle: 120, spread: 60, startVelocity: 60,
        colors: COLOURS, origin: { x: 1, y: 0.85 } });
    };
    cannons();
    schedule(cannons, 350);
  },

  confettiStars(fire, origin, schedule) {
    EFFECTS.confetti(fire, origin, schedule);
    schedule(() => EFFECTS.stars(fire, { x: 0.5, y: 0.35 }), 700);
    schedule(() => EFFECTS.confetti(fire, origin, schedule), 1300);
  },

  fireworks(fire, origin, schedule, duration = 2600) {
    for (let at = 0; at < duration; at += 320) {
      schedule(() => {
        fire({ particleCount: scale(55), spread: 360, startVelocity: 28, ticks: 70,
          gravity: 0.8, colors: COLOURS,
          origin: { x: 0.15 + Math.random() * 0.7, y: 0.15 + Math.random() * 0.35 } });
      }, at);
    }
  },

  fireworksFinale(fire, origin, schedule) {
    EFFECTS.fireworks(fire, origin, schedule, 4200);
    schedule(() => EFFECTS.confetti(fire, origin, schedule), 1200);
    schedule(() => EFFECTS.stars(fire, { x: 0.5, y: 0.3 }), 2400);
  },
};

/**
 * @param {string} name     a key of EFFECTS
 * @param {object} options  { origin: Element } to burst from an element
 * @returns {Function} stop
 */
export function playEffect(name, { origin } = {}) {
  const effect = EFFECTS[name];
  if (!effect || typeof window === "undefined" || reducedMotion()) return () => {};

  const timers = [];
  let stopped = false;
  const at = originOf(origin);

  loadConfetti()
    .then((confetti) => {
      if (stopped) return;
      const fire = (options) => {
        if (!stopped) confetti({ ...BASE, ...options });
      };
      const schedule = (callback, delay) => {
        timers.push(window.setTimeout(callback, delay));
      };
      effect(fire, at, schedule);
    })
    .catch(() => {
      // Decoration only — a failed chunk load must never interrupt a child.
    });

  return () => {
    stopped = true;
    timers.forEach((timer) => window.clearTimeout(timer));
    loader?.then((confetti) => confetti.reset()).catch(() => {});
  };
}
